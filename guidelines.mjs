/**
 * @module guidelines
 */

// import Dao from "./module.dao.mjs"

/**
 * @template [ID=string]
 * @template VALUE
 * @typedef {Object} Identified
 * @property {ID} id 
 * @property {VALUE} value
 */

/**
 * The guideline model.
 * @typedef {Object} Guideline
 * @property {number|null} level
 * @property {string} tech
 * @property {string} form
 * @property {string} name
 * @property {string} [description]
 */

/**
 * @type {Identified<Guideline>}
 */
var members = [
  {id:"1", 
  value:{
  name: "Create an insect.",
  tech: "Creo",
  form: "Animal",
  level: 3
  }}
];

/**
 * @returns {Identified<string, Guideline>[]}
 */
export function getGuidelines() {
  return [...members];
}

export function getGuideline(key) {
  const result = getGuidelines().find(function (entry) { return (entry.id === key)});
  return result ? result.value : undefined;
}