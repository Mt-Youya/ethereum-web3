import { useEffect, useState } from "react"
import { orderList, table } from "../data/welcome"
import "../styles/gradient.css"

function Table() {
    const [open, setOpen] = useState(false)
    const [list, setList] = useState([...table])
    const [detail, setDetail] = useState(null)
    const tableClass = "grid xl:grid-cols-[50px_minmax(200px,_1fr)_100px_100px_minmax(200px,_1fr)_minmax(200px,_1fr)_minmax(200px,_1fr)_100px] xl:gap-4 xl:py-3 xl:gap-2 py-1.5 grid-cols-[30px_minmax(100px,_1fr)_60px_60px_minmax(120px,_1fr)_minmax(120px,_1fr)_minmax(120px,_1fr)_60px]"

    const [orders, setOrders] = useState([...orderList])

    function handleDeposit(index) {
        const item = list[index]
        setDetail(item)
        setOpen(true)
    }

    function handleDepositKeyUp(e) {
        const key = e.key
        console.log(key)
    }

    function handleKeyUp(e) {
        if (!open) return
        const key = e.key
        if (key === "Escape") {
            setOpen(false)
        }
    }

    function handleDepositConfirm() {

    }

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp)
        return () => window.removeEventListener("keyup", handleKeyUp)
    }, [open])

    return (
        <>
            <div className="table-gradient">
                <div
                    className="flex w-full justify-center items-center flex-col md:p-14 md:pb-0 pt-10 px-4 text-white"
                >
                    <h1 className="text-center md:mb-6 mb-3 text-3xl">My Orders</h1>
                    <div>
                        <ul className={`${tableClass} border-b-2 border-[#302D2E]`}>
                            {["SN", "Description", "MA1", "MA2", "Execution Interval", "Current AmountA", "Current AmountB", "Action"].map(li => (
                                <li key={li}>{li} </li>
                            ))}
                        </ul>
                        {orders.map((li, i) => (
                            <ul key={li.Description + i} className={`${tableClass} border-b border-[#302D2E]`}>
                                <li>{i}</li>
                                <li>{li.Nonce}</li>
                                <li>{li.Description}</li>
                                <li>{li.InitialAmountA}</li>
                                <li>{li.InitialAmountB}</li>
                                <li>{li.CurrentAmountA}</li>
                                <li>{li.CurrentAmountB}</li>
                                <li>
                                    <button className="rounded-xl bg-[#2952E3] py-1 px-2"> Withdraw</button>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
                <div
                    className="flex w-full justify-center items-center flex-col md:p-14 py-10 px-4 text-white"
                >
                    <h1 className="text-center md:mb-6 mb-3 text-3xl">Total FeedData Orders</h1>
                    <div>
                        <ul className={`${tableClass} border-b-2 border-[#302D2E]`}>
                            {["SN", "Description", "MA1", "MA2", "Execution Interval", "Current AmountA", "Current AmountB", "Action"].map(li => (
                                <li key={li}>{li} </li>
                            ))}
                        </ul>
                        {list.map((li, i) => (
                            <ul key={li.Description + i} className={`${tableClass} border-b border-[#302D2E]`}>
                                <li>{i}</li>
                                <li>{li.Description}</li>
                                <li>{li.MA1}</li>
                                <li>{li.MA2}</li>
                                <li>{li.ExecutionInterval}</li>
                                <li>{li.CurrentAmountA}</li>
                                <li>{li.CurrentAmountB}</li>
                                <li>
                                    <button
                                        className="rounded-xl bg-[#2952E3] py-1 px-2"
                                        onClick={() => handleDeposit(i)}
                                    >
                                        Deposit
                                    </button>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
            {open && (
                <div
                    className={`fixed top-0 flex justify-center items-center bg-[#100F14D9] w-full h-full transition-all ease-in-out backdrop-saturate-50 backdrop-blur-lg`}
                    onClick={() => setOpen(false)}
                >
                    <div className="rounded-xl bg-[#1A1C2F] w-1/4 p-6 text-white shadow-md"
                         onClick={e => e.stopPropagation()}
                    >
                        <ul className="border-b-2 border-white grid grid-cols-2 gap-3 py-3">
                            <li>SN:</li>
                            <li>{detail.SN}</li>
                            <li>Description:</li>
                            <li>{detail.Description}</li>
                            <li>MA1:</li>
                            <li>{detail.MA1}</li>
                            <li>MA2:</li>
                            <li>{detail.MA2}</li>
                            <li>Execution Interval:</li>
                            <li>{detail.ExecutionInterval}</li>
                            <li>Amounts(ETH):</li>
                            <li>{detail.Amounts}</li>
                        </ul>
                        <div className="flex justify-between items-center p-3">
                            <button className="rounded-2xl border border-[#37456E] p-1 " onClick={handleDepositConfirm}
                            >Deposit
                            </button>
                            <button className="rounded-2xl border border-[#37456E] p-1 " onClick={() => setOpen(false)}
                            >Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Table