"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, User, Phone, CreditCard, MapPin } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const formSchema = z
  .object({
    jenisKelamin: z
      .string({
        required_error: "Silakan pilih jenis kelamin.",
      })
      .optional(),
    tanggalLahir: z
      .date({
        required_error: "Silakan pilih tanggal lahir.",
      })
      .optional(),
    nomorHandphone: z
      .string()
      .min(9, {
        message: "Nomor handphone minimal 9 digit.",
      })
      .regex(/^\d+$/, {
        message: "Nomor handphone hanya boleh berisi angka.",
      })
      .optional(),
    nomorKTP: z
      .string()
      .length(16, {
        message: "Nomor KTP harus 16 digit.",
      })
      .regex(/^\d+$/, {
        message: "Nomor KTP hanya boleh berisi angka.",
      })
      .optional(),
    alamat: z
      .string()
      .min(10, {
        message: "Alamat minimal 10 karakter.",
      })
      .optional(),
  })
  .refine((data) => {
    const { jenisKelamin, tanggalLahir, nomorHandphone, nomorKTP, alamat } = data
    const errors = []

    if (!jenisKelamin) errors.push("Jenis kelamin wajib diisi")
    if (!tanggalLahir) errors.push("Tanggal lahir wajib diisi")
    if (!nomorHandphone) errors.push("Nomor handphone wajib diisi")
    if (!nomorKTP) errors.push("Nomor KTP wajib diisi")
    if (!alamat) errors.push("Alamat wajib diisi")

    return errors.length === 0 || { message: errors }
  })

export function BiodataForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched", // Only validate on blur or submit
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Handle form submission here
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-start text-xl md:text-3xl font-bold mt-12 mb-2">
          Beritahu kami {""}
          <br className="hidden md:block" />
          tentang Anda!
        </h2>
        <p className="text-muted-foreground text-xs md:text-base">
          Informasi yang Anda berikan akan terjamin kerahasiaannya dan hanya digunakan untuk CureIT
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="jenisKelamin"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Jenis Kelamin</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <div className="relative w-full">
                      <div className="absolute left-3 top-3 text-gray-400 z-10">
                        <User size={20} />
                      </div>
                      <SelectTrigger className="w-full pl-10">
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                    </div>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tanggalLahir"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Tanggal Lahir</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div className="relative w-full">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <CalendarIcon size={20} />
                        </div>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-10 text-left font-normal justify-start",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? format(field.value, "dd MMMM yyyy") : <span>Pilih tanggal lahir</span>}
                        </Button>
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nomorHandphone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Handphone</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Phone size={20} />
                    </div>
                    <Input
                      placeholder="Masukkan nomor handphone"
                      className="pl-10 text-sm "
                      {...field}
                      type="tel"
                      inputMode="numeric"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nomorKTP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor KTP</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <CreditCard size={20} />
                    </div>
                    <Input
                      placeholder="Masukkan 16 digit nomor KTP"
                      className="pl-10 text-sm"
                      {...field}
                      type="text"
                      inputMode="numeric"
                      maxLength={16}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alamat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <MapPin size={20} />
                    </div>
                    <Textarea placeholder="Masukkan alamat lengkap" className="min-h-[100px] pl-10 text-sm" {...field} />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-primary-200 hover:bg-primary-300 mt-2 mb-2">
            Lanjutkan
          </Button>
        </form>
      </Form>
    </div>
  )
}

