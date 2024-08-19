import {User} from "./user"
import { Project } from "./project";

//To coś jak tablica z dwoma kluczami obcymi z tabeli projects i users. 
//Tylko, dziwne, że Projekty nie mają "ownera" *shrug emoji*


export class Story {
    id: number;
    name: string;
    desc: string;
    priority: Priority;   
    project: Project;
    createDate: Date;
    state: State;
    owner: User;


  constructor(
    id: number, 
    name: string, 
    desc: string, 
    priority: Priority,
    project: Project, 
    createDate: Date, 
    state: State, 
    owner: User
) {
    this.id = id
    this.name = name
    this.desc = desc
    this.priority = priority
    this.project = project
    this.createDate = createDate
    this.state = state
    this.owner = owner
  }
    

}

enum Priority{
    low = "low",
    medium = "medium",
    high = "high"
}

enum State {
    todo = "done",
    doing = "doing",
    done = "done"
}