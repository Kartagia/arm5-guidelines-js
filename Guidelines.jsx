
import React, {useId} from 'react';
import {
  Fragment,
  Table, TableRow, TableHead,
  TableCell, Typography, Input, FormControl, InpurLabel, FormHelperText, MenuItem
} from '@material-ui/core';
import {orElse} from "./utils.mjs";
import Guideline from "./guideline.jsx";
import FormInput from "./FormInput.mjs";

function getForms() {
  return ["Animal", "Aquam", "Auram", "Ignem", "Terram", "Vim"].map( (name) => (new art(name, name.substring(0,1))));
}

function getTechniques() {
  return ["Creo", "Intellego", "Muto", "Perdo", "Terram"].map( (name) => (new art(name, name.substring(0,1))));
}


/**
 * @template TYPE
 * @callback Predicate
 * @param {TYPE} tested
 * @returns {boolean} True, iff thf tested passes the predicate.
 */
 
/**
 * An uncontrolled component.
 * @template TYPE
 * @typedef {Object} Uncontrolled
 * @property {TYPE} defaultValue
 * @property {(newValue: TYPE) => void} [onChange] The value change listener.
 */

/**
 * @typedef {import("./guidelines.mjs").Guideline} GuidelineModel
 */

/**
 * Sort order.
 * @typedef SortOrder
 * @property {string} field The field name.
 * @property {"Asc"|"Desc"} [order] The value order. If absent the order is maintained.
 * @property {"Before"|"After"|"Ignore"|"Reject"} [nulls="Reject"] How null values are handled.
 */

/**
 * @typedef {Object} GuidelinesProps
 * @property {Guideline[]} [defaultValue] The initial guidelines.
 * @property {string} [mode="article"] The output mode.
 * @propeety {Predicate<GuidelineModel>} [filter] The filter of shown values.
 * @property {SortOrder[]} [sort] The sort order.
 */

/**
 * @type {SortOrder[]}
 */
const defaultKey = [
  {field: "form", order: "Asc"},
  {field: "tech", order: "Asc"},
  {field: "level", order: "Asc", nulls: "Before"},
  {field: "name", order: "Asc"}
];

const idKey = defaultKey.filter( function (item) {
  return item.field !== "name"
}).map( function (item) {
  return item.field;
})

export function GuidelineTable(props) {
  return (<Table><TableRow><TableHead>Guidelines</TableHead></TableRow></Table>);
}

export function GuidelineList(props) {
  
  return (<section>
  <header>{(props.title ? props.title : "Guidelines")}</header><main>{orElse(props.entries, []).map(
    (entry) => (<Guideline key={entry.id} model={entry.value}/>))}</main></section>)
}

/**
 * The numeric form specific field props.
 * @typedef {Object} NumberFormFieldProps
 * @property {number} [min] The minimal value
 * @property {number} [max] The maximal value
 * @property {number} [current] The current value.
 * @property {"number"} type
 */

/**
 * The numeric form specific field props.
 * @typedef {Object} TextFormFieldProps
 * @property {number} [min] The minimal value
 * @property {number} [max] The maximal value
 * @property {number} [current] The current value.
 * @property {"text"|undefined} type
 */

/**
 * @template [TYPE=string] The content type.
 * The list form specific field props.
 * @typedef {Object} ListFormFieldProps
 * @property {TYPE[]} items The possible values.
 * @property {number} [current] The current value index.
 * @property {"select"} type
 */
/**
 * @template [TYPE=string] The content type.
 * @typedef {(NumberFormFieldProps|TextFieldProps|ListFieldProps<TYPE>)} FormFieldProps
 */

/**
 * Component representing a form field.
* @template [TYPE=string] The content type.
*  @param {FormFieldProps<TYPE>} props
 */
export function FormField(props) {
  return (<FormInput {...props} />);
}

/**
 * @param {Object} props
 * @param {}
 */
export function GuidelineEditor(props) {
  /*const nameId = useId();
  const techId = useId();
  const formId = useId();
  const levelId = useId();*/
  console.group("GuidelineEditor");
  console.table({nameId, techId, formId, levelId});
  try {
  const fields = [
    {title: "Name", id: nameId},
    {title: "Technique", id: techId, type: "select", values: getTechniques()}, 
    { title: "Form", id: formId,
      type: "select", 
      values: getForms()
    },
    { title: "Level", id: levelId, type: "number", min: 0}
    
    ];
  return (<FormControl>
  {
    (<p>FormControl</p>)
  }</FormControl>);
  } catch (err) {
    console.error(`${err.name
    }`);
    console.groupEnd();
    return (<div className="error"><h1>{err.message}</h1></div>)
  }
}

/**
 * A guidelines component.
 * @param {GuidelinesProps & Uncontrolled<GuidelineModel[]|undefined> } props
 */
export default function Guidelines(props) {
  const [guidelines, setGuidelines] = React.useState(props.defaultValue ? [...props.defaultValue] : []);
  const [mode, setMode] = React.useState(orElse(props.mode, "article"));
  
  console.group("Received guidelines");
console.table(guidelines)
console.groupEnd();
  
  function keyValue(guideline) {
    if ("id" in guideline) {
      return guideline.id;
    } else if ("key" in guideline) {
      return guideline.key;
    }
    return orElse(props.order, idKey).map( function (field) { return orElse(guideline[field], "")}).join(".");
  }
  console.groupEnd();
  console.group("Creating result");
  guidelines.forEach( function (entry) {
  console.log(`Key: ${keyValue(entry.value)}`)
  });
  console.groupEnd();
    console.log("Create List");
    if (props.readOnly) {
      return (<GuidelineList entries={guidelines} />)
    } else {
      return (<Fragment><GuidelineList entries={guidelines}/>
      <GuidelineEditor />
      </Fragment>);
    }
}