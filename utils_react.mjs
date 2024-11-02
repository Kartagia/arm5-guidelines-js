/**
 * React utility library.
 * @module utils/react
 */

/**
 * Value change of any kind.
 * @template TYPE The value type.
 * @typedef {Object} ValueChange
 * @property {TYPE} [newValue] The new value.
 * @property {TYPE} [oldValue] The okd value.
 */

/**
 * The value removal.
 *@template TYPE The value type
 * @typedef {Required<Omit<ValueChange<TYPE>,"newValue">>} ValueRemoved
 */

/**
 * The value initialization.
 * @template TYPE The value type
 * @typedef {Required<Omit<ValueChange<TYPE>, "oldValue">>} ValueInit
 */
 
 /**
 * The value replacement.
 * @template TYPE The value type
 * @typedef {Required<ValueChange<TYPE>>} ValueReplaced
 */
 
 /**
 * The value not changed.
 * @template TYPE The value type
 * @typedef {Required<Omit<ValueChange<TYPE>, "oldValue"|"newValue">>} ValueUnchanged
 */
 
 /** 
  * The value change event.
  * @template TYPE The value change
  * @typedef {CustomEvent<ValueInit<TYPE>|ValueRemoved<TYPE>|ValueReplaced<TYPE>>} ValueChangeEvent
  */
 
 /**
  * The listener of value change events.
  * @template TYPE The value type
  * @callback ValueChangeListener
  * @param {ValueChangeEvent<TYPE>} event The event of the change.
  */

export function createChangeListener(options) {
  
  const parser = (/** @type {string}*/ source) => {
    if (options.parser) {
      return optioms.parser(source);
    } else {
      throw new SyntaxError("No parser available");
    }
  };
  
  const handler = (/** @type {TYPE} */ newValue) => {
    options.handler(newValue);
  }
  
  return ( /** @type {InputEvent} */ event) => {
    if (event.currentTarget.value === "") {
      // Undefined/null
      
    } else {
      try {
        const value = parse(event.currentTarget.value);
        handler(valye);
      } catch (err) {
        if (options.log) {
          options.log.error("Invalid value change", err);
        }
        if (options.onInvalid) {
          options.onInvalid(event);
        }
      }
    }
  };
}

/**
 * The handler of a value change.
 * @template TYPE The value type
 * @callback ValueChangeHandler
 * @param {TYPE} newValue The new value.
 */

/**
 * @template TYPE The value type
 * @typedef {Object} ControlledValued
 * @property {TYPE} value The current value.
 * @property {ValueChangeListener<TYPE>} onChange The listener of the value change.
 */
 
 /**
  * @template TYPE The value type.
  * @typedef {Object} UncontrolledValued
  * @property {TYPE} defaultValue
  * @property {ValueChangeListener<TYPE>} onChange The listener of the value change.
  */