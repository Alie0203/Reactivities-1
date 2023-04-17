import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';


interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void; //passing down a fuction
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelSelectActivity,
     editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails 
                        activity={selectedActivity} 
                        cancelSelectActivity={cancelSelectActivity} 
                        openForm={openForm}
                />} 
                    {/* This is to ensure that anctivity is presented before trying to display the details.  */}
                    {editMode &&
                    <ActivityForm 
                        closeForm={closeForm} 
                        activity={selectedActivity} 
                        createOrEdit={createOrEdit}
                        submitting={submitting}/>
                    }
            </Grid.Column>
        </Grid>
    );
}