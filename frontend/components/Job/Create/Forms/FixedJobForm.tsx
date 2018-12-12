import * as React from "react";
import { Form, Icon } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface FixedJobFormProps {
  handleChange: (e: any, x: { name: string; value }) => void;
}

interface FixedJobFormState {
  start: Date;
}

class FixedJobForm extends React.Component<
  FixedJobFormProps,
  FixedJobFormState
> {
  state = {
    start: new Date()
  };

  render() {
    return (
      <Form.Group>
        <Form.Field required>
          <label>
            <Icon name="calendar" />
            Startdatum
          </label>
          <DatePicker
            selected={this.state.start}
            placeholderText={"Datum Auswählen"}
            dateFormat="EEEE, d.M.yyyy"
            onChange={(date, e) => {
              this.setState({ start: date });
              this.props.handleChange(e, { name: "start", value: date });
            }}
          />
        </Form.Field>
        <Form.Input
          required
          width={3}
          name="workload"
          label="Arbeitsstunden pro Woche"
          onChange={(e, { name, value }) => {
            this.props.handleChange(e, { name: name, value: +value });
          }}
        />
      </Form.Group>
    );
  }
}

export default FixedJobForm;
