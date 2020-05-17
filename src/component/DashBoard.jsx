import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "./Navbar";
import {Helmet} from "react-helmet";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import FakturaService  from "../service/FakturaService";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import 'moment/locale/cs';

class DashBoardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            invoiceInfo: [],
            isLoading: true
        }
    }
    componentDidMount() {
        //console.log(new Date().getFullYear());
        FakturaService.fetchFakturyInfoByYear(new Date().getFullYear())
            .then(res => {this.setState({invoiceInfo: res.data.result, isLoading: false})});
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Přehled</title>
                </Helmet>
                <NavBar/>
                <Container >
                    <Typography variant="h4" style={style}>Přehled</Typography>
                    <Grid container
                          direction="column"
                          justify="center"
                          alignItems="center"
                    >
                    <Grid container item sm={6} >
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Měsíc</TableCell>
                                    <TableCell align="right">Vyfakturováno</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.invoiceInfo.map(row => (
                                    <TableRow key={row.month}>
                                        <TableCell align="left">{moment(new Date(2020, row.month - 1)).format('MMMM')}</TableCell>
                                        <TableCell align="right">{row.total.toFixed(2)} Kč</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow key={13}>
                                    <TableCell align="left">rok {new Date().getFullYear()}</TableCell>
                                    <TableCell align="right">{this.state.invoiceInfo.reduce((a, b) => a + b.total, 0).toFixed(2)} Kč</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }

}
const style = {
    display: 'flex',
    justifyContent: 'center'
}
export default DashBoardComponent;
