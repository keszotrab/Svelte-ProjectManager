import {User} from "./user"
import { Project } from "./project";
import type { Story } from "./story";

//To coś jak tablica z dwoma kluczami obcymi z tabeli projects i users. 
//Tylko, dziwne, że Projekty nie mają "ownera" *shrug emoji*

export class Task {
    id: string;
    name: string;
    desc: string;
    priority: Priority;   
    storyId: string;
    aproxTime: Date;
    state: State;    // costam costam doing musi miec date startu i usera, a done usera i compl date.
    createDate: Date;
    startDate?: Date;
    completeDate?: Date;
    owner?: User;


  constructor(
    id: string,
    name: string,
    desc: string,
    priority: Priority,
    storyId: string,
    aproxTime: Date,
    state: State,   // costam costam doing musi miec date startu i usera, a done usera i compl date.
    createDate: Date,
    startDate?: Date,
    completeDate?: Date,
    owner?: User,
) {
    this.id = id
    this.name = name
    this.desc = desc
    this.priority = priority
    this.storyId = storyId
    this.aproxTime = aproxTime
    this.state = state
    this.createDate = createDate
    this.startDate = startDate
    this.completeDate = completeDate;
    this.owner = owner
  }
    

}

export enum Priority{
    Low = "low",
    Medium = "medium",
    High = "high"
}

export enum State {
    Todo = "todo",
    Doing = "doing",
    Done = "done"
}