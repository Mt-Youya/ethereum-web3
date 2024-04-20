import { AiFillPlayCircle } from "react-icons/ai"

import { TransactionContext } from "../context/TransactionContext"
import { LocationContext } from "../context/LocationsContext"

function Welcome() {
    const { currentAccount, connectWallet } = useContext(TransactionContext)
    const { position } = useContext(LocationContext)

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
                : (
                    <h1 className="text-3xl text-white font-semibold">
                        Welcome, {currentAccount} <br />
                        {position && (
                            <span>
                                Latitude: {position.lat} <br />
                                Longitude: {position.lng}
                            </span>
                        )}
                    </h1>
                )
            }
        </div>
    )
}

export default Welcome
