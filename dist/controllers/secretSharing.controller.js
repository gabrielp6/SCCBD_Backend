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
exports.recuperarSecreto = exports.getKeys = void 0;
const BIC = __importStar(require("bigint-conversion"));
const secretSharingModule = require('shamirs-secret-sharing');
const getKeys = async (req, res) => {
    const secreto = BIC.textToBuf(req.body.secreto);
    const clavesTotales = secretSharingModule.split(secreto, { shares: 5, threshold: 3 });
    const clavesCompartidasEnviar = [];
    clavesTotales.forEach((share) => {
        clavesCompartidasEnviar.push(BIC.bufToHex(share));
    });
    res.json(clavesCompartidasEnviar);
};
exports.getKeys = getKeys;
const recuperarSecreto = async (req, res) => {
    const clavesRecuperadasRecibidas = req.body.claves;
    const clavesRecuperadas = [];
    clavesRecuperadasRecibidas.forEach((shareHex) => {
        clavesRecuperadas.push(BIC.hexToBuf(shareHex));
    });
    res.json(BIC.bufToText(secretSharingModule.combine(clavesRecuperadas)));
};
exports.recuperarSecreto = recuperarSecreto;
