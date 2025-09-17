import React from 'react';
import { FormattedMessage } from 'react-intl';
import { AuthorizedMenu } from './authorized-menu';
import { Avatar, Button } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import Popover from 'components/popover/popover';

interface Props {
    isAuthenticated: boolean;
    onJoin: () => void;
    onLogout: () => void;
}

const AuthMenu = ({ isAuthenticated, onJoin, onLogout }: Props) => {
    return !isAuthenticated ? (
        <Button variant="contained" disableElevation color="primary" onClick={onJoin}>
            <FormattedMessage id="joinButton" defaultMessage="join"/>
        </Button>
    ) : (
        <Popover
            direction="right"
            className="user-pages-dropdown"
            handler={
                <Avatar style={{backgroundColor: '#133695'}}>
                    <Person />
                </Avatar>
            }
            content={<AuthorizedMenu onLogout={onLogout}/>}
        />
    );
};

export default AuthMenu;
