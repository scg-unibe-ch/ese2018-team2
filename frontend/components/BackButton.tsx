import {SingletonRouter, withRouter} from "next/router";
import * as React from "react";
import {Button} from "semantic-ui-react";

interface BackButtonProps {
    router?: SingletonRouter
}

class BackButton extends React.Component<BackButtonProps> {
    render() {
        return <Button icon={"arrow left"} onClick={() => {this.props.router.back()}}/>;
    }
}

export default withRouter(BackButton);
