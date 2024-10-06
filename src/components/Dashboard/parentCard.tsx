"use client";
import React, { useState } from "react";
import { FocusCards } from "./focusCards"; // Adjust the path as needed

const ParentComponent = () => {
  const [cards] = useState([
    { title: "Weather", src: "/img/one.jpeg" },
    { title: "Water level", src: "/img/img2.jpg" },
    { title: "Moisture level", src: "/im.jpg" },
  ]);

  return <div className="my-10">
    <FocusCards cards={cards} />
    </div>;
};

export default ParentComponent;