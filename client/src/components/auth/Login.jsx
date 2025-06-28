import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { USER_API_END_POINT } from "@/utils/constant";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
         navigate("/");
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <section className="container mx-auto flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onSubmit={submitHandler}
          className="w-full max-w-lg rounded-2xl bg-white/60 backdrop-blur-md shadow-2xl ring-1 ring-black/5 dark:bg-gray-800/60 dark:ring-white/10 p-8"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 mb-8 text-center">
            Welcome Back
          </h1>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="govindthakur@gmail.com"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-base focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              />
            </div>

            <RadioGroup
              className="flex items-center justify-center gap-8 pt-4"
              value={input.role}
              onValueChange={(val) => setInput({ ...input, role: val })}
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-sky-600"
                />
                <Label htmlFor="student" className="cursor-pointer text-gray-700 dark:text-gray-300">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="recruiter"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-sky-600"
                />
                <Label htmlFor="recruiter" className="cursor-pointer text-gray-700 dark:text-gray-300">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>

            {loading ? (
              <Button
                disabled
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-600/80 hover:bg-sky-600 text-white px-4 py-3 text-lg font-semibold shadow-lg backdrop-blur-md"
              >
                <Loader2 className="h-5 w-5 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white px-4 py-3 text-lg font-semibold shadow-lg backdrop-blur-md transition-all"
              >
                Login
              </Button>
            )}

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account? {" "}
              <Link to="/signup" className="font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400">
                Sign up
              </Link>
            </p>
          </div>
        </motion.form>
      </section>
    </div>
  );
};

export default Login;
