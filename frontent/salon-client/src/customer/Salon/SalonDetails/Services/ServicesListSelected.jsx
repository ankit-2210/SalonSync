import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import React from 'react'

const ServicesListSelected = ({ services, onRemove }) => {
    return (
        <div className="space-y-3 my-5">
            {services.map((item) => (
                <div
                    key={item.id}
                    className="py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center shadow-sm">
                    <div>
                        <h2 className="text-sm font-medium text-gray-800">{item.name}</h2>
                        <p className="text-xs text-gray-500">₹{item.price}</p>
                    </div>

                    <IconButton onClick={() => onRemove(item.id)}
                        size="small"
                        sx={{
                            background: "#fff",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            '&:hover': { background: "#f3f3f3" }
                        }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </div>
            ))}
        </div>
    )
}

export default ServicesListSelected