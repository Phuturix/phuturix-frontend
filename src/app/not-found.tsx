'use client'
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-full mt-8 max-[401px]:mb-16 max-md:mb-20 max-xl:mb-24 xl:mb-32 h-full flex flex-col justify-center items-center">
      <h2 className="bg-gradient-to-r from-radix-gradient-blue to-radix-gradient-green to-80% bg-clip-text text-transparent">
        <span className="max-[401px]:text-5xl max-sm:text-6xl max-lg:text-7xl max-xl:text-8xl text-9xl font-normal">
          404 :(
        </span>
      </h2>
      <p className="max-[401px]:text-base max-sm:text-lg max-xl:text-xl text-2xl font-normal text-white/90">
        You got the wrong way
      </p>
      <button
        className="btn btn-neutral"
        onClick={() => router.push('/dashboard')}
      >
        Back to trade
      </button>
    </div>
  );
}
