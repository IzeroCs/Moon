export default class Validate {
    public static isRequired(msg: string, ...args: any) {
        for (let i = 0; i < args.length; ++i) {
            if (typeof args[i] === "undefined")
                return msg
        }

        return true
    }

    public static isLength(msg: string, val: any, length: { min?: number, max?: number }) {
        if (typeof length.min !== "undefined" && val.length < length.min)
            return msg

        if (typeof length.max !== "undefined" && val.length > length.max)
            return msg

        return true
    }

    public static isEmail(msg: string, val: any) {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.exec(val) === null)
            return msg
        return true
    }
}
