import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import ContentWrapper from "./content/ContentWrapper";
import PageHeader from "./header/PageHeader";
import PageFooter from "./footer/PageFooter";

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD"
};

export default ({ children }) => (
  <div style={layoutStyle}>
    <PageHeader />
    <ContentWrapper>{children}</ContentWrapper>
    <PageFooter />
  </div>
);
