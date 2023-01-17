import { Router } from "express";

import * as VotosController from '../controllers/votaciones.controller'

const router = Router()
const UrlVotos = '/votos'

router.get('', VotosController.getResultados)
router.get(UrlVotos + '/publickey', VotosController.keysVotos)
router.post(UrlVotos + '/decrypt', VotosController.decryptVotos)
router.post(UrlVotos + '/sign', VotosController.signVotos)
router.post(UrlVotos + '/encrypt', VotosController.encryptVotos)
router.post(UrlVotos + '/verify', VotosController.verifyVotos)


export default router
