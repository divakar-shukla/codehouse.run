import { SparklesCore } from '@/components/ui/sparkles';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="w-screen overflow-hidden ">
      <div className="mx-auto md:mt-25 mt-15 w-screen max-w-3xl">
        <div className="text-center text-3xl  text-[var(--primary)]">
            <div className='flex justify-center items-center'>
                <div className="border flex items-center px-6 py-2 rounded-2xl mb-8 bg-[var(--secondary)]"> 
                   <div className="text-sm font-semibold inline-flex mr-4 ">Trusted by 1M+ Learners</div>
                <span className="relative inline-flex size-3">
                   <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-[var(--foreground)]" ></span>
                   <span className="relative inline-flex size-3 rounded-full bg-[var(--foreground)]"  ></span>
               </span>
               </div> 
               
            </div>
          <div className=" text-[var(--primary)] text-3xl font-bold">Level Up Your Coding Skills</div>
  
          <div className='text-[var(--foreground)] text-5xl font-bold mt-4'>Land Your Dream Job</div>
          <div className='text-lg mt-8 text-[var(--detail-font-color)] '>Are you preparing for your dream job in tech? At CodeHouse.run, we bring you a curated set of real-world coding challenges, interview-focused problems, and guided solutions so you can learn, practice, and grow every single day.</div>
          
            <div className="items-center justify-center gap-x-3  sm:flex mt-8">
              <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#eab308_0%,#202020_50%,#ffffff_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[var(--secondary)] text-sm font-medium text-[var(--primary)] backdrop-blur-3xl">
                  <Link
                    to="#"
                    className="group inline-flex w-full items-center justify-center rounded-full border-[1px] border-input bg-gradient-to-tr from-[var(--primary)]/5 var(--foreground)/20 to-transparent px-10 py-3 text-center text-[var(--primary)] transition-colors hover:bg-transparent/90 sm:w-auto"
                  >
                    <span className='mr-4'>Get Start </span> <ArrowRight/>
                  </Link>
                </div>
              </span>
            </div>

        </div>
      </div>
 
      <div className="relative -mt-32 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#e60a64,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#c5769066] after:bg-zinc-900">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          particleDensity={300}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>
    </div>
  )
}

export default HeroSection