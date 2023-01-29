import { request, Request, Response } from 'express'
import * as BIC from 'bigint-conversion'
const secretSharingModule = require('shamirs-secret-sharing');



const getKeys = async (req: Request, res: Response) => {
    const secreto: Buffer = BIC.textToBuf(req.body.secreto) as Buffer; 
    const clavesTotales: Buffer[] = secretSharingModule.split(secreto, { shares: 5, threshold: 3});
    const clavesCompartidasEnviar: string[] = [];
    clavesTotales.forEach((share: Buffer) => {
      clavesCompartidasEnviar.push(BIC.bufToHex(share));
    })
  
    res.json(clavesCompartidasEnviar)
}


const recuperarSecreto = async (req: Request, res: Response) => {
  const clavesRecuperadasRecibidas: string[] = req.body.claves;
  const clavesRecuperadas: Buffer[] = [];
  clavesRecuperadasRecibidas.forEach((shareHex: string) => {
    clavesRecuperadas.push(BIC.hexToBuf(shareHex) as Buffer)
  });

  res.json(BIC.bufToText(secretSharingModule.combine(clavesRecuperadas)));

}

export {getKeys, recuperarSecreto}