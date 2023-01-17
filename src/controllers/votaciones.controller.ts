import { Request, Response } from 'express'
import * as rsa from 'my-modulos'
import * as bc from 'bigint-conversion'

interface PublicKey {
    e: string
    n: string
}
interface RsaRequest {
    message: string
    publicK: string
}
interface RsaResponse {
    message: string
}
interface EncryptVerifyRequest extends RsaRequest {
    pubKey: PublicKey
}


const keypairPromise = rsa.generateKeys(1024)

var votos_Messi = 0
var votos_Cristiano = 0
var votos_Mbappe = 0
var votos_Joselu = 0
var votos_Haaland = 0
var votos_Neymar = 0


const sumarVotos = async (req: Request, res: Response) => {

    switch (req.body.message) {
        case "messi":
            votos_Messi++;
            break
        case "cristiano":
            votos_Cristiano++
            break
        case "mbappe":
            votos_Mbappe++
            break
        case "joselu":
            votos_Joselu++
            break
        case "haaland":
            votos_Haaland++
            break
        case "neymar":
            votos_Neymar++
            break
        default:
            return "ERROR"
    }
}

const encryptVotos = async (req: Request<{}, {}, EncryptVerifyRequest, {}>, res: Response<RsaResponse>) => {
    const mensaje = bc.textToBigint(req.body.message)
    const publicKey = new rsa.PublicKey(bc.hexToBigint(req.body.pubKey.e), bc.hexToBigint(req.body.pubKey.n))
    const cifrado = publicKey.encrypt(mensaje)
    const encryp = bc.bigintToHex(cifrado)
    return res.json({
        message: encryp
    })
}

const decryptVotos = async (req: Request<{}, {}, RsaRequest, {}>, res: Response<RsaResponse>) => {
    const mensaje = bc.hexToBigint(req.body.message)
    const decypher = (await keypairPromise).privateKey.decrypt(mensaje)
    switch (bc.bigintToText(decypher)) {
        case "messi":
            votos_Messi++;
            mostrarVotosConsola()
            break
        case "cristiano":
            votos_Cristiano++
            mostrarVotosConsola()
            break
        case "mbappe":
            votos_Mbappe++
            mostrarVotosConsola()
            break
        case "joselu":
            votos_Joselu++
            mostrarVotosConsola()
            break
        case "haaland":
            votos_Haaland++
            mostrarVotosConsola()
            break
        case "neymar":
            votos_Neymar++
            mostrarVotosConsola()
            break
        default:
            return "ERROR"
    }
}


const signVotos = async (req: Request<{}, {}, RsaRequest, {}>, res: Response<RsaResponse>) => {
    const mensaje = bc.textToBigint(req.body.message)
    const signs = (await keypairPromise).privateKey.sign(mensaje)
    return res.json({
        message: bc.bigintToHex(signs)
    })
}


const verifyVotos = async (req: Request<{}, {}, EncryptVerifyRequest, {}>, res: Response<RsaResponse>) => {
    const sign = bc.textToBigint(req.body.message)
    const publicKey = new rsa.PublicKey(bc.hexToBigint(req.body.pubKey.e), bc.hexToBigint(req.body.pubKey.n))
    const verif = publicKey.verify(sign)
    return res.json({
        message: bc.bigintToHex(verif)
    })
}


const keysVotos = async (req: Request, res: Response<PublicKey>) => {
    const keypair = await keypairPromise

    const publicE = keypair.publicKey.e
    const publicN = keypair.publicKey.n

    const pubE = bc.bigintToHex(publicE)
    const pubN = bc.bigintToHex(publicN)

    return res.json({
        e: pubE,
        n: pubN
    })
}

const getResultados = async (req: Request, res: Response) => {
    console.log
    return ({
        votos_Messi,
        votos_Cristiano,
        votos_Mbappe,
        votos_Joselu:
        votos_Haaland,
        votos_Neymar
    })
}

const mostrarVotosConsola = async () => {
    console.log(" ----------------------- RESULTADOS ----------------------- ")
    console.log("\n  +++ Messi: " + votos_Messi + " votos")
    console.log("\n  +++ Cristiano: " + votos_Cristiano + " votos")
    console.log("\n  +++ Mbappé: " + votos_Mbappe + " votos")
    console.log("\n  +++ Joselu: " + votos_Joselu + " votos")
    console.log("\n  +++ Haaland: " + votos_Haaland + " votos")
    console.log("\n  +++ Neymar: " + votos_Neymar + " votos")
    console.log("\n ---------------------------------------------------------- \n")
}

export { sumarVotos, getResultados, keysVotos, signVotos, decryptVotos, encryptVotos, verifyVotos }
