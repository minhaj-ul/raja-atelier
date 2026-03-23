import { useState } from "react";

const AUTH_KEY = "raja_atelier_auth";
const USERS_KEY = "raja_atelier_users";

const DEMO_USERS = [
  {
    id: "demo_001",
    name: "Abdur Rahman",
    email: "abdur.rahman@gmail.com",
    phone: "+880 1711-234567",
    password: "demo1234",
    address: "House 12, Road 6, Block F, Banani, Dhaka 1213",
    avatar: null,
    createdAt: "2024-01-01",
  },
];

function loadUsers() {
  try {
    const saved = localStorage.getItem(USERS_KEY);
    if (saved) return JSON.parse(saved);
    localStorage.setItem(USERS_KEY, JSON.stringify(DEMO_USERS));
    return DEMO_USERS;
  } catch {
    return DEMO_USERS;
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {}
}

function loadCurrentUser() {
  try {
    const saved = localStorage.getItem(AUTH_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveCurrentUser(user) {
  try {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch {}
}

export function useAuth() {
  const [user, setUser] = useState(loadCurrentUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isLoggedIn = !!user;

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 800));
    const users = loadUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      saveCurrentUser(safeUser);
      setLoading(false);
      return { success: true, user: safeUser };
    } else {
      setError("Invalid email or password");
      setLoading(false);
      return { success: false, error: "Invalid email or password" };
    }
  };

  const register = async (data) => {
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 800));
    const users = loadUsers();
    const exists = users.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase(),
    );
    if (exists) {
      setError("An account with this email already exists");
      setLoading(false);
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }
    const newUser = {
      id: `user_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      password: data.password,
      address: data.address || "",
      avatar: null,
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    saveCurrentUser(safeUser);
    setLoading(false);
    return { success: true, user: safeUser };
  };

  const logout = () => {
    setUser(null);
    saveCurrentUser(null);
  };

  const updateProfile = (updates) => {
    const users = loadUsers();
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, ...updates } : u,
    );
    saveUsers(updatedUsers);
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    saveCurrentUser(updatedUser);
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const users = loadUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    setLoading(false);
    return { success: true };
  };

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const users = loadUsers();
    const found = users.find((u) => u.id === user.id);
    if (!found || found.password !== currentPassword) {
      setLoading(false);
      return { success: false, error: "Current password is incorrect" };
    }
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, password: newPassword } : u,
    );
    saveUsers(updatedUsers);
    setLoading(false);
    return { success: true };
  };

  return {
    user,
    isLoggedIn,
    loading,
    error,
    setError,
    login,
    register,
    logout,
    updateProfile,
    forgotPassword,
    changePassword,
  };
}
