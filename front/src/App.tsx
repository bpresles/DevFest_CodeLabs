import './App.css'
import Header from './components/common/Header.tsx';
import {BrowserRouter as Router} from "react-router-dom";
import NavTab from "./components/common/NavTabs.tsx";
import Footer from "./components/common/Footer.tsx";

function App() {
  return (
    <Router>
        <Header />
        <NavTab />
        <Footer />
    </Router>
  )
}

export default App;
