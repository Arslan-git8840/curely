"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Github, Mail, Lock, LogIn, User } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { z } from "zod";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name is required"),
});

export default function AuthForm({ mode = "login" }: { mode?: "login" | "register" }) {
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = mode === "login";

  const formSchema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log(`${isLogin ? "Logging in" : "Registering"}...`, data);
  };

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#f9fafc]">
      {/* Left - Form */}
      <div className="flex flex-col justify-center px-6 py-10 md:px-16 lg:px-24">
        {/* Logo + About */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#0f172a]">
            <div className="text-[#019c6f] flex items-center gap-2">
              <Link href="/">
                <Image
                  src="/curely-logo.png"
                  alt="Curely Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </Link>
              <span>Curely</span>
            </div>
          </h1>
          <Link
            href="/about"
            className="text-sm font-medium underline text-[#0f172a]"
          >
            About us
          </Link>
        </div>

        {/* Headline */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-4 leading-tight">
          {isLogin
            ? "Intelligent Healthcare. Secure Login. Powered by"
            : "Create your Curely account and start your smart care journey"}{" "}
          {!isLogin && <span className="text-[#019c6f]">Curely</span>}
        </h2>

        {/* Social Auth */}
        <div className="space-y-3 mt-6">
          <Button
            variant="outline"
            className="w-full flex justify-center gap-3 text-[#0f172a] border-gray-300 py-2 rounded-full"
          >
            <FaGoogle size={18} />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex justify-center gap-3 text-[#0f172a] border-gray-300 py-2 rounded-full"
          >
            <Github size={18} /> Continue with GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6 text-gray-400 text-sm">
          <div className="flex-grow border-t" />
          <span className="mx-4">OR</span>
          <div className="flex-grow border-t" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                className="pl-10 py-2 rounded-full"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>
              )}
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="pl-10 py-2 rounded-full"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 pr-10 py-2 rounded-full"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#019c6f] hover:bg-[#017a59] text-white rounded-full py-2"
          >
            <LogIn size={16} className="mr-2" />
            {isLogin ? "Sign in with email" : "Register with email"}
          </Button>
        </form>

        {/* Terms */}
        <p className="text-xs text-gray-400 text-center mt-6">
          By {isLogin ? "signing in" : "signing up"}, you agree to the{" "}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Toggle mode */}
        <p className="text-sm text-center mt-4">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <Link
            href={isLogin ? "/auth/register" : "/auth/log-in"}
            className="text-[#019c6f] font-medium underline"
          >
            {isLogin ? "Register" : "Login"}
          </Link>
        </p>
      </div>

      {/* Right - Image */}
      <div className="hidden md:flex items-center justify-center p-6">
        <Image
          src="/doctor-ill.png"
          alt="AI Doctor Illustration"
          width={500}
          height={500}
          className="rounded-xl shadow-xl"
        />
      </div>
    </section>
  );
}
