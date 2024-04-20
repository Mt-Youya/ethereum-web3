import { useContext, useEffect, useState } from "react"
import "../styles/gradient.css"
import { TransactionContext } from "../context/TransactionContext"
import { LocationContext } from "../context/LocationsContext"

function Table() {
    const [open, setOpen] = useState(false)
    const [detail, setDetail] = useState(null)
    const tableClass = "grid xl:grid-cols-[50px_minmax(200px,_1fr)_100px_100px_minmax(200px,_1fr)_minmax(200px,_1fr)_minmax(200px,_1fr)_100px] xl:gap-4 xl:py-3 xl:gap-2 py-1.5 grid-cols-[30px_minmax(100px,_1fr)_60px_60px_minmax(120px,_1fr)_minmax(120px,_1fr)_minmax(120px,_1fr)_60px]"

    const { transactions, myTransactions, onCheckIn } = useContext(TransactionContext)
    const { position } = useContext(LocationContext)

    function handleCheckIn(index) {
        const item = transactions[index]
        setDetail(item)
        setOpen(true)
    }

    function handleKeyUp(e) {
        if (!open) return
        const key = e.key
        if (key === "Escape") {
            setOpen(false)
        }
    }

    async function handleCheckInConfirm() {
        if (position) {
            await onCheckIn(detail.sn, parseInt(position.lng), parseInt(position.lat))
        } else {
            alert("Please enable location service")
        }
        setOpen(false)
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
                    <div className="min-h-52">
                        <ul className={`${tableClass} border-b-2 border-[#302D2E]`}>
                            {["SN", "Description", "City", "Latitude", "Longitude", "StartTime(UTC)", "EndTime(UTC)"].map(li => (
                                <li key={li}>{li}</li>
                            ))}
                        </ul>
                        {myTransactions.map((li, i) => (
                            <ul key={li.sn + i + li.city} className={`${tableClass} border-b border-[#302D2E]`}>
                                <li>{li.sn}</li>
                                <li>{li.description}</li>
                                <li>{li.city}</li>
                                <li>{li.longitude}</li>
                                <li>{li.latitude}</li>
                                <li>{li.startTime}</li>
                                <li>{li.endTime}</li>
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="flex w-full justify-center items-center flex-col md:p-14 py-10 px-4 text-white">
                    <h1 className="text-center md:mb-6 mb-3 text-3xl">Total FeedData Orders</h1>
                    <div className="min-h-52">
                        <ul className={`${tableClass} border-b-2 border-[#302D2E]`}>
                            {["SN", "Description", "City", "Latitude", "Longitude", "StartTime(UTC)", "EndTime(UTC)", "Action"].map(li => (
                                <li key={li}>{li} </li>
                            ))}
                        </ul>
                        {transactions.map((li, i) => (
                            <ul key={li.sn + i + li.city} className={`${tableClass} border-b border-[#302D2E]`}>
                                <li>{li.sn}</li>
                                <li>{li.description}</li>
                                <li>{li.city}</li>
                                <li>{li.longitude}</li>
                                <li>{li.latitude}</li>
                                <li>{li.startTime}</li>
                                <li>{li.endTime}</li>
                                {!li.checked && (
                                    <li>
                                        <button className={`rounded-xl bg-[#2952E3] py-1 px-2`}
                                                onClick={() => handleCheckIn(i)}
                                        >
                                            Check-In
                                        </button>
                                    </li>
                                )}
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
                            <li>{detail.sn}</li>
                            <li>Description:</li>
                            <li>{detail.description}</li>
                            <li>Country::</li>
                            <li>{detail.MA1 || "-"}</li>
                            <li>City:</li>
                            <li>{detail.city}</li>
                            <li>Latitude:</li>
                            <li>{detail.latitude}</li>
                            <li>Longitude:</li>
                            <li>{detail.longitude}</li>
                            <li>StartTime(UTC):</li>
                            <li>{detail.startTime}</li>
                            <li>EndTime(UTC):</li>
                            <li>{detail.endTime}</li>
                        </ul>
                        <div className="flex justify-between items-center p-3">
                            <button className="rounded-2xl border border-[#37456E] p-1" onClick={handleCheckInConfirm}>
                                Check In
                            </button>
                            <button className="rounded-2xl border border-[#37456E] p-1" onClick={() => setOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Table
