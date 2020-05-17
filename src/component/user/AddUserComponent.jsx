import React, { Component, Fragment } from 'react'
import UserService from "../../service/UserService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";
import {Helmet} from "react-helmet";
import {toast, Toast} from "react-toastify";

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            age: '',
            salary: '',
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, age: this.state.age, salary: this.state.salary};
        UserService.addUser(user)
            .then(res => {
                toast(res.data.message);
                this.props.history.push('/list-user');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <Fragment>
                <Helmet>
                    <title>Přidání uživatele</title>
                </Helmet>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Nový uživatel</Typography>
                    <form style={formContainer}>

                        <TextField label="LOGIN" fullWidth margin="normal" name="username" value={this.state.username} onChange={this.onChange}/>

                        <TextField label="HESLO" type="password" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>

                        <TextField label="JMÉNO" fullWidth margin="normal" name="firstName" value={this.state.firstName} onChange={this.onChange}/>

                        <TextField label="PŘIJMENÍ" fullWidth margin="normal" name="lastName" value={this.state.lastName} onChange={this.onChange}/>

                        <TextField label="VĚK" type="number" fullWidth margin="normal" name="age" value={this.state.age} onChange={this.onChange}/>

                        <TextField label="PLAT" type="number" fullWidth margin="normal" name="salary" value={this.state.salary} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.saveUser}>Vytvořit</Button>
                    </form>
                </Container>
            </Fragment>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

export default AddUserComponent;
