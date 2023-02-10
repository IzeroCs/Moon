import bcrypt from "bcrypt"

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
}
