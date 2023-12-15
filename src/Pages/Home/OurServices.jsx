const OurServices = () => {
    const serviceLists = [
        { id: 1, title: "Catering", des: "Delight your guests with our flavors and  presentation", img: "https://i.ibb.co/b3GhJLT/icon1.png" },
        { id: 2, title: "Fast delivery", des: "We deliver your order promptly to your door", img: "https://i.ibb.co/k0XFwqW/icon2.png" },
        { id: 3, title: "Online Ordering", des: "Explore menu & order with ease using our Online Ordering n", img: "https://i.ibb.co/PCmn98H/icon3.png" },
        { id: 4, title: "Gift Cards", des: "Give the gift of exceptional dining with Foodi Gift Cards", img: "https://i.ibb.co/dft0WdG/icon4.png" },
    ]
    return (
        <div className="section-container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2">
                    <div className="text-left md:w-4/5">
                        <p className="subtitle">Our Story & Services</p>
                        <h2 className="title">Our Cluinary journey & Services</h2>
                        <p className="my-5 text-secondary leading-[30px]">
                            “I had the pleasure of dining at Foodi last night, and I'm still
                            raving about the experience! The attention to detail in
                            presentation and service was impeccable”
                        </p>
                        <button className="btn bg-green text-white px-8 py-3 rounded-full">Explore</button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                        {
                            serviceLists.map((service) => (
                                <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200">
                                    <img src={service.img} alt="" className=" mx-auto" />
                                    <h5 className="pt-3 font-semibold"> {service.title}</h5>
                                    <p className="text-[#90BD95]">{service.des}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurServices;