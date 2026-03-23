import { useState } from "react";
import { Eye, EyeOff, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Spinner from "../shared/Spinner";

export default function ChangePasswordTab({ onChangePassword }) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setError(null);
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }
    if (form.newPassword === form.currentPassword) {
      setError("New password must be different from current password");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);
    const result = await onChangePassword(
      form.currentPassword,
      form.newPassword,
    );
    setLoading(false);

    if (result.success) {
      toast.success("Password changed successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setError(result.error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Lock size={18} className="text-amber-600" />
        <h2 className="font-display font-light text-2xl text-stone-950">
          Change Password
        </h2>
      </div>

      {/* Info box */}
      <div className="bg-amber-50 border border-amber-200 p-4 mb-6">
        <p className="text-xs text-amber-700 font-light leading-relaxed">
          For your security, please enter your current password before setting a
          new one. Your new password must be at least 6 characters long.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-3 mb-5">
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-stone-50 border border-stone-300 p-6 flex flex-col gap-5">
          {/* Current password */}
          <div>
            <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
              Current Password <span className="text-amber-600">*</span>
            </label>
            <div className="relative">
              <Input
                name="currentPassword"
                type={show.current ? "text" : "password"}
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="rounded-none border-stone-300 bg-stone-100 focus-visible:ring-amber-600 font-light pr-10"
              />
              <button
                type="button"
                onClick={() => setShow((s) => ({ ...s, current: !s.current }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-950 transition-colors"
              >
                {show.current ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <Separator className="bg-stone-200" />

          {/* New password */}
          <div>
            <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
              New Password <span className="text-amber-600">*</span>
            </label>
            <div className="relative">
              <Input
                name="newPassword"
                type={show.new ? "text" : "password"}
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className="rounded-none border-stone-300 bg-stone-100 focus-visible:ring-amber-600 font-light pr-10"
              />
              <button
                type="button"
                onClick={() => setShow((s) => ({ ...s, new: !s.new }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-950 transition-colors"
              >
                {show.new ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Password strength indicator */}
            {form.newPassword.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        getStrength(form.newPassword) >= level
                          ? level <= 1
                            ? "bg-red-400"
                            : level <= 2
                              ? "bg-amber-400"
                              : level <= 3
                                ? "bg-yellow-400"
                                : "bg-green-500"
                          : "bg-stone-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-stone-400">
                  {getStrengthLabel(form.newPassword)}
                </p>
              </div>
            )}
          </div>

          {/* Confirm new password */}
          <div>
            <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
              Confirm New Password <span className="text-amber-600">*</span>
            </label>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={show.confirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat new password"
                className="rounded-none border-stone-300 bg-stone-100 focus-visible:ring-amber-600 font-light pr-10"
              />
              <button
                type="button"
                onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-950 transition-colors"
              >
                {show.confirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Match indicator */}
            {form.confirmPassword.length > 0 && (
              <p
                className={`text-[10px] mt-1.5 flex items-center gap-1 ${
                  form.newPassword === form.confirmPassword
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {form.newPassword === form.confirmPassword ? (
                  <>
                    <Check size={11} /> Passwords match
                  </>
                ) : (
                  "Passwords do not match"
                )}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-4 rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs py-5 gap-2"
        >
          {loading ? (
            <>
              <Spinner size={13} className="text-stone-50" /> Updating…
            </>
          ) : (
            <>
              <Lock size={13} /> Update Password
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

function getStrength(password) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function getStrengthLabel(password) {
  const score = getStrength(password);
  if (score <= 1) return "Weak";
  if (score === 2) return "Fair";
  if (score === 3) return "Good";
  return "Strong";
}
