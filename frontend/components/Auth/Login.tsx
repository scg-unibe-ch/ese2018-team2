import gql from "graphql-tag";
import * as React from "react";
import { Mutation } from "react-apollo";
import { Form, Message } from "semantic-ui-react";
import { withRouter, SingletonRouter } from "next/router";

interface LoginComponentProps {
  loading?: boolean;
  handleSubmit?: (email: string, password: string) => Promise<boolean>;
  handleSuccess?: () => Promise<void>
}

interface LoginComponentState {
  wrongCredentials: boolean;
}

// TODO field validation
// TODO create test for handleSubmit
class LoginComponent extends React.Component<LoginComponentProps, LoginComponentState> {
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
      <Form
        loading={loading}
        onSubmit={async e => {
          e.preventDefault();
          // @ts-ignore
          const formData = new FormData(e.target);
          this.setState({ wrongCredentials: false });
          const wrongCredentials = await handleSubmit(
            formData.get("email"),
            formData.get("pw")
          );
          if (wrongCredentials) {
            this.setState({ wrongCredentials });
          } else {
            await this.props.handleSuccess()
          }
        }}
      >
        {wrongCredentials && (
          <Message negative>Wrong email or password!</Message>
        )}
        <Form.Input label={"E-Mail"} type={"text"} name={"email"} required />
        <Form.Input label={"Passwort"} type={"password"} name={"pw"} required />
        <Form.Button color={"green"}>Login</Form.Button>
      </Form>
    );
  }
}

const LOGIN = gql`
  mutation Login($email: String!, $pw: String!) {
    login(email: $email, pw: $pw)
  }
`;

interface LoginProps {
  router?: SingletonRouter
}

const Login: React.SFC<LoginProps> = ({ router }) => (
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
          await router.replace("/dashboard")
        }}
      />
    )}
  </Mutation>
);



export default withRouter(Login);
