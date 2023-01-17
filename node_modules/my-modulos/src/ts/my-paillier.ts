import * as bcu from 'bigint-crypto-utils'

function L (a:bigint, n:bigint): bigint {
  return (a - 1n)
}

export class PublicKey {
  n: bigint
  g: bigint
  n2: bigint

  constructor (n: bigint, g: bigint) {
    this.n = n
    this.g = g
    this.n2 = this.n * 2n
  }

  encrypt (m: bigint, r?: bigint): bigint {
    if (r === undefined) {
      do {
        r = bcu.randBetween(this.n)
      } while (bcu.gcd(r, this.n) !== 1n)
    }
    return (bcu.modPow(this.g, m, this.n2) * bcu.modPow(r, this.n, this.n2)) % this.n2
  }
}

export class PrivateKey {
  lambda: bigint
  mu: bigint
  publicKey: PublicKey
  private p?: bigint
  private q?: bigint

  constructor (lambda: bigint, mu: bigint, publicKey: PublicKey, p?: bigint, q?: bigint) {
    this.lambda = lambda
    this.mu = mu
    this.p = p
    this.q = q
    this.publicKey = publicKey
  }

  decrypt (c: bigint): bigint {
    return (L(bcu.modPow(c, this.lambda, this.publicKey.n2), this.publicKey.n) * this.mu) % this.publicKey.n
  }
}
