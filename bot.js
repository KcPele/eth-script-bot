const { ethers } = require("ethers")
require("dotenv").config()


const RECEIVER_ADDRESS = process.env.RECEIVER_ADDRESS
const RPC_URL = process.env.RPC_URL
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1
const PRIVATE_KEY2 = process.env.PRIVATE_KEY2
const PRIVATE_KEY3 = process.env.PRIVATE_KEY3
const PRIVATE_KEY4 = process.env.PRIVATE_KEY4
const PRIVATE_KEY5 = process.env.PRIVATE_KEY5
// const PRIVATE_KEY6 = process.env.PRIVATE_KEY6
// const PRIVATE_KEY7 = process.env.PRIVATE_KEY7
// const PRIVATE_KEY8 = process.env.PRIVATE_KEY8
// const PRIVATE_KEY9 = process.env.PRIVATE_KEY9
// const PRIVATE_KEY10 = process.env.PRIVATE_KEY10
// const PRIVATE_KEY11 = process.env.PRIVATE_KEY11
// const PRIVATE_KEY12 = process.env.PRIVATE_KEY12
const PRIVATE_KEYS = [
    // PRIVATE_KEY1, 
    // PRIVATE_KEY2,
    PRIVATE_KEY3,
    PRIVATE_KEY4,
    PRIVATE_KEY5,
    PRIVATE_KEY4,
    PRIVATE_KEY4,
    // PRIVATE_KEY6,
    // PRIVATE_KEY7,
    // PRIVATE_KEY8,
    // PRIVATE_KEY9,
    // PRIVATE_KEY10,
    // PRIVATE_KEY11
]
const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
module.exports = async () => {
  provider.on("block", async () => {
    console.log("Listening new block, waiting..)");
    for (let i = 0; i < PRIVATE_KEYS.length; i++) {
      const _target = new ethers.Wallet(PRIVATE_KEYS[i]);
      const target = _target.connect(provider);
      const balance = await provider.getBalance(target.address);
      const txBuffer = ethers.utils.parseEther(".005");
      if (balance.sub(txBuffer) > 0) {
        console.log("NEW ACCOUNT WITH ETH!");
        const amount = balance.sub(txBuffer);
        try {
          await target.sendTransaction({
            to: RECEIVER_ADDRESS,
            value: amount
          });
          console.log(`Success! transfered --> ${ethers.utils.formatEther(balance)}`);
        }
        catch (e) {
            console.log(`error: ${e}`);
        }
      }
    }
  });
  
}

 
