
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
  const keyValue = `${model.form} ${model.tech} ${model.level ? model.level : "Gen"}`;
  switch (props.mode) {
    case "table-row":
      return (<tr><th>{keyValue}{model.name}</th><td>{model.description}</td></tr>)
    default:
      return (<article><header>{key}{model.name}</header><main>{model.description}</main></article>);
  }
}