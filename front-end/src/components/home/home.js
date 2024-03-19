import { Navigate } from "react-router-dom";
import HeroSection from "./herosection"
import HowItWorks from "./howltworks"
import PopularCategories from "./popular-categories"
import PopularCompanies from "./popular-companies"
import { useContext } from "react";
import { Context } from "../../context";



const Home=()=>{
    const { isAuthorized } = useContext(Context);
  
    if (!isAuthorized) {
      return <Navigate to={"/login"} />;
    }
    return (
      <>
        <section className="homePage page">
          <HeroSection />
          <HowItWorks />
          <PopularCategories />
          <PopularCompanies />
        </section>
      </>
    );
  };
  
  export default Home;