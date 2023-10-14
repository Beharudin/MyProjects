import React from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'

export default function DashboardStatsGrid() {
    return (
        <div className="flex gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <BoxWrapper
                icon={<IoBagHandle className="text-2xl text-white" />}
                title={'Total Sales'}
                total={'$54232'}
                change={'+343'}
            />
            <BoxWrapper
                icon={<IoPieChart className="text-2xl text-white" />}
                title={'Total Expenses'}
                total={'$3423'}
                change={'-343'}
            />
            <BoxWrapper
                icon={<IoPeople className="text-2xl text-white" />}
                title={'Total Customers'}
                total={'12313'}
                change={'-30'}
            />
            <BoxWrapper
                icon={<IoCart className="text-2xl text-white" />}
                title={'Total Orders'}
                total={'16432'}
                change={'-43'}
            />
        </div>
    )
}

function BoxWrapper({ icon, title, total, change }) {
    return (
        <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">{icon}</div>
            <div className="pl-4">
                <span className="text-sm text-gray-500 font-light">{title}</span>
                <div className="flex items-center">
                    <strong className="text-xl text-gray-700 font-semibold">{total}</strong>
                    <span className="text-sm text-green-500 pl-2">{change}</span>
                </div>
            </div>
        </div>
    )
}
