import React from 'react'
import DrawerList from './sidebar/DrawerList'
import {
    AccountBalance,
    AccountBox,
    Add,
    Category,
    Dashboard,
    Inventory,
    Logout,
    NotificationsNone,
    Receipt,
    Reviews,
    Shop,
    ShoppingBag
} from '@mui/icons-material'
import { Salad } from 'lucide-react'

const menu = [
    { name: "Dashboard", path: "/salon-dashboard", icon: <Dashboard fontSize="small" /> },
    { name: "Salons", path: "/salon-dashboard/salons", icon: <Shop fontSize="small" /> },
    { name: "Bookings", path: "/salon-dashboard/bookings", icon: <ShoppingBag fontSize="small" /> },
    { name: "Services", path: "/salon-dashboard/services", icon: <Inventory fontSize="small" /> },
    { name: "Add Service", path: "/salon-dashboard/add-services", icon: <Add fontSize="small" /> },
    { name: "Payment", path: "/salon-dashboard/payment", icon: <AccountBalance fontSize="small" /> },
    { name: "Transactions", path: "/salon-dashboard/transaction", icon: <Receipt fontSize="small" /> },
    { name: "Category", path: "/salon-dashboard/category", icon: <Category fontSize="small" /> },
    { name: "Notifications", path: "/salon-dashboard/notifications", icon: <NotificationsNone fontSize="small" /> },
    { name: "Reviews", path: "/salon-dashboard/reviews", icon: <Reviews fontSize="small" /> }
]

const menu2 = [
    { name: "Account", path: "/salon-dashboard/account", icon: <AccountBox fontSize="small" /> },
    { name: "Logout", path: "/", icon: <Logout fontSize="small" /> }
]

const SalonDashboardList = () => {
    return (
        <div className='h-full w-full pl-3'>
            <DrawerList menu={menu} menu2={menu2} />
        </div>
    )
}

export default SalonDashboardList