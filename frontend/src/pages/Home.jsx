import React from 'react'
import HeroSection from '../components/HeroSection'
import AnimatedGradientHeading from '../components/heading/AnimatedGradientHeading'
import Slider from '../components/Slider'
import { List, Languages, Braces, ChartNoAxesCombined, Route, Scaling, MessageCircleCode} from 'lucide-react'
import {motion} from "framer-motion"
import AnimatedBorderCard from '../components/AnimatedBorderCard '
import Footer from '@/components/Footer'
const Home = () => {
  return (
    <div className='mt-[60px] '>
      <HeroSection/>
      <div className=' m-auto max-w-[1300px]'>
        <AnimatedGradientHeading text={"Learners Hired By Top Companies"} className={"md:text-4xl text-3xl -mt-8"}/>
        <Slider/>

         <AnimatedGradientHeading text={"Feature"} className={"md:text-4xl text-3xl mt-12"}/>

         <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-15 '>
          <div className='col-span-1 md:col-span-2'>
            <AnimatedBorderCard icon={<List className='size-6 text-[var(--primary)]'/>} heading={"Playlists for Guided Learning"} description={"Explore structured playlists that guide you through essential topics like Arrays, Strings, Trees, Dynamic Programming, and System Design. Whether you're a beginner building a strong foundation or a job-seeker preparing for FAANG interviews, each playlist is thoughtfully organized to help you grow consistently and avoid overwhelm. Unlock badges as you complete each track and measure your readiness with topic-specific challenges."}/>
          </div>
          <div className='col-span-1 h-full'>
            <AnimatedBorderCard icon={<Languages  className='size-6 text-[var(--primary)]'/>} heading={"Multi-Language Support"} description={"Write and run code in Python, JavaScript, and Java right in your browser. More languages coming soon!"}/>
          </div>
          <div className='col-span-1 h-full'>
            <AnimatedBorderCard icon={<Braces className='size-6 text-[var(--primary)] '/>} heading={"Practice with Real Interview Questions"} description={"Write and run code in Python, JavaScript, and Java right in your browser. More languages coming soon!"}/>
          </div>
          <div className='md:col-span-2 col-span-1 h-full'>
            <AnimatedBorderCard icon={<ChartNoAxesCombined  className='size-6 text-[var(--primary)]'/>} heading={"Progress Tracking"} description={"Your journey matters and we make sure you never lose sight of it. With our smart progress tracking system, you can monitor the number of problems solved, accuracy rate, time spent, and your improvement over time. See visual charts of your completed playlists. Whether you're preparing for a coding interview or building consistent daily habits, our dashboard helps you stay focused, set achievable goals, and celebrate every milestone."}/>
          </div>
          <div className='md:col-span-2 md:row-span-2 col-span-1 row-span-1 h-full'>
            <AnimatedBorderCard icon={<Scaling  className='size-6 text-[var(--primary)]'/>} heading={"Resizable Coding Interface"} description={"Enjoy a seamless coding experience with our resizable editor and console. Customize your layout, choose your theme (dark/light), and focus only on what matters—writing clean, working code. Perfect for both small screens and full desktops."} other={<img src='https://www.leetlabs.in/assets/workspace-u_LUFkCN.jpg' className='w-full mt-8'/>}/>
          </div>
          <div className='h-full col-span-1'>
            <AnimatedBorderCard icon={<Route  className='size-6 text-[var(--primary)]'/>} heading={"Structured Learning Paths"} description={"Start with programming basics, grow through intermediate problem-solving, and tackle expert-level questions. No matter where you begin, codeHouse.run adapts to your journey and helps you keep moving forward with confidence."} />
          </div>
          <div className='h-full col-span-1'>
            <AnimatedBorderCard icon={<MessageCircleCode  className='size-6 text-[var(--primary)]'/>} heading={"Instant Feedback"} description={"Get immediate results after each submission, view detailed error messages, and use built-in hints if you’re stuck. Learn how to think through problems—not just solve them."} />
          </div>
         </div>
         <div className='border-b mt-25 mb-20 h-[2px] bg-gradient-to-r from-[var(--background)] from-5% via-[var(--foreground)] via-50%  to-[var(--background)] to-95% '></div>
         <Footer/>
      </div>
      
    </div>
  )
}

export default Home