import React from 'react';
import {useState} from 'react';

import { Paper, Button, Typography} from '@material-ui/core';
// import Dashboard from './Dashboard.jsx';
import Guidelines from "./Guidelines.jsx";
import Hideable from "./HideableEntry.jsx";
import {Choice} from "./GuidelinesEditor.jsx";

import {ErrorBoundary} from "./ErrorBoundary.jsx";
import {getFormNames, getTechniqueNames, createGuideline, getGuideline, createId, addGuideline} from "./guidelines.mjs"

export function Tester(props) {
  switch (typeof props.value) {
    case "undefined":
      throw SyntaxError("Missing required property");
    case "number":
      if (props.value >=0) {
        return (<Typography>{props.value}</Typography>)
      } else {
        throw new RangeError(`Invalid value ${props.value}`)
      }
    case "object":
      throw TypeError(`Invalid type ${typeof props.value}`);
  }
}

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
  try {
    console.log(`Added as ${addGuideline(gl)}`);
  } catch (err) {
    console.error(err);
    console.error(err.cause ? `Cause ${err.cause}` :`No cause`)
  }
  
  return (<Paper>
    <p>Test {createId()}</p>
    <Guidelines defaultValue={
    guidelines
  } readOnly={true} />
  <Hideable title="Hideable" open={true}><ErrorBoundary><p>Children</p><Tester value={3}/><Choice label="Form" items={["An", "Aq", "Au"]} value="Aq"/></ErrorBoundary></Hideable>
  <Hideable title={(locked?"Locked":"Unlocked")} open={showLocked} locked={locked} content={<p>Locked Content</p>}><p>Locked Children</p></Hideable>
 
  <Button onClick={() => {
    setLocked( (current) => (!current))
  } } >{locked ? "Lock" : "Unlock"}</Button>
  <Button onClick={() => {
    setShowLocked( (current) => (!current))
  } } >{showLocked ? "Hide Locked" : "Show Locked"}</Button>
</Paper>);
  
}