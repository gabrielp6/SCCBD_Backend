"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyVotos = exports.encryptVotos = exports.decryptVotos = exports.signVotos = exports.keysVotos = exports.getResultados = exports.sumarVotos = void 0;
const rsa = __importStar(require("my-modulos"));
const bc = __importStar(require("bigint-conversion"));
const keypairPromise = rsa.generateKeys(1024);
var votos_Messi = 0;
var votos_Cristiano = 0;
var votos_Mbappe = 0;
var votos_Joselu = 0;
var votos_Haaland = 0;
var votos_Neymar = 0;
const sumarVotos = async (req, res) => {
    switch (req.body.message) {
        case "messi":
            votos_Messi++;
            break;
        case "cristiano":
            votos_Cristiano++;
            break;
        case "mbappe":
            votos_Mbappe++;
            break;
        case "joselu":
            votos_Joselu++;
            break;
        case "haaland":
            votos_Haaland++;
            break;
        case "neymar":
            votos_Neymar++;
            break;
        default:
            return "ERROR";
    }
};
exports.sumarVotos = sumarVotos;
const encryptVotos = async (req, res) => {
    const mensaje = bc.textToBigint(req.body.message);
    const publicKey = new rsa.PublicKey(bc.hexToBigint(req.body.pubKey.e), bc.hexToBigint(req.body.pubKey.n));
    const cifrado = publicKey.encrypt(mensaje);
    const encryp = bc.bigintToHex(cifrado);
    return res.json({
        message: encryp
    });
};
exports.encryptVotos = encryptVotos;
const decryptVotos = async (req, res) => {
    const mensaje = bc.hexToBigint(req.body.message);
    const decypher = (await keypairPromise).privateKey.decrypt(mensaje);
    switch (bc.bigintToText(decypher)) {
        case "messi":
            votos_Messi++;
            mostrarVotosConsola();
            break;
        case "cristiano":
            votos_Cristiano++;
            mostrarVotosConsola();
            break;
        case "mbappe":
            votos_Mbappe++;
            mostrarVotosConsola();
            break;
        case "joselu":
            votos_Joselu++;
            mostrarVotosConsola();
            break;
        case "haaland":
            votos_Haaland++;
            mostrarVotosConsola();
            break;
        case "neymar":
            votos_Neymar++;
            mostrarVotosConsola();
            break;
        default:
            return "ERROR";
    }
};
exports.decryptVotos = decryptVotos;
const signVotos = async (req, res) => {
    const mensaje = bc.textToBigint(req.body.message);
    const signs = (await keypairPromise).privateKey.sign(mensaje);
    return res.json({
        message: bc.bigintToHex(signs)
    });
};
exports.signVotos = signVotos;
const verifyVotos = async (req, res) => {
    const sign = bc.textToBigint(req.body.message);
    const publicKey = new rsa.PublicKey(bc.hexToBigint(req.body.pubKey.e), bc.hexToBigint(req.body.pubKey.n));
    const verif = publicKey.verify(sign);
    return res.json({
        message: bc.bigintToHex(verif)
    });
};
exports.verifyVotos = verifyVotos;
const keysVotos = async (req, res) => {
    const keypair = await keypairPromise;
    const publicE = keypair.publicKey.e;
    const publicN = keypair.publicKey.n;
    const pubE = bc.bigintToHex(publicE);
    const pubN = bc.bigintToHex(publicN);
    return res.json({
        e: pubE,
        n: pubN
    });
};
exports.keysVotos = keysVotos;
const getResultados = async (req, res) => {
    console.log;
    return ({
        votos_Messi,
        votos_Cristiano,
        votos_Mbappe,
        votos_Joselu: votos_Haaland,
        votos_Neymar
    });
};
exports.getResultados = getResultados;
const mostrarVotosConsola = async () => {
    console.log(" ----------------------- RESULTADOS ----------------------- ");
    console.log("\n  +++ Messi: " + votos_Messi + " votos");
    console.log("\n  +++ Cristiano: " + votos_Cristiano + " votos");
    console.log("\n  +++ Mbappé: " + votos_Mbappe + " votos");
    console.log("\n  +++ Joselu: " + votos_Joselu + " votos");
    console.log("\n  +++ Haaland: " + votos_Haaland + " votos");
    console.log("\n  +++ Neymar: " + votos_Neymar + " votos");
    console.log("\n ---------------------------------------------------------- \n");
};
