'use client'

import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";

type registerType = {
  name: string,
  email: string,
  password: string
}

const AuthRegister = () => {
  const [register, setRegister] = useState<registerType>({
    name: "", email: "", password: ""
  });

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post("/api/v1/register", { name: register.name, email: register.email, password: register.password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      )

      console.log(response);

      if (response.status === 201) {
        setErrorMessage(null)
        setSuccessMessage(response.data.msg);
        setRegister({ email: "", name: "", password: "" })
      }

    } catch (error: any) {
      console.log(error);

      const errorCode = error.status;
      if (errorCode === 400) { setErrorMessage(error.response.data.msg); setSuccessMessage(null); }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      {errorMessage && <div className="p-3 bg-lighterror rounded-sm text-error">
        {errorMessage}
      </div>}
      {successMessage && <div className="p-3 bg-lightsuccess rounded-sm text-success">
        {successMessage}
      </div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            sizing="md"
            value={register.name}
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
            placeholder="Pito Desri Pauzi"
            required
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="emadd" value="Email Address" />
          </div>
          <TextInput
            id="email"
            type="email"
            sizing="md"
            value={register.email}
            onChange={(e) => setRegister({ ...register, email: e.target.value })}
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="userpwd" value="Password" />
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            placeholder="******"
            required
            value={register.password}
            onChange={(e) => setRegister({ ...register, password: e.target.value })}
          />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full bg-primary hover:bg-blue-700">{isLoading ? "Loading" : "Register"}</Button>
      </form>
    </>
  )
}

export default AuthRegister
