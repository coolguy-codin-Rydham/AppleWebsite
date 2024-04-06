import Hero from "./Components/Hero";
import HIghlights from "./Components/HIghlights";
import Model from "./Components/Model";
import Navbar from "./Components/Navbar";


const App = () => {
  return (
  <main className="bg-black">
    <Navbar/>
    <Hero/>
    <HIghlights/>
    <Model/>
    
  </main>
  );
};

export default App;
