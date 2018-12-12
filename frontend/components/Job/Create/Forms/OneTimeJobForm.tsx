import * as React from "react";
import { Form, Icon } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface OneTimeJobFormProps {
  handleChange: (e: any, x: { name: string; value }) => void;
}

interface OneTimeJobFormState {
  start: Date;
  end: Date;
}

class OneTimeJobForm extends React.Component<
  OneTimeJobFormProps,
  OneTimeJobFormState
> {
  state = {
    start: new Date(),
    end: new Date()
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
        <Form.Field required>
          <label>
            <Icon name="calendar" />
            Enddatum
          </label>
          <DatePicker
            selected={this.state.end}
            placeholderText={"Datum Auswählen"}
            dateFormat="EEEE, d.M.yyyy"
            onChange={(date, e) => {
              this.setState({ end: date });
              this.props.handleChange(e, { name: "end", value: date });
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

export default OneTimeJobForm;
