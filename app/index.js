import "./areact";

const List = props => {
  return (
    <div>
      <ul time={props.time1}>
        <li>One</li>
        <li>Two</li>
      </ul>
    </div>
  );
};

class App extends AReact.Component {
  constructor(props) {
    super(props);
    this.status = { buttonStatus: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setStatus({ status: !this.status.buttonStatus });
  }

  render() {
    return (
      <div style={{ color: "green" }}>
        <button onClick={this.handleClick}>Hide</button>
        <List time1="1234" />
      </div>
    );
  }
}

AReactDOM.render(<App />, document.getElementById("index"));
