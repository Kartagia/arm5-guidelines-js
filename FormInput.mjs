
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
  * @typedef {[key:KEY, value: VALUE, defaultValue?: VALUE]} MapEntryWithDefault
  * @property {KEY} 0 The key
  * @property {VALUE} 1 The value of key.
  * @oroperty {VALUE} [2] The optional default.
  */
  
/**
 * Create a set entry.
  * @template KEY The key type.
  * @template VALUE The value type.
  * @param {KEY} key
  * @returns {SetEntry<KEY} The set entry.
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
  return defaultValue == null ? [key,value] : [key, value, defaultValue];
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
  * Registry of values.
  * @template TYPE The registered type.
  * @template [VALUE=undefined] The value type. 
  */
 export class Registry {
   
   /**
    * The entries of the map.
    * @type {(SetEntry<TYPE>|MapEntry<TYPE,VALUE>|MapEntryWithDefault<TYPE, VALUE>)[]}
    */
   #entries = [];
   
   /**
    * 
    */
   _arrayEntry(array) {
     
   }
   
   _add(entry) {
     if (Array.isArray(entry)) {
       const added = this._arrayEntry(entry);
     } else if (entry instanceof Object) {
       const added = this._objectEntry(entry);
     }
    throw new SyntaxError("Invalid entry");
   }
   
   /**
    * Create a new name registry.
    * @param {Iterable<string>} [entries=[]] The initial entries.
    */
   constructor(entries=[], options={}) {
     super();
   }
   /**
    * Add a name to registry.
    * @param {string} name The addee name.
    * @throws {SyntaxError} The name was invalid.
    * @throws {RangeError} The name was reserved.
    */
   register(name) {
     
   }
   
   has() {
     
   }
   
   keys() {
     
   }
 }
 
 export function createNameRegistry() {
   
 }


/**
 * @template [TYPE] The value type.
 * @param {CommonFormOptions &(ControlledValued<TYPE> | UncontrolledValued<TYPE>)} props The properties.
 */
export function SelectFormInput(props) {
  
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

export function SelectFormInput(props) {
  const [items, setItems] = useState([]);
  const labelId = useId();
  const id = useId();
  
  const createLabel = (val) => (val == null ? (props.label || "Select value"): `${val}`)
  
  return (<section>
  {props.label && !props.hideLabel && <InputLabel id={labelId}>{props.label}</InputLabel>}
  <Select
  labelId={labelId}
  id={id}
  label={props.label}
  value={props.value}
  onChange={props.onChange}
  >{
    items.map((item, index) => (<MenuItem key={`item-${index}`} value={item}>{createLabel(item)}</MenuItem>))
  }</Select>
  </section>);
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