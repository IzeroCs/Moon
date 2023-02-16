import fs from "fs"
import path from "path"
import keypair from "keypair"
import Logger from "../utils/Logger"

export const DIRECTORY_STORAGE_KEYS = path.resolve(__dirname, "..", "..", "keys")
export const KeypairPaths = {
  AccessTokenPrivateKeyPath: path.join(DIRECTORY_STORAGE_KEYS, "access_private.key"),
  AccessTokenPublicKeyPath: path.join(DIRECTORY_STORAGE_KEYS, "access_public.key"),
  RefreshTokenPrivateKeyPath: path.join(DIRECTORY_STORAGE_KEYS, "refesh_private.key"),
  RefreshTokenPublicKeyPath: path.join(DIRECTORY_STORAGE_KEYS, "refresh_public.key")
}

const logger = Logger.create("KeyPair")

function exists(): boolean {
  if (!fs.existsSync(DIRECTORY_STORAGE_KEYS)) {
    fs.mkdirSync(DIRECTORY_STORAGE_KEYS, { recursive: true })
    return false
  }

  const paths = Object.values(KeypairPaths)
  for (let i = 0; i < paths.length; ++i) {
    if (!fs.existsSync(paths[i]))
      return false
  }

  return true
}

function generate() {
  logger.crit("Generate keypair for JsonWebToken")

  const accessTokenKeypair = keypair()
  const refreshTokenKeypair = keypair()

  fs.writeFileSync(KeypairPaths.AccessTokenPrivateKeyPath,
    accessTokenKeypair.private)
  logger.notice("Generate access token private key successfully")

  fs.writeFileSync(KeypairPaths.AccessTokenPublicKeyPath,
    accessTokenKeypair.public)
  logger.notice("Generate access token public key successfully")

  fs.writeFileSync(KeypairPaths.RefreshTokenPrivateKeyPath,
    refreshTokenKeypair.private)
  logger.notice("Generate refresh token private key successfully")

  fs.writeFileSync(KeypairPaths.RefreshTokenPublicKeyPath,
    refreshTokenKeypair.public)
  logger.notice("Generate refresh token public key successfully")
}

export default function () {
  try {
    if (!exists())
      generate()
    else
      logger.debug("Found keypair for JsonWebToken")
  } catch (err) {
    logger.err(String(err))
  }
}
