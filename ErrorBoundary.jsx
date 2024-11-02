
import React from 'react';

import {orElse} from "././utils.mjs";

/**
 * @typedef {object} ErrorBoundaryProps
 * @property {string} [className="error"] The error class name.
 */

/**
 * Create an error boundary.
 * @param {import('react').PropsWithChildren<ErrorBoundaryProps>} props
 */
 export function ErrorBoundary(props) {
   console.group(`Component ErrorBoundary`);
   const className = ("className" in props ? props.className : "error");
   if ("className" in props) {
     console.log(`Class: ${props.className}`);
   } else {
     console.log('No classname', className)
   }
   console.log(`Class: ${className}`);
  try {
    const content = (<React.Fragment>{props.children}</React.Fragment>);
    console.log("No error")
    console.groupEnd();
    return content;
  } catch (err) {
    console.error("Handling error")
    const content =  (<div className={className}><h1>{(err && err.name ? err.name : `Error of ${typeof err}`)} has occured</h1>
    <dl>
    { ["message", "cause"].map( prop => (<React.Fragment><dt>{prop}</dt><dd>{err instanceof Object ? err[prop] : "No value"}</dd></React.Fragment>))}
    </dl>
    </div>);
    console.log("Error content created")
    console.groupEnd();
    return content;
  }
}
