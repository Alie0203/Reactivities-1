import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import { Link } from "react-router-dom";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesBydate,
    deleteActivity,
    submitting,
    target
  } = activityStore;
  //Clearing inside the segemnt tag avoids mixing floating in different tags
  //divided in the Item.group makes the items/all the activities on this case
  //to be divided rather than becoming one item
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesBydate.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/activities/${activity.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />

                <Button
                  name={activity.id}
                  loading={target === activity.id && submitting}
                  onClick={e => deleteActivity(e, activity.id)}
                  //(e) and name={activity.id} are included to indicate a sigle delete button
                  //activated when loading component is activated when deleting a single element
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
