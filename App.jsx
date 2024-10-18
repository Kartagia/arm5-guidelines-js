import React from 'react';
import ReactDOM from 'react-dom';
// import Dashboard from './Dashboard.jsx';
import Guideline from "./guideline.jsx";
const guideline = {
  name: "Creat",
  tech: "Creo",
  form: "Animal",
  level: 3
};
ReactDOM.render(
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
