import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const getRoleName = (user) => {
    if (!user) return null;

    if (
      user.userRole &&
      typeof user.userRole === "object" &&
      user.userRole.name
    ) {
      return String(user.userRole.name).toLowerCase();
    }

    if (typeof user.role === "string") {
      return user.role.toLowerCase();
    }

    if (user.role && typeof user.role === "object" && user.role.name) {
      return String(user.role.name).toLowerCase();
    }

    if (Array.isArray(user.roles) && user.roles.length > 0) {
      const firstRole = user.roles[0];

      if (typeof firstRole === "string") {
        return firstRole.toLowerCase();
      }

      if (firstRole && firstRole.name) {
        return String(firstRole.name).toLowerCase();
      }
    }

    if (typeof user.user_type === "string") {
      return user.user_type.toLowerCase();
    }

    return null;
  };

  const getErrorMessage = (data) => {
    if (data?.message) return data.message;
    if (data?.error) return data.error;
    if (data?.data?.error) return data.data.error;

    if (data?.errors) {
      const firstGroup = Object.values(data.errors)[0];
      if (Array.isArray(firstGroup) && firstGroup.length > 0) {
        return firstGroup[0];
      }
    }

    return "Login failed. Please check your credentials.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(getErrorMessage(data));
      }

      const payload = data?.data || data;

      const token =
        payload?.token ||
        data?.token ||
        data?.access_token ||
        data?.authorisation?.token;

      const user = payload?.user || data?.user || null;

      if (!token) {
        throw new Error("Login succeeded but no token was returned.");
      }

      localStorage.setItem("token", token);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      const roleName = getRoleName(user);

      if (roleName) {
        localStorage.setItem("role", roleName);
      }

      // Redirect based on role
      if (roleName === "admin") {
        navigate("/dashboard/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-[#0B3B82] to-[#082d64] p-10 text-white lg:flex">
          <div className="flex h-full w-full flex-col justify-between rounded-[28px] border border-white/10 bg-white/5 p-10 backdrop-blur-sm">
            <div>
              <div className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E67E22] text-lg font-bold text-white shadow-md">
                  I
                </div>
                <div>
                  <h2 className="text-xl font-bold">International</h2>
                  <p className="text-sm text-blue-100">Mindset Pathways</p>
                </div>
              </div>

              <div className="mt-14">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-orange-200">
                  Welcome Back
                </p>
                <h1 className="max-w-xl text-4xl font-bold leading-tight">
                  Access your admin area and manage everything in one place.
                </h1>
                <p className="mt-5 max-w-lg text-base leading-7 text-blue-100">
                  Sign in to manage applications, website content, reports, and
                  system settings from your dashboard.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <h3 className="text-2xl font-bold">24/7</h3>
                <p className="mt-1 text-sm text-blue-100">Dashboard access</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <h3 className="text-2xl font-bold">Fast</h3>
                <p className="mt-1 text-sm text-blue-100">Application review</p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <h3 className="text-2xl font-bold">Smart</h3>
                <p className="mt-1 text-sm text-blue-100">System management</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#0B3B82] text-white shadow-lg lg:mx-0">
                <LogIn size={28} />
              </div>

              <h2 className="text-3xl font-bold text-slate-900">Log In</h2>
              <p className="mt-2 text-sm text-slate-500">
                Enter your email and password to continue.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#0B3B82] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-semibold text-slate-700">
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-medium text-[#E67E22] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-700 outline-none transition focus:border-[#0B3B82] focus:bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-[#0B3B82] focus:ring-[#0B3B82]"
                    />
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0B3B82] px-4 text-sm font-semibold text-white transition hover:bg-[#082d64] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Log In"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-500">
                Need help?{" "}
                <Link
                  to="/contact"
                  className="font-semibold text-[#E67E22] hover:underline"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}