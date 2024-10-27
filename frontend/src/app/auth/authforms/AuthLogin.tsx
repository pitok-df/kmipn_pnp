'use client'

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setCookie } from 'cookies-next'

interface JwtPayload {
  exp: number; // Waktu expire dalam format Unix (seconds)
  user: any
}

const AuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post("http://localhost:2003/api/v1/login", {
        email,
        password,
      }, { withCredentials: true });

      if (response.data.success) {
        const accessToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        setCookie("accessToken", accessToken);
        const decoded: JwtPayload = jwtDecode(accessToken);
        localStorage.setItem('user_name', decoded.user.name);
        localStorage.setItem('idUser', decoded.user.id);
        // redirect ke halaman dashboard

        window.location.href = "/dashboard";
      } else {
        // Jika login gagal, tampilkan pesan error
        setErrorMsg(response.data.msg || "Login failed");
      }
    } catch (errors: any) {
      if (errors) {
        console.log(errors)
        const error = errors.response.data;
        if (error.statusCode === 404) setErrorMsg("You not registered.");
        if (error.statusCode === 401) setErrorMsg("Invalid credential.");
        if (error.statusCode === 400) setErrorMsg(`${error.msg}`);
      } else {
        setErrorMsg("Failed.")
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {errorMsg && (
        <div className="text-red-500 mb-4 bg-red-100 p-3">
          {errorMsg}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            sizing="md"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="userpwd" value="Password" />
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" />
            <Label
              htmlFor="accept"
              className="opacity-90 font-medium cursor-pointer"
            >
              Remember me
            </Label>
          </div>
          <Link href={"/"} className="text-primary text-sm font-medium">
            Forgot Password?
          </Link>
        </div>
        <Button
          color={"primary"}
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
