import React from "react";
import {Button, Container, Grid, Header, Icon, Image, Menu, Select} from "semantic-ui-react";
import {SingletonRouter, withRouter} from "next/router";
import Link from "next/link";

interface FrontPageNavBarProps {
    router?: SingletonRouter;
}


class FrontPageNavBar extends React.Component<FrontPageNavBarProps> {

    render() {

        const languageOptions = [
            {key: 'gb', value: 'gb', flag: 'gb', text: 'English'},
            {key: 'ch', value: 'ch', flag: 'ch', text: 'Deutsch'},
            {key: 'fr', value: 'fr', flag: 'fr', text: 'Français'},
            {key: 'it', value: 'it', flag: 'it', text: 'Italiano'}
        ];
        return (
            <React.Fragment>
                <Grid columns={2}>
                    <Grid.Column>
                        <Grid columns={2}>
                            <Grid.Column>
                                <Image centered src={"../static/logo_04.png"}/>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column>
                        <Menu secondary fluid stackable text>
                            <Menu.Menu position={"right"}>
                                <Select defaultValue={languageOptions[0].text} options={languageOptions}/>
                                <Menu.Item>
                                    <Button>Log in</Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button>Register</Button>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Column>
                </Grid>
                <Container>
                    <Menu pointing secondary widths={2}>
                        <Link href={"/"}>
                            <Menu.Item
                                active={this.props.router.asPath === "/"}
                            >
                                <Header as='h1' icon>
                                    <Icon name='student'/>
                                    For Students
                                    <Header.Subheader>Manage your account settings and set e-mail
                                        preferences.</Header.Subheader>
                                </Header>
                            </Menu.Item>
                        </Link>
                        <Link href={"/business"}>
                            <Menu.Item
                                active={this.props.router.asPath === "/business"}
                            >
                                <Header as='h1' icon>
                                    <Icon name='building'/>
                                    For Business
                                    <Header.Subheader>Manage your account settings and set e-mail
                                        preferences.</Header.Subheader>
                                </Header>
                            </Menu.Item>
                        </Link>
                    </Menu>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(FrontPageNavBar);
