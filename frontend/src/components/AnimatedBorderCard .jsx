import {motion} from "framer-motion"
const AnimatedBorderCard  = ({icon, heading, description, other}) => {
  return (
    <motion.div
          whileHover={{ y: 5 }}
          transition={{
             type: "spring",
             stiffness: 200,
             damping: 10,
           }}
          className={`relative group rounded-2xl p-[2px] h-full`}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-border-on-hover z-0" />
            <div className="relative z-10 bg-[var(--popover)] rounded-2xl p-10 border border-[var(--primary)] h-full">
              <div className=''>{icon}<h3 className='md:text-2xl text-xl text-[var(--foreground)] mb-8'>{heading}</h3></div>
              <p className='text-sm text-[var(--primary)] mt-4'>{description}</p>
              {other}
            </div>
      </motion.div>
  )
}

export default AnimatedBorderCard;