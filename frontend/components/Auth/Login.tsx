import gql from "graphql-tag";
import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import * as React from "react";
import { Mutation } from "react-apollo";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment
} from "semantic-ui-react";

interface LoginComponentProps {
  loading?: boolean;
  handleSubmit?: (email: string, password: string) => Promise<boolean>;
  handleSuccess?: () => Promise<void>;
}

interface LoginComponentState {
  wrongCredentials: boolean;
}

// TODO field validation
// TODO create test for handleSubmit
class LoginComponent extends React.Component<
  LoginComponentProps,
  LoginComponentState
> {
  public static defaultProps: Partial<LoginComponentProps> = {
    loading: false,
    handleSubmit: async _ => true,
    handleSuccess: async () => {}
  };

  state = {
    wrongCredentials: false
  };

  render() {
    const { handleSubmit, loading } = this.props;
    const { wrongCredentials } = this.state;
    return (
      <Grid>
        <Grid.Column width={4} />
        <Grid.Column width={8}>
          <Segment.Group>
            <Segment>
              <Header as="h1" textAlign="center">
                Login
              </Header>
              <Form
                loading={loading}
                onSubmit={async e => {
                  e.preventDefault();
                  // @ts-ignore
                  const formData = new FormData(e.target);
                  this.setState({ wrongCredentials: false });
                  const wrongCredentials = await handleSubmit(
                    formData.get("email"),
                    formData.get("password")
                  );
                  if (wrongCredentials) {
                    this.setState({ wrongCredentials });
                  } else {
                    await this.props.handleSuccess();
                  }
                }}
              >
                {wrongCredentials && (
                  <Message negative>Wrong email or password!</Message>
                )}
                <Form.Input
                  label={"E-Mail oder Benutzername"}
                  type={"text"}
                  name={"email"}
                  required
                />
                <Form.Input
                  label={"Passwort"}
                  type={"password"}
                  name={"password"}
                  required
                />
                <Form.Button fluid icon labelPosition={"right"} color={"green"}>
                  Login
                  <Icon name="arrow right" />
                </Form.Button>
              </Form>
            </Segment>
            <Segment textAlign={"center"}>
              <Header> No account yet? </Header>
              <Link>
                <Button fluid icon labelPosition={"right"}>
                  Sign up
                  <Icon name="arrow right" />
                </Button>
              </Link>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

const LOGIN = gql`
  mutation Login($email: String!, $pw: String!) {
    login(email: $email, pw: $pw)
  }
`;

interface LoginProps {
  router?: SingletonRouter;
  handleSuccess?: () => Promise<void>;
}

const Login: React.SFC<LoginProps> = ({ router, handleSuccess }) => (
  <Mutation mutation={LOGIN}>
    {(login, { loading }) => (
      <LoginComponent
        loading={loading}
        handleSubmit={async (email, pw) => {
          const result = await login({ variables: { email, pw } });

          // TODO handle error!!!
          // @ts-ignore TODO
          return !result.data.login;
        }}
        handleSuccess={async () => {
          await handleSuccess();
        }}
      />
    )}
  </Mutation>
);

Login.defaultProps = {
  handleSuccess: async () => {
    window.location.reload(true);
  }
};

export default withRouter(Login);
