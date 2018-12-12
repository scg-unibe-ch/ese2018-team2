import * as React from "react";
import { Tab } from "semantic-ui-react";
import FixedJobForm from "./FixedJobForm";
import TemporaryJobForm from "./TemporaryJobForm";
import OneTimeJobForm from "./OneTimeJobForm";

interface ScheduleTabsProps {
  handleChange: (e: any, x: { name: string; value }) => void;
}

const ScheduleTabs: React.FC<ScheduleTabsProps> = ({ handleChange }) => (
  <Tab
    panes={[
      {
        menuItem: "Unbefristet",
        render: () => (
          <Tab.Pane>
            <FixedJobForm handleChange={handleChange} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Temporär",
        render: () => (
          <Tab.Pane>
            <TemporaryJobForm handleChange={handleChange} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Einmalig",
        render: () => (
          <Tab.Pane>
            <OneTimeJobForm handleChange={handleChange} />
          </Tab.Pane>
        )
      }
    ]}
  />
);

export default ScheduleTabs;
