import React, { Component, Fragment } from 'react'
import OdberatelService from "../../service/OdberatelService";
import FakturaService from "../../service/FakturaService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";
import {Helmet} from "react-helmet";
import {toast} from "react-toastify";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from "@material-ui/icons/Delete";
import {SetTime} from "../../service/TimeService";
import {PolozkaFakturyComponent} from "./PolozkaFakturyComponent";
import Loader from "react-loader-spinner";
import FakturaComponent from "./FakturaComponent";

class EditFakturaComponent extends Component{

    constructor(props){
        super(props);
    }


    editFaktura = (e, object) => {
        e.preventDefault();
        let faktura = {...object};
        faktura.datumSplatnosti = SetTime(faktura.datumSplatnosti);
        faktura.datumUzp = SetTime(faktura.datumUzp);
        faktura.datumVystaveni = SetTime(faktura.datumVystaveni);
        FakturaService.editFaktura(this.props.match.params.id,faktura)
            .then(res => {
                toast(res.data.message);
                this.props.history.push('/list-invoice');
            });
    }


    render() {
        return(<FakturaComponent mode={"Edit"} onSubmit={this.editFaktura} {...this.props}/>
        );
    }
}



export default EditFakturaComponent;
