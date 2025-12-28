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
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="w-12 h-12 bg-brutal-black flex items-center justify-center border-3 border-brutal-black
                                      group-hover:bg-brutal-red transition-colors duration-200"
            >
              <MapPin className="w-7 h-7 text-brutal-yellow" strokeWidth={3} />
            </div>
            <span className="text-3xl font-black uppercase tracking-tighter text-shadow-brutal">
              PlaceReview
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brutal-yellow border-3 border-brutal-black">
              <div className="w-3 h-3 bg-brutal-black rounded-full animate-pulse"></div>
              <span className="font-bold uppercase text-sm tracking-wider">
                {user?.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn-brutal-accent flex items-center gap-2"
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
