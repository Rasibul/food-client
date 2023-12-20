import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import ModalBox from "../ModalBox/ModalBox";
// import { useState } from "react";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)
    return (
        <div className="max-w-md mx-auto my-10 shadow w-full flex justify-center items-center bg-white">
            <div className="modal-action flex flex-col justify-center mt-0">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                    <h3 className="font-bold text-lg">Create An Account!</h3>

                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name Here"
                            className="input input-bordered"
                        />
                    </div>
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
                    {/* {
                        errorMessage ? <p className="text-red text-xs italic">{errorMessage}</p> : ""
                    } */}

                    {/* login btn */}
                    <div className="form-control mt-4">
                        <input
                            type="submit"
                            value="Sign Up"
                            className="btn bg-green text-white"
                        />
                    </div>

                    <p className="text-center my-2">
                        Alredy have an account?{" "}
                        <button onClick={() => document.getElementById('my_modal_5').showModal()}>
                            <Link to="/signup" className="underline text-red ml-1">
                                Login Now
                            </Link>{" "}
                        </button>
                    </p>

                    <Link to="/"
                        onClick={() => document.getElementById("my_modal_5").close()}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >✕</Link>
                </form>

                {/* social sign in */}
                <div className="text-center space-x-3 mb-5">
                    <button className="btn btn-circle hover:bg-green hover:text-white">
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
            <ModalBox />
        </div>
    );
};

export default SignUp;