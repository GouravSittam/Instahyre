import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import { MapPin, Phone, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api.login(phoneNumber, password);
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Brutalist Background Pattern */}
      <div className="absolute inset-0 grid grid-cols-12 gap-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className={`border border-brutal-black ${
              i % 3 === 0 ? "bg-brutal-white/10" : ""
            }`}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-slide-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-brutal-black border-5 border-brutal-black shadow-brutal-lg mb-6 animate-bounce-brutal">
            <MapPin className="w-14 h-14 text-brutal-yellow" strokeWidth={3} />
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-3 text-shadow-brutal relative inline-block">
            <span className="relative z-10">Welcome Back</span>
            <span className="absolute -bottom-1 left-0 w-3/4 h-3 bg-brutal-red -rotate-1 -z-10"></span>
          </h1>
          <p className="text-lg font-bold uppercase tracking-wide flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-brutal-red animate-pulse"></span>
            Sign in to continue
          </p>
        </div>

        {/* Main Card */}
        <div className="card-brutal bg-brutal-white rotate-slight">
          {error && (
            <div className="mb-6 p-4 bg-brutal-red border-3 border-brutal-black flex items-start gap-3 animate-bounce-brutal">
              <AlertCircle
                className="w-6 h-6 flex-shrink-0 text-brutal-white"
                strokeWidth={3}
              />
              <p className="font-bold text-brutal-white uppercase text-sm">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-bold uppercase text-sm tracking-wider">
                <Phone className="inline w-4 h-4 mr-2" strokeWidth={3} />
                Phone Number
              </label>
              <input
                type="tel"
                className="input-brutal"
                placeholder="ENTER YOUR PHONE"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-bold uppercase text-sm tracking-wider">
                <Lock className="inline w-4 h-4 mr-2" strokeWidth={3} />
                Password
              </label>
              <input
                type="password"
                className="input-brutal"
                placeholder="ENTER YOUR PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-brutal-primary w-full text-lg"
              disabled={loading}
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="inline-block p-4 bg-brutal-white border-3 border-brutal-black shadow-brutal-sm">
            <span className="font-bold uppercase text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-brutal-red underline hover:bg-brutal-red hover:text-brutal-white transition-colors px-1"
              >
                REGISTER HERE
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
