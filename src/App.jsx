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
import { fetchData } from "./api/api";
import ChatBot from "./components/ChatBot/ChatBot";
import Profile from "./components/Profile/Profile";
import AcceptCookies from "./components/Cookies/AcceptCookies";
import DeliveryButton from "./components/Delivery/DeliveryButton";
import ContactUs from "./components/Contact/ContactUs";

const About = lazy(() => import("./components/About/about"));
const Login = lazy(() => import("./components/Login/login"));
const Details = lazy(() => import("./components/cardDetails/Details"));
const Register = lazy(() => import("./components/Register/Register"));
const ClearCache = lazy(() => import("./components/ClearCache/ClearCache"));

const App = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    async function fetchDataAndSetPhones() {
      const phonesData = await fetchData();
      startTransition(() => {
        setPhones(phonesData);
      });
    }
    fetchDataAndSetPhones();
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
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Suspense>
        <Footer />

        {/* ChatBot Component */}
        <ChatBot />
        {/* Accept Cookies Component */}
        <AcceptCookies />
        {/* Delivery Button Component */}
        <DeliveryButton />
        {/* Add the ContactUs */}
        <ContactUs />
      </div>
    </AuthProvider>
  );
};

export default App;
