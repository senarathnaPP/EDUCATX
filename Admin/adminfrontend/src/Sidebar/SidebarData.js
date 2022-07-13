import React, { Component } from 'react';


import { BsHouseFill } from "react-icons/bs";
import { BsStickiesFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";

export const SidebarData = [
    {
        title: "Home",
        icon: <BsHouseFill />,
        Link: "/home"
    },
    {
        title: "Add Topic",
        icon: <BsStickiesFill />,
        Link: "/topic"
    },
    {
        title: "My Profile",
        icon: <BsPersonCircle />,
        Link: "/profile"
    }
]