import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

//runInAction is used where there is a state change

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activity: IActivity | null = null; //when not found it will be null
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesBydate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          //this.activities.push(activity); before using Map()
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load activities error ", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity; //If the details is from a list of activities
    } else {
      this.loadingInitial = true;
      try {
        activity = agent.Activities.details(id); // when the details are from a link with an id / or when the page refreshed
        runInAction("getting activity", () => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("error getting activity", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  }

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      //this.activities.push(activity); before using Map() ... activityRegistry
      runInAction("creating activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create activity error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("Edit activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("Edit activity error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("Delete activity", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("Delete activity error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
}

export default createContext(new ActivityStore());

//let activities[] and the loop after that is used to change the dates and
//display only date and time. Date time formate is too long and the [0] returns
//the first part of the array after the date is splitting at the dot.

// decorate (ActivityStore, {
//   activityRegistry: observable,  ..... do this for  all the observables
//   loadActivities: action,   ... for all actiond

//   BY DOING THIS IT CAN BE AVOIDED USING @OBSERVABLES AND @ACTION IN TRHE class
//   decorate has to be imported from mobx
// });
