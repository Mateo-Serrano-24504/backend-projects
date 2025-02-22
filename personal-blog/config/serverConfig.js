import fs from "node:fs";

export const PORT = process.env.PORT || 8080;
export const SAFE_PORT = 443;
export const certificate = {
    key: fs.readFileSync("./certificates/key.pem", "utf8"),
    cert: fs.readFileSync("./certificates/cert.pem", "utf8")
}