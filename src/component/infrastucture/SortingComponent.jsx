import React, {Component, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
}));


class SortingComponent extends Component{

    constructor(props) {
        super(props);
        this.state={
            sorts:[{sortBy: props.defaultValue, sortAsc: true}]
        };

    }

    componentDidMount() {
        const defaultSortingString = sessionStorage.getItem(this.props.defaultSorting);
        if(defaultSortingString !== null) {
            this.setState({sorts: JSON.parse(defaultSortingString)});
        }
    }

    handleChange = (event, index) => {
        let sorts = [...this.state.sorts];
        sorts[index][event.target.name] = event.target.value;
        this.setState({sorts: [...sorts]});
        this.props.onSelect(sorts);
    }

    handleAdd = () => {
        const sort = {
            sortBy: this.props.values.find(i => !this.state.sorts.map(i => i.sortBy).includes(i.key)).key,
            sortAsc: true
        }
        const sorts = [...this.state.sorts, sort];
        this.setState({sorts: [...sorts]});
        this.props.onSelect(sorts);
    }

    handleDelete = (indexItem) => {
        const sorts = [...this.state.sorts.filter((value, index) => index !== indexItem)];
        this.setState({sorts: sorts});
        this.props.onSelect(sorts);
    }

    render() {
    let that = this;
    return (
        <Fragment>
        {this.state.sorts.map((sort, index) => (
        <Grid key={"select-"+index} container spacing={0}>
            <FormControl style={{minWidth: '120px'}}>
                <InputLabel>{this.props.label}</InputLabel>
                <Select name="sortBy" value={sort.sortBy} onChange={(e) => this.handleChange(e, index)}>
                    {this.props.values.filter(i => !this.state.sorts.map(j => j.sortBy).includes(i.key) || this.state.sorts[index].sortBy === i.key).map(value =>(<MenuItem key={"select-"+index+"-item-"+value.key} value={value.key}>{value.text}</MenuItem>))}
                </Select>
            </FormControl>
            &nbsp;
            <FormControl style={{minWidth: '120px'}}>
                <InputLabel>Vzestupně/Sestupně</InputLabel>
                <Select name="sortAsc" value={sort.sortAsc} onChange={(e) => this.handleChange(e, index)}>
                    <MenuItem value="true">Vzestupně</MenuItem>
                    <MenuItem value="false">Sestupně</MenuItem>
                </Select>
            </FormControl>
            &nbsp;
            {this.props.multiple && <Grid container item sm={1} alignContent={"flex-end"}>
            {this.state.sorts.length > 1 &&<DeleteIcon cursor='pointer' onClick={() => this.handleDelete(index)} />}
            {index + 1 == this.state.sorts.length && this.props.values.length > this.state.sorts.length && <AddIcon cursor='pointer' onClick={this.handleAdd}/>}
            </Grid>}
        </Grid>))}
    </Fragment>
    )
    }
}


export default SortingComponent;
