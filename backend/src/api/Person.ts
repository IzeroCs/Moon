import {
    Controller, Post, Res, Req
} from "@decorators/express"
import { Request, Response } from "express"
import User from "../database/models/User"
import Result, { ErrorType, Status } from "../utils/Result"
import Validate from "../utils/Validate"
import i18n from "../Locale"
import { IUser } from '../database/models/User';
import Security from '../utils/Security';
import { generateToken, verifyRefreshToken } from '../utils/Tokens';
import Logger from "../utils/Logger"
import { IUserToken } from '../../dist/database/models/UserToken';

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
            return Result.sendUnauthorizedCondition<IUser>(res, {
                message: i18n.__("login_username_or_password_wrong"),
                errorType: ErrorType.AuthenticateInvalid
            }, await User.findUsernameOrEmail(username))
        }).then(async (user) => {
            return Result.sendUnauthorizedCondition<IUser>(res, {
                message: i18n.__("login_username_or_password_wrong"),
                errorType: ErrorType.AuthenticateInvalid
            }, await Security.verifyPassword(password, user.password) ? user : null)
        }).then(async (user) => {
            const { accessToken, refreshToken } = await generateToken(user,
                req.headers["user-agent"]!!)

            return Result.sendOK(res, {
                message: i18n.__("login_sucessfully"),
                data: { accessToken, refreshToken }
            })
        }).catch((err) => logger.err(err))
    }

    @Post("/refresh")
    public refresh(@Res() res: Response, @Req() req: Request) {
        const accessToken = req.body.access_token
        const refreshToken = req.body.refresh_token

        Result.sendValidate(res,
            Validate.isRequired(i18n.__("token_required"),
                accessToken, refreshToken)
        ).then(() => {
            verifyRefreshToken(accessToken, refreshToken, req.userAgent)
                .then((userToken) => {
                    Result.sendOK(res, {
                        message: i18n.__("token_refresh_sucessfully"),
                        data: { accessToken: userToken.accessToken }
                    })
                }).catch(err => {
                    logger.err(err)
                    Result.sendUnauthorized(res, {
                        message: i18n.__("token_invalid"),
                        errorType: ErrorType.TokenInvalid
                    })
                })
        }).catch((err) => logger.err(err))
    }
}
