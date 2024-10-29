
import { NavLink } from "react-router-dom"

const Navbar = () => {
    const navLinks = [
        { to: '/', displayText: 'Dashboard' },
        { to: '/compensation', displayText: "Pay fine" }
    ]
    return (
        <nav className="w-full bg-my-green-50 flex items-center gap-4 p-4 py-2">
            {navLinks.map(({ to, displayText }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        `px-6 py-3  w-1/2 text-center text-base font-medium transition-all duration-200  hover:bg-my-green-100 rounded-full
                        ${isActive ? 
                            'bg-my-green-400  text-white hover:bg-my-green-400 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] translate-y-[-1px]' : 
                            'text-gray-600 hover:text-gray-800'}`
                    }                >
                    {displayText}
                </NavLink>
            ))}
        </nav>
    )
}

export default Navbar