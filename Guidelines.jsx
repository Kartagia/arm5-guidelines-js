
import React from 'react';
import {
  Table, TableRow, TableHead,
  TableCell, Typography
} from '@material-ui/core';
import Guideline from "./guideline.jsx";

/**
 * @typedef TYPE 
 * @param {TYPE|undefined|null} value 
 * @param {TYPE} defaultValue
 * @return {TYPE} If value is defined, the value. Otherwise the default value.
 */
export function orElse(value, defaultValue) {
  return value == null ? defaultValue : value;
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
  <header>Guidelines</header><main>{orElse(props.entries, []).map(
    (entry) => (<Guideline key={entry.id} model={entry.value}/>))}</main></section>)
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
    return (<GuidelineList entries={guidelines} />)
}