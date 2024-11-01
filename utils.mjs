
/**
 * The utility module.
 * @module
 */
 
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
  * The error options.
  * @template [CAUSE=any] The cause of the error.
  * @typedef {Object} ErrorOptions
  * @property {CAUSE} [cause] The cause of the exception.
  */
 
 /**
  * The not found ertor.
  * @template [CAUSE=any] The causw typr.
  * @extends {Error}
  */
 export class NotFoundError extends Error {
   
   /**
    * @param {string} [msg] The error message.
    * @param {ErrorOptions<CAUSE>} [options] The error options
    */
   constructor(msg=undefined, options={}) {
     super(msg, options);
     this.name = this.constructor.name;
   }
 }
 
 /**
 * An indentifier and its value.
 * @template [ID=string] The identifier type.
 * @template VALUE The value type.
 * @typedef {Object} Identified
 * @property {ID} id The identifier.
 * @property {VALUE} value The value.
 */
 
 /**
  * Registry of values.
 * @template [ID = string] The identifier type.
 * @template VALUE The value type.
 * @typedef Registry
 * @property {Setter<Identified<ID,VALUE>, Error>} add Add a value to registry.
 * @property {Getter<Iterator<Identified<ID,VALUE>>} entries The entries of the registry.
 * @property {Converter<ID, VALUE, NotFoundError>} get Get the value of an identifierm
  */

/**
 * A predicate testing a value.
 * @template TYPE The tested type.
 * @callback Predicate
 * @param {TYPE} tested The tested value.
 * @returns {boolean} True, if and only if the tested passes the test.
 */

/**
 * Supplies a value.
 * @template TYPE The supplied valud type.
 * @callback Supplier 
 * @returns {TYPE} The supplied value.
 */
 
 /**
  * Consumer of a vslue.
  * @template TYPE The consumed type.
  * @callback Consumer
  * @param {TYPE} source The consumed value.
  */
  
/**
 * A conversion of a value.
 * @template SOURCE The source type.
 * @template [TARGET=SOURCE] The result type.
 * @template [EXCEPTIO=any] The exception type.
 * @param {SOURCE} source The converted value.
 * @returns {TARGET} The conversion result.
 * @throws {EXCEPTION} the conversion was not possible.
 */

/**
 * Get a value
 * @template TYPE The value type.
 * @template [EXCEPTION=undefined] The exception type.
 * @callback Getter
 * @param {string} [message] The exception message.
 * @param {Converter<string, EXCEPTION>} [exceptionSupplier] The error supplier.  
 * @returns {TYPE} The supplied value.
 * @throws {EXCEPTION} The valuw does not exist.
 */
 
 /**
  * Set of a value.
  * @template TYPE The set value type.
  * @template [EXCEPTION=undefined] The exception type.
  * A setter of a value.
  * @typedef {Converter<TYPE, void, EXCEPTION>} Setter
  */