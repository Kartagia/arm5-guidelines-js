import React from 'react';
import {useState} from 'react';

import { Paper, Button } from '@material-ui/core';
// import Dashboard from './Dashboard.jsx';
import Guidelines from "./Guidelines.jsx";
import Hideable from "./HideableEntry.jsx";
import GuidelineEditor from "././GuidelinesEditor.jsx";
import {getFormNames, getTechniqueNames, createGuideline, getGuideline} from "./guidelines.mjs"

export default function TestComponent({guidelines}) {
  const [guideline, setGuideline] = useState(getGuideline("1"));
  const [showLocked, setShowLocked] = useState(false);
  const [locked, setLocked] = useState(true);
  console.table(guideline);
  const gl = createGuideline({
    tech: "Creo", form: "Ignem",
    level: 2,
    name: "Create candlelight"
  });
  console.table(gl);
  
  return (<Paper>
    <p>Test</p>
    <Guidelines defaultValue={
    guidelines
  } readOnly={true} />
  <Hideable title="Hideable" open={true}><p>Children</p><GuidelineEditor getValue={
    function() { return guideline; }
  } setValue={ function(newValue) {
    setGuideline(newValue);
  } } /></Hideable>
  <Hideable title={(locked?"Locked":"Unlocked")} open={showLocked} locked={locked} content={<p>Locked Content</p>}><p>Locked Children</p></Hideable>
 
  <Button onClick={() => {
    setLocked( (current) => (!current))
  } } >{locked ? "Lock" : "Unlock"}</Button>
  <Button onClick={() => {
    setShowLocked( (current) => (!current))
  } } >{showLocked ? "Hide Locked" : "Show Locked"}</Button>
</Paper>);
  
}