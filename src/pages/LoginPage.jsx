import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import PageTitle from "../components/shared/PageTitle";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "abdur.rahman@gmail.com",
    password: "demo1234",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    const result = await onLogin(form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}!`);
      const redirect = sessionStorage.getItem("raja_redirect_after_login");
      sessionStorage.removeItem("raja_redirect_after_login");
      navigate(redirect || "/");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4 py-16">
      <PageTitle title="Sign In" />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <p className="font-display italic text-3xl font-light text-stone-950">
              RAJA
            </p>
            <p className="text-[9px] tracking-[0.3em] uppercase text-amber-600">
              Atelier
            </p>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-stone-50 border border-stone-300 p-8">
          <h1 className="font-display font-light text-2xl text-stone-950 mb-1">
            Welcome back
          </h1>
          <p className="text-xs text-stone-500 font-light mb-6">
            Sign in to your RAJA Atelier account
          </p>

          {/* Demo credentials notice */}
          <div className="bg-amber-50 border border-amber-200 p-3 mb-6">
            <p className="text-xs text-amber-700 font-medium mb-1">
              Demo Credentials
            </p>
            <p className="text-xs text-amber-600 font-light">
              Email: abdur.rahman@gmail.com
            </p>
            <p className="text-xs text-amber-600 font-light">
              Password: demo1234
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 p-3 mb-4">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
                Email Address <span className="text-amber-600">*</span>
              </label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="abdur.rahman@gmail.com"
                className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] tracking-widest uppercase text-stone-500">
                  Password <span className="text-amber-600">*</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[10px] tracking-wide text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-950 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs py-5 gap-2 mt-2"
            >
              {loading ? (
                "Signing in…"
              ) : (
                <>
                  <LogIn size={14} /> Sign In
                </>
              )}
            </Button>
          </form>

          <Separator className="bg-stone-200 my-6" />

          {/* Register link */}
          <p className="text-center text-xs text-stone-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-amber-600 hover:text-amber-700 transition-colors font-medium"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Back to shop */}
        <p className="text-center mt-4">
          <Link
            to="/"
            className="text-xs text-stone-400 hover:text-stone-950 transition-colors uppercase tracking-widest"
          >
            ← Back to Shop
          </Link>
        </p>
      </div>
    </div>
  );
}
