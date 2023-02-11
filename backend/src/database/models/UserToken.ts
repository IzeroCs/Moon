import { Schema, Types, model } from "mongoose"
import { IUser } from "./User"

export interface IUserToken {
    userId: Types.ObjectId,
    accessToken: string,
    refreshToken: string,
    userAgent: string,
    createAt: Date
}

const userTokenSchema = new Schema<IUserToken>({
    userId: { type: Schema.Types.ObjectId, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    userAgent: { type: String, required: true },
    createAt: { type: Date, default: Date.now, expires: 2 * 86400 }
})

export default class UserToken {
    public static readonly model = model<IUserToken>("User_Token", userTokenSchema)

    public static async findRemove(user: IUser, userAgent: string) {
        return await UserToken.model.find({ userId: user._id, userAgent }).deleteMany()
    }

    public static async create(user: IUser, accessToken: string,
        refreshToken: string, userAgent: string
    ) {
        return await new UserToken
            .model({ userId: user._id, accessToken, refreshToken, userAgent }).save()
    }

    public static async updateAccessToken(userId: Types.ObjectId, accessToken: string,
        newAccessToken: string, userAgent: string
    ) {
        return await UserToken.model.findOneAndUpdate({
            accessToken, userAgent
        }, { accessToken: newAccessToken }, { new: true })
    }

    public static async findAccessToken(accessToken: string, userAgent: string) {
        return await UserToken.model.findOne({ accessToken, userAgent })
    }

    public static async findRefreshToken(accessToken: string, refreshToken: string,
        userAgent: string
    ) {
        return await UserToken.model.findOne({ accessToken, refreshToken, userAgent })
    }

}
