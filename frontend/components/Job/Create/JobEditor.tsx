import * as React from "react";
import { KeyUtils, Value } from "slate";
import Plain from "slate-plain-serializer";
import { Editor } from "slate-react";
import { Segment } from "semantic-ui-react";

interface JobEditorProps {}
interface JobEditorState {
  value: Value;
}

class JobEditor extends React.Component<JobEditorProps, JobEditorState> {
  constructor(props) {
    super(props);
    KeyUtils.resetGenerator();

    this.state = {
      value: Plain.deserialize("")
    };
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <Segment>
        <Editor value={value} onChange={this.onChange} />
      </Segment>
    );
  }
}

export default JobEditor;
