import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropDown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);  
  const availLanguages = props.availLanguages;
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const addToLearnLanguage = props.addToLearnLanguage;
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret style={{width:"100%",fontSize:"16px"}}>
        Add Languages
        </DropdownToggle>
      <DropdownMenu>
      <DropdownItem header style={{fontSize:"16px"}}>Choose a language</DropdownItem>
          {Object.keys(availLanguages).map((key,index)=>(
              <DropdownItem style={{width:"100%",fontSize:"16px"}} onClick = {(e)=>addToLearnLanguage(key,availLanguages[key])}>{key}</DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropDown;