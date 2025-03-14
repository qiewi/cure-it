"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaUsers } from "react-icons/fa";

interface DoctorCardProps {
  id: number;
  image: string;
  name: string;
  specialty: string;
  price: number;
  queue: number;
  duration: number;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  image,
  name,
  specialty,
  price,
  queue,
  duration,
}) => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer w-full max-w-[364px] border border-neutral-300 rounded-lg shadow-md bg-neutral-50 overflow-hidden"
      onClick={() => router.push(`/page`)}
    >
      {/* 📱 Tampilan MOBILE (sm:flex-row, md:hidden) */}
      <div className="sm:flex md:hidden flex items-center gap-4 p-4">
        {/* Gambar Dokter */}
        <img
          src={image}
          alt={name}
          className="w-28 h-28 rounded-lg object-cover"
        />

        {/* Informasi Dokter */}
        <div className="flex flex-col flex-1">
          <h2 className="text-zinc-900 text-xl font-semibold">{name}</h2>
          <p className="text-stone-500 text-xs">{specialty}</p>
          <p className="text-stone-500 text-base font-semibold mt-2">
            Rp {price.toLocaleString("id-ID")},00
          </p>
        </div>
      </div>

      {/* 💻 Tampilan DESKTOP (Gambar di atas, teks di bawah) */}
      <div className="hidden md:flex flex-col">
        <div className="relative w-full aspect-[4/3] bg-neutral-200 flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>

        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold text-neutral-900">{name}</h2>
          <p className="text-neutral-600 text-sm">{specialty}</p>
          <p className="text-lg font-semibold text-neutral-700 mt-2">
            Rp {price.toLocaleString("id-ID")},00
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-sky-100 px-4 py-2 flex justify-between items-center text-primary-200 text-sm font-bold">
        <div className="flex items-center gap-1">
          <FaUsers className="w-5 h-5 text-primary-200" />
          {queue}
        </div>
        <p>Waktu: {duration} Menit</p>
      </div>
    </div>
  );
};

export default DoctorCard;
