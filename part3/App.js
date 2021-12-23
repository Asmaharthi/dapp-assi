 
import {injected} from "./components/wallet/connectors"
import {useWeb3React} from "@web3-react/core"
import {Web3ReactProvider, getWeb3ReactContext} from "@web3-react/core"
import {Web3Provider} from "@ethersproject/providers"
import {ethers, Contract} from "ethers"
//import formatEther from "@ethersproject/units" will want later if importing eth values probably
import React,{useState} from 'react'
import { getJsonWalletAddress } from "ethers/lib/utils"
 
export default function App() {
 
    const InteractiveArea = () => {
 
        const [number, changeNumber] = useState(0)
 
        function decreaseNumber() {
            changeNumber(number - 1)
        }
        function increaseNumber(){
            changeNumber(number + 1)
        }
 
        const context = useWeb3React()
        const {chainId, provider, active,account, activate, deactivate} = context
        const WalletAddress = account
 
        const connectWallet = () => {
            activate(injected)
        }
        const disconnectWallet = () => {
            deactivate(injected)
        }
 
        //contact the smart contract
        const abi = [
            {
                "inputs": [],
                "name": "retrieve",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "num",
                        "type": "uint256"
                    }
                ],
                "name": "store",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
 
        const cAddr = "0x34E285D7aFa2774951bDe9b10039A15BaFa1dF72"
 
        const getReadOnlyContract = () => {
            const provider = new ethers.providers.Web3Provider(window.etherum)
            const contract = new Contract(cAddr, abi, provider)
            return contract
 
        }
 
        async function getNumber() {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new Contract(cAddr, abi, provider)
            const num =  await contract.retrieve()
            console.log('number from contract: ' + num)
          }
       
          async function storeNumber() {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new Contract(cAddr, abi, signer)
            await contract.store(number)
         
          }
 
        return (
            <div>
                <div>
                    <button onClick={connectWallet}>Connect</button>
                    <div>Connected Address:{WalletAddress}</div>
                    <button onClick={disconnectWallet}>Disconnect</button>
                </div>
                <div>
                <button onClick={getNumber}> Get Contract Number</button>
                <button onClick={storeNumber}> Store Contract Number</button>
            </div>
 
                <div>
                <button onClick={decreaseNumber}>Decrease</button>
                <span>Number:{number}</span>
                <button onClick={increaseNumber}>Increase</button>
                </div>
            </div>
 
        )
    }
 
    function getLibraryf(provider) {
        const library = new Web3Provider(provider || "https://kovan.infura.io/v3/95a535264da54bfa9c54bccde64ba9f4");
        library.pollingInterval = 12000;
        return library;
      }
   
    return (
        <Web3ReactProvider getLibrary={getLibraryf}>
          <InteractiveArea />
        </Web3ReactProvider>
      )
}
