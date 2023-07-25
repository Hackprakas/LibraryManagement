import React from 'react'
import { useNavigate} from 'react-router-dom';
import HeroImage from '../assets/library.png'



export default function hero() {
  const history = useNavigate();
  // const blend ={
  //   // mixBlendMode: "multiply",
  //   // filter:"brightness(150%)",
  // };
  return (
    
    <section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-6xl text-3xl mb-4 font-medium text-white">Welcome to Library
        <br class="hidden text-blue lg:inline-block"/> Management System
      </h1>
      <p class="mb-8 sm:text-2xl text-white leading-relaxed">Manage,request all the required books on the go!</p>
      <div class="flex justify-center">
        <button className=" button inline-flex text-white  bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded-full text-lg" onClick={()=>history("/logpage")}>Get Started</button>
       
      </div>
    </div>
    <div class=" lg:max-w-lg lg:w-72 md:w-1/2 w-52  ">
      <img class="object-cover object-center rounded" alt="hero" src={HeroImage}/>
    </div>
  </div>
</section>
  )
}
