"use server"
import {auth} from "@/auth";
import {prisma} from "@/prisma";
import { Gender } from "@prisma/client";
import {z} from "zod";
import { UTApi } from "uploadthing/server";
import bcrypt from "bcryptjs";

const utapi = new UTApi();

export async function GetUserProfile() {
    const session = await auth()
    if (!session) return null

    const user = await prisma.user.findUnique({where: {id: session.user.id}});
    if (!user) return null

    const age = user.birthdate
        ? new Date().getFullYear() - new Date(user.birthdate).getFullYear()
        : 0;

    return {
        name: user.name,
        email: user.email,
        bloodType: user.bloodType,
        gender: user.gender,
        age,
        birthPlace: user.birthplace,
        birthDate: user.birthdate,
        idNumber: user.idCardNumber,
        phoneNumber: user.phoneNumber,
        address: user.address,
    }
}

// Define the validation schema with Zod
const editProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    bloodType: z.enum(["O", "A", "B", "AB"], {
        errorMap: () => ({ message: "Please select a valid blood type" }),
    }),
    gender: z.enum(["Male", "Female"], {
        errorMap: () => ({ message: "Please select a valid gender" }),
    }),
    age: z.coerce.number().min(1, "Age must be at least 1").max(100, "Age must be at most 100"),
    birthPlace: z.string().min(2, "Birth place must be at least 2 characters"),
    birthDate: z.date({
        required_error: "Birth date is required",
    }),
    idNumber: z
        .string()
        .length(16, "ID number must be exactly 16 digits")
        .regex(/^\d+$/, "ID number must contain only digits"),
    phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    address: z.string().min(10, "Address must be at least 10 characters"),
})

export type EditProfileData = z.infer<typeof editProfileSchema>




export async function mutateUserProfile(data: EditProfileData, photoProfile: File | undefined) {
  const session = await auth()
  if (!session) return null

  const parsedData = editProfileSchema.safeParse(data)
  if (!parsedData.success) {
    console.error("Validation Error:", parsedData.error.errors);
    throw new Error("Invalid data format");
  }

  try {
    // Data to update in the user record
    const updateData: any = {
      name: parsedData.data.name,
      email: parsedData.data.email,
      bloodType: parsedData.data.bloodType,
      gender: parsedData.data.gender as Gender,
      birthdate: new Date(parsedData.data.birthDate),
      birthplace: parsedData.data.birthPlace,
      idCardNumber: parsedData.data.idNumber,
      phoneNumber: parsedData.data.phoneNumber,
      address: parsedData.data.address,
    };

    // Upload profile photo if provided
    if (photoProfile) {
      // Get current user to check for existing image
      const currentUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { image: true }
      });

      // Delete old image if it exists and starts with the UploadThing URL pattern
      if (currentUser?.image && currentUser.image.includes('uploadthing')) {
        const fileKey = currentUser.image.split('/').pop();
        if (fileKey) {
          await utapi.deleteFiles(fileKey).catch(err => {
            console.error("Error deleting old profile image:", err);
          });
        }
      }

      // Upload new image using the new property
      const uploadResult = await utapi.uploadFiles([photoProfile]);
      if (uploadResult[0]?.data?.ufsUrl) {
        updateData.image = uploadResult[0].data.ufsUrl;
      }
    }

    // Update user record with all data including potentially new image URL
    await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
    });

    return {
      success: true,
      errorCode: 200,
      message: "Successfully updated the user profile",
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
      return {
        success: false,
        errorCode: 400,
        message: error,
      };
    } else {
      return {
        success: false,
        errorCode: 400,
        message: "An error occurred while updating the user profile",
      };
    }
  }
}

const RegisterSchema = z
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

type RegisterFormData = z.infer<typeof RegisterSchema>

export async function registerUser(data: RegisterFormData) {
    const parsedData = RegisterSchema.safeParse(data)
    if (!parsedData.success) {
        console.error("Validation Error:", parsedData.error.errors);
        throw new Error("Invalid data format");
    }

    try {
        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: parsedData.data.email }
        });

        if (existingUser) {
            return {
                success: false,
                errorCode: 409,
                message: "Email already in use"
            };
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

        await prisma.user.create({
            data: {
                name: parsedData.data.fullName,
                email: parsedData.data.email,
                password: hashedPassword,
            },
        });

        return {
            success: true,
            errorCode: 200,
            message: "Successfully registered the user",
        };
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            errorCode: 500,
            message: process.env.NODE_ENV === "development"
                ? `Error: ${error instanceof Error ? error.message : String(error)}`
                : "An error occurred while registering the user",
        };
    }
}

const UpdateBioSchema = z
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

type UpdateBioData = z.infer<typeof UpdateBioSchema>

export async function updateUserBiodata(data: UpdateBioData) {
    try {
        const session = await auth()
        if (!session) return {
            success: false,
            errorCode: 401,
            message: "Unauthorized"
        }

        const parsedData = UpdateBioSchema.safeParse(data)
        if (!parsedData.success) {
            return {
                success: false,
                errorCode: 400,
                message: "Invalid data format",
                errors: parsedData.error.errors
            }
        }

        const user = await prisma.user.findUnique({where: {id: session.user.id}})
        if (!user) return {
            success: false,
            errorCode: 404,
            message: "User not found"
        }

        if (parsedData.data.jenisKelamin === "laki-laki") {
            parsedData.data.jenisKelamin = "Male" as Gender
        } else {
            parsedData.data.jenisKelamin = "Female" as Gender
        }

        // Map the fields to match your database schema
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                gender: parsedData.data.jenisKelamin as Gender,
                birthdate: parsedData.data.tanggalLahir,
                phoneNumber: parsedData.data.nomorHandphone,
                idCardNumber: parsedData.data.nomorKTP,
                address: parsedData.data.alamat
            }
        })

        return {
            success: true,
            errorCode: 200,
            message: "Successfully updated the user bio",
        }
    } catch (error) {
        console.error("Error updating user bio:", error)
        return {
            success: false,
            errorCode: 500,
            message: process.env.NODE_ENV === "development"
                ? `Error: ${error instanceof Error ? error.message : String(error)}`
                : "An error occurred while updating the user bio"
        }
    }
}
