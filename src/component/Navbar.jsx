import React  from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import AuthService from "../service/AuthService";
import { useHistory } from "react-router-dom";

const style = {
    flexGrow: 1
}
const NavBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        AuthService.logOut();
        history.push('/login');
    };
    return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={style}>
                            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                Menu
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => {history.push('/')}}>DashBoard</MenuItem>
                                <MenuItem onClick={() => {history.push('/list-invoice')}}>Faktury</MenuItem>
                                <MenuItem onClick={() => {history.push('/list-subscriber')}}>Odběratelé</MenuItem>
                                <MenuItem onClick={() => {history.push('/list-user')}}>Uživatelé</MenuItem>
                            </Menu>
                        </Typography>


                        <Button color="inherit">{AuthService.getUserInfo().username}</Button>
                        <Button color="inherit" onClick={logout}>Odhlásit se</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
}

export default NavBar;
