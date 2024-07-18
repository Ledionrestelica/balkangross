import React from "react";
import ContactForm from "../components/_ContactForm";

const page = () => {
  return (
    <div className="container mx-auto flex flex-col min-h-[100vh] gap-10 w-full justify-center items-center">
      <h1 className="text-4xl font-bold">Skapa Konto</h1>
      <ContactForm />
    </div>
  );
};

export default page;
