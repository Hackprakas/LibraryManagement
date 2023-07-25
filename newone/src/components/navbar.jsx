import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase/firebaseConfig'

export default function navbar({ setIssignedin,issignedin,isAdmin,profileImageUrl,setInitialRedirect}) {
  const history = useNavigate();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout =  async() => {
    try {
      await auth.signOut();
      setIssignedin(false);
      // setInitialRedirect(true);
      navigate("/");
      setIsSidebarOpen(false);
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  return (
    <header class="text-gray-600 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          {issignedin && (
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
            onClick={toggleSidebar}
          >
            Menu
          </button>)}
          {isSidebarOpen && issignedin && (
            <div className="bg-gray-200 h-35 w-60 fixed top-16 left-0 rounded-lg transform translate-x-0 transition-transform duration-300 ease-in-out z-10 sidebar">
              <nav className="mt-2">
                <a className="block py-2 px-4 text-gray-800 font-semibold cursor-pointer hover:bg-gray-300"
                  onClick={handleLogout}  > Home</a>
                <a
                  className="block py-2 px-4 text-gray-800 font-semibold hover:bg-gray-300"
                  onClick={() => navigate("/about")}
                >
                  About
                </a>
                <a
                  className="block  py-2 px-4 text-gray-800 font-semibold hover:bg-gray-300"
                  onClick={() => navigate("/contact")}
                >
                  contact
                </a>
                 <a
                  className="block  mb-2 py-2 px-4 text-gray-800 font-semibold hover:bg-gray-300"
                  href="#" onClick={handleLogout}
                >
                  Logout
                </a>
              </nav>
            </div>
            )}
          
          <span class="ml-3 text-xl text-white">Library Management</span>
        </a>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a class="mr-5  text-white hover:text-gray-900" onClick={handleLogout}>Home </a>
          <a class="mr-5 text-white hover:text-gray-900"onClick={() => navigate("/about")}>about</a>
          <a class="mr-5 text-white hover:text-gray-900"onClick={() => navigate("/contact")}>Contact</a>
        </nav>
        {issignedin ? (
           <div className="w-12 h-12 rounded-full overflow-hidden">
           <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
         </div>
        ) :(
          <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={() => history("/logpage")}>Login
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>)}
      </div>
    </header>
  )
}
