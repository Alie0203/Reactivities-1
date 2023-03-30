import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';


interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}
export default function ActivityList({ activities, selectActivity, deleteActivity }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(Activity => (
                    <Item key={Activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {Activity.title}
                            </Item.Header>
                            <Item.Meta>
                                {Activity.date}
                            </Item.Meta>
                            <Item.Description>
                                <div>{Activity.description}</div>
                                <div>{Activity.city}, {Activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(Activity.id)} floated='right' color='blue' content='View' />
                                <Button onClick={() => deleteActivity(Activity.id)} floated='right' color='red' content='Delete' />
                                <Label basic content={Activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
}