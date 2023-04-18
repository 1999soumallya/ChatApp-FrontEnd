import { AES, enc } from "crypto-js";

export function Encrypt(deta) {
    if (typeof deta !== "string") {
        deta = JSON.stringify(deta)
    }
    return AES.encrypt(deta, process.env.REACT_APP_EXCRIPT_DECRIPT_SECRITE).toString()
}

export function Dcrypt(deta) {
    let rawdeta = AES.decrypt(deta, process.env.REACT_APP_EXCRIPT_DECRIPT_SECRITE)
    return rawdeta.toString(enc.Utf8);
}