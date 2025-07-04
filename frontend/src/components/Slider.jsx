import {motion} from "framer-motion"

const logos = [
  "/companyLogo/Google_2015_logo.jpg",
  "/companyLogo/microsoft.jpg",
  "/companyLogo/ola.jpg",
  "/companyLogo/microsoft.jpg",
  "/companyLogo/png-transparent-airbnb-logo.jpg",
  "/companyLogo/ola.jpg",
  "/companyLogo/vercel.jpg",
  "/companyLogo/microsoft.jpg"

];

const Slider = () => {
  return (
    <div className="overflow-hidden w-screen md:w-full mt-4">
        <motion.div
        className="flex gap-16 mt-10 w-full"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
       
       style={{
          width: "max-content",
          display: "flex",
          whiteSpace: "nowrap",
        }}
        >
            {[...logos, ...logos].map((logo, index)=>(
                <img
                key={index}
                src={logo}
                className="h-10 grayscale hover:grayscale-0 transition duration-300"
                style={{ flexShrink: 0 }}
                />
            ))}
        </motion.div>
    </div>
  )
}

export default Slider