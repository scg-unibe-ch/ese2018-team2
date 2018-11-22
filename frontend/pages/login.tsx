import React from "react";
import Login from "../components/Auth/Login";
import {Image, Grid} from "semantic-ui-react";

export default () => (
    <React.Fragment>
        <Grid columns={2}>
            <Grid.Column>
                <Grid columns={2}>
                    <Grid.Column>
                        <Image centered src={"../static/logo_04.png"}/>
                    </Grid.Column>
                </Grid>
            </Grid.Column>
        </Grid>
        <Login/>
    </React.Fragment>
)