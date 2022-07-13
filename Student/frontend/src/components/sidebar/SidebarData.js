import React, { Component } from 'react';


import { BsHouseFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { BsStickiesFill } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { BsFileEarmarkArrowUpFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";








export const SidebarData = [
    {
        title: "Home",
        icon: <BsHouseFill />,
        Link: "/home"
    },
    {
        title: "Create Group",
        icon: <BsPeopleFill />,
        Link: "/group"
    },
    // {
    //     title: "Research Topic",
    //     icon: <BsStickiesFill />,
    //     Link: "/topic"
    // },
    // {
    //     title: "Supervisor/Co-supervisor",
    //     icon: <BsPersonLinesFill />,
    //     Link: "/sCo"
    // },
    {
        title: "Templates",
        icon: <BsArrowDownCircleFill />,
        Link: "/template"
    },
    {
        title: "Submission",
        icon: <BsFileEarmarkArrowUpFill />,
        Link: "/submissions"
    },
    {
        title: "My Profile",
        icon: <BsPersonCircle />,
        Link: "/profile"
    }, {
        title: "Message",
        icon: <BsPersonCircle />,
        Link: "/studentMsg"

    }
]