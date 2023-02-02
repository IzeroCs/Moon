import pabra, {
    Logger as PabraLogger,
    transporters as PabraTransporters,
    logLevels
} from "@pabra/logger";
import colors from "colors";

declare type PabraLogLevels = keyof (typeof logLevels)

export declare type Log = PabraLogger

export default class Logger {
    static create(tag: string): Log {
        return pabra(tag, {
            formatter: (logger, message) => {
                const date = new Date().toISOString()
                    .replace("T", " ")
                    .replace("Z", "");
                const level: any = message.level;
                const color = Logger.getColor(level);

                return color(
                    `${date.toString()}: ` +
                    `${level.toString().toUpperCase()}/` +
                    `${logger.name}: ${message.raw}`
                )
            },
            transporter: PabraTransporters.consoleTransporter
        })
    }

    static getColor(level: PabraLogLevels) {
        if (level == "info")
            return colors.green;
        else if (level == "warning")
            return colors.yellow;
        else if (level == "err")
            return colors.red;
        else if (level == "alert")
            return colors.white;
        else if (level == "crit")
            return colors.magenta
        else if (level == "notice")
            return colors.cyan;
        else if (level == "emerg")
            return colors.gray;

        return colors.blue;
    }
}
