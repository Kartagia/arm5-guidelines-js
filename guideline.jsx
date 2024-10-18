
export default function Guideline(props) {
  const model = props.model;
  const key = `${model.form} ${model.tech} ${model.level ?? "Gen"}`;
  switch (props.mode) {
    case "table-row":
      return (<tr><th>{key}{model.name}</th><td>{model.description}</td></tr>)
    default:
      return (<article><header>{key}{model.name}</header><main>{model.description}</main></article>);
  }
}