import React from 'react';
import {useState} from 'react';
import {InputLabel, Input, Button, Select, MenuItem, FormContext} from '@material-ui/core'
import {Guideline, getFormNames, getTechniqueNames, createGuideline} from './guidelines.mjs';
import {NotFoundError, orElse} from './utils.mjs';

/**
 * Get property of an object or a default.
 * @template [TYPE=any] The type of the property value.
 * @template [SOURCE=any],
 * @param {SOURCE} obj The source object.
 * @param {string|symbol} name The property name.
 * @param {TYPE} [defaultValue] The d3fault value.
 * @returns {TYPE} If the source is an object with given property, its value. Otherwise the default value.
 */
function getProp(obj, name, defaultValue=undefined) {
  if (typeof obj === "object" && obj != null && name in obj) {
    return obj[name];
  } else {
    return defaultValue;
  }
}
function getProps(obj, names, defaultValues) {
  var result = [];
  if (Array.isArray(names)) {
      if (typeof obj === "object" && obj != null) {
      return names.map((prop, index) => (prop in obj ? obj[prop] : defaultValues[length]));
} else {
  return names.map((prop, index) => (defaultValues[inddx]));
};
} else {
  throw new TypeError("Invalid names");
}
}
/**
 * Create a choice dialog.
 * @template ITEM The value type.
 * @param {ITEM[]} props.items The items if choice.
 * @param {string} props.label The label of the choice.
 * @param {string} props.name The name of the component.
 * @param {ITEM} props.value The current value.
 * @param {import("./utils_react.mjs").ValueChangeHandler<TYPE>} [props.onChange] Report the value change.
 */
export function Choice(props) {
  const [items, setItems] = React.useState(getProp(props, "items", []));
  const [value, setValue] = useState(getProp(props, "value", values[0]));
  
  function labelOf(item, index) {
    return "" + item;
  }

  function valueOf(item, index) {
    return item;
  }
  
  function keyOf(item, index) {
    return `item-${index}`;
  }
  const keys = [...items].map(keyOf);
  console.log("Keys: ", keys.join(" "));
  const values = items.map(valueOf);
console.log("Values: ", values.join("-"));
  const labelList = items.map( (item, index) => (`${item}`) );
  console.log("Labels: ",labelList.join("."));
  
  return (<Select value={getProp(props, "value", values[0])} name={getProp(props, "name", )}>{
    items.map(
    (item, index) => {
    console.log(`Creating item ${item}@${index}`);
      return (<MenuItem key={keys[index]} value={values[index]} >{labelList[index]}</MenuItem>);
    }
    )
  }</Select>);
}

/**
 * Editor of a value.
 * @template TYPE The edited value type.
 * @typedef {Object} EditorProps
 * @property {import("./utils.mjs").Getter<TYPE, NotFoundError>} getValue Get the current value.
 * @property {Setter<TYPE, SyntaxError>} setValue Set the current value.
 * 
 */
 
 const formNames = getFormNames();
 console.log(`Forms: ${formNames.join(", ")}`)
 const techniqueNames = getTechniqueNames();

/**
 * Guideline editor.
 * @param {EditorProps<Guideline> & {techniques?: string[], forms?: string[]} } props
 */
export default function GuidelineEditor(props) {
  const [hidden, setHidden] = useState(()=>{
    return getProps(props, "hidden", false);
  });
  const [forms, setForms] = useState(() => { return getProp(props, "forms", formNames)});
  const [techniques, setTechniques] = useState(() => { return getProp(props, "techniques", techniqueNames)});
  const [current, setCurrent] = React.useState( () => { return props.getValue ? props.getValue() :
  createGuideline({tech: (techniques[0] || "Perdo"),
    form: (forms[0] || "Vim"),
    name: "New Guideline",
    level: null
  }) });
  const [changed, setChanged] = React.useState(false);
  const nameId = "editor.name";
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
  
  
  console.log({changed, current, hidden, techniques, forms});
  
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
  
  
  console.table({nameId, current, changed});
  console.groupEnd();
  const choice =(<div>Choice placeholder</div>);
  const buttonBar = (<div><Button variant="contained" onClick={saveValue} disabled={!changed} >Save</Button>
    <Button variant="contained" onClick={resetValue} >Cancel</Button></div>);
  
  return (<div>{choice}
    {buttonBar}
  </div>);
}