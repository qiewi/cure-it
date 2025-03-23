"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {signIn} from "next-auth/react";
import {registerUser} from "@/action/Profile";

const formSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Nama harus minimal 2 karakter.",
    }),
    email: z.string().email({
      message: "Email tidak valid.",
    }),
    password: z.string().min(8, {
      message: "Kata sandi harus minimal 8 karakter.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Konfirmasi kata sandi harus minimal 8 karakter.",
    }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Anda harus menyetujui syarat dan ketentuan." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok.",
    path: ["confirmPassword"],
  })

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },
  })

    // Simplified onSubmit function that just validates and navigates
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        const response = await registerUser(values)
        if (!response.success) {
            setIsSubmitting(false)
            console.error(response.message)
            return
        }
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        })
        router.push("/auth/verification")
        setIsSubmitting(false)
    }

  return (
    <div className="space-y-6">
      <h2 className="text-center text-3xl font-bold mb-12">Buat Akun Anda!</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <Input placeholder="Nama Lengkap" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    <Input placeholder="Email" type="email" className="pl-10 " {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <Input
                      placeholder="Kata sandi"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      {...field}
                    />
                    <div
                      className="absolute right-3 top-3 cursor-pointer text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </div>
                    <Input
                      placeholder="Konfirmasi kata sandi"
                      type={showConfirmPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      {...field}
                    />
                    <div
                      className="absolute right-3 top-3 cursor-pointer text-gray-400"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 px-2 py-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none ml-2">
                  <p className="text-xs font-normal">
                    Dengan mendaftar, Anda setuju dengan{" "}
                    <a href="#">
                      <span className="text-primary-200">syarat dan ketentuan</span>
                    </a>
                    .
                  </p>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Submit button without Link wrapper */}
          <Button type="submit" className="w-full bg-primary-200 hover:bg-primary-300 py-6" disabled={isSubmitting}>
            {isSubmitting ? "Mendaftar..." : "Daftar"}
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <div className="text-center">
        <p className="text-sm">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="text-primary-200 hover:underline">
            Masuk
          </Link>
        </p>
      </div>

      <Button
        type="button"
        className="w-full border-2 bg-transparent text-black py-6 hover:bg-gray-100 rounded-4xl"
        style={{ borderColor: "rgba(66, 133, 244, 0.5)" }}
        onClick={() => {
            signIn("google")
        }}
      >
        <div className="flex flex-row items-center">
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Masuk menggunakan Google
        </div>
      </Button>
    </div>
  )
}

