import { Link,  useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";


const ModalBox = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { signUpWithGmail, login } = useAuth()
    const [errorMessage, setErrorMessage] = useState("");

    // const location = useLocation();
    const navigate = useNavigate();
    // const from = location.state?.from?.pathname || "/";

    const handelLogin = () => {
        signUpWithGmail()
            .then((result) => {
                // const user = result.user;
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email
                }
                axios.post('http://localhost:5000/users', userInfo)
                    .then(() => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: "Create User",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/')
                    })
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const onSubmit = (data) => {
        const email = data.email
        const password = data.password
        // console.log(email,password)
        login(email, password)
            .then(() => {
                // const user = result.user
                const userInfo = {
                    name: data.name,
                    email: data.email
                }
                axios.post('http://localhost:5000/users', userInfo)
                    .then(() => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: "Create User",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/')
                    })
            }).catch((err) => {
                const errorMessage = err.message
                setErrorMessage("Provide a correct email and password")
            })
    }
    return (
        <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
            <div className="modal-box">
                <div className="modal-action flex flex-col justify-center mt-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                        <h3 className="font-bold text-lg">Please Login!</h3>

                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                {...register("email")}
                            />
                        </div>

                        {/* password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                {...register("password")}
                            />
                            <label className="label mt-1">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>

                        {/* error */}
                        {
                            errorMessage ? <p className="text-red text-xs italic">{errorMessage}</p> : ""
                        }

                        {/* login btn */}
                        <div className="form-control mt-4">
                            <input
                                type="submit"
                                value="Login"
                                className="btn bg-green text-white"
                            />
                        </div>

                        <p className="text-center my-2">
                            Donot have an account?{" "}
                            <Link to="/signup" className="underline text-red ml-1">
                                Signup Now
                            </Link>{" "}
                        </p>

                        <button
                            htmlFor="my_modal_5"
                            onClick={() => document.getElementById("my_modal_5").close()}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >✕</button>
                    </form>

                    {/* social sign in */}
                    <div className="text-center space-x-3 mb-5">
                        <button className="btn btn-circle hover:bg-green hover:text-white" onClick={handelLogin}>
                            <FaGoogle />
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaFacebookF />
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaGithub />
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default ModalBox;