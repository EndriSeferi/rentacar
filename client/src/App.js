import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import BookingCar from "./pages/BookingCar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import SearchedCars from "./pages/SearchedCars";
import Language from "./components/Language";

function App() {
  return (
    <div className="App">
      {localStorage.getItem("lang") === null ? <Language /> : ""}
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/booking/:carid" exact element={<BookingCar />} />
        <Route path="/searched" exact element={<SearchedCars />} />
        <Route path="/admin" element={<ProtectedPath />}>
          <Route path="" element={<Admin />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

function ProtectedPath() {
  const auth = localStorage.getItem("user");
  return auth ? <Admin /> : <Navigate to="/login" />;
}
