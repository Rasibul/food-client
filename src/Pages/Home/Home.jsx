import Banner from "./Banner";
import Categories from "./Categories";
import Footer from "./Footer";
import OurServices from "./OurServices";
import SpecialDishes from "./SpecialDishes";
import Testimonial from "./Testimonial";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <SpecialDishes></SpecialDishes>
            <Testimonial></Testimonial>
            <OurServices></OurServices>
            <Footer></Footer>
        </div>
    );
};

export default Home;