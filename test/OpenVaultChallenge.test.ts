import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { OpenVaultChallenge } from '../typechain-types'

const toWei = ethers.utils.parseEther

/// Template
describe('OpenVaultChallenge', async function () {
  let player: SignerWithAddress
  let challenge: OpenVaultChallenge

  before(async function () {
    ;[player] = await ethers.getSigners()
    const Challenge = await ethers.getContractFactory('OpenVaultChallenge')
    challenge = (await Challenge.deploy({ value: 1 })) as OpenVaultChallenge
  })

  it('Attack', async function () {
    const Exploiter = await ethers.getContractFactory("ExploitOpenVaultChallenge")
    const exploiter = await Exploiter.deploy(challenge.address)
    expect(await challenge.isSolved()).to.be.true
  })
})
