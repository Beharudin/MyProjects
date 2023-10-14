import React from 'react'
import DashboardStatsGrid from '../stats/DashboardStatsGrid'
import TransactionChart from '../transactions/TransactionChart'
import BuyerProfilePieChart from '../pie/BuyerProfilePieChart'
import RecentOrders from '../orders/RecentOrders'
import PopularProducts from '../products/PopularProducts'

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-4">
            <DashboardStatsGrid />
            <div className="flex flex-row gap-4 w-full">
                <TransactionChart />
                <BuyerProfilePieChart />
            </div>
            <div className="flex flex-row gap-4 w-full">
                <RecentOrders />
                <PopularProducts />
            </div>
        </div>
    )
}

export default Dashboard
