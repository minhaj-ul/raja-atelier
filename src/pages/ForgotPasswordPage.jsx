import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage({ onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    await onForgotPassword(email);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4 py-16">
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
          {!submitted ? (
            <>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 border border-amber-200 mx-auto mb-5">
                <Mail size={20} className="text-amber-600" />
              </div>

              <h1 className="font-display font-light text-2xl text-stone-950 mb-1 text-center">
                Forgot your password?
              </h1>
              <p className="text-xs text-stone-500 font-light mb-6 text-center">
                Enter your email and we'll send you a reset link
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 p-3 mb-4">
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
                    Email Address <span className="text-amber-600">*</span>
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setError(null);
                      setEmail(e.target.value);
                    }}
                    placeholder="abdur.rahman@gmail.com"
                    className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs py-5 gap-2"
                >
                  {loading ? (
                    "Sending…"
                  ) : (
                    <>
                      <Mail size={14} /> Send Reset Link
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success state */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 border border-green-200 mx-auto mb-5">
                <Check size={20} className="text-green-600" />
              </div>
              <h1 className="font-display font-light text-2xl text-stone-950 mb-2 text-center">
                Check your email
              </h1>
              <p className="text-xs text-stone-500 font-light text-center leading-relaxed mb-6">
                If an account exists for{" "}
                <span className="text-stone-950 font-medium">{email}</span>, you
                will receive a password reset link shortly.
              </p>
              <div className="bg-amber-50 border border-amber-200 p-3 mb-6">
                <p className="text-xs text-amber-700 font-light text-center">
                  This is a demo — no actual email is sent. Use your registered
                  password to login.
                </p>
              </div>
              <Button
                className="w-full rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs py-5"
                onClick={() => setSubmitted(false)}
              >
                Try another email
              </Button>
            </>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-xs text-stone-500 hover:text-amber-600 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={12} /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
