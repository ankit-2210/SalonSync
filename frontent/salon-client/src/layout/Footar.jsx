import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, LinkedIn } from '@mui/icons-material'

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 mt-10">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* BRAND */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white font-bold">
                                S
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Salonify</h2>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Discover and book the best salons near you. Premium grooming experience at your fingertips.
                        </p>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">Company</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link to="/" className="hover:text-green-600">Home</Link></li>
                            <li><Link to="/salons" className="hover:text-green-600">Salons</Link></li>
                            <li><Link to="/services" className="hover:text-green-600">Services</Link></li>
                            <li><Link to="/reviews" className="hover:text-green-600">Reviews</Link></li>
                        </ul>
                    </div>

                    {/* SUPPORT */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link to="/contact" className="hover:text-green-600">Contact Us</Link></li>
                            <li><Link to="/faq" className="hover:text-green-600">FAQs</Link></li>
                            <li><Link to="/privacy" className="hover:text-green-600">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-green-600">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* NEWSLETTER */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">Stay Updated</h3>
                        <p className="text-sm text-gray-600 mb-4">Get latest offers & updates</p>
                        <div className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">© {new Date().getFullYear()} Salonify. All rights reserved.</p>

                    <div className="flex items-center gap-4 text-gray-500">
                        <Instagram className="hover:text-green-600 cursor-pointer" />
                        <Facebook className="hover:text-green-600 cursor-pointer" />
                        <Twitter className="hover:text-green-600 cursor-pointer" />
                        <LinkedIn className="hover:text-green-600 cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
