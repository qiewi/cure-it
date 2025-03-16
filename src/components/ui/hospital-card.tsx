"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HospitalCardProps {
  id: number;
  image: string;
  name: string;
  location: string;
  distance: number;
  queue: number;
}

const HospitalCard: React.FC<HospitalCardProps> = ({
  id,
  image,
  name,
  location,
  distance,
  queue,
}) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getQueueStatus = (queue: number) => {
    if (queue === 0) return "Status: Tidak Ramai";
    if (queue <= 5) return "Status: Sedang";
    return "Status: Ramai";
  };

  return (
    <div
      className="cursor-pointer w-[367px] border border-border rounded-lg bg-card overflow-hidden"
      onClick={() => router.push(`/hospital/${id}`)}
    >
      {isMobile ? (
        <div className="flex gap-4 p-4">
          <Image
            src={image}
            alt={name}
            width={100}
            height={100}
            className="w-[100px] h-[100px] object-cover rounded-lg"
          />
          <div className="flex flex-col justify-between">
            <div className="text-left">
              <h2 className="text-lg font-semibold text-primary">{name}</h2>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
            <div className="bg-secondary-50 text-secondary-200 px-1 py-1 rounded-xs text-xs font-medium border-secondary-200 border-1 max-w-[68px]">
              {distance} km
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Image
            src={image}
            alt={name}
            width={400}
            height={250}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <div className="flex">
              <h3 className="text-lg font-semibold text-primary text-left">{name}</h3>
              <span className="bg-secondary-50 text-secondary-200 px-3 py-1 rounded-xs text-xs font-medium border-secondary-200 border-1 ml-auto">
                {distance} km
              </span>
            </div>
            <p className="text-muted-foreground text-sm text-left">{location}</p>
          </div>
        </div>
      )}
      <div className="bg-primary-100 px-4 py-2 flex justify-between items-center text-primary-200 text-sm font-medium">
        <span className="text-primary-200">{queue} patients</span>
        <span className="text-primary-200">
          {getQueueStatus(queue)}
        </span>
      </div>
    </div>
  );
};

export default HospitalCard;
