import React, { Component } from 'react'
import UserService from "../../service/UserService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";
import {Helmet} from "react-helmet";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        UserService.fetchUsers()
            .then((res) => {
                this.setState({users: res.data.result})
            });
    }

    deleteUser(userId) {
        UserService.deleteUser(userId)
           .then(res => {
               toast(res.data.message);
               this.setState({users: this.state.users.filter(user => user.id !== userId)});
           })
    }

    editUser(id) {
        this.props.history.push('/edit-user/'+id);
    }

    addUser() {
        this.props.history.push('/add-user');
    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer/>
                <Helmet>
                    <title>Seznam uživatelů</title>
                </Helmet>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Seznam uživatelů</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Jméno</TableCell>
                                <TableCell align="left">Přijmení</TableCell>
                                <TableCell align="left">Login</TableCell>
                                <TableCell align="left">Věk</TableCell>
                                <TableCell align="left">Plat</TableCell>
                                <TableCell align="left">Akce</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell align="left">{row.firstName}</TableCell>
                                    <TableCell align="left">{row.lastName}</TableCell>
                                    <TableCell align="left">{row.username}</TableCell>
                                    <TableCell align="left">{row.age}</TableCell>
                                    <TableCell align="left">{row.salary}</TableCell>
                                    <TableCell align="left"><CreateIcon cursor='pointer' onClick={() => this.editUser(row.id)} />&nbsp;<DeleteIcon cursor='pointer' onClick={() => this.deleteUser(row.id)}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <br/>
                    <Button variant="contained" color="primary" onClick={() => this.addUser()}>
                        Nový uživatel
                    </Button>
                </Container>
            </React.Fragment>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListUserComponent;
