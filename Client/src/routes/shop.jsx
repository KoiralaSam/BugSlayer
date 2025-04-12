import React from "react";
import NavBar from "../components/NavBar";
import FileUpload from "../components/fileUpload";

function Shop() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-cover bg-center">
      <NavBar /> This is the shop component
      <FileUpload />
    </div>
  );
}

export default Shop;
