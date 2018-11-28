import React from "react";
import { Label } from "semantic-ui-react";

interface ClickableLabelProps {
  text: string;
  detail: number;
}

interface ClickableLabelState {
  active: boolean;
}

export default class ClickableLabel extends React.Component<
  ClickableLabelProps,
  ClickableLabelState
> {
  state = {
    active: false
  };

  onClick = e => {
    this.setState({ active: !this.state.active });
    e.preventDefault();
  };

  render() {
    return (
      <Label
        color={this.state.active ? "green" : undefined}
        onClick={this.onClick}
      >
        {this.props.text}
        <Label.Detail>{this.props.detail}</Label.Detail>
      </Label>
    );
  }
}
