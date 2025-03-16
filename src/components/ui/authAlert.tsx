"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

interface AuthAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthAlert: React.FC<AuthAlertProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl outline outline-1 outline-neutral-300 flex flex-col sm:flex-row justify-center items-center p-6 sm:p-10 w-[90vw] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] shadow-lg relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 text-2xl"
        >
          <IoClose />
        </button>

        {/* Gambar Ilustrasi */}
        <img
          className="w-[80%] sm:w-[80%] max-w-[200px] sm:max-w-[280px] md:max-w-[350px] rounded-[20px] object-cover mx-auto"
          src="/images/AuthAlert.svg"
          alt="Authentication Required"
        />


        {/* Konten Modal */}
        <div className="flex flex-col items-center sm:items-end gap-1 sm:ml-6 text-center sm:text-right w-full">
          <div className="py-5 w-full">
            <div className="py-5">
              <h2 className="text-slate-900 text-xl sm:text-2xl md:text-3xl font-semibold font-['Quicksand'] leading-8">
                Fitur Memerlukan Akun!
              </h2>
              <p className="text-xs sm:text-sm md:text-base font-normal font-['Quicksand'] leading-normal text-center">
                <span className="text-primary-200 cursor-pointer" onClick={() => router.push("/auth/login")}>
                Masuk
                </span>{" "}
                <span className="text-slate-900">
                ke dalam akun Anda untuk meningkatkan pengalaman!
                </span>
              </p>
            </div>
          </div>
          {/* Tombol Login & Register */}
          <div className="w-full flex flex-col items-center gap-3">
            {/* Tombol Login */}
            <button
              className="w-full sm:w-64 h-10 sm:h-12 p-2 bg-primary-200 text-white rounded-md flex justify-center items-center text-m font-semibold hover:bg-primary-300 transition-all"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </button>

            {/* Tombol Register */}
            <button
              className="w-full sm:w-64 h-10 sm:h-12 p-2 rounded-md outline outline-1 outline-primary-200 text-primary-200 text-m font-semibold flex justify-center items-center hover:bg-primary-50 transition-all"
              onClick={() => router.push("/auth/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthAlert;
