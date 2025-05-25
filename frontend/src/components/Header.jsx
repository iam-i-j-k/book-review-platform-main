import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Header({ user }) {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
              {/* Logo */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="text-white text-xl font-bold">📚</div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              </div>

              {/* Title */}
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-indigo-600 transition-all duration-300">
                  ClassicReads
                </h1>
                <p className="text-sm text-gray-500 -mt-1">Timeless Literature</p>
              </div>
            </div>

          </div>

          {/* Right Side - Auth & Mobile Menu */}
          <div className="flex items-center gap-4">


            {/* Auth Buttons / User Avatar */}
            {!user ? (
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 cursor-pointer text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 font-semibold transition-all duration-200 hover:shadow-md"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="px-4 py-2 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="relative group">
                <div
                  onClick={() => navigate("/profile")}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 ring-2 ring-white"
                  title={user.username}
                >
                  {user.username?.charAt(0).toUpperCase()}
                </div>

                {/* User Dropdown */}
                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div>
                    <hr />
                    <button
                      className="w-full text-left rounded-b-xl cursor-pointer px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      onClick={() => {
                        localStorage.removeItem("user");
                        window.location.href = "/login"; // or use navigate("/login")
                      }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  )
}
