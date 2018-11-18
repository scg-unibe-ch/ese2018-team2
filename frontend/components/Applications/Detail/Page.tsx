import {withRouter} from "next/router";
import * as React from "react";
import {Container} from "semantic-ui-react";
import NavBar from "../../layout/header/NavBar";
import ApplicationDetails from "./ApplicationDetails"

export default withRouter(props => {
    return (
        <div>
            <NavBar />
        <Container>
            <ApplicationDetails application={props.router.query["id"] as string} />
    </Container>
    </div>
);
});
