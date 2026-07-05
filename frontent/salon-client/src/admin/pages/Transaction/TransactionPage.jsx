import React from 'react'
import TransactionTable from "./TransactionTable";

const TransactionPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Transactions</h1>
                <p className="text-sm text-gray-500">Track payments & history</p>
            </div>
            <TransactionTable />
        </div>
    )
}

export default TransactionPage