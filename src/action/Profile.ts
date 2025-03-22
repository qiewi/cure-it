"use server"
import {auth} from "@/auth";
import {prisma} from "@/prisma";
import { Gender } from "@prisma/client";
import {z} from "zod";

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


export async function mutateUserProfile(data: EditProfileData, photoProfile: File) {
    const session = await auth()
    if (!session) return null

    const parsedData = editProfileSchema.safeParse(data)
    if (!parsedData.success) {
        console.error("Validation Error:", parsedData.error.errors);
        throw new Error("Invalid data format");
    }

    try {
        await prisma.user.update({
            where: {id: session.user.id},
            data: {
                name: parsedData.data.name,
                email: parsedData.data.email,
                bloodType: parsedData.data.bloodType,
                gender: parsedData.data.gender as Gender,
                birthdate: new Date(parsedData.data.birthDate),
                birthplace: parsedData.data.birthPlace,
                idCardNumber: parseInt(parsedData.data.idNumber),
                phoneNumber: parseInt(parsedData.data.phoneNumber),
                address: parsedData.data.address,
            },
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

type RegisterFormData = z.infer<typeof formSchema>

export async function registerUser(data: RegisterFormData) {
    const parsedData = formSchema.safeParse(data)
    if (!parsedData.success) {
        console.error("Validation Error:", parsedData.error.errors);
        throw new Error("Invalid data format");
    }

    try {
        await prisma.user.create({
            data: {
                name: parsedData.data.fullName,
                email: parsedData.data.email,
                password: parsedData.data.password,
            },
        });

        return {
            success: true,
            errorCode: 200,
            message: "Successfully registered the user",
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
                message: "An error occurred while registering the user",
            };
        }
    }
}
