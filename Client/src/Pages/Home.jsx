
import Features from "../Components/Features";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Testimonials from "../Components/Testimonials";

function Home() {


    return (
        
            <div className="bg-gradient-to-b from-black to-gray-900 ">
                <Hero />
                <Features />
                <Testimonials />
                <Footer />
            </div>

    );
}
export default Home;
