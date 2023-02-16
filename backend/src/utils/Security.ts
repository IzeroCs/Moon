import bcrypt from "bcrypt"
import { NextFunction, Request, Response } from "express"
import Result from "./Result"
import i18n from "../Locale"

export default class Security {
  public static readonly SALT = 10

  public static async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(Security.SALT)
    const hash = await bcrypt.hash(password, salt)

    return hash
  }

  public static async verifyPassword(password: string,
    hashPassword: string
  ) {
    return await bcrypt.compare(password, hashPassword)
  }

  public static middlewareUserAgent(req: Request, res: Response, next: NextFunction) {
    if (typeof req.headers["user-agent"] === "undefined")
      return Result.sendForbidden(res, { message: i18n.__("useragent_forbidden") })
    req.userAgent = req.headers["user-agent"]
    next()
  }
}
