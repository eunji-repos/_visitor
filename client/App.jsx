const React = require("react");
const { Component } = require("react");
const axios = require("axios");

export class App extends Component {
  state = {
    initialized: "Type Name and Leave your Step",
    visitors: [],
    typedName: "",
    isNewVisitor: false,
  };

  ordinal = {
    1: "st",
    2: "nd",
    3: "rd",
  };

  componentDidMount() {
    this.getVisitors();
  }

  async getVisitors() {
    const { data } = await axios.get("http://localhost:8080/api/visitor", {
      visitor_name: this.typedName,
    });
    this.setState({
      isNewVisitor: true,
      visitors: data,
    });
    return;
  }

  async rememberStep(name) {
    const body = { visitor_name: this.state.typedName };
    const response = await axios.post(
      "http://localhost:8080/api/visitor",
      body
    );

    return;
  }

  handleInputName(e) {
    // if()
    console.log("@@@", e.currentTarget.value);
    this.setState({ typedName: e.currentTarget.value });
  }

  render() {
    return (
      <div>
        <h1 style={{ color: "green" }}>{this.state.initialized}</h1>

        <input
          type="text"
          placeholder="what is your name"
          onInput={(e) => this.handleInputName(e)}
        ></input>
        <button onClick={() => this.rememberStep()}>send name!</button>
        <br />
        <br />

        {this.state.visitors.map((visitor, v_idx) => {
          return (
            <div key={v_idx}>
              <span>visitor' Name</span>
              <span>{visitor.visitor_name}</span>
              <span>visited Date</span>
              <span>{visitor.created_at}</span>
            </div>
          );
        })}
        <br />
        <div>{`You're the ${this.state.visitors.length}${
          this.ordinal[this.state.visitors.length]
            ? this.ordinal[this.state.visitors.length]
            : "th"
        } visitor!`}</div>
      </div>
    );
  }
}
