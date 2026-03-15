import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Hub from "./pages/Hub";
import Cake from "./pages/Cake";
import Gallery from "./pages/Gallery";
import Music from "./pages/Music";
import WishCard from "./pages/WishCard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/cake" element={<Cake />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/music" element={<Music />} />
        <Route path="/wish-card" element={<WishCard />} />
      </Routes>
    </BrowserRouter>
  );
}