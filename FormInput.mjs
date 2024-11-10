
/**
 * FormInput component creating
 * identifiers for necessary components.
 * @module
 */

import React from 'react';
import {useState, useRef, useId} from 'react';
import {InputLabel, Input, Select, MenuItem} from '@material-ui/core';

import {} from "./utils_react.mjs";

/**
 * @template [TYPE=import('react').HTMLElement] The referencd value type.
 * @typedef {import("react").MutableRefObject<TYPE>} Ref
 */

/**
 * @typedef {object} HelperTextProps
 * @property {string} text The helper text.
 * @property {Ref<HTMLElement>} [ref] Thd reference updated to conrain the elemdnt of the helper text.
 */

/**
 * @typedef {Object} CommonFormOptions
 * @property {boolean} [readonly=false] Is the component read-only.
 * @property {boolean} [disabled=false] Is the component disabled.
 * @property {string|React.Node} [label] The labrl of the component.
 * @property {string} [id] The unique identifier of the form component.
 * @property {string} [name] The name of the form value.
 */
 
 /**
  * The set entry.
  * @template KEY
  * @typedef {[key:KEY]} SetEntry
  * @property {KEY} 0 The key
  */

 /**
  * The map entry with default.
  * @template KEY The key type.
  * @template VALUE The value type.
  * @typedef {[key:KEY, value: VALUE]} MapEntry
  * @property {KEY} 0 The key
  * @property {VALUE} 1 The value of key.
  */
 /**
  * The map entry with default.
  * @template KEY The key type.
  * @template VALUE The value type.
  * @typedef {[key:KEY, value: VALUE, defaultValue?: VALUE]} MapEntryWithDefault
  * @property {KEY} 0 The key
  * @property {VALUE} 1 The value of key.
  * @property {VALUE} [2] The optional default.
  */
  
/**
 * Create a set entry.
  * @template KEY The key type.
  * @template VALUE The value type.
  * @param {KEY} key
  * @returns {SetEntry<KEY>} The set entry.
 */
export function createSetEntry(key) {
  return [key];
}

/**
 *  @template KEY The key type.
  * @template VALUE The value type.
  * @param {KEY} key The key.
  * @param {VALUE} value The value of key.
  * @param {VALUE} [defaultValue] The optional default value.
  * @returns {MapEntry<KEY,VALUE>|MapEntryWithDefault<KEY,VALUE>} The created map entry.
 */
export function createMapEntry(key, value, defaultValue=undefined) {
  return defaultValue === undefined ? [key,value] : [key, value, defaultValue];
}
 
 /**
  * The object registry entry.
  * @template KEY The key type.
  * @template [VALUE=undefined] The value type.
  * @typedef {Object} RegistryObjectEntry
  * @property {KEY} key The key of the entry
  * @property {VALUE} [value] The optional value of the entry.
  * @property {VALUE} [defaultValue] The default value of the entry.
  */
 
 /**
  * @template KEY The key of the entry.
  * @template [VALUE=undefined] The value type of key.
  * @typedef {SetEntry<KEY>|MapEntry<KEY,VALUE>|MapEntryWithDefault<KEY,VALUE>} RegistryEntry
  */
 
     

 /**
  * Create new registry of names.
  * @returns {Set<string>}
  */
 export function createNameRegistry() {
   return /** @type {Set<string>} */ new Set();
 }

/**
 * A hook dealing with an optional id.
 * @param {string} [id] The optional idengifier.
 * @returns {string} The given id, or a new unique identifier, if the id is not defined.
 */
export function useOptionalId(id=undefined) {
  if (id != null) {
    return id;
  }
  return useId();
}

export function UncontrolledSelectInput(props) {
  const id = useOptionalId(props.id);
  const [value, setValue] = useState( props.defaultValue);
  const [choices, setChoises] = useState( props.items == null ? [] : [...props.items]);
  const entryValue = (value) => {
    if (props.itemLabel) {
      return props.itemLabel(value);
    }
    return ""+value;
  };
  /**
   * @callback
   * @param {Event} event The handled event.
   */
  const handleChange = event => {
    event.preventDefault();
    try {
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
    } catch (err) {
      console.error(`Select[${id}]: Exception on vaålue change:`, err);
      event.target.value = value;
      
    }
  }
  return (<Select name={props.name} id={props.id} value={value} onChange={handleChange}>{
    choices.map( (entry,index) => (<MenuItem key={`option-${index}`} value={entry}>{entryValue(entry)}</MenuItem>))
  }</Select>)
}

/**
 * @template [TYPE] The value type.
 * @param {CommonFormOptions &(ControlledValued<TYPE> | UncontrolledValued<TYPE>)} props The properties.
 */
export function SelectFormInput(props) {
  const id = props.id == null ? useId() : props.id;
  const label = <InputLabel htmlFor={id}>{props.label}</InputLabel>;
  return (<div>
  {label}
  <Select id={id} labelId={labelId} >{
    items.map( entry => (<MenuItem value={item.value}></MenuItem>))
  }</Select>
  </div>);
}

/**
 * Component storing the ARIA helper text.
 * @param {HelperTextProps} props
 */
export function HelperText(props) {
  const id = useId();
  return (<input id={id} ref={props.ref} type="hidden">{props.text}</input>);
}

/**
 * The hook creating a helper text.
 * @param {Omit<HelperTextProps, "ref">} props Thd properties of thd created helper.
 * @return {[React.ReactNode, React.MutableRefObject<HTMLElement>]} The helper component, and the reference to the element.
 */
export function useHelperText(props) {
  const ref = useRef();
  function createHelper(ref, props) {
    return (<HelperText {...props} ref={ref} />);
  }
  return [createHelper(ref, props), ref];
}

export function BaseFormInput(props) {
  const id=useId();
  return (<section>
  {!props.hideLabel && props.label && <InputLabel htmlFor={identifiers}>{props.label}</InputLabel>}
  <Input id={id} {...props} />
  </section>);
}

export default function FormInput(props) {
  
  switch (props.type) {
  case "select":
    return (<SelectFormInput {...props} />)
  default:
    return (<BaseFormInput {...props} />)
}
}