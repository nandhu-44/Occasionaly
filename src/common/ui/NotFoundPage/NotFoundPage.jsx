import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center px-4 py-28 text-center">
        <div className="max-w-md">
          <Image
            src="/404-Illustration.svg"
            alt="404"
            width={300}
            height={300}
            className="mx-auto h-full w-full"
            priority
            style={{
              layout: "fixed",
            }}
          />
          <h1 className="mt-6 text-3xl font-bold text-gray-800 md:text-4xl">
            404 - Page Not Found
          </h1>
          <p className="mt-4 text-left text-gray-600 lg:text-center">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Button className="mt-8">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
