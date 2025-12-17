
"use client";
import Image from "next/image";

type avatarProps = {
    src: string;
    alt?: string
}
export default function Avatar({ src, alt = "" }: avatarProps) {
    return (
        <div className={`w-6 h-6 overflow-hidden rounded-sm shrink-0`}>
            <Image
                src={src}
                alt={alt}
                width={24}
                height={24}
                className="object-cover"
                unoptimized={true}
            />
        </div>
    );
}