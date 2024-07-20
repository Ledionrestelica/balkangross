"use client";

import {
  FormControl,
  Input,
  Button,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    foretagsnamn: "",
    organisationsnummer: "",
    telefonforetag: "",
    mobil: "",
    mejladress: "",
    leveransadress: "",
    fakturaadress: "",
    postnummer: "",
    ort: "",
  });
  const [touched, setTouched] = useState({});
  const [isSuccesful, setIsSuccesful] = useState(null);
  const [isLoading, setIsLoading] = useState("Submit");

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("contactFormData"));
    if (savedFormData) {
      setFormData(savedFormData);
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

    localStorage.setItem("contactFormData", JSON.stringify(formData));

    const response = await fetch("/api/sendEmail", {
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
    } else {
      toast.error("Failed to send email.");
      setIsSuccesful(false);
    }
  };

  const {
    foretagsnamn,
    organisationsnummer,
    telefonforetag,
    mobil,
    mejladress,
    leveransadress,
    fakturaadress,
    postnummer,
    ort,
  } = formData;

  return (
    <>
      <Toaster />
      <form
        className={`w-full max-w-[600px] flex flex-col gap-8 ${
          isSuccesful === true ? "hidden" : ""
        }`}
        onSubmit={handleSubmit}
      >
        <FormControl isInvalid={touched.foretagsnamn && !foretagsnamn}>
          <FormLabel>Foretagsnamn:</FormLabel>
          <Input
            type="text"
            name="foretagsnamn"
            className="w-full p-2 outline-none border border-gray-300 rounded-md focus:border-[#BFFE1A] focus:ring-2 focus:ring-[#747474] focus:ring-opacity-50"
            variant="outline"
            value={formData.foretagsnamn}
            onChange={handleChange}
            placeholder="Foretagsnamn"
            onBlur={onBlur}
            required
          />
          <FormErrorMessage>Field is required.</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={touched.organisationsnummer && !organisationsnummer}
        >
          <FormLabel>Organisationsnummer:</FormLabel>
          <Input
            type="text"
            name="organisationsnummer"
            className="w-full p-2 outline-none border border-gray-300 rounded-md focus:border-[#BFFE1A] focus:ring-2 focus:ring-[#747474] focus:ring-opacity-50"
            variant="outline"
            value={formData.organisationsnummer}
            onChange={handleChange}
            placeholder="Organisationsnummer"
            onBlur={onBlur}
            required
          />
          <FormErrorMessage>Field is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={touched.telefonforetag && !telefonforetag}>
          <FormLabel>Telefon företag:</FormLabel>
          <Input
            type="text"
            name="telefonforetag"
            className="w-full p-2 outline-none border border-gray-300 rounded-md focus:border-[#BFFE1A] focus:ring-2 focus:ring-[#747474] focus:ring-opacity-50"
            variant="outline"
            value={formData.telefonforetag}
            onChange={handleChange}
            placeholder="Telefon företag"
            onBlur={onBlur}
            required
          />
          <FormErrorMessage>Field is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={touched.mobil && !mobil}>
          <FormLabel>Mobil:</FormLabel>
          <Input
            type="text"
            name="mobil"
            className="w-full p-2 outline-none border border-gray-300 rounded-md focus:border-[#BFFE1A] focus:ring-2 focus:ring-[#747474] focus:ring-opacity-50"
            variant="outline"
            value={formData.mobil}
            onChange={handleChange}
            placeholder="Mobil"
            onBlur={onBlur}
            required
          />
          <FormErrorMessage>Field is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={touched.mejladress && !mejladress}>
          <FormLabel>Mejladress:</FormLabel>
          <Input
            type="email"
            name="mejladress"
            className="w-full p-2 outline-none border border-gray-300 rounded-md focus:border-[#BFFE1A] focus:ring-2 focus:ring-[#747474] focus:ring-opacity-50"
            variant="outline"
            value={formData.mejladress}
            onChange={handleChange}
            placeholder="Mejladress"
            onBlur={onBlur}
            required
          />
          <FormErrorMessage>Field is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={touched.leveransadress && !leveransadress}>
          <FormLabel>Leveransadress:</FormLabel>
          <Input
            type="text"
            name="leveransadress"
            className="w-full p-2 outline-none border border-gray-300 rounded-md focus:border-[#BFFE1A] focus:ring-2 focus:ring-[#747474] focus:ring-opacity-50"
            variant="outline"
            value={formData.leveransadress}
            onChange={handleChange}
            placeholder="Leveransadress"
            onBlur={onBlur}
            required
          />
          <FormErrorMessage>Field is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={touched.fakturaadress && !fakturaadress}>
          <FormLabel>Fakturaadress:</FormLabel>
          <Input
            type="text"
            name="fakturaadress"
            className="w-full p-2 outline-none border border-gray-300 rounded-md focus:border-[#BFFE1A] focus:ring-2 focus:ring-[#747474] focus:ring-opacity-50"
            variant="outline"
            value={formData.fakturaadress}
            onChange={handleChange}
            placeholder="Fakturaadress"
            onBlur={onBlur}
            required
          />
          <FormErrorMessage>Field is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={touched.postnummer && !postnummer}>
          <FormLabel>Postnummer:</FormLabel>
          <Input
            type="text"
            name="postnummer"
            className="w-full p-2 outline-none border border-gray-300 rounded-md focus:border-[#BFFE1A] focus:ring-2 focus:ring-[#747474] focus:ring-opacity-50"
            variant="outline"
            value={formData.postnummer}
            onChange={handleChange}
            placeholder="Postnummer"
            onBlur={onBlur}
            required
          />
          <FormErrorMessage>Field is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={touched.ort && !ort}>
          <FormLabel>Ort:</FormLabel>
          <Input
            type="text"
            name="ort"
            className="w-full p-2 outline-none border border-gray-300 rounded-md focus:border-[#BFFE1A] focus:ring-2 focus:ring-[#747474] focus:ring-opacity-50"
            variant="outline"
            value={formData.ort}
            onChange={handleChange}
            placeholder="Ort"
            onBlur={onBlur}
            required
          />
          <FormErrorMessage>Field is required.</FormErrorMessage>
        </FormControl>

        <button
          className="border flex items-center justify-center gap-4 w-full px-8 py-4 rounded-md bg-[#BFFE1A] mt-4 font-bold"
          type="submit"
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

export default ContactForm;
