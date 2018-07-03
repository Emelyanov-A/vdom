import "./areact";

const Index = () => {
  return AReact.createElement(
    "div",
    { style: { color: "green" } },
    AReact.createElement("p", null, "Hello"),
    AReact.createElement(List, { time1: "asdd" }, null)
  );
};

const List = props => {
  return AReact.createElement(
    "div",
    null,
    AReact.createElement(
      "ul",
      { time: props.time1 },
      AReact.createElement("li", null, "One"),
      AReact.createElement("li", null, "Two")
    )
  );
};

AReactDOM.render(
  AReact.createElement(Index, null, null),
  document.getElementById("index")
);
