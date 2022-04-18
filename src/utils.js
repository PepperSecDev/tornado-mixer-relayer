const { instances } = require('./config')
const { toChecksumAddress, BN } = require('web3-utils')

const addressMap = new Map()
for (const [currency, { instanceAddress, symbol, decimals }] of Object.entries(instances)) {
  Object.entries(instanceAddress).forEach(([amount, address]) =>
    addressMap.set(address, {
      currency,
      amount,
      symbol,
      decimals,
    }),
  )
}

function getInstance(address) {
  address = toChecksumAddress(address)
  const key = toChecksumAddress(address)
  if (addressMap.has(key)) {
    return addressMap.get(key)
  } else {
    throw new Error('Unknown contact address')
  }
}

function setSafeInterval(func, interval) {
  func()
    .catch(console.error)
    .finally(() => {
      setTimeout(() => setSafeInterval(func, interval), interval)
    })
}

function fromDecimals(value, decimals) {
  value = value.toString()
  let ether = value.toString()
  const base = new BN('10').pow(new BN(decimals))
  const baseLength = base.toString(10).length - 1 || 1

  const negative = ether.substring(0, 1) === '-'
  if (negative) {
    ether = ether.substring(1)
  }

  if (ether === '.') {
    throw new Error('[ethjs-unit] while converting number ' + value + ' to wei, invalid value')
  }

  // Split it into a whole and fractional part
  const comps = ether.split('.')
  if (comps.length > 2) {
    throw new Error('[ethjs-unit] while converting number ' + value + ' to wei,  too many decimal points')
  }

  let whole = comps[0]
  let fraction = comps[1]

  if (!whole) {
    whole = '0'
  }
  if (!fraction) {
    fraction = '0'
  }
  if (fraction.length > baseLength) {
    throw new Error('[ethjs-unit] while converting number ' + value + ' to wei, too many decimal places')
  }

  while (fraction.length < baseLength) {
    fraction += '0'
  }

  whole = new BN(whole)
  fraction = new BN(fraction)
  let wei = whole.mul(base).add(fraction)

  if (negative) {
    wei = wei.mul(negative)
  }

  return new BN(wei.toString(10), 10)
}

module.exports = {
  getInstance,
  setSafeInterval,
  fromDecimals,
}
