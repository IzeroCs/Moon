import fs from "fs"
import jwt from "jsonwebtoken"
import { KeypairPaths } from "../boot/KeyPair"
import { IUser } from "../database/models/User"
import UserToken, { IUserToken } from "../database/models/UserToken"

export async function generateToken(user: IUser) {
    try {
        const payload = { id: user._id }
        const accessPrivateKey = fs.readFileSync(KeypairPaths.AccessTokenPrivateKeyPath)
        const refreshPrivateKey = fs.readFileSync(KeypairPaths.RefreshTokenPrivateKeyPath)
        const accessToken = jwt.sign(payload, accessPrivateKey)
        const refreshToken = jwt.sign(payload, refreshPrivateKey)

        await UserToken.findOne(user, true)
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

            const refreshPrivateKey = fs.readFileSync(KeypairPaths.RefreshTokenPrivateKeyPath)
            jwt.verify(refreshToken, refreshPrivateKey, (err, payload) => {
                if (err)
                    return reject({ error: true, message: "Invalid refresh token" })

                resolve({ payload, error: false, message: "Validate refresh token" })
            })
        })
    })
}
