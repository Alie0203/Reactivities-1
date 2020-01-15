import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };
  //activities.filter(a => a.id === id)[0]... as filter returns an array
  //and this function returns an activity with a unique Id, the array from the
  //filter will have only one element which is why the returned activity is indexed 0.

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
    //An array of all the activities and the newly created activity
    //setSelectedActivity is used to display a selected activity
    //here when a new activity is created, it will be displayed
    //then this will close the new entry or editting form
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([
        ...activities.filter(a => a.id !== activity.id),
        activity
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
    //AN ARRAY OF ALL the activities with ids which doesn't match with the selected id
    //and the updated activity
  };

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false));
    // return all the activities except the selected activity
  };

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: IActivity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      });
      setActivities(activities);
    }).then(() => setLoading(false)); // Once the list is returned disable the loading component
  }, []);

  if(loading) return <LoadingComponent content='Loading activities. . .'/>

  // BY ADDING THE EMPTY ARRAY, THE USE-EFFECT HOOK RUN ONLY ONCE
  // useEffect is a hook as componentDidMount, componentDidUpdate
  //and componentWillUnmount combined

  //let activities[] and the loop after that is used to change the dates and
  //display only date and time. Date time formate is too long and the [0] returns
  //the first part of the array after the date is splitting at the dot.


  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity}
          //This could give an error if the null is not included in
          //selectedActivity: IActivity | null; in the interface in activitydashboard
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
// when styling the style name is written in camel case. Example- marginTop, marginRight
//<div> </div> is used in the return element, because we have to return a single element
//Fragment can also used
