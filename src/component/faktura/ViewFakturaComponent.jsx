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

class ViewFakturaComponent extends Component{

    constructor(props){
        super(props);
    }


    viewFaktura = (e, object) => {
        e.preventDefault();
        this.props.history.push('/list-invoice');
    }


    render() {
        return(<FakturaComponent mode={"View"} onSubmit={this.viewFaktura} {...this.props}/>
        );
    }
}

export default ViewFakturaComponent;
