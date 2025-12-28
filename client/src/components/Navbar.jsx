import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, MapPin } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-brutal-white border-b-5 border-brutal-black sticky top-0 z-50">
      <div className="container-brutal">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center gap-3 group hover:translate-x-1 transition-transform"
          >
            <div
              className="w-14 h-14 bg-brutal-black flex items-center justify-center border-5 border-brutal-black
                         shadow-brutal group-hover:shadow-brutal-hover group-hover:translate-x-[2px] group-hover:translate-y-[2px]
                         transition-all rotate-[-5deg] group-hover:rotate-0"
            >
              <MapPin className="w-8 h-8 text-brutal-yellow" strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-shadow-brutal-sm leading-none">
                Place<span className="text-brutal-red">Review</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brutal-gray-700 -mt-1">
                Rate • Share • Discover
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brutal-yellow border-3 border-brutal-black animate-pulse-shadow">
              <div className="w-3 h-3 bg-brutal-black rounded-full animate-pulse"></div>
              <span className="font-bold uppercase text-sm tracking-wider">
                {user?.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn-brutal-accent flex items-center gap-2 hover:animate-shake"
            >
              <LogOut className="w-5 h-5" strokeWidth={3} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
