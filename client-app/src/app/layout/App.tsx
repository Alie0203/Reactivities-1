import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [editMode, setEditMode] = useState(false);

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
    setActivities([...activities, activity]);
    //An array of all the activities and the newly created activity
    setSelectedActivity(activity);
    //setSelectedActivity is used to display a selected activity
    //here when a new activity is created, it will be displayed
    setEditMode(false);
    //then this will close the new entry or editting form
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    //AN ARRaY OF ALL the activities with ids which doesn't match with the selected id
    //and the updated activity
    setSelectedActivity(activity);
    setEditMode(false);
  };

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        let activities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      });
  }, []);
  // BY ADDING THE EMPTY ARRAY, THE USE-EFFECT HOOK RUN ONLY ONCE
  // useEffect is a hook as componentDidMount, componentDidUpdate
  //and componentWillUnmount combined

  //let activities[] and the loop after that is used to change the dates and
  //display only date and time. Date time formate is too long and the [0] returns
  //the first part of the array after the date is splitting at the dot.

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]); // return all the activities except the selected activity
  };

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
        />
      </Container>
    </Fragment>
  );
};

export default App;
// when styling the style name is written in camel case. Example- marginTop, marginRight
//<div> </div> is used in the return element, because we have to return a single element
//Fragment can also used
