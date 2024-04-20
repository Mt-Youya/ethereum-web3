import React, { useContext, useEffect, useState } from "react"
import { AiFillPlayCircle } from "react-icons/ai"
import { SiEthereum } from "react-icons/si"
import { BsInfoCircle } from "react-icons/bs"

import { TransactionContext } from "../context/TransactionContext"
import { shortenAddress } from "../utils/shortenAddress"
import { Loader } from "."

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white"

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
)

function Welcome() {
    const { currentAccount, connectWallet } = useContext(TransactionContext)

    return (
        <div className="flex w-full justify-center items-center min-h-64">
            {!currentAccount ? (
                    <button
                        type="button"
                        onClick={connectWallet}
                        className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                    >
                        <AiFillPlayCircle className="text-white mr-2" />
                        <p className="text-white text-base font-semibold">
                            Connect Wallet
                        </p>
                    </button>
                )
                : <span className="text-white w-24 truncate"> {currentAccount}  </span>
            }
        </div>
    )
}

export default Welcome
