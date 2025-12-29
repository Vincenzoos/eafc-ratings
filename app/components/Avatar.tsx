
"use client";
import Image from "next/image";

type avatarProps = {
    src: string;
    alt?: string
}
export default function Avatar({ src, alt = "" }: avatarProps) {
    return (
        <div className={`w-15 h-20 overflow-hidden rounded-sm shrink-0`}>
            <Image
                src={src}
                alt={alt}
                width={100}
                height={100}
                className="object-cover"
                unoptimized={true}
            />
        </div>
    );
}