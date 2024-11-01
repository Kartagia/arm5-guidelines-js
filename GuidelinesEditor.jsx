import React from 'react';

import {InputLabel, Input, Button, Select, MenuItem, FormContext} from '@material-ui/core'
import {Guideline, getFormNames, getTechniqueNames, createGuideline} from './guidelines.mjs';
import {NotFoundError, orElse} from './utils.mjs';

/**
 * Editor of a value.
 * @template TYPE The edited value type.
 * @typedef {Object} EditorProps
 * @property {import("./utils.mjs").Getter<TYPE, NotFoundError>} getValue Get the current value.
 * @property {Setter<TYPE, SyntaxError>} setValue Set the current value.
 * 
 */

/**
 * Guideline editor.
 * @param {EditorProps<Guideline> & {techniques?: string[], forms?: string[]} } props
 */
export default function GuidelineEditor(props) {
  const [forms] = useState(orElse(props.forms, getFormNames()));
  const [techniques] = useState(orElse(props.techniques, getTechniqueNames()));
  const [current, setCurrent] = React.useState( (props.getValue ? props.getValue() :
  createGuideline({tech: techniques[0],
    form: forms[0],
    name: "New Guideline",
    level: null
  }) ) );
  if (current) {
    console.table({
      Level: (current.level == null ? "Generic": current.level), 
      Technique: current.tech,
      Form: current.form,
      Name: current.name,
      Desc: current.description
    });
  } else {
    console.log("No current value")
  }
  const [changed, setChanged] = React.useState(false);
  
  function saveValue() {
    try {
      if (props.setValue) {
        props.setValue(current);
      }
      setChanged(false);
    } catch(err) {
      throw err;
    }
  }
  
  function resetValue() {
    try {
    if (props.getValue && changed) {
      const newValue = props.getValue();
      setChanged(false);
      setCurrent(newValue);
    }
    } catch(err) {
      throw err;
    }
  }
  
  return (<section hidden={hidden}>
      
     <Select name="tech" label="Technique" value={ ( current ? current.tech : "Creo") } >{
       (techniques).map( (art) => (<MenuItem value={art.name}>{art.name}</MenuItem>))
     }</Select>
     <Select name="form" label="Form" value={(  current && current.form ? current.form : forms[0])}>{
       (forms).map( (art) => (<MenuItem value={art.name}>{art.name}</MenuItem>))
     }</Select>
     
    <InputLabel htmlFor={nameId}>Name</InputLabel>
    <Input id={nameId} name="name"></Input>
    <Button variant="contained" onClick={saveValue} disabled={!changed} >Save</Button>
    <Button variant="contained" onClick={resetValue} >Cancel</Button>
  </section>);
}