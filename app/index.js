import "./areact";

const List = props => {
  return (
    <div>
      <ul
        time={props.time1}
        style={{ display: props.hidden ? "none" : "block" }}
      >
        <li>One</li>
        <li>Two</li>
      </ul>
    </div>
  );
};

class App extends AReact.Component {
  constructor(props) {
    super(props);
    this.status = { buttonStatus: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setStatus({ buttonStatus: !this.status.buttonStatus });
  }

  render() {
    return (
      <div style={{ color: "green" }}>
        <button onClick={this.handleClick}>
          {this.status.buttonStatus ? "Show" : "Hide"}
        </button>
        <List time1="1234" hidden={this.status.buttonStatus} />
      </div>
    );
  }
}

AReactDOM.render(<App />, document.getElementById("index"));
