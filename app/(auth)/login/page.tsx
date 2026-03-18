"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { login, storeToken } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { AuthUser } from "@/types/user";
import { resolveRoleRoute } from "@/constants/navigation";

// ✅ Typed error
interface ApiError {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await login(email, password);

      console.log("✅ LOGIN RESPONSE:", res);

      const user: AuthUser = res.data.user;
      storeToken(res.data.token);

      // 💾 Save user
      localStorage.setItem("user", JSON.stringify(user));

      // 🧠 Update context
      setUser(user);

      // 🚀 Redirect
      const redirectPath = resolveRoleRoute(user.role) || "/dashboard/super-admin";
      router.push(redirectPath);

    } catch (err: unknown) {
      console.error("❌ LOGIN ERROR:", err);

      const error = err as ApiError;

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* 🔥 LOGO */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.png" // 👉 place your logo in /public/logo.png
            alt="UCCZ Logo"
            width={80}
            height={80}
            className="mb-3"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            UCCZ Membership System
          </h1>
          <p className="text-sm text-gray-500">
            Sign in to your dashboard
          </p>
        </div>

        {/* 📧 EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 mb-4 rounded-lg transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 🔑 PASSWORD */}
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 mb-6 rounded-lg transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔘 BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* 🔻 FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} UCCZ. All rights reserved.
        </p>
      </div>
    </div>
  );
}
