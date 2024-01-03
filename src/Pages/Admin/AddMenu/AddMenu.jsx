import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddMenu = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    // IMAGE HOISTINGIN IMAGEBB

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    // console.log(image_hosting_key)
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const onSubmit = async (data) => {
        // console.log(data);
        const imageFile = { image: data.image[0] };
        const hoistingImage = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        // console.log(hoistingImage)
        if (hoistingImage.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: hoistingImage.data.data.display_url
            };

            // console.log(menuItem);
            const postMenuItem = axiosSecure.post('/menu', menuItem);
            if (postMenuItem) {
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Item is inserted successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <div className="w-full md:w-[870px] px-4 mx-auto">
            <h2 className="text-2xl font-semibold my-4">Upload A New <span className="text-green">Menu Item</span></h2>

            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-screen-md mx-auto">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Recipe Name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select
                            {...register("category", { required: true })}
                            className="select select-bordered"
                            defaultValue="default"
                        >
                            {/* Options... */}
                            <option disabled value="default">
                                Select a category
                            </option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">dessert</option>
                            <option value="drinks">Drinks</option>
                            <option value="popular">Popular</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input
                            type="number"
                            {...register("price", { required: true })}
                            placeholder="Price"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea
                            {...register("recipe", { required: true })}
                            className="textarea textarea-bordered h-24"
                            placeholder="Tell the worlds about your recipe"
                        ></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            className="file-input w-full max-w-xs"
                        />
                    </div>

                    <button className="btn bg-green text-white px-6">
                        Add Item <FaUtensils />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMenu;
