import React from "react";
import { withIntialMe } from "../../../lib/withMe";
import NavBar from "../../Frame/NavBar";
import OrganisationOverview from "./OrganisationOverview";

const Page = () => (
  <React.Fragment>
    <NavBar />
    <OrganisationOverview />
  </React.Fragment>
);

export default withIntialMe(Page);
