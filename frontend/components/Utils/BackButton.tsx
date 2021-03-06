import {SingletonRouter, withRouter} from "next/router";
import * as React from "react";
import {Button} from "semantic-ui-react";
import {GET_JOB_WITH_DETAILS} from "./JobDetailGroup";
import {GET_ALL_JOBS} from "../../../pages/jobs";

interface BackButtonProps {
    router: SingletonRouter;
}

const BackButton: React.SFC<BackButtonProps> = ({router}) => (
    <Button icon={"arrow left"} onClick={router.back}/>
);

export default withRouter(BackButton);
