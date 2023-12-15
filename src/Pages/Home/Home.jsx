import Banner from "./Banner";
import Categories from "./Categories";
import SpecialDishes from "./SpecialDishes";
import Testimonial from "./Testimonial";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <SpecialDishes></SpecialDishes>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;