import Hero from "./Components/Hero";
import HIghlights from "./Components/HIghlights";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
  <main className="bg-black">
    <Navbar/>
    <Hero/>
    <HIghlights/>
    
  </main>
  );
};

export default App;
