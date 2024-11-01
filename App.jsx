import React from 'react';
import {render} from 'react-dom';
import Test from "./TestCompont.jsx";
import { getGuidelines } from "./guidelines.mjs";
const guidelines = getGuidelines();
console.group("App guidelines");
console.table(guidelines)
console.groupEnd();
const mountNode = document.getElementById("container");

render(<Test guidelines={guidelines} />, mountNode);
/* ReactDOM.render(
  <Dashboard classes={{
    tableContainer: '',
    appBarSpacer: '',
    container: '',
    drawerPaper: '',
    title: '',
    toolbar: '',
    root: ''
  }} />,
  mountNode);
  */
