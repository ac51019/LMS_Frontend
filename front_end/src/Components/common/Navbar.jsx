import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoLight from "../../assets/logo/light/logo-light.svg";
import logoDark from "../../assets/logo/dark/logo-dark.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, faChalkboardUser, faSearch, faBell,
  faShoppingCart, faMoon, faSun,
  faBars, faTimes, faChevronDown, faSignOutAlt,
  faTachometerAlt
} from "@fortawesome/free-solid-svg-icons";
import { authService } from "../../api/auth.service";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { logoutSuccess } from '../../redux/slices/authSlice';
import { fetchAllCourses } from '../../redux/slices/courseSlice';

function Navbar(props) {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const { items: globalCourses = [], status: coursesStatus } = useSelector((state) => state.courses);

  const value = props.page;
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (coursesStatus === 'idle') {
      dispatch(fetchAllCourses());
    }
  }, [coursesStatus, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotificationsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    await authService.logout();
    dispatch(logoutSuccess());
    navigate("/login");
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-[999] transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2 dark:bg-gray-900 dark:border-b dark:border-gray-800' : 'bg-white py-4 shadow-sm dark:bg-gray-900 dark:border-b dark:border-gray-800'}`}>
        <div className="max-w-[1400px] mx-auto px-[4vw] flex justify-between items-center w-full">
          <div className="flex items-center gap-6">
            <img src={isDarkMode ? logoDark : logoLight} alt="Zenlithic Technologies Logo" className="w-[150px] lg:w-[200px] h-auto object-contain cursor-pointer transition-opacity duration-300" onClick={() => navigate("/")} />
            <ul className="hidden lg:flex items-center gap-6 m-0 p-0 ml-4">
              <li className="list-none">
                <Link to={"/"} className={`font-semibold text-[15px] transition-colors ${value === "home" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}>Home</Link>
              </li>
              <li className="list-none flex items-center group cursor-pointer relative">
                <Link to={"/courses"} className={`font-semibold text-[15px] transition-colors ${value === "courses" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}>Courses <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-xs" /></Link>
              </li>
              <li className="list-none">
                <Link to={"/blog"} className={`font-semibold text-[15px] transition-colors ${value === "blog" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}>Blog</Link>
              </li>
              {isAuthenticated && (
                <li className="list-none">
                  <Link to={"/learnings"} className={`font-semibold text-[15px] transition-colors ${value === "learnings" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}>My Learning</Link>
                </li>
              )}
            </ul>
          </div>

          <div className="flex items-center gap-3 lg:gap-5">
            <div className="hidden md:flex relative group">
              <div className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 transition-all ${searchOpen ? 'ring-2 ring-blue-500 shadow-sm w-[250px]' : 'w-[200px]'}`}>
                <FontAwesomeIcon icon={faSearch} className="text-gray-500 dark:text-gray-400" />
                <input type="text" placeholder="Search courses..." className="bg-transparent border-none outline-none ml-2 text-sm w-full dark:text-gray-200" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setSearchOpen(true)} onBlur={() => setTimeout(() => setSearchOpen(false), 200)} />
              </div>
              {searchOpen && searchQuery && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 overflow-hidden">
                  {globalCourses
                    .filter((course) => course.course_name?.toLowerCase().includes(searchQuery.toLowerCase()))
                    .slice(0, 5)
                    .map((course) => (
                      <div
                        key={course.course_id}
                        onMouseDown={() => {
                          navigate(`/course/${course.course_id}`);
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-200 flex flex-col transition-colors"
                      >
                        <span className="font-semibold">{course.course_name}</span>
                      </div>
                    ))}
                  {globalCourses.filter((course) => course.course_name?.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">No courses found</div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 md:border-l md:pl-4 border-gray-200">
              <button onClick={() => dispatch(toggleTheme())} className="hidden md:flex text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 w-8 h-8 items-center justify-center rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
              </button>

              {isAuthenticated ? (
                <>
                  <Link to="/cart" className="relative text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {cartTotal > 0 && <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-[10px] font-bold px-[5px] rounded-full">{cartTotal}</span>}
                  </Link>
                  <div className="relative" ref={notifRef}>
                    <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative text-gray-500 hover:text-blue-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-50">
                      <FontAwesomeIcon icon={faBell} />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    {notificationsOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 font-semibold text-gray-700">Notifications</div>
                        <div className="px-4 py-3 border-b border-gray-50 text-sm">No new notifications</div>
                      </div>
                    )}
                  </div>

                  <div className="relative ml-2" ref={profileRef}>
                    <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-500 p-[2px]">
                      <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><FontAwesomeIcon icon={faUser} /></div>
                    </button>
                    {profileOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                        <div className="py-2">
                          <Link to="/profile" className="flex items-center px-5 py-2 hover:bg-blue-50 text-gray-700 text-sm"><FontAwesomeIcon icon={faTachometerAlt} className="w-4 mr-3" /> Dashboard</Link>
                          <Link to="/learnings" className="flex items-center px-5 py-2 hover:bg-blue-50 text-gray-700 text-sm"><FontAwesomeIcon icon={faChalkboardUser} className="w-4 mr-3" /> My Courses</Link>
                          <button onClick={handleLogOut} className="w-full text-left flex items-center px-5 py-2 hover:bg-red-50 text-red-600 text-sm"><FontAwesomeIcon icon={faSignOutAlt} className="w-4 mr-3" /> Log Out</button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex gap-2 ml-2">
                  <button onClick={() => navigate("/login")} className="hidden md:block px-5 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 rounded-lg">Log In</button>
                  <button onClick={() => navigate("/register")} className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Sign Up</button>
                </div>
              )}
            </div>

            <button className="lg:hidden text-gray-600 w-8 h-8 flex items-center justify-center text-xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>
      </nav>
      <div className="h-[78px]"></div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[998] bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-[78px] left-0 right-0 bg-white shadow-xl py-4" onClick={e => e.stopPropagation()}>
            <Link to="/" className="block px-6 py-3 hover:bg-blue-50 font-medium text-gray-700">Home</Link>
            <Link to="/courses" className="block px-6 py-3 hover:bg-blue-50 font-medium text-gray-700">Courses</Link>
            <Link to="/blog" className="block px-6 py-3 hover:bg-blue-50 font-medium text-gray-700">Blog</Link>
            {isAuthenticated ? (
              <>
                <Link to="/learnings" className="block px-6 py-3 hover:bg-blue-50 font-medium text-gray-700">My Learnings</Link>
                <Link to="/profile" className="block px-6 py-3 hover:bg-blue-50 font-medium text-gray-700">Profile</Link>
                <button onClick={handleLogOut} className="block w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 font-medium">Log Out</button>
              </>
            ) : (
              <div className="px-6 py-4 flex flex-col gap-3">
                <button onClick={() => navigate("/login")} className="w-full py-2 text-blue-600 bg-blue-50 rounded-lg">Log In</button>
                <button onClick={() => navigate("/register")} className="w-full py-2 text-white bg-blue-600 rounded-lg">Sign Up</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;