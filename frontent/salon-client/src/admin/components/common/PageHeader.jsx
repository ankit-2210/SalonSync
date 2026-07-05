import React from 'react'

const PageHeader = ({ title, subtitle, action }) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-gray-500 text-sm">{subtitle}</p>
            </div>

            {action}
        </div>
    )
}

export default PageHeader