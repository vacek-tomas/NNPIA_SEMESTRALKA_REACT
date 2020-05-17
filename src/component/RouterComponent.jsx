import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "./user/ListUserComponent";
import AddUserComponent from "./user/AddUserComponent";
import EditUserComponent from "./user/EditUserComponent";
import React from "react";
import LoginComponent from "./user/LoginComponent";
import {PrivateRoute} from "./infrastucture/PrivateRoute";
import DashBoardComponent from "./DashBoard";
import ListFakturaComponent from "./faktura/ListFakturaComponent";
import ListOdberatelComponent from "./odberatele/ListOdberatelComponent";
import AddOdberatelComponent from "./odberatele/AddOdberatelComponent";
import EditOdberatelComponent from "./odberatele/EditOdberatelComponent";
import AddFakturaComponent from "./faktura/AddFakturaComponent";
import EditFakturaComponent from "./faktura/EditFakturaComponent";
import ViewFakturaComponent from "./faktura/ViewFakturaComponent";

const AppRouter = () => {
    return(
            <Router>
                    <Switch>
                        <PrivateRoute exact path="/" component={DashBoardComponent} />
                        <Route path="/login"  component={LoginComponent} />
                        <PrivateRoute path="/list-user" component={ListUserComponent} />
                        <PrivateRoute path="/add-user" component={AddUserComponent} />
                        <PrivateRoute path="/edit-user/:id" component={EditUserComponent} />
                        <PrivateRoute path="/list-invoice" component={ListFakturaComponent} />
                        <PrivateRoute path="/add-invoice" component={AddFakturaComponent} />
                        <PrivateRoute path="/edit-invoice/:id" component={EditFakturaComponent} />
                        <PrivateRoute path="/view-invoice/:id" component={ViewFakturaComponent} />
                        <PrivateRoute path="/list-subscriber" component={ListOdberatelComponent} />
                        <PrivateRoute path="/add-subscriber" component={AddOdberatelComponent} />
                        <PrivateRoute path="/edit-subscriber/:id" component={EditOdberatelComponent} />
                    </Switch>
            </Router>
    )
}

export default AppRouter;
