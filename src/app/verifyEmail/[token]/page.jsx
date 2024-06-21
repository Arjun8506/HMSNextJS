"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/components/appComponents/Loader";

const verifyEmailPage = () => {
  const [token, settoken] = useState("");
  const [loading, setloading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const url = window.location.href;
    const urlArray = url.split("/");
    console.log(urlArray);
    const token = urlArray[4];
    settoken(token);
  }, []);

  const verifyEmail = async () => {
    setloading(true)
    try {
      const res = await axios.post("http://localhost:3000/api/user/verifyEmail", { token })
      console.log(res);
      console.log(res.data);
      if (res.data.success === false) {
        toast.error(res.data.message)
        return
      }
      toast.success(res.data.message)
      return router.push("/login")
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setloading(false)
    }
  }

  return (
    <section>
      <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
        <h1>Click on the button Below to verify</h1>
        <button className="py-2 px-4 uppercase font-bold bg-green-400 rounded-lg border-2 border-green-700 hover:opacity-80 disabled:opacity-20"
        disabled={loading}
        onClick={verifyEmail}
        >
          {loading ? (
            <Loader />
          ) : "Verify"}
        </button>
      </div>
    </section>
  );
};

export default verifyEmailPage;
