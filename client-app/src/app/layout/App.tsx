import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  //Anything which USEEFFECT depends on has to specified in the second array.

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities. . ." />;
  //activityStore.loadingInitial is set to false, if it is true

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
// when styling the style name is written in camel case. Example- marginTop, marginRight
//<div> </div> is used in the return element, because we have to return a single element
//Fragment can also used

//when a file is using obserables it  has to be an observser as well
//This file uses the activity store whish has observables and this file
//is changed in to observer. Because of that all the child classes in this file
//ActivityDashboard and ActivityList has been changed to observers
