import React from "react";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";

const activityImageStyle = {
  filter: "brightness(30%)"
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const ActivityDetailedHeader: React.FC<{activity: IActivity}> = ({activity}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "White" }}
                />
                <p>{activity.date}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button color="orange" floated="right">
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailedHeader);
//This page is generated using S_9.6.1 
//The two styling constants are generated using S_9.6.2
// <Segment basic style={activityImageTextStyle}> ....... 'basic' removes all the styles from the segment
//and applies the style in the tag on this case ... style={activityImageTextStyle}