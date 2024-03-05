import Image from 'next/image';

export default function ImageFoodGlobal() {
  return (
    <div className="w-full h-full rounded-[1.7rem] overflow-hidden shadow-2xl shadow-white-500/40">
      <Image
        src="/image/fresh-vegetables.webp"
        alt=""
        width={600}
        height={600}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
