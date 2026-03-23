import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import PageTitle from "../components/shared/PageTitle";

export default function RegisterPage({ onRegister }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const result = await onRegister(form);
    setLoading(false);
    if (result.success) {
      toast.success(`Welcome to RAJA Atelier, ${result.user.name}!`);
      const redirect = sessionStorage.getItem("raja_redirect_after_login");
      sessionStorage.removeItem("raja_redirect_after_login");
      navigate(redirect || "/account");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4 py-16">
      <PageTitle title="Create Account" />

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
            Create an account
          </h1>
          <p className="text-xs text-stone-500 font-light mb-6">
            Join RAJA Atelier and enjoy a personalised experience
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 p-3 mb-4">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
                Full Name <span className="text-amber-600">*</span>
              </label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Abdur Rahman"
                className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
              />
            </div>

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

            {/* Phone */}
            <div>
              <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
                Phone Number
              </label>
              <Input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+880 1711-234567"
                className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
                Delivery Address
              </label>
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="House 12, Road 6, Banani, Dhaka"
                className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
                Password <span className="text-amber-600">*</span>
              </label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
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

            {/* Confirm Password */}
            <div>
              <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
                Confirm Password <span className="text-amber-600">*</span>
              </label>
              <div className="relative">
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-950 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
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
                "Creating account…"
              ) : (
                <>
                  <UserPlus size={14} /> Create Account
                </>
              )}
            </Button>
          </form>

          <Separator className="bg-stone-200 my-6" />

          {/* Login link */}
          <p className="text-center text-xs text-stone-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-600 hover:text-amber-700 transition-colors font-medium"
            >
              Sign in
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
