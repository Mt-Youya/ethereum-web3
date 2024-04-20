import React from "react"

import logo from "/images/logo.png"

function Footer() {
    return (
        <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">

            <div className="flex justify-center items-center flex-col mt-5">
                <p className="text-white text-sm text-center">Come join us and hear for the unexpected miracle</p>
                <a className="text-white text-sm text-center font-medium mt-2" href="mailto:lkw040535@gmail.com">
                    lkw040535@gmail.com
                </a>
            </div>

            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p className="text-white text-right text-xs">All rights reserved</p>
                <a className="text-white text-right text-xs" href="mailto:lkw040535@gmail.com">lkw040535@gmail.com</a>
            </div>
        </div>
    )
}

export default Footer
