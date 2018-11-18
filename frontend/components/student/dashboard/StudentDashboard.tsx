import withAuthorization from "../../Auth/withAuthorization";
import Me from "../../Auth/Me";
import * as React from "react";
import {Container} from "semantic-ui-react";
import RecommendedJobs from "../recomendedjobs/RecommendedJobs";
import StudentActivities from "../activity/StudentActivities";
import StudentWatching from "../watching/StudentWatching";

const StudentDashboard = () => (
    <Container>
        <Me/>
        <RecommendedJobs/>
        <StudentActivities/>
        <StudentWatching/>
    </Container>
);

export default withAuthorization(StudentDashboard);