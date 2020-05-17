import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";
import {Helmet} from "react-helmet";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import FakturaService from "../../service/FakturaService";
import {GetTime} from "../../service/TimeService";
import {toast, ToastContainer} from "react-toastify";
import Loader from "react-loader-spinner";
import SortingSelect from "../infrastucture/SortingComponent";
import 'react-toastify/dist/ReactToastify.css';

class ListFakturaComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fakturyPaging: {
                faktury: [],
                totalCount: 0,
            },
            isLoading: true,
            pageNo: 0,
            pageSize: 5,
            sort:[]
        }
    }

    getSortFromSession = () => {
        return JSON.parse(sessionStorage.getItem("faktury-sort"))
    }

    componentDidMount() {
        const {pageNo, pageSize } = this.state;
        const sort = this.getSortFromSession();
        if(sort !== null)
        {
        this.setState({sort: sort});
        }
        this.fetchFakturaList(pageNo, pageSize, sort);
    }

    fetchFakturaList = (pageNo, pageSize, sort) => {
        FakturaService.fetchFaktury(pageNo, pageSize, sort)
            .then((res) => {
                this.setState({fakturyPaging: res.data.result, isLoading: false})
            });
    }

    deleteFaktura = (id) => {
        FakturaService.deleteFaktura(id)
            .then(res => {
               toast(res.data.message);
            }).then(() => {this.fetchFakturaList(this.state.pageNo, this.state.pageSize, this.state.sort)});
    }

    viewFaktura = (id) => {
        this.props.history.push('/view-invoice/' + id);
    }

    editFaktura = (id) => {
        this.props.history.push('/edit-invoice/' + id);
    }

    addFaktura = () => {
        this.props.history.push('/add-invoice');
    }

    changePage = (event, value) => {
        const {pageSize, sort} = this.state
        this.setState({pageNo: value - 1});
        this.fetchFakturaList(value - 1, pageSize, sort);
    }

    changeSortBy = (sort) => {
        const {pageNo, pageSize} = this.state
        sessionStorage.setItem("faktury-sort", JSON.stringify(sort));
        this.fetchFakturaList(pageNo, pageSize, sort);
    }

    render() {
        const values = [
            {key: "id", text: "None"},
            {key: "evidencniCislo", text: "Ev. číslo"},
            {key: "variabilniSymbol", text: "Var. symbol"},
            {key: "odberatelFirma", text: "Odběratel"},
            {key: "datumVystaveni", text: "Datum vystavení"},
            {key: "datumSplatnosti", text: "Datum splatnosti"},
            {key: "datumUzp", text: "Datum UZP"},
            {key: "cenaCelkem", text: "Částka"}
        ]
        return (
            <React.Fragment>
                <ToastContainer/>
                <Helmet>
                    <title>Seznam faktur</title>
                </Helmet>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Seznam faktur</Typography>
                    <Loader style={style} type="Grid" color="blue" visible={this.state.isLoading}/>
                    {!this.state.isLoading &&
                    <React.Fragment>
                        <SortingSelect multiple={true} defaultValue={values[0].key} label="Faktury" values={values} onSelect={this.changeSortBy} defaultSorting="faktury-sort" />
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Ev. číslo</TableCell>
                                    <TableCell align="left">Var. symbol</TableCell>
                                    <TableCell align="left">Odběratel</TableCell>
                                    <TableCell align="left">Datum vystavení</TableCell>
                                    <TableCell align="left">Datum splatnosti</TableCell>
                                    <TableCell align="left">Datum UZP</TableCell>
                                    <TableCell align="left">Částka</TableCell>
                                    <TableCell align="left">Akce</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.fakturyPaging.faktury.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell align="left">{row.evidencniCislo}</TableCell>
                                        <TableCell align="left">{row.variabilniSymbol}</TableCell>
                                        <TableCell align="left">{row.odberatelFirma}</TableCell>
                                        <TableCell align="left">{GetTime(row.datumVystaveni)}</TableCell>
                                        <TableCell align="left">{GetTime(row.datumSplatnosti)}</TableCell>
                                        <TableCell align="left">{GetTime(row.datumUzp)}</TableCell>
                                        <TableCell align="left">{row.cenaCelkem.toFixed(2)} Kč</TableCell>
                                        <TableCell align="left">
                                            <VisibilityIcon cursor='pointer' onClick={() => this.viewFaktura(row.id)}/>&nbsp;
                                            <CreateIcon cursor='pointer' onClick={() => this.editFaktura(row.id)} />&nbsp;
                                            <DeleteIcon cursor='pointer' onClick={() => this.deleteFaktura(row.id)}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination style={paginationStyle} count={Math.ceil(this.state.fakturyPaging.totalCount / this.state.pageSize)} page={this.state.pageNo + 1} onChange={this.changePage} />
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.addFaktura}>
                            Nová Faktura
                        </Button>
                    </React.Fragment>
                    }
                </Container>
            </React.Fragment>
        );
    }

}
const style = {
    display: 'flex',
    justifyContent: 'center'
}
const paginationStyle = {
    display: 'flex',
    justifyContent: 'flex-end'
}
export default ListFakturaComponent;
