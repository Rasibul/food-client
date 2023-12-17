import { useEffect, useState } from "react";

const Menu = () => {
    const [menu, setMenu] = useState([])
    const [filterItem, setFilterItem] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [option, setOption] = useState()

    // loading data
    useEffect(() => {
        // fetch data
        const fetchdata = async () => {
            try {
                const response = await fetch('/menu.json')
                const data = await response.json();
                // console.log(data)
                setMenu(data)
                setFilterItem(data)
            }
            catch (error) {
                console.log(error)
            }
        }
        // call the function
        fetchdata()
    }, [])

    // filtering data bye category

    const filterData = (category) => {
        const filterItem = category === "all" ? menu : menu.filter((item) => {
            item.category === 'category'
            setFilterItem(filterItem)
            selectedCategory(category)
        })
    }

    // show all data function

    const showAll = () => {
        setFilterItem(menu)
        setSelectedCategory('all')
    }

    // sort in base function Low to High And High to low

    const handelSortChange = (option) =>{
        setOption(option)

        let sortItem = [...filterItem]

        // logic
        switch(option) {
            case "low-to-high":
              sortItem.sort((a,b) => a.price - b.price)
              break;
            case "high-to-low":
              sortItem.sort((a,b) => b.price - a.price)
              break;
            default:
              // code block
              break;
          }

          setFilterItem(sortItem)
    }





    return (
        <div className="max-w-screen-2xl container mx-auto px-4 md:px-8 xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
            <div className="py-20 md:py-24 lg:py-32 flex flex-col items-center justify-center space-y-8 md:space-y-12">
                {/* texts */}
                <div className="text-center space-y-5">
                    <h2 className="text-3xl md:text-5xl font-bold md:leading-snug leading-snug">
                        For the Love of Delicious<span className="text-green"> Food</span>
                    </h2>
                    <p className="text-gray-700 text-base md:text-xl md:w-4/5 mx-auto">
                        Come with family & feel the joy of mouthwatering food such as Greek SaladLasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas Rellenas and more for
                        a moderate cost.
                    </p>
                    <button className="bg-green text-white font-semibold px-6 md:px-8 py-3 rounded-full">
                        Order Now
                    </button>
                </div>

            </div>
        </div>

    );
};

export default Menu;