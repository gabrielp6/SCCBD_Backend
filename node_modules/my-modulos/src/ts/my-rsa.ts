import * as bcu from 'bigint-crypto-utils'


export class PublicKeyRSA {
  e: bigint
  n: bigint

  constructor(e: bigint, n: bigint) {
    this.e = e
    this.n = n
  }

  encrypt(plaintext: bigint): bigint {
    return bcu.modPow(plaintext, this.e, this.n)
  }

  verify(signed: bigint): bigint {
    return bcu.modPow(signed, this.e, this.n)
  }
}

export class PrivateKeyRSA {
  d: bigint
  n: bigint

  constructor(d: bigint, n: bigint) {
    this.d = d
    this.n = n
  }

  decrypt(ciphertext: bigint): bigint {
    return bcu.modPow(ciphertext, this.d, this.n)
  }

  sign(msg: bigint): bigint {
    return bcu.modPow(msg, this.d, this.n)
  }
}

export async function generateKeysRSA(): Promise<{ publicKey: PublicKeyRSA, privateKey: PrivateKeyRSA }> {
  const bits: number = 1024
  let p: bigint, q: bigint, n: bigint, phin: bigint
  const e = 65537n
  do {
    p = await bcu.prime(bits / 2 + 1)
    q = await bcu.prime(bits / 2)
    n = p * q
    phin = (p - 1n) * (q - 1n)
  } while (bcu.bitLength(n) !== bits || bcu.gcd(e, phin) > 1)
  const d = bcu.modInv(e, phin)

  const publicKey = new PublicKeyRSA(e, n)
  const priateKey = new PrivateKeyRSA(d, n)
  return {
    publicKey: publicKey,
    privateKey: priateKey
  }
}

