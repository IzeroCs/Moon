import Keypair from "./boot/KeyPair"
import DBConnect from "./database/Connect"
import User from "./database/models/User"
import Api from "./api/Api"

export default class Bootstrap {
    private static _instance: Bootstrap

    private constructor() {}

    public static getInstance(): Bootstrap {
        if (typeof Bootstrap._instance === "undefined")
            Bootstrap._instance = new Bootstrap()

        return Bootstrap._instance
    }

    public async boot() {
        await Keypair()
        await DBConnect()
        await User.createUserAdmin()
        await Api.getInstance().attach()
        await Api.getInstance().listen()
    }
}
