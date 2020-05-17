import React, { Component, Fragment } from 'react'
import OdberatelService from "../../service/OdberatelService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";
import {Helmet} from "react-helmet";
import {toast} from "react-toastify";

class AddOdberatelComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            firma: '',
            ic: '',
            dic: '',
            psc: '',
            mesto: '',
            ulice: '',
            cisloPopisne: '',
        }
    }

    saveOdberatel = (e) => {
        e.preventDefault();
        OdberatelService.addOdberatel({...this.state})
            .then(res => {
                toast(res.data.message);
                this.props.history.push('/list-subscriber');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <Fragment>
                <Helmet>
                    <title>Přidání odběratele</title>
                </Helmet>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Nový odběratel</Typography>
                    <form style={formContainer}>

                        <TextField label="FIRMA" type="text" fullWidth margin="normal" name="firma" value={this.state.firma} onChange={this.onChange}/>

                        <TextField label="IČO" type="text" fullWidth margin="normal" name="ic" value={this.state.ic} onChange={this.onChange}/>

                        <TextField label="DIČ" type="text" fullWidth margin="normal" name="dic" value={this.state.dic} onChange={this.onChange}/>

                        <TextField label="PSČ" type="text" fullWidth margin="normal" name="psc" value={this.state.psc} onChange={this.onChange}/>

                        <TextField label="MĚSTO" type="text" fullWidth margin="normal" name="mesto" value={this.state.mesto} onChange={this.onChange}/>

                        <TextField label="ULICE" type="text" fullWidth margin="normal" name="ulice" value={this.state.ulice} onChange={this.onChange}/>

                        <TextField label="ČÍSLO POPISNÉ" type="text" fullWidth margin="normal" name="cisloPopisne" value={this.state.cisloPopisne} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.saveOdberatel}>Vytvořit</Button>
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

export default AddOdberatelComponent;
