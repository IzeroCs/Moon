import { Controller, Get, Post, Req, Res } from "@decorators/express"
import { Request, Response } from "express"
import { middlewareChecker } from "../utils/Tokens"

@Controller("/api/file", [ middlewareChecker ])
export default class File {
    @Get("/list")
    public list(@Res() res: Response, @Req() req: Request) {
        console.log(req.decoded, req.headers["user-agent"])
        res.send("OK")
    }
}
