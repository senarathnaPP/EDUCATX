import React, { Component } from 'react';


import { BsHouseFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { BsStickiesFill } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { BsFileEarmarkArrowUpFill } from "react-icons/bs";
import { BsPersonCircle ,BsMessenger ,BsCardChecklist} from "react-icons/bs";



export const SidebarDataStaff = [
    {
        title: "Dashboard",
        icon: <BsHouseFill />,
        Link: "/staffDashBoard"
    },
    {
        title: "Student Groups",
        icon: <BsPeopleFill />,
        Link: "/studentGroup"
    },
    {
        title: "Research Topic",
        icon: <BsStickiesFill />,
        Link: "/topic"
    },
    // {
    //     title: "Supervisor/Co-supervisor",
    //     icon: <BsPersonLinesFill />,
    //     Link: "/sCo"
    // },
    // {
    //     title: "Templates",
    //     icon: <BsArrowDownCircleFill />,
    //     Link: "/template"
    // },
    {
        title: "Panel Member",
        icon: <BsFileEarmarkArrowUpFill />,
        Link: "/staffPanel"
    },
    {
        title: "Chat",
        icon: <BsMessenger />,
        Link: "/staffMsg"
    },
    {
        title: "Profile",
        icon: <BsPersonCircle />,
        Link: "/staffProfile"
    },
    {
        title: "Evaluations",
        icon: <BsCardChecklist />,
        Link: "/Evaluation"
    }
]