"use client";

import Image from "next/image";

import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

import { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import CartContext from "@/CartContext";

const OrderForm = () => {
  const { cart } = useContext(CartContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    organization: "",
    email: "",
    adress: "",
    comment: "",
  });
  const [touched, setTouched] = useState({});
  const [isSuccesful, setIsSuccesful] = useState(null);
  const [isLoading, setIsLoading] = useState("Submit");

  useEffect(() => {
    const savedOrderData = JSON.parse(localStorage.getItem("orderFormData"));
    if (savedOrderData) {
      setFormData(savedOrderData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading("Sending...");

    localStorage.setItem("orderFormData", JSON.stringify(formData));

    const response = await fetch("/api/sendOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success("Email sent successfully!");
      setIsSuccesful(true);
      setIsLoading("Done!");
      localStorage.clear();
      setTimeout(() => {
        router.push("/thank-you");
      }, 2000);
    } else {
      toast.error("Failed to send email.");
      setIsSuccesful(false);
    }
  };

  const { name, lastName, phone, organization, email, adress, comment } =
    formData;

  return (
    <>
      <Toaster />
      <form
        className={`w-full max-w-[600px] flex flex-col gap-8 ${
          isSuccesful === true ? "hidden" : ""
        }`}
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-4 mb-[20px]">
          <Image src="/order.png" width={50} height={50} alt="logo"></Image>
          Order Request
        </div>
        <div className="flex lg:flex-row flex-col gap-6  items-center justify-between">
          <FormControl
            className="w-full relative"
            isInvalid={touched.name && !formData.name}
          >
            <FormLabel className="text-[14px] font-normal">
              First Name
            </FormLabel>
            <Input
              type="text"
              className="w-full h-[36px] placeholder:text-[14px] placeholder:font-light bg-[#F8FAFB] p-2 outline-none border border-gray-300 rounded-md "
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={onBlur}
              placeholder="Enter your name"
              required
            />
            <FormErrorMessage className="text-red-600 absolute">
              Field is required.
            </FormErrorMessage>
          </FormControl>

          <FormControl
            className="w-full relative"
            isInvalid={touched.lastName && !formData.lastName}
          >
            <FormLabel className="text-[14px] font-normal">
              Last Name:
            </FormLabel>
            <Input
              className="w-full h-[36px] placeholder:text-[14px] placeholder:font-light bg-[#F8FAFB] p-2 outline-none border border-gray-300 rounded-md "
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your Last Name"
              onBlur={onBlur}
              required
            />
            <FormErrorMessage className="text-red-600 absolute">
              Field is required.
            </FormErrorMessage>
          </FormControl>
        </div>
        <div className="flex lg:flex-row flex-col gap-6 items-center justify-between">
          <FormControl
            className="w-full relative"
            isInvalid={touched.phone && !formData.phone}
          >
            <FormLabel className="text-[14px] font-normal">Phone</FormLabel>
            <Input
              className="w-full h-[36px] placeholder:text-[14px] placeholder:font-light bg-[#F8FAFB] p-2 outline-none border border-gray-300 rounded-md "
              type="phone-number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              onBlur={onBlur}
              required
            />
            <FormErrorMessage className="text-red-600 absolute">
              Field is required.
            </FormErrorMessage>
          </FormControl>
          <FormControl
            className="w-full relative"
            isInvalid={touched.organization && !formData.organization}
          >
            <FormLabel className="text-[14px] font-normal">
              Organization
            </FormLabel>
            <Input
              className="w-full h-[36px] placeholder:text-[14px] placeholder:font-light bg-[#F8FAFB] p-2 outline-none border border-gray-300 rounded-md "
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Enter your organization name"
              onBlur={onBlur}
              required
            />
            <FormErrorMessage className="text-red-600 absolute">
              Field is required.
            </FormErrorMessage>
          </FormControl>
        </div>
        <div className="flex lg:flex-row flex-col gap-6 items-center justify-between">
          <FormControl
            className="w-full relative"
            isInvalid={touched.email && !formData.email}
          >
            <FormLabel className="text-[14px] font-normal">Email</FormLabel>
            <Input
              className="w-full h-[36px] placeholder:text-[14px] placeholder:font-light bg-[#F8FAFB] p-2 outline-none border border-gray-300 rounded-md "
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              onBlur={onBlur}
              required
            />
            <FormErrorMessage className="text-red-600 absolute">
              Field is required.
            </FormErrorMessage>
          </FormControl>
          <FormControl
            className="w-full relative"
            isInvalid={touched.adress && !formData.adress}
          >
            <FormLabel className="text-[14px] font-normal">Adress</FormLabel>
            <Input
              className="w-full h-[36px] placeholder:text-[14px] placeholder:font-light bg-[#F8FAFB] p-2 outline-none border border-gray-300 rounded-md "
              type="text"
              name="adress"
              value={formData.adress}
              onChange={handleChange}
              placeholder="Enter your adress"
              onBlur={onBlur}
              required
            />
            <FormErrorMessage className="text-red-600 absolute ">
              Field is required.
            </FormErrorMessage>
          </FormControl>
        </div>

        <FormControl isInvalid={touched.message && !formData.message}>
          <FormLabel className="text-[14px] font-normal">Message</FormLabel>
          <Textarea
            name="message"
            type="text"
            onChange={handleChange}
            className="w-full h-[36px] placeholder:text-[14px] placeholder:font-light bg-[#F8FAFB] p-2 outline-none border border-gray-300 rounded-md "
            value={formData.message}
            onBlur={onBlur}
            placeholder="Write any additional info"
          />
          <FormErrorMessage className="text-red-600">
            Field is required.
          </FormErrorMessage>
        </FormControl>
        <button
          className={`border disabled:opacity-30 flex items-center justify-center gap-4 w-full px-8 py-4 rounded-md bg-[#BFFE1A] mt-4 font-bold`}
          type="submit"
          disabled={cart?.cartItems?.length === 0}
        >
          {isLoading === "Sending..." && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3a9 9 0 1 0 9 9" />
            </svg>
          )}

          {isLoading}
        </button>
      </form>
      {isSuccesful === true && (
        <div className="flex items-center justify-center flex-col">
          <p className="animate-fadeIn font-light text-gray-600">
            We will notify you via Email!
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={150}
            height={150}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#BFFE1A"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-check animate-fadeIn"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l5 5l10 -10" />
          </svg>
        </div>
      )}

      {isSuccesful === false && (
        <div>
          <p>Form submission failed!</p>
        </div>
      )}
    </>
  );
};

export default OrderForm;
