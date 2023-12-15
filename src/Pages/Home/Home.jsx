import Banner from "./Banner";
import Categories from "./Categories";
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
        </div>
    );
};

export default Home;