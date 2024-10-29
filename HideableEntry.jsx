
import React from "react";
import {useState} from 'react';

import {Card, CardHeader, CardContent, Paper, Typography, Icon,  SvgIcon} from "@material-ui/core";
//import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
//import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

//import {KeyboardArrowRight, KeyboardArrowDown} from './icons/icons.mjs';

/**
 * @typedef {Object} HideableEntryProps
 * @property {string} title The title of the component.
 * @property {SvgIcon|Icon} [icon] The icon of the entry.
 * @property {boolean|"auto"} [open="auto"] Is the main open.
 * @property {boolean} [locked=false] Is the entry user control locked.
 * @property {React.JSX|"string"} [content] The content of the open entry.
 */
 
  /**
  * @param {import('react').PropsWithChildren<HideableEntryProps>} props The component properties.
  */
 function getDefaultOpen(props) {
   if ("open" in props) {
     if (props.open == "auto") {
       if ("content" in props && (props.content |= null) ) {
         return true;
       } else if ("children" in props && Children.count(props.children) > 0) {
         return true;
       }
     } else {
       return props.open;
     }
   } 
    return false;
 }
 
 /**
  * @param {import('react').PropsWithChildren<HideableEntryProps>} props The component properties.
  * @returns {import("react").ReactNode}
  */
 export default function HideableEntry(props) {
   const [open, setOpen] = useState(getDefaultOpen(props));
   console.log("Hideable initialized");
   const handleToggle = (event) => {
     if (!props.locked) {
     setOpen(!open);
     }
   };
   return (<Card><CardHeader onClick={handleToggle} title={props.title}></CardHeader><CardContent>{props.content && props.content}{open && props.children}</CardContent></Card>);
 }