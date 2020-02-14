import React,{useEffect, useContext} from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityStore from  "../../../app/stores/activityStore"

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  //Anything which USEEFFECT depends on has to specified in the second array.

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities. . ." />;
  //activityStore.loadingInitial is set to false, if it is true
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);

//selectedActivity && ... the code on the right side of the && is only executed
//ONLY if the value on the left is not null
// when editform is not null/true display activity form
