import { createContext, useEffect, useState } from "react"
import { ethers, utils } from "ethers"
// import * as utils from "ethers"
import { contractABI, contractAddress } from "../utils/constants"

export const TransactionContext = createContext()

const { ethereum } = window

function createEthereumContract() {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    return new ethers.Contract(contractAddress, contractABI, signer)
}

export function TransactionsProvider({ children }) {
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
    const [currentAccount, setCurrentAccount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"))
    const [transactions, setTransactions] = useState([])
    const [orders, setOrders] = useState([])

    function handleChange(e, name) {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    async function getAllTransactions() {
        const transactionsContract = createEthereumContract()
        const availableTransactions = await transactionsContract.getPriceFeedOrderListBytes(0, 100)

        const abi = new utils.AbiCoder()
        try {
            const structuredTransactions = []
            for (let i = 0; i < availableTransactions.length; i++) {
                const _transactionList = abi.decode(["uint", "string", "address", "address", "address", "address", "uint", "uint", "uint", "uint32", "uint32", "uint32", "uint32", "uint128"], availableTransactions[i])
                const MAInterval = _transactionList[11]

                structuredTransactions.push({
                    index: _transactionList[0].toString(),
                    description: _transactionList[1],
                    dataFeed: _transactionList[2],
                    paramsAddress: _transactionList[3],
                    tokenA: _transactionList[4],
                    tokenB: _transactionList[5],
                    initialTotalAmount: _transactionList[6].toString(),
                    currentTotalAmountA: _transactionList[7].toString(),
                    currentTotalAmountB: _transactionList[8].toString(),
                    MA1: (_transactionList[9] / MAInterval).toString(),
                    MA2: (_transactionList[10] / MAInterval).toString(),
                    MAInterval: MAInterval.toString(),
                    executionInterval: _transactionList[12].toString(),
                    timeStamp: _transactionList[13].toString(),
                })
            }
            setTransactions(structuredTransactions)
            if (ethereum) {
            } else {
                console.log("Ethereum is not present")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function getAllOrders() {
        try {
            const transactionsContract = createEthereumContract()
            const accounts = await ethereum.request({ method: "eth_accounts" })
            const availableTransactions = await transactionsContract.getUserOrderListBytes(accounts[0], 0, 1000000)
            const structuredTransactions = []
            const abi = new utils.AbiCoder()
            for (let i = 0; i < availableTransactions.length; i++) {
                const _transactionList = abi.decode(["uint", "uint", "string", "uint", "uint", "uint", "uint", "uint", "address", "address", "uint", "uint"], availableTransactions[i])

                structuredTransactions.push({
                    nonce: _transactionList[0].toString(),
                    indexOfPriceFeedOrder: _transactionList[1].toString(),
                    description: _transactionList[2],
                    currentAmountA: _transactionList[3].toString(),
                    currentAmountB: _transactionList[4].toString(),
                    userInitialAmount: _transactionList[5].toString(),
                    userDepositAmountA: _transactionList[6].toString(),
                    userDepositAmountB: _transactionList[7].toString(),
                    priceFeedAddress: _transactionList[8],
                    paramsAddress: _transactionList[9],
                    nonceBefore: _transactionList[10].toString(),
                    nonceAfter: _transactionList[11].toString(),
                })
            }

            return setOrders(structuredTransactions)
        } catch (error) {
            console.log(error)
        }
    }

    async function checkIfWalletIsConnect() {
        try {
            if (!ethereum) return alert("Please install MetaMask.")

            const accounts = await ethereum.request({ method: "eth_accounts" })

            if (accounts.length) {
                setCurrentAccount(accounts[0])
                getAllTransactions()
                getAllOrders()
            } else {
                console.log("No accounts found")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function confirmSend() {
        try {
            const account = await createEthereumContract()
            const value = formData.amount
            const parsedAmount = ethers.utils.parseEther(value)

            account.testDepositETH({ value: parsedAmount })
            setInterval(() => {
                getAllOrders()
            }, 5000)
            return Promise.resolve(true)
        } catch (e) {
            console.log(e)
            return Promise.reject(false)
        }
    }

    async function checkIfTransactionsExists() {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract()
                const currentTransactionCount = await transactionsContract.retrieve()

                localStorage.setItem("transactionCount", currentTransactionCount)
            }
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object")
        }
    }

    async function connectWallet() {
        try {
            if (!ethereum) return alert("Please install MetaMask.")

            const accounts = await ethereum.request({ method: "eth_requestAccounts" })

            setCurrentAccount(accounts[0])
            location.reload()
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object")
        }
    }

    async function sendTransaction() {
        try {
            if (ethereum) {
                const { addressTo, amount, keyword, message } = formData
                const transactionsContract = createEthereumContract()
                const parsedAmount = ethers.utils.parseEther(amount)

                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208",
                        value: parsedAmount._hex,
                    }],
                })

                const transactionHash = await transactionsContract.store(parsedAmount)

                setIsLoading(true)
                console.log(`Loading - ${transactionHash.hash}`)
                await transactionHash.wait()
                console.log(`Success - ${transactionHash.hash}`)
                setIsLoading(false)

                const transactionsCount = await transactionsContract.retrieve()

                setTransactionCount(transactionsCount.toString())
                // window.location.reload();
            } else {
                console.log("No ethereum object")
            }
        } catch (error) {
            console.log(error)

            throw new Error("No ethereum object")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnect()
    }, [transactionCount])

    return (
        <TransactionContext.Provider
            value={{
                transactionCount,
                connectWallet,
                transactions,
                orders,
                currentAccount,
                isLoading,
                sendTransaction,
                handleChange,
                formData,
                confirmSend,
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}
