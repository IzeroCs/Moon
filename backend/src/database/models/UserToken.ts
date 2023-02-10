import { Schema, Types, model } from "mongoose"
import { IUser } from "./User"

export interface IUserToken {
    userId: Types.ObjectId,
    token: string,
    createAt: Date
}

const userTokenSchema = new Schema<IUserToken>({
    userId: { type: Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
    createAt: { type: Date, default: Date.now, expires: 2 * 86400 }
})

export default class UserToken {
    public static readonly model = model<IUserToken>("User_Token", userTokenSchema)

    public static async findRemove(user: IUser) {
        return await UserToken.model.find({ userId: user._id }).deleteMany()
    }

    public static async create(user: IUser, token: string) {
        return await new UserToken
            .model({ userId: user._id, token: token }).save()
    }

}
