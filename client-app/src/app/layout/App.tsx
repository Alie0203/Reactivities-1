import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {

  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}   // home page is now outside the navigation. Home page opens first and then go to the navigation with all links. 
        render={() => ( 
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
// withRouter imported to use location so that if the page on the edit form page
// with details of an activity to be editted and we want to discard that and
// create a new activity... the location key will be changed and everything will be cleared

// when styling the style name is written in camel case. Example- marginTop, marginRight
//<div> </div> is used in the return element, because we have to return a single element
//Fragment can also used

//when a file is using obserables it  has to be an observser as well
//This file uses the activity store whish has observables and this file
//is changed in to observer. Because of that all the child classes in this file
//ActivityDashboard and ActivityList has been changed to observers

//EXACT IS ADDED TO INSIDE THE ROUTE TAG TO STOP GETTING THE PAGE
//EACH TIME THE PATH FINDS '/ ' .... NOW IT ONLY GO TO THE HOMEPAGE IF THE
//STRING IN THE PATH IS  AN EXACT MATCH OF THE PAGE LINK

//<Route path = '/activities/:id' component={ActivityDashboard}/>
//the ':' before 'id' means the id will be replaced by a paramater
//here an ID of an activity

//if excat is not included in the path, any path which contains an other path's
//string will make the application to post both path's on the same page.
// if exact is not included in '/activities' then when trying to navigate to the '/activities/:id'
//path from '/activities', both pages will be displayed on '/activities' page

//if we need to load the same component for different routes, we have to pass an array of
// routes like the above example where /createActivity and /manage:/id both navigating to
//the activity form
