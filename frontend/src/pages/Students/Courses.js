import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import basename from "../Home/basename.js";
import CourseDropdown from "./CourseDropdown.js"
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

const Courses =(props) => {
    const [languages,setLanguages] = useState([]);
    const [dropdownOpen, setOpen] = useState([]);

    useEffect(() =>{
        axios
            .get(`${basename}/api/language/`)
            .then((res)=>{
                setLanguages(res.data.objects);
            });
            // update code for updating state of dropdown
    });
    const toggle =(id) =>{
        //update this
        setOpen(!dropdownOpen)
    };

    return(
        <div>    
        {languages.map((element) =>
            <div onClick={toggle}>
                {element.name}
                <CourseDropdown id={element.id} check={dropdownOpen[element.id]}/>
            </div>
        )};
        </div>
    )
}
export default Courses