import bcrypt from "bcrypt"

export default class Security {
    public static async encryptPassword(password: string) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        return hash
    }
}
