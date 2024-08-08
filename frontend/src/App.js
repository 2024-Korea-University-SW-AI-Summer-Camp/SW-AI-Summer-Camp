import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import CategorySelection from "./pages/CategorySelection";
import CharacterSelection from "./pages/CharacterSelection";
import CardSelection from "./pages/CardSelection";
import Result from "./pages/Result";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/categoryselection":
        title = "";
        metaDescription = "";
        break;
      case "/characterselection":
        title = "";
        metaDescription = "";
        break;
      case "/cardselection":
        title = "";
        metaDescription = "";
        break;
      case "/result":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categoryselection" element={<CategorySelection />} />
      <Route path="/characterselection" element={<CharacterSelection />} />
      <Route path="/cardselection" element={<CardSelection />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}
export default App;
