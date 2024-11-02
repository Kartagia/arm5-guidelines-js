/**
 * @module guidelines
 */

// import Dao from "./module.dao.mjs"

/**
 * An indentifier and its value.
 * @template [ID=string]
 * @template VALUE
 * @typedef {Object} Identified
 * @property {ID} id The identifier.
 * @property {VALUE} value The value.
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
 * Create a guideline.
 * @param {Guideline} props
 * @return {Guideline}
 */
export function createGuideline(props) {
  
  return {
    name: props.name,
    level: props.level == null ? null : props.level,
    tech: props.tech,
    form: props.form,
    description: props.description
  };
  
}

var ids = 2;

/**
 * @type {Identified<Guideline>}
 */
var members = [
  {id:"1", 
  value:createGuideline({
  name: "Create an insect.",
  tech: "Creo",
  form: "Animal",
  level: 3
  })}
];

/**
 * Get next id.
 * @type {import("./utils.mjs").Supplier<string>}
 */
export function createId() {
  return `${ids++}`;
}

export function getTechniqueNames() {
  return ["Creo", "Intellego", "Muto"];
}

export function getFormNames() {
  return ["Aquam", "Auram", "Ignem", "Terram"];
}

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

export function addGuideline(guideline) {
  try {
    const value = createGuideline(guideline);
    const id = createId();
    members.push({id,value});
    return id;
  } catch(cause) {
    throw SyntaxError("Invalid guideline", {cause});
  }
}