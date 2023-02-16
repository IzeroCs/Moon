import { Schema, Document, model } from "mongoose"
import Result, { Status } from "../../utils/Result"
import Security from "../../utils/Security"
import Logger from "../../utils/Logger"
import i18n from "../../Locale"

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

  public static readonly USERNAME_MIN_LENGTH = 5
  public static readonly PASSWORD_MIN_LENGTH = 5

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
    const user = await User.model.findOne({
      $or: [
        { username }, { email }
      ]
    })

    if (user) {
      return Promise.reject(Result.create({
        status: Status.BadRequest,
        message: i18n.__("user_create_already_exists")
      }))
    }

    const hashPassword = await Security.encryptPassword(password)
    await new User.model({ username, password: hashPassword, email }).save()
    return Promise.resolve(Result.create({
      status: Status.Created,
      message: i18n.__("user_create_sucessfully")
    }))
  }

  public static async findUsernameOrEmail(mix: string) {
    return await User.model.findOne({
      $or: [
        { username: mix }, { email: mix }
      ]
    })
  }
}
