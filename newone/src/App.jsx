import './App.scss'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './components/firebase/firebaseConfig'
import { useState } from 'react';
import Navbar from './components/navbar'
import Hero from './components/hero'
import { Route, Routes } from 'react-router-dom'
import Logpage from './components/logpage'
import Studash from './components/studash';
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Welcome from './components/welcome';
import About from './components/about';
import Contact from './components/contact';
import Addbooks from './components/addbooks';
import Allbooks from './components/allbook';
import Addstu from './components/addstu';
import Footer from './components/footer';
import Issue from './components/issuerequest';
import Allissue from './components/allissue';
import ManageStu from './components/managestu';


function App() {
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [issignedin, setIssignedin] = useState(false);
  // const [initialRedirect, setInitialRedirect] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        const { photoURL } = user;
        setProfileImageUrl(photoURL || "");
        // setInitialRedirect(true);


      } else {
        setUserEmail("");
        setProfileImageUrl("");
        // setInitialRedirect(true);
      }
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (userEmail === "krishnalakshman67@gmail.com") {
      setIsAdmin(true);
      navigate("/welcome") 

    } else {
      setIsAdmin(false);
    }
    console.log(isAdmin);
    console.log(userEmail);
  }, [userEmail]);
   const  handlegoogle= async(e)=> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    setIssignedin(true); 
    navigate("/studash")
  };

  return (
    <div className='gradient-bg-welcome'>
      <Navbar  setIssignedin={setIssignedin} issignedin={issignedin} isAdmin={isAdmin} profileImageUrl={profileImageUrl} />
      <Routes>
        <Route  path="/" element={ <Hero />} />
        <Route  path="/logpage" element={<Logpage handlegoogle={handlegoogle} />} />
        <Route  path="/studash" element={ <Studash />} />
        <Route path="/welcome" element={ <Welcome  isAdmin={isAdmin}/>} />
        <Route path="/about" element={ <About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/addbooks" element={<Addbooks/>} />
        <Route path="/allbooks" element={<Allbooks   isAdmin={isAdmin}/>} />
        <Route path="/addstu" element={<Addstu/>} />
        <Route path="/issue" element={<Issue/>} />
        <Route path="/allissue" element={<Allissue  isAdmin={isAdmin}/>} />
        <Route path="/managestu" element={<ManageStu/>} />

      </Routes>
      <Footer/>
    </div>
    


  )
}
export default App
