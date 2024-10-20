
import React from "react";
import {
  Paper, Typography, 
  TableRow, TableHead, TableCell} from "@material-ui/core";

/**
 * @typedef {Object} GuidelineProps
 * @property {import("./module.guideline.mjs").Guideline} model The shown guideline.
 * @property {string} [mode] The mode of the guideline. 
 */

/**
 * @param {GuidelineProps} props
 */
export default function Guideline(props) {
  const model = props.model;
  const keyValue = `${model.tech} ${model.form} ${model.level ? model.level : "Gen"}`;
  switch (props.mode) {
    case "table-row":
      return (<TableRow><TableCell>{keyValue}{model.name}</TableCell><TableCell>{model.description}</TableCell></TableRow>)
    default:
      return (<Paper><header>{keyValue}:{model.name}</header><main>{model.description}</main></Paper>);
  }
}