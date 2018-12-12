import { SingletonRouter, withRouter } from "next/router";
import { Button, Card, Icon } from "semantic-ui-react";
import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";

interface JobCardProps {
  router?: SingletonRouter;
  href: string;
  job: {
    id: string;
    title: string;
    description: string;
    organization: {
      name: string;
    };
    salary: number;
  };
}

class JobCard extends React.Component<JobCardProps> {
  state = {
    bookmark: false
  };

  bookmark = e => {
    e.preventDefault();
    this.setState({ bookmark: !this.state.bookmark });
    this.state.bookmark && toast.success(this.props.job.title + " bookmarked!");
    !this.state.bookmark &&
      toast.error(this.props.job.title + " unbookmarked!");
  };

  render(): React.ReactNode {
    return (
      <Link href={this.props.href} passHref>
        <Card as={"a"}>
          <Card.Content>
            <Button
              circular
              icon={this.state.bookmark ? "bookmark" : "bookmark outline"}
              basic
              floated="right"
              onClick={e => this.bookmark(e)}
            />
            <Card.Header>{this.props.job.title}</Card.Header>
            <Card.Meta>{this.props.job.organization.name}</Card.Meta>
            <Card.Description>{this.props.job.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="money" />
            {" " + this.props.job.salary + " CHF"}
          </Card.Content>
        </Card>
      </Link>
    );
  }
}

export default withRouter(JobCard);
