import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    TextField,
    TablePagination
} from "@mui/material"
import { useState } from "react";
import { Edit, Delete, Search } from "@mui/icons-material";


const transactions = [
    {
        id: 1,
        date: "25 Mar 2026",
        customer: "Ankit Sharma",
        email: "ankit@gmail.com",
        service: "Hair Cut",
        amount: 500,
        status: "Paid"
    },
    {
        id: 2,
        date: "24 Mar 2026",
        customer: "Rahul Verma",
        email: "rahul@gmail.com",
        service: "Facial",
        amount: 1200,
        status: "Pending"
    },
    {
        id: 3,
        date: "23 Mar 2026",
        customer: "Priya Singh",
        email: "priya@gmail.com",
        service: "Hair Spa",
        amount: 1500,
        status: "Paid"
    },
    {
        id: 4,
        date: "22 Mar 2026",
        customer: "Amit Kumar",
        email: "amit@gmail.com",
        service: "Beard Trim",
        amount: 300,
        status: "Paid"
    },
    {
        id: 5,
        date: "21 Mar 2026",
        customer: "Sneha Gupta",
        email: "sneha@gmail.com",
        service: "Cleanup",
        amount: 800,
        status: "Pending"
    },
    {
        id: 6,
        date: "20 Mar 2026",
        customer: "Rohit Das",
        email: "rohit@gmail.com",
        service: "Massage",
        amount: 2500,
        status: "Paid"
    },
    {
        id: 7,
        date: "19 Mar 2026",
        customer: "Neha Kapoor",
        email: "neha@gmail.com",
        service: "Manicure",
        amount: 600,
        status: "Paid"
    },
    {
        id: 8,
        date: "18 Mar 2026",
        customer: "Vikas Yadav",
        email: "vikas@gmail.com",
        service: "Pedicure",
        amount: 700,
        status: "Pending"
    },
    {
        id: 9,
        date: "17 Mar 2026",
        customer: "Pooja Mehta",
        email: "pooja@gmail.com",
        service: "Hair Coloring",
        amount: 3000,
        status: "Paid"
    },
    {
        id: 10,
        date: "16 Mar 2026",
        customer: "Arjun Singh",
        email: "arjun@gmail.com",
        service: "Waxing",
        amount: 1800,
        status: "Pending"
    }
]

const TransactionTable = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const filteredTransactions = transactions.filter((transaction) =>
        transaction.customer.toLowerCase().includes(search.toLowerCase()) ||
        transaction.date.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedTransactions = filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            {/* HEADER */}
            <div className="p-5 border-b flex justify-between items-center gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Transactions
                    </h2>
                    <p className="text-sm text-gray-500">
                        Track all payments
                    </p>
                </div>
                <TextField
                    size="small"
                    placeholder="Search services..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: <Search fontSize="small" className="mr-2 text-gray-400" />
                    }}
                />
            </div>

            <TableContainer component={Paper} elevation={0}>
                <Table>
                    {/* TABLE HEAD */}
                    <TableHead>
                        <TableRow className="bg-gray-50">
                            <TableCell>Date</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Service</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* TABLE BODY */}
                    <TableBody>
                        {paginatedTransactions.map((tx) => (
                            <TableRow
                                key={tx.id}
                                hover
                                className="transition hover:bg-gray-50"
                            >
                                {/* DATE */}
                                <TableCell className="text-gray-600">
                                    {tx.date}
                                </TableCell>
                                {/* CUSTOMER */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full">
                                            {tx.customer[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                {tx.customer}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {tx.email}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                {/* SERVICE */}
                                <TableCell className="text-gray-700">
                                    {tx.service}
                                </TableCell>
                                {/* AMOUNT */}
                                <TableCell>
                                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                                        ₹{tx.amount}
                                    </span>
                                </TableCell>
                                {/* STATUS */}
                                <TableCell>
                                    <Chip
                                        label={tx.status}
                                        color={tx.status === "Paid" ? "success" : "warning"}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* PAGINATION */}
            <TablePagination
                component="div"
                count={filteredTransactions.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    )
}

export default TransactionTable