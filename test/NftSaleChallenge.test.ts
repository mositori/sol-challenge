import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import {
  NftSaleChallenge,
  ExploitNftSaleChallenge,
  Nft,
} from '../typechain-types'

const toWei = ethers.utils.parseEther

describe('NftSaleChallenge', async function () {
  let wallet: SignerWithAddress
  let contract: NftSaleChallenge

  before(async function () {
    ;[wallet] = await ethers.getSigners()
  })
  beforeEach(async function () {
    const Challenge = await ethers.getContractFactory('NftSaleChallenge')
    contract = (await Challenge.deploy()) as NftSaleChallenge
  })

  it('Attack', async function () {
    const nft = (await ethers.getContractAt(
      'Nft',
      await contract.token()
    )) as Nft

    const Exploiter = await ethers.getContractFactory('ExploitNftSaleChallenge')
    const exploiter = (await Exploiter.deploy()) as ExploitNftSaleChallenge
    await exploiter.exploit(nft.address, { value: toWei('0.1') })
    console.log(await nft.balanceOf(exploiter.address))
  })
})
