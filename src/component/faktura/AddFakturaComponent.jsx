import React, { Component } from 'react'
import FakturaService from "../../service/FakturaService";
import {toast} from "react-toastify";
import {SetTime} from "../../service/TimeService";
import FakturaComponent from "./FakturaComponent";

class AddFakturaComponent extends Component{

    constructor(props) {
        super(props);
    }

    saveFaktura = (e, object) => {
        e.preventDefault();
        let faktura = {...object};
        faktura.datumSplatnosti = SetTime(faktura.datumSplatnosti);
        faktura.datumUzp = SetTime(faktura.datumUzp);
        faktura.datumVystaveni = SetTime(faktura.datumVystaveni);
        FakturaService.addFaktura(faktura)
            .then(res => {
                toast(res.data.message);
                this.props.history.push('/list-invoice');
            });
    }

    render() {
        return(
            <FakturaComponent mode={"Create"} onSubmit={this.saveFaktura}/>
        );
    }
}

export default AddFakturaComponent;
