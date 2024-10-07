import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex gap-x-3">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={24}
        height={24}
        className="h-10 w-10"
      />
      <h1 className="text-3xl font-bold shadow-yellow-400 drop-shadow-md lg:text-4xl">
        <Link href="/">Occasionaly</Link>
      </h1>
    </div>
  );
};

export default Logo;
