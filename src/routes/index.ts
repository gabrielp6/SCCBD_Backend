import { Router } from "express";

import * as VotosController from '../controllers/votaciones.controller'
import * as SecretSharingController from '../controllers/secretSharing.controller'

const router = Router()
const UrlVotos = '/votos'
const UrlSecretSharing = '/secretSharing'

router.get('', VotosController.getResultados)
router.get(UrlVotos + '/publickey', VotosController.keysVotos)
router.post(UrlVotos + '/decrypt', VotosController.decryptVotos)
router.post(UrlVotos + '/sign', VotosController.signVotos)
router.post(UrlVotos + '/encrypt', VotosController.encryptVotos)
router.post(UrlVotos + '/verify', VotosController.verifyVotos)

router.post(UrlSecretSharing + '/getSharingKeys', SecretSharingController.getKeys)
router.post(UrlSecretSharing + '/recuperarSecreto', SecretSharingController.recuperarSecreto)


export default router
