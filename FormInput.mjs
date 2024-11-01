
/**
 * FormInput component creating
 * identifiers for necessary components.
 * @module
 */
 
 

import React from 'react';
import {useState, useRef, useId} from 'react';
import {InputLabel, Input, Select, MenuItem} from '@material-ui/core';

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