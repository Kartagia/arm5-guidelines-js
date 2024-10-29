import React from 'react';
import {render} from 'react-dom';
import {Paper, Button} from '@material-ui/core';
// import Dashboard from './Dashboard.jsx';
import Guidelines from "./Guidelines.jsx";
import Hideable from "./HideableEntry.jsx";
import {getGuidelines} from "./guidelines.mjs";
const guidelines = getGuidelines();
console.group("App guidelines");
console.table(guidelines)
console.groupEnd();
const mountNode = document.getElementById("container");
var showLocked = true;
render(
  <Paper>
    <p>Test</p>
    <Guidelines defaultValue={
    guidelines
  } />
  <Hideable title="Hideable" open={true}><p>Children</p></Hideable>
  <Hideable title="Locked" open={showLocked} locked="true" content={<p>Locked Content</p>}><p>Locked Children</p></Hideable>
  <Button onClick={() => {
    showLocked = !showLocked;
  } } >{showLocked ? "Lock" : "Unlock"}</Button>
</Paper>, mountNode);
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
