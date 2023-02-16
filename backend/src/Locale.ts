import i18n from "i18n"
import path from "path"
import fs from "fs"
import yaml from "yaml"

const directory = path.resolve(__dirname, "..", "locales")

function parse(locale: string) {
  return yaml.parse(fs.readFileSync(path
    .join(directory, locale + ".yaml"), "utf-8"))
}

i18n.configure({
  locales: ["vi", "en"],
  directory: directory,
  defaultLocale: "vi",
  retryInDefaultLocale: true,
  staticCatalog: {
    vi: parse("vi"),
    en: parse("en")
  }
})

export default i18n
