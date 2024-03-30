import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpType } from "@sagarb2003/blog-web";
import axios from "axios";

export const Auth = ({ type }: { type: "Sign up" | "Sign in" }) => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<SignUpType>({
    name: "",
    email: "",
    password: "",
  });
  async function sendRequest() {
    try {
      const response = await axios.post(
        `https://backend.sagarsinghbisht248.workers.dev/api/v1/user/${
          type === "Sign up" ? "signup" : "signin"
        }`,
        userInput
      );
      //   console.log(response);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
    //   console.error("Error in sending request:", e);
      alert("Error in Signing up");
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col text-center">
      <div className="text-4xl font-bold">
        {type == "Sign up" ? "Create an account" : "Login"}
      </div>
      <div className=" flex justify-center text-lg text-slate-500 mt-4">
        <div className="pr-2">
          {type == "Sign up"
            ? "Already have an account?"
            : "Don't have an Account?"}
        </div>
        <Link
          to={type == "Sign up" ? "/signin" : "/signup"}
          className="underline"
        >
          {type == "Sign up" ? "Login" : "Sign in"}
        </Link>
        {/* {JSON.stringify(userInput)} */}
      </div>
      <div className="flex flex-col ">
        {type == "Sign up" ? (
          <LabelledInput
            label="Name"
            placeholder="John"
            onChange={(e) => {
              setUserInput({ ...userInput, name: e.target.value });
            }}
          />
        ) : (
          ""
        )}
        <LabelledInput
          label="E-mail"
          placeholder="abc@gmail.com"
          onChange={(e) => {
            setUserInput({ ...userInput, email: e.target.value });
          }}
        />
        <LabelledInput
          label="Password"
          placeholder="* * * * *"
          type={"password"}
          onChange={(e) => {
            setUserInput({ ...userInput, password: e.target.value });
          }}
        />
      </div>
      <div className="mt-2">
        <button
          className="bg-black text-white w-72 text-lg font-bold p-2 rounded-xl"
          onClick={sendRequest}
        >
          {type == "Sign up" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

interface labelledInput {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: labelledInput) {
  return (
    <div className="m-2">
      <div>
        <label className=" block mb-2 text-md font-bold text-gray-900 ">
          {label}
        </label>
      </div>
      <div className="flex justify-center mt-3">
        <input
          type={type || "text"}
          className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}
