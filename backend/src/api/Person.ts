import {
    Controller, Post, Res, Req
} from "@decorators/express"
import { Request, Response } from "express"
import User from "../database/models/User"
import Result from "../utils/Result"
import Validate from "../utils/Validate"
import i18n from "../Locale"
import { IUser } from '../database/models/User';
import Security from '../utils/Security';
import { generateToken } from "../utils/Tokens"
import Logger from "../utils/Logger"

const logger = Logger.create("ApiPerson")

@Controller("/api/person")
export default class Person {
    @Post("/login")
    public async login(@Res() res: Response, @Req() req: Request) {
        const username = req.body.username
        const password = req.body.password

        Result.sendValidate(res,
            Validate.isRequired(i18n.__("login_username_or_password_is_empty"),
                username, password),
            Validate.isLength(i18n.__("login_username_min_length", String(User.USERNAME_MIN_LENGTH)),
                username, { min: User.USERNAME_MIN_LENGTH }),
            Validate.isLength(i18n.__("login_password_min_length", String(User.PASSWORD_MIN_LENGTH)),
                password, { min: User.USERNAME_MIN_LENGTH })
        ).then(async () => {
            return Result.sendUnauthorized<IUser>(res,
                i18n.__("login_username_or_password_wrong"),
                await User.findUsernameOrEmail(username))
        }).then(async (user) => {
            return Result.sendUnauthorized<IUser>(res,
                i18n.__("login_username_or_password_wrong"),
                await Security.verifyPassword(password, user.password) ? user : null)
        }).then(async (user) => {
            const { accessToken, refreshToken } = await generateToken(user)

            return Result.sendOK(res,
                i18n.__("login_sucessfully"), {
                    accessToken, refreshToken
                })
        }).catch((err) => logger.err(err))
    }
}
