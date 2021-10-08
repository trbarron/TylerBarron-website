import React from "react";
import "../assets/CSS/field.scss"

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (props.locked && props.active) || false,
      value: props.value || "",
      error: props.error || "",
      label: props.label || "Label"
    };
  }

  changeValue(event) {
    const value = event.target.value;
    this.setState({ value, error: "" });
    this.props.handleChange(event.target.value);
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted });
    }
  }

  render() {
    const { active, value, error, label } = this.state;
    const { predicted, locked, isPassword, tabIndex, autoComplete } = this.props;
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;

    return (
      <div className={fieldClassName}>
        {active &&
          value &&
          predicted &&
          (!isPassword === true) &&
          predicted.includes(value) && <p className="predicted">{predicted}</p>}
        <input
          id={1}
          type={this.props.isPassword ? "password" : "text" }
          value={value}
          placeholder={this.state.active ? "" : label}
          onChange={this.changeValue.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
          autoComplete={isPassword || (autoComplete === false)? "off" : "on"}
          tabIndex={tabIndex}
        />
        <label htmlFor={1} className={error && "error"}>
          {error || label}
        </label>
      </div>
    );
  }
}
export default Input