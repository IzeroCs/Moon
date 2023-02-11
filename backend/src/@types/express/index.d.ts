declare global {
    namespace Express {
        interface Request {
            decoded: any
            userAgent: string
        }
    }
}

export {}
