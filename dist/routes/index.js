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
const express_1 = require("express");
const VotosController = __importStar(require("../controllers/votaciones.controller"));
const SecretSharingController = __importStar(require("../controllers/secretSharing.controller"));
const router = (0, express_1.Router)();
const UrlVotos = '/votos';
const UrlSecretSharing = '/secretSharing';
router.get('', VotosController.getResultados);
router.get(UrlVotos + '/publickey', VotosController.keysVotos);
router.post(UrlVotos + '/decrypt', VotosController.decryptVotos);
router.post(UrlVotos + '/sign', VotosController.signVotos);
router.post(UrlVotos + '/encrypt', VotosController.encryptVotos);
router.post(UrlVotos + '/verify', VotosController.verifyVotos);
router.post(UrlSecretSharing + '/getSharingKeys', SecretSharingController.getKeys);
router.post(UrlSecretSharing + '/recuperarSecreto', SecretSharingController.recuperarSecreto);
exports.default = router;
