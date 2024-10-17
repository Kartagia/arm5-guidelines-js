/**
 * @module guidelines
 */

// import Dao from "./module.dao.mjs"

/**
 * @typedef {Object} Guideline
 * @property {number|null} level
 * @property {string} tech
 * @property {string} form
 * @property {string} name
 * @property {string} [description]
 */

export function getGuidelines() {
  return [];
}

export function getGuideline(key) {
  return getGuidelines().find(([id, value]) => (id === key))?.[1];
}