import Image from "next/image";

interface HeroBannerProps {
  src: string;
  alt: string;
}

export default function HeroBanner({ src, alt }: HeroBannerProps) {
  return (
    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-gray-100">
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" priority />
      ) : (
        <div className="flex h-full items-center justify-center text-gray-400">
          <span className="text-lg">No image</span>
        </div>
      )}
    </div>
  );
}
