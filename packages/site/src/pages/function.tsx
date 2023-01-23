import axios from "axios";
import { ethers } from 'ethers'

// const address = '0xA149eae19266e92aC3060DA3827013164417adE1'
const apiKey = 'sdwDCJvTN9o-Rw5T87Rud5BHpt_F8mzN'

// const url = `https://polygon-mumbai.g.alchemy.com/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
// const infuraUrl = ''

export const getAbi = async (address: string) => {

    const url = `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${address}&tag=latest&apikey=${apiKey}`
    const res = await axios.get(url);
    const abi = JSON.parse(res.data.result)
    // console.log(abi)

    const contract = new ethers.Contract(address, abi,)

    console.log(contract.functions)

    return contract.functions

}