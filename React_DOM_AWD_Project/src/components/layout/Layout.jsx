import { Outlet } from "react-router-dom";

import Sidebar from './Sidebar'
import { MousePointer2 } from "lucide-react";

function Layout() {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex flex-col flex-1">



                <div className="flex-1 px-4 bg-white dark:bg-[#1b1b1b]/45 max-h-screen overflow-hidden mt-3 mb-3 mx-3 rounded-xl border-[0.5px] dark:border-white/10 border-gray-200 flex flex-col">

                    <div className="flex-1 overflow-y-auto">
                        <Outlet />
                    </div>


                </div>
                <div className="flex flex-row gap-2 justify-end items-center">
                    <div className="flex flex-row gap-2 justify-end items-center cursor-pointer px-5 pb-2 hover:bg-gray-100 dark:hover:bg-[#111] rounded-md transition">

                        <MousePointer2 size={14} color="gray" strokeWidth={2} />
                        <button className="text-sm text-brand-text-dark cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition ">
                            Ask Linear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;