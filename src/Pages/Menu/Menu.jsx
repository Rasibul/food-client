import { useEffect, useState } from "react";
import FoodCard from "../../Components/FoodCard/FoodCard";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage] = useState(8)

  // loading data
  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/menu");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data); // Initially, display all items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterData = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filteredItems];

    switch (option) {
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // pagination logic
  const indexOfLastItem = currentPage * itemPerPage
  const indexOfFirtstItem = indexOfLastItem - itemPerPage
  const currenItems = filteredItems.slice(indexOfFirtstItem, indexOfLastItem)
  const pageinate = (pageNumber) => setCurrentPage(pageNumber)




  return (
    // <div>
    //   <div className="max-w-screen-2xl container mx-auto px-4 md:px-8 xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
    //     <div className="py-36 flex flex-col items-center justify-center space-y-8 md:space-y-12">
    //       {/* texts */}
    //       <div className="text-center space-y-5">
    //         <h2 className="text-3xl md:text-5xl font-bold md:leading-snug leading-snug">
    //           For the Love of Delicious<span className="text-green"> Food</span>
    //         </h2>
    //         <p className="text-gray-700 text-base md:text-xl md:w-4/5 mx-auto">
    //           Come with family & feel the joy of mouthwatering food such as Greek SaladLasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas Rellenas and more for a moderate cost.
    //         </p>
    //         <button className="bg-green text-white font-semibold px-6 md:px-8 py-3 rounded-full">
    //           Order Now
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="section-container">
    //     {/* all category btns */}
    //     <div>
    //       <div className="flex flex-row justify-center md:items-center md:gap-8 gap-4 flex-wrap mb-4">
    //         <button onClick={showAll} className={`w-full md:w-auto lg:w-auto mb-2 md:mb-0 lg:mb-0 ${selectedCategory === 'all' ? 'active' : ''}`}>All</button>
    //         <button onClick={() => filterData("salad")} className={`w-full md:w-auto lg:w-auto mb-2 md:mb-0 lg:mb-0 ${selectedCategory === 'salad' ? 'active' : ''}`}>Salad</button>
    //         <button onClick={() => filterData("pizza")} className={`w-full md:w-auto lg:w-auto mb-2 md:mb-0 lg:mb-0 ${selectedCategory === 'pizza' ? 'active' : ''}`}>Pizza</button>
    //         <button onClick={() => filterData("soup")} className={`w-full md:w-auto lg:w-auto mb-2 md:mb-0 lg:mb-0 ${selectedCategory === 'soup' ? 'active' : ''}`}>Soups</button>
    //         <button onClick={() => filterData("dessert")} className={`w-full md:w-auto lg:w-auto mb-2 md:mb-0 lg:mb-0 ${selectedCategory === 'dessert' ? 'active' : ''}`}>Desserts</button>
    //         <button onClick={() => filterData("drinks")} className={`w-full md:w-auto lg:w-auto mb-2 md:mb-0 lg:mb-0 ${selectedCategory === 'drinks' ? 'active' : ''}`}>Drinks</button>
    //       </div>
    //       {/* sorting and filtering */}
    //       <div className="flex justify-center items-center mb-4">
    //         <div className="bg-black p-2">
    //           <FaFilter className=" text-white" />
    //         </div>
    //         <select name="sort"
    //           onChange={(e) => handleSortChange(e.target.value)}
    //           value={sortOption}
    //           className="bg-black text-white px-2 py-1 rounded-sm"
    //         >
    //           <option value="default">Default</option>
    //           <option value="low-to-high">Low To High</option>
    //           <option value="high-to-low">High To Low</option>
    //         </select>
    //       </div>
    //     </div>
    //     <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
    //       {currenItems.map((item) => (
    //         <FoodCard key={item._id} item={item} />
    //       ))}
    //     </div>
    //   </div>
    //   {/* paginate */}
    //   <div className="flex justify-center my-8 ">
    //     {
    //       Array.from({ length: Math.ceil(filteredItems.length / itemPerPage) }).map((_, index) => (
    //         <button
    //           key={index + 1}
    //           onClick={() => pageinate(index + 1)}
    //           className = {`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"}`}
    //         >
    //           {index + 1}
    //         </button>
    //       ))
    //     }
    //   </div>
    // </div >
    <div>
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-8 xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious<span className="text-green"> Food</span>
            </h2>
            <p className="text-gray-700 text-base md:text-xl md:w-3/4 lg:w-2/3 mx-auto">
              Come with family & feel the joy of mouthwatering food such as Greek SaladLasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas Rellenas and more for a moderate cost.
            </p>
            <button className="bg-green text-white font-semibold px-6 md:px-8 py-3 rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      <div className="section-container">
        <div className="mb-4">
          <div className="flex flex-col md:flex-row justify-center md:items-center md:gap-8 gap-4">
            <button onClick={showAll} className={`w-full md:w-auto lg:w-auto mb-2 md:mb-0 lg:mb-0 btn-category ${selectedCategory === 'all' ? 'active' : ''}`}>All</button>
            <button onClick={() => filterData("salad")} className={`w-full md:w-auto lg:w-auto mb-2 md:mb-0 lg:mb-0 btn-category ${selectedCategory === 'salad' ? 'active' : ''}`}>Salad</button>
            <button onClick={() => filterData("pizza")} className={`w-full md:w-auto lg:w-auto mb-2 md:mb-0 lg:mb-0 btn-category ${selectedCategory === 'pizza' ? 'active' : ''}`}>Pizza</button>
            <button onClick={() => filterData("soup")} className={`w-full md:w-auto lg:w-auto mb-2 md:mb-0 lg:mb-0 btn-category ${selectedCategory === 'soup' ? 'active' : ''}`}>Soups</button>
            <button onClick={() => filterData("dessert")} className={`w-full md:w-auto lg:w-auto mb-2 md:mb-0 lg:mb-0 btn-category ${selectedCategory === 'dessert' ? 'active' : ''}`}>Desserts</button>
            <button onClick={() => filterData("drinks")} className={`w-full md:w-auto lg:w-auto mb-2 md:mb-0 lg:mb-0 btn-category ${selectedCategory === 'drinks' ? 'active' : ''}`}>Drinks</button>
          </div>

          <div className="flex justify-center items-center mb-4 mt-4">
            <div className="bg-black p-2">
              <FaFilter className="text-white" />
            </div>
            <select
              name="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm mx-2 md:mx-4"
            >
              <option value="default">Default</option>
              <option value="low-to-high">Low To High</option>
              <option value="high-to-low">High To Low</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {currenItems.map((item) => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      <div className="flex justify-center my-8">
        {Array.from({ length: Math.ceil(filteredItems.length / itemPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => pageinate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full pagination-btn ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>



  );
};

export default Menu;