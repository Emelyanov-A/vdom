import "./areact";
import "./aredux";

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

const buttonReducer = (state = { buttonVisibility: true }, action = {}) => {
  switch (action.type) {
    case "SHOW":
      return { buttonVisibility: true };
    case "HIDE":
      return { buttonVisibility: false };
    default:
      return state;
  }
};
const store = ARedux.createStore(buttonReducer);

class App extends AReact.Component {
  constructor(props) {
    super(props);
    store.subscribe(() => {
      this.setStatus(store.getState());
    });
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    store.dispatch({
      type: !store.getState().buttonVisibility ? "SHOW" : "HIDE"
    });
  }

  render() {
    return (
      <div style={{ color: "green" }}>
        <button onClick={this.handleClick}>
          {store.getState().buttonVisibility ? "Show" : "Hide"}
        </button>
        <List time1="1234" hidden={store.getState().buttonVisibility} />
      </div>
    );
  }
}

AReactDOM.render(<App />, document.getElementById("index"));
