import { Schema, Document, model } from "mongoose"
import Response, { Status } from "../../utils/Response"
import Security from "../../utils/Security"
import Logger from "../../utils/Logger"

export interface IUser extends Document {
    username: string
    password: string
    email: string
    createAt: Date
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    createAt: { type: Date, default: Date.now }
})

const logger = Logger.create("DatabaseModelsUser")

export default class User {
    public static readonly model = model<IUser>("User", userSchema)

    public static async createUserAdmin() {
        if (!await this.findUsernameOrEmail("admin")) {
            const create = await User.create("admin", "admin", "admin@admin.com")
            if (create.isOK()) logger
                .debug("Create default user: [Username = admin, Password = admin]")
        } else {
            logger.debug("Default user is available")
        }
    }

    public static async create(username: string, password: string, email: string) {
        const user = await User.model.findOne({ $or: [
            { username }, { email }
        ] })

        if (user) {
            return Promise.reject(new Response(Status
                .BadRequest, "Username or email give already exist"))
        }

        const hashPassword = await Security.encryptPassword(password)
        await new User.model({ username, password: hashPassword, email }).save()
        return Promise.resolve(new Response(Status
            .Created, "Account created sucessfully"))
    }

    public static async findUsernameOrEmail(mix: string) {
        return await User.model.findOne({ $or: [
            { username: mix }, { email: mix }
        ]})
    }
}
