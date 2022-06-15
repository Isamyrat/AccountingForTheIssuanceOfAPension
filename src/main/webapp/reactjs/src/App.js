import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import UserList from "./components/User/UserList";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SecurityServiceComponent from "./components/SecurityServiceComponent";

import Profile from "./components/User/Profile";
import UserProfile from "./components/User/UserProfile";

import CreateUpdateUserComponent from './components/User/CreateUpdateUserComponent';
import CreateUpdateAccountImageComponent from './components/UserInformation/CreateUpdateAccountImageComponent';
import CreateUserInformationComponent from './components/UserInformation/CreateUserInformationComponent';
import ListUserComponent from './components/User/ListUserComponent';
import CreateAddressComponent from './components/Address/CreateAddressComponent';
import CreateUpdateWorkComponents from './components/Work/CreateUpdateWorkComponents';
import CreateUpdateAccountingForPaymentsComponent from './components/AccountingForPayments/CreateUpdateAccountingForPaymentsComponent';
import CreateRetirementComponent from './components/Retirement/CreateRetirementComponent';

const App = () => {
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} className={"margin-top"}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" exact component={Home} />
              <Route path="/home/:id" exact component={Home} />
              <Route path="/security-service" component={SecurityServiceComponent} />

              <Route path="/update-user/:idUser" component={CreateUpdateUserComponent} />
              <Route path="/update-user/:idUser" component={CreateUpdateUserComponent} />

              <Route path="/users" component={ListUserComponent} />

             <Route path="/usersList" exact component={UserList} />
              <Route path="/profile/:idUser" exact component={Profile} />
              <Route path="/user-profile-page/:idUser" exact component={UserProfile} />
           
              <Route path="/create-account-image/:idUserInformation/:idUser" component={CreateUpdateAccountImageComponent} />
              <Route path="/create-account-image/:idUserInformation/:idUser" component={CreateUpdateAccountImageComponent} />

               <Route path="/create-user-information/:idUser" component={CreateUserInformationComponent} />
               <Route path="/update-user-information/:userInformationId/:idUser" component={CreateUserInformationComponent} />
                       
               <Route path="/create-address/:idUser" component={CreateAddressComponent} />
               <Route path="/update-address/:addressId/:idUser" component={CreateAddressComponent} />
               <Route path="/create-work/:idUser" component={CreateUpdateWorkComponents} />
               <Route path="/update-work/:summaryId/:idUser" component={CreateUpdateWorkComponents} />
            
               <Route path="/create-accounting-for-payments/:idUser" component={CreateUpdateAccountingForPaymentsComponent} />
               <Route path="/update-accounting-for-payments/:summaryId/:idUser" component={CreateUpdateAccountingForPaymentsComponent} />

               <Route path="/create-retirement/:idUser" component={CreateRetirementComponent} />
               <Route path="/update-retirement/:retirementId/:idUser" component={CreateRetirementComponent} />
              

              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route
                path="/logout"
                exact
                component={() => (
                  <Login message="User Logged Out Successfully." />
                )}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
