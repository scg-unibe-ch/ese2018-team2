import React from "react";
import {Dropdown, Image, Input, Menu} from "semantic-ui-react";
import {SingletonRouter, withRouter} from "next/router";
import StudentActionsDropdown from "./StudentActionsDropdown";


interface UserNavBarProps {
    router: SingletonRouter;
}


const StudentNavBar: React.SFC<UserNavBarProps> = ({router}) => {

    const languageOptions = [
        {key: 'gb', value: 'gb', flag: 'gb', text: 'English'},
        {key: 'ch', value: 'ch', flag: 'ch', text: 'Deutsch'},
        {key: 'fr', value: 'fr', flag: 'fr', text: 'Français'},
        {key: 'it', value: 'it', flag: 'it', text: 'Italiano'}
    ];
    return (
        <Menu stackable borderless>
            <Menu.Item href={"/dashboard"}>
                <Image size={"tiny"} src={'../static/logo_04_slim.png'}/>
            </Menu.Item>

            <Menu.Item>
                <Input className='icon' icon='search' placeholder='Search...'/>
            </Menu.Item>

            <Menu.Item href={"/dashboard"} active={router.asPath === "/dashboard"}>
                Dashboard
            </Menu.Item>

            <Menu.Item href={"/jobs"} active={router.asPath === "/jobs"}>
                Job Catalog
            </Menu.Item>

            <Menu.Item href={"/dashboard"}>
                My Shifts
            </Menu.Item>

            <Menu.Item href={"/dashboard"}>
                Profile
            </Menu.Item>

            <Menu.Menu position={"right"}>
                <Menu.Item>
                    <Dropdown floating defaultValue={'gb'} options={languageOptions}/>
                </Menu.Item>

                <Menu.Item>
                    <StudentActionsDropdown/>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}

export default withRouter(StudentNavBar);
