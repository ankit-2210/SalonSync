import { Divider } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const DrawerList = ({ menu, menu2 }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (path) =>
        location.pathname === path ||
        (path !== "/salon-dashboard" && location.pathname.startsWith(path))

    return (
        <div className="h-full flex flex-col bg-white">
            {/* LOGO */}
            <div className="px-5 py-6 border-b">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-xl font-bold">
                        S
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 text-sm">Salon Admin</p>
                        <p className="text-xs text-gray-500">Manage business</p>
                    </div>
                </div>
            </div>

            {/* MENU */}
            <div className="flex-1 overflow-y-auto py-4 space-y-6">                {/* MAIN */}
                <div>
                    <p className="px-3 text-xs text-gray-400 uppercase mb-2">Main</p>
                    {menu.map((item, i) => {
                        const active = isActive(item.path)
                        return (
                            <div
                                key={i}
                                onClick={() => navigate(item.path)}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
                                    transition-all duration-200 group
                                    ${active
                                        ? "bg-green-50 text-green-600 shadow-sm"
                                        : "text-gray-600 hover:bg-gray-50 hover:translate-x-1"}
                                `}
                            >
                                {/* ICON */}
                                <div className={`
                                    w-8 h-8 flex items-center justify-center rounded-lg
                                    ${active ? "bg-green-100" : "bg-gray-100"}
                                `}>
                                    {item.icon}
                                </div>

                                <span className="text-sm font-medium">{item.name}</span>

                                {/* ACTIVE BAR */}
                                <div className={`
                                    ml-auto w-1.5 h-5 rounded-full
                                    transition-all duration-300
                                    ${active ? "bg-green-500 opacity-100" : "opacity-0"}
                                `} />
                            </div>
                        )
                    })}
                </div>

                <Divider />

                {/* SETTINGS */}
                <div>
                    <p className="px-3 text-xs text-gray-400 uppercase mb-2">Settings</p>

                    {menu2.map((item, i) => {
                        const active = isActive(item.path)
                        return (
                            <div
                                key={i}
                                onClick={() => navigate(item.path)}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
                                    transition-all duration-200
                                    ${active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-500 hover:bg-gray-50"}
                                `}
                            >
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
                                    {item.icon}
                                </div>

                                <span className="text-sm">{item.name}</span>
                            </div>
                        )
                    })}
                </div>

            </div>

            {/* USER */}
            <div className="p-4 border-t">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center">
                        S
                    </div>
                    <div>
                        <p className="text-sm font-medium">Salon Owner</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DrawerList