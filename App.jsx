import React from 'react';
import {render} from 'react-dom';
import {Paper} from '@material-ui/core';
// import Dashboard from './Dashboard.jsx';
import Guideline from "./guideline.jsx";
const guideline = {
  name: "Create an insect",
  tech: "Creo",
  form: "Animal",
  level: 3
};
const mountNode = document.getElementById("container");
render(
  <Guideline model={
    guideline
  } />, mountNode);
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
