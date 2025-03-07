import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { GuessTheNumberChallenge } from '../typechain-types'
import { BigNumber } from 'ethers'

describe('GuessTheNumberChallenge', async function () {
  let player: SignerWithAddress
  let challenge: GuessTheNumberChallenge

  before(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('GuessTheNumberChallenge')
    challenge = (await Challenge.deploy()) as GuessTheNumberChallenge
  })

  it('Attack', async function () {
    const a = 0 // input a number
    const b = 2n ** 256n - 1000n // input a number
    await challenge.input(a, b)
    expect(await challenge.isSolved()).to.be.true
  })
})
