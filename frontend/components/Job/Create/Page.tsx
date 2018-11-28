import NavBar from "../../Frame/NavBar";
import EnsureLoggedIn from "../../../lib/EnsureLoggedIn";
import NewJobComponent from "./NewJobComponent";
import * as React from "react";

const Page = () => (
  <React.Fragment>
    <NavBar />
    <EnsureLoggedIn>
      <NewJobComponent />
    </EnsureLoggedIn>
  </React.Fragment>
);

export default Page;
