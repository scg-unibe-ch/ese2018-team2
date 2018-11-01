import withAuthorization from "../../Auth/withAuthorization";
import Me from "../../Auth/Me";
import * as React from "react";
import {Container} from "semantic-ui-react";
import RecommendedJobs from "./RecommendedJobs";

const StudentDashboard = () => (
    <Container>
        <Me/>
        <RecommendedJobs/>
    </Container>
);

export default withAuthorization(StudentDashboard);