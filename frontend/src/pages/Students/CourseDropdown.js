import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import basename from "../Home/basename.js";
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

const CourseDropdown = (props) => {
    const [trainers , setTrainers] = useState([]);

    useEffect(() =>{
        axios
            // update this(not returning list of teachers)
            .get(`${basename}/api/language/${props.id}/`)
            .then((res)=>{
                setTrainers(res.data.objects);
            });
    });
    if(props.check)
        return(
            <div>
            {/*trainers.map((element)=>
                {element.name}
            )*/}
            name
            </div>
        )
    else return(null)
}

export default CourseDropdown