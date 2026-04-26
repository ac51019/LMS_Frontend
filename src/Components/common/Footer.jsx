
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function Footer() {


  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6 relative font-sans">
      <div className="container mx-auto max-w-6xl">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-12 mb-12">


        <div className="text-left">
          <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-indigo-500 pb-2 inline-block">Top Categories</h3>
          <ul className="space-y-3 text-sm">
            <li><span className="hover:text-indigo-400 flex items-center gap-2 cursor-pointer transition-colors"><span className="text-indigo-500 text-xs text-[#6366f1]">▹</span> Web Development</span></li>
            <li><span className="hover:text-indigo-400 flex items-center gap-2 cursor-pointer transition-colors"><span className="text-indigo-500 text-xs text-[#6366f1]">▹</span> Machine Learning</span></li>
            <li><span className="hover:text-indigo-400 flex items-center gap-2 cursor-pointer transition-colors"><span className="text-indigo-500 text-xs text-[#6366f1]">▹</span> Cloud Computing</span></li>
            <li><span className="hover:text-indigo-400 flex items-center gap-2 cursor-pointer transition-colors"><span className="text-indigo-500 text-xs text-[#6366f1]">▹</span> Cybersecurity</span></li>
            <li><span className="hover:text-indigo-400 flex items-center gap-2 cursor-pointer transition-colors"><span className="text-indigo-500 text-xs text-[#6366f1]">▹</span> Mobile App Design</span></li>
          </ul>
        </div>

        <div className="text-left"> 
          <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-indigo-500 pb-2 inline-block">Support & Legal</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/help-center" className="hover:text-indigo-400 flex items-center gap-2 cursor-pointer transition-colors"><span className="text-indigo-500 text-xs text-[#6366f1]">▹</span> Help Center & FAQ</Link></li>
            <li><Link to="/terms" className="hover:text-indigo-400 flex items-center gap-2 cursor-pointer transition-colors"><span className="text-indigo-500 text-xs text-[#6366f1]">▹</span> Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-indigo-400 flex items-center gap-2 cursor-pointer transition-colors"><span className="text-indigo-500 text-xs text-[#6366f1]">▹</span> Privacy Policy</Link></li>
            <li><Link to="/refund" className="hover:text-indigo-400 flex items-center gap-2 cursor-pointer transition-colors"><span className="text-indigo-500 text-xs text-[#6366f1]">▹</span> Refund Policy</Link></li>
            <li><Link to="/sitemap" className="hover:text-indigo-400 flex items-center gap-2 cursor-pointer transition-colors"><span className="text-indigo-500 text-xs text-[#6366f1]">▹</span> Site Map</Link></li>
          </ul>
        </div>


        
        <div className=" text-left  ">
          <h3 className="text-xl font-bold text-white mb-6 border-b-2 border-indigo-500 pb-2 inline-block">
            About ZeLMS
          </h3>

          <p className="text-sm leading-relaxed mb-6 text-gray-400">
            Empowering learners worldwide with top-tier courses. Expand your skills and achieve your goals with our modern learning platform.
          </p>

          <div className="space-y-3 text-sm text-gray-400">
            <p className="flex items-center gap-3 hover:text-white cursor-pointer">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-500 w-4" />
              NRI Circle, Pratap Nagar, Jaipur
            </p>

            <p className="flex items-center gap-3 hover:text-white cursor-pointer">
              <FontAwesomeIcon icon={faPhone} className="text-indigo-500 w-4" />
              <a href="tel:+917791999124">+917791999124</a>
            </p>

            <p className="flex items-center gap-3 hover:text-white cursor-pointer">
              <FontAwesomeIcon icon={faEnvelope} className="text-indigo-500 w-4" />
              <a href="mailto:zenlithictechnologies@gmail.com">
                zenlithictechnologies@gmail.com
              </a>
            </p>
          </div>



        </div>


       
      </div>

      <div className=" border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center max-w-[1400px] mx-auto">
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} ZeLMS. All rights reserved.</p>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-600 text-white transition-all hover:-translate-y-1"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-500 text-white transition-all hover:-translate-y-1"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-400 text-white transition-all hover:-translate-y-1"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="https://www.linkedin.com/company/zenlithic-technologies-private-limited" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 text-white transition-all hover:-translate-y-1"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 text-white transition-all hover:-translate-y-1"><FontAwesomeIcon icon={faYoutube} /></a>
        </div>
      </div>

      </div>
    </footer>
  );
}

export default Footer;