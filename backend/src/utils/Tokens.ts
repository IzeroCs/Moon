import { NextFunction, Request, Response } from "express"
import fs from "fs"
import jwt from "jsonwebtoken"
import { KeypairPaths } from "../boot/KeyPair"
import { IUser } from "../database/models/User"
import UserToken, { IUserToken } from "../database/models/UserToken"
import Logger from "./Logger"
import Result from "./Result"
import i18n from "../Locale"

const logger = Logger.create("Tokens")

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

export async function generateToken(user: IUser) {
    try {
        const payload = { id: user._id }
        const accessToken = jwt.sign(payload, readAccessPrivateKey(),
            { algorithm: "RS256", expiresIn: 86400 })
        const refreshToken = jwt.sign(payload, readRefreshPrivateKey(),
            { algorithm: "RS256", expiresIn: 86400 })

        await UserToken.findRemove(user)
        await UserToken.create(user, refreshToken)
        return Promise.resolve({ accessToken, refreshToken })
    } catch (err) {
        return Promise.reject(err)
    }
}

export function verifyRefreshToken(refreshToken: string) {
    return new Promise((resolve, reject) => {
        UserToken.model.findOne({ token: refreshToken }, (err: any, doc?: IUserToken) => {
            if (!doc)
                return reject({ error: true, message: "Invalid refresh token" })

            jwt.verify(refreshToken, readRefreshPrivateKey(), (err, payload) => {
                if (err)
                    return reject({ error: true, message: "Invalid refresh token" })

                resolve({ payload, error: false, message: "Validate refresh token" })
            })
        })
    })
}

export function middlewareChecker(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["authorization"]

    if (typeof token === "undefined")
        return Result.sendForbidden(res, i18n.__("token_required"))

    token = token.split(" ")[1]

    if (token) {
        jwt.verify(token, readAccessPrivateKey(), (err: any, payload: any) => {
            Result.sendUnauthorized(res, i18n.__("token_invalid"), !err ? payload : null)
                .then((decoded) => {
                    req.decoded = decoded
                    next()
                }).catch((err) => logger.err(err))
        })
    } else {
        Result.sendForbidden(res, i18n.__("token_forbidden"))
    }
}
