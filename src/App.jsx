import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  startTransition,
} from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Navigation/NavigationBar";
import Card from "./components/ShopItemCard/ItemCard";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./Context/AuthContext";
import "./App.css";

import ChatBot from "./components/ChatBot/ChatBot";

import Profile from "./components/Profile/Profile";

import AcceptCookies from "./components/Cookies/AcceptCookies";

const About = lazy(() => import("./components/About/about"));
const Login = lazy(() => import("./components/Login/login"));
const Details = lazy(() => import("./components/cardDetails/Details"));
const Register = lazy(() => import("./components/Register/Register"));
const ClearCache = lazy(() => import("./components/ClearCache/ClearCache"));

const App = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const module = await import("./components/ShopItemCard/ItemCard");
      const phonesData = await module.logJSONData();
      startTransition(() => {
        setPhones(phonesData);
      });
    }
    fetchData();
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <Nav />
        <Suspense fallback={<h1>Loading</h1>}>
          <Routes>
            <Route path="/" element={<Card />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:brand/:id" element={<Details phones={phones} />} />
            <Route path="/ClearCache" element={<ClearCache />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </Suspense>
        <Footer />

        {/* ChatBot Component */}
        <ChatBot />
        {/* Accept Cookies Component */}
       <AcceptCookies />
      </div>
    </AuthProvider>
  );
};

export default App;