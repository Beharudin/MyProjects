import Experties from "./components/experties/Experties";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import People from "./components/people/People";
import Portfolio from "./components/portfolio/Portfolio";
import Topbar from "./components/topbar/Topbar";
import Work from "./components/works/Work";


function App() {
  return (
    <div className="container">
      <Topbar />
      <Hero />
      <Experties/>
      <Work/>
      <Portfolio/>
       <People/>
      <Footer/> 
    </div>
  );
}

export default App;
