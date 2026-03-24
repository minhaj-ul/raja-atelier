import { useState } from "react";
import { Edit, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Spinner from "../shared/Spinner";

export default function ProfileTab({ user, onUpdateProfile }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 0));
    onUpdateProfile(form);
    setSaving(false);
    setEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setEditing(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-light text-2xl text-stone-950">
          Profile Details
        </h2>
        {!editing ? (
          <Button
            variant="outline"
            onClick={() => setEditing(true)}
            className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-950 hover:text-stone-50 uppercase tracking-widest text-xs gap-1.5"
          >
            <Edit size={13} /> Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-200 uppercase tracking-widest text-xs gap-1.5"
            >
              <X size={13} /> Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="rounded-none bg-amber-600 hover:bg-amber-700 text-stone-50 uppercase tracking-widest text-xs gap-1.5"
            >
              {saving ? (
                <>
                  <Spinner size={13} className="text-stone-50" /> Saving…
                </>
              ) : (
                <>
                  <Check size={13} /> Save
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="bg-stone-50 border border-stone-300 p-6 flex flex-col gap-5">
        {/* Name */}
        <div>
          <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
            Full Name
          </label>
          {editing ? (
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="rounded-none border-stone-300 bg-stone-100 focus-visible:ring-amber-600 font-light"
            />
          ) : (
            <p className="text-sm text-stone-950 font-light">{user?.name}</p>
          )}
        </div>

        <Separator className="bg-stone-200" />

        {/* Email */}
        <div>
          <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
            Email Address
          </label>
          <p className="text-sm text-stone-950 font-light">{user?.email}</p>
          <p className="text-[10px] text-stone-400 mt-0.5">
            Email cannot be changed
          </p>
        </div>

        <Separator className="bg-stone-200" />

        {/* Phone */}
        <div>
          <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
            Phone Number
          </label>
          {editing ? (
            <Input
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
              placeholder="+880 1711-234567"
              className="rounded-none border-stone-300 bg-stone-100 focus-visible:ring-amber-600 font-light"
            />
          ) : (
            <p className="text-sm text-stone-950 font-light">
              {user?.phone || (
                <span className="text-stone-400 italic">Not provided</span>
              )}
            </p>
          )}
        </div>

        <Separator className="bg-stone-200" />

        {/* Address */}
        <div>
          <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
            Delivery Address
          </label>
          {editing ? (
            <Input
              value={form.address}
              onChange={(e) =>
                setForm((p) => ({ ...p, address: e.target.value }))
              }
              placeholder="House 12, Road 6, Banani, Dhaka"
              className="rounded-none border-stone-300 bg-stone-100 focus-visible:ring-amber-600 font-light"
            />
          ) : (
            <p className="text-sm text-stone-950 font-light">
              {user?.address || (
                <span className="text-stone-400 italic">Not provided</span>
              )}
            </p>
          )}
        </div>

        <Separator className="bg-stone-200" />

        {/* Member since */}
        <div>
          <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
            Member Since
          </label>
          <p className="text-sm text-stone-950 font-light">{user?.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
