import {
    NextFunction,
    Request,
    Response
} from "express"
import fs from "fs"
import jwt from "jsonwebtoken"
import { Base64 } from "js-base64"
import { KeypairPaths } from "../boot/KeyPair"
import { IUser } from "../database/models/User"
import UserToken, { IUserToken } from "../database/models/UserToken"
import Logger from "./Logger"
import Result, { ErrorType } from "./Result"
import i18n from "../Locale"
import { Types } from "mongoose"

const logger = Logger.create("Tokens")

export type Payload = {
    id: string
    iat?: number
    exp?: number
}

export function readAccessPrivateKey() {
    return fs.readFileSync(KeypairPaths.AccessTokenPrivateKeyPath)
}

export function readAccessPublicKey() {
    return fs.readFileSync(KeypairPaths.AccessTokenPublicKeyPath)
}

export function readRefreshPrivateKey() {
    return fs.readFileSync(KeypairPaths.RefreshTokenPrivateKeyPath)
}

export function readRefreshPublicKey() {
    return fs.readFileSync(KeypairPaths.RefreshTokenPublicKeyPath)
}

export function generatePayload(userId: string | Types.ObjectId): Payload {
    return { id: String(userId) }
}
export function generateAccessToken(payload: Payload) {
    return jwt.sign(payload, readAccessPrivateKey(),
    { algorithm: "RS256", expiresIn: 86400 })
}

export function generateRefreshToken(payload: Payload) {
    return jwt.sign(payload, readRefreshPrivateKey(),
    { algorithm: "RS256", expiresIn: 86400 })
}

export async function generateToken(user: IUser, userAgent: string) {
    try {
        const payload = generatePayload(user._id)
        const accessToken = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload)

        await UserToken.findRemove(user, userAgent)
        await UserToken.create(user, accessToken, refreshToken, userAgent)
        return Promise.resolve({ accessToken, refreshToken })
    } catch (err) {
        return Promise.reject(err)
    }
}

export function verifyRefreshToken(accessToken: string,
    refreshToken: string, userAgent: string
) {
    return new Promise<IUserToken>((resolve, reject) => {
        jwt.verify(refreshToken, readRefreshPrivateKey(), (err) => {
            if (err)
                reject(err)

            UserToken.findRefreshToken(accessToken, refreshToken, userAgent)
                .then(async (userToken) => {
                    if (!userToken)
                        return reject(null)

                    const payload = generatePayload(userToken.userId)
                    const newAccessToken = generateAccessToken(payload)

                    return UserToken.updateAccessToken(userToken.userId,
                        accessToken, newAccessToken, userAgent)
                }).then((newUserToken) => {
                    if (!newUserToken)
                        return reject(null)

                    resolve(newUserToken)
                }).catch((err) => {
                    logger.err(err)
                    reject(err)
                })
        })
    })
}

export function middlewareChecker(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["authorization"]

    if (typeof token === "undefined")
        return Result.sendForbidden(res, {
            message: i18n.__("token_required"),
            errorType: ErrorType.TokenRequired
        })

    token = token.split(" ")[1]

    if (typeof token !== "undefined" && token.length > 0) {
        try {
            const part = token.split(".")[1]
            const decoded: Payload = JSON.parse(Base64.decode(part))
            const now = Date.now() / 1000

            if (decoded.exp!! < now)
                return Result.sendUnauthorized(res, {
                    message: i18n.__("token_expired"),
                    errorType: ErrorType.TokenExpired
                })
        } catch (e) {
            logger.err(String(e))
            return Result.sendUnauthorized(res, {
                message: i18n.__("token_invalid"),
                errorType: ErrorType.TokenInvalid
            })
        }

        jwt.verify(token, readAccessPrivateKey(), async (err: any, payload: Payload | any) => {
            if (err || typeof token === "undefined" || token.length < 0) {
                return Result.sendUnauthorized(res, {
                    message: i18n.__("token_invalid"),
                    errorType: ErrorType.TokenInvalid
                })
            }

            const findToken = await UserToken.findAccessToken(token, req.userAgent)

            if (!findToken) {
                return Result.sendUnauthorized(res, {
                    message: i18n.__("token_invalid"),
                    errorType: ErrorType.TokenInvalid
                })
            }

            req.decoded = payload
            next()
        })
    } else {
        Result.sendForbidden(res, {
            message: i18n.__("token_forbidden"),
            errorType: ErrorType.TokenRequired
        })
    }
}
