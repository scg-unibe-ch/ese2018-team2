import {withRouter} from "next/router";
import * as React from "react";
import {Container} from "semantic-ui-react";
import ApplicationDetails from "./ApplicationDetails"
import StudentNavBar from "../../student/StudentNavBar";

export default withRouter(props => {
    return (
        <div>
            <StudentNavBar/>
            <Container>
                <ApplicationDetails application={props.router.query["id"] as string}/>
            </Container>
        </div>
    );
});
