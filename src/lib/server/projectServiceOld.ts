import { Project } from "../project";
import { Story, Priority, State } from "../story";
import { Task } from "../tasks";
import { User, Role } from "../user";
import { UserService } from "../userService";

export class ProjectService {
  userService: UserService; //Serwis w przyszłości do kosza

  projects: Project[];
  stories: Story[];
  tasks: Task[];

  projectsIdIndex: number = 0;
  storiesIdIndex: number = 0;
  tasksIdIndex: number = 0;

  currentProject?: Project | undefined | null;

  constructor() {
    this.userService = new UserService(); //Serwis w przyszłości do kosza

    this.projects = [];
    const projectsJson = localStorage.getItem("projects");
    const projectIndexJson = localStorage.getItem("projectsIdIndex");


    const currentProjectJson = localStorage.getItem("currentProject");

    if (projectsJson != null) {
      //this.projects = JSON.parse(FromLocal);

      const plainProjects = JSON.parse(projectsJson);
      this.projects = plainProjects.map(
        (plainProject: any) =>
          new Project(plainProject.id, plainProject.nazwa, plainProject.opis)
      );
      this.projectsIdIndex = Number(projectIndexJson);
    }

    //Current project mapping

    if (currentProjectJson) {
      const projectData = JSON.parse(currentProjectJson);

      this.currentProject = new Project(
        projectData.id,
        projectData.nazwa,
        projectData.opis
      );
    } else {
      this.currentProject = null;
    }

    //Mapowanie Stories s JSON na obiekt TS

    this.stories = [];
    const storiesJson = localStorage.getItem("stories");
    const storiesIndexJson = localStorage.getItem("storiesIdIndex");

    if (storiesJson) {
      const plainStories = JSON.parse(storiesJson);

      this.stories = plainStories.map((story: any) => {
        const userObj = story.owner;
        const projectObj = story.project;

        const mappedUser = new User(
          userObj.id,
          userObj.imie,
          userObj.nazwisko,
          userObj.role as Role
        );

        const mappedProject = new Project(
          projectObj.id,
          projectObj.nazwa,
          projectObj.opis
        );

        return new Story(
          story.id,
          story.name,
          story.desc,
          story.priority as Priority,
          mappedProject,
          story.createDate,
          story.state as State,
          mappedUser
        );
      });

      if (storiesIndexJson) {
        console.log('==StoriesIdIndexPrzed przypisaniem===');
        console.log(this.storiesIdIndex);
        console.log('==storiesIndexJson Przed przypisaniem===');
        console.log(storiesIndexJson);

        
        this.storiesIdIndex = Number(storiesIndexJson);
        console.log(this.storiesIdIndex);
        console.log('====================================');

      }
    }

    //task related constructor code
    this.tasks = [];

    const tasksJson = localStorage.getItem("tasks");
    const tasksIndexJson = localStorage.getItem("tasksIdIndex");


    if (tasksJson) {
      const plainTasks = JSON.parse(tasksJson);
      this.tasks = plainTasks.map((task: any) => {
          
        const storyObj = task.story;
          /// it wont map story to story object exactly the way i want but whatever
        const mappedStory = new Story(
          storyObj.id,
          storyObj.name,
          storyObj.desc,
          storyObj.priority,
          storyObj.project as Project,
          storyObj.createDate,
          storyObj.state,
          storyObj.owner
        );



        return new Task(
          task.id,
          task.name,
          task.desc,
          task.priority as Priority,
          mappedStory,
          task.aproxTime,
          task.state as State,
          task.createDate,
          task.startDate,
          task.completeDate,
          task.owner as User
        );
      });

      if (tasksIndexJson) {
        console.log('==StoriesIdIndexPrzed przypisaniem===');
        console.log(this.storiesIdIndex);
        console.log('==tasksIndexJson Przed przypisaniem===');
        console.log(storiesIndexJson);

        
        this.tasksIdIndex = Number(tasksIndexJson);
        console.log(this.storiesIdIndex);
        console.log('====================================');

      }
    }
    //lighten the constructor by changeing this code into small constructor 
    //functions so it looks less messy
  }

  /*
  Tasks CRUD
  */

  addTask(
    name: string,
    desc: string,
    priority: Priority,
    storyId: number,
    state: State,
    ownerId?: number,
    approxdate?: Date
  ) {
    const story = this.getStory(storyId) as Story;
    const owner = ownerId ? this.userService.getUser(ownerId) : undefined;
  
    if (story) {
      let task = new Task(
        this.tasksIdIndex + 1,
        name,
        desc,
        priority,
        story,
        approxdate ? approxdate : new Date(), // aproxTime (could be set to a future date)
        state,
        new Date(), // createDate
        state === State.Doing ? new Date() : undefined, // startDate (if state is Doing)
        state === State.Done ? new Date() : undefined, // completeDate (if state is Done)
        owner as User
      );
      this.tasks.push(task);
      this.tasksIdIndex++;
      this.saveTasksToLocalStorage();
      this.saveTasksIndexToLocalStorage();
      return;
    }
  
    console.log("====================================");
    console.log("Couldn't add the task :c");
    console.log("====================================");
  }
  

  getTask(id?: number): Task[] | Task | undefined {
    if (id == null || id == undefined) {
      console.log(this.tasks);
      return this.tasks;

    }
  
    if (this.tasks != undefined) {
      const task = this.tasks.find((task) => task.id === id);
      console.log(task);
      return task;
    }
    console.log("====================================");
    console.log("Couldn't find the task");
    console.log("====================================");
  }

  updateTask(
    id: number,
    name?: string,
    desc?: string,
    priority?: Priority,
    storyId?: number,
    aproxTime?: Date,
    state?: State,
    startDate?: Date,
    completeDate?: Date,
    ownerId?: number,

  ) {
    let task = this.getTask(id) as Task;
    if (name) {
      task.name = name;
    }
    if (desc) {
      task.desc = desc;
    }
    if (priority) {
      task.priority = priority;
    }
    if (storyId) {
      let storyUpdate: Story = this.getStory(storyId) as Story;
      task.story = storyUpdate;
    }
    if(aproxTime){
      task.aproxTime = aproxTime;
    }
    if (state) {
      task.state = state;
      if (state === State.Doing) {
        if(startDate){
          task.startDate = startDate;
        }
        if(!task.startDate){
          task.startDate = new Date();
        }
        task.completeDate = undefined;
      }
      if (state === State.Done) {
        if(completeDate)
        {
          task.completeDate = completeDate;
        }
        if(!task.completeDate){
          task.completeDate = new Date();
        }
      }
    }
    if (ownerId) {
      let owner = this.userService.getUser(ownerId) as User;
      task.owner = owner;
    }
    this.saveTasksToLocalStorage();
  }
  

  deleteTask(id: number): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      console.log(`Task with id ${id} not found.`);
      return false;
    }
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  
    return true;
  }
  



  /*




  */

  /*
  Stories CRUD
  */

  //create
  addStory(
    name: string,
    desc: string,
    priority: Priority,
    projectId: number,
    state: State,
    userID: number
  ) {
    const user = this.userService.users.find((user) => user.id === userID);
    const project = this.getProject(projectId) as Project;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // do przyszłego Bartka: Tutaj będzie mase fetchy/zapytan do bazy danych. Będzie bolało ;-;
    // A JAK JUZ TO ZROBISZ TO WYWAL TEN USERSERVICE Z TĄD BO NIE BEDZIE TRZEBA Z NIEGO DANYCH USERÓW BRAC
    // BO BEDA FETCHOWANE Z BAZY DANYCH (CHYBA)

    if (user && project) {
      let story = new Story(
        this.storiesIdIndex + 1,
        name,
        desc,
        priority as Priority,
        project,
        new Date(),
        state as State,
        user
      );
      this.stories.push(story);
      this.storiesIdIndex++;
      this.saveStoriesToLocalStorage();
      this.saveStoriesIndexToLocalStorage();
      return;
    }

    console.log("====================================");
    console.log("couldn't add the story :c");
    console.log("====================================");
  }
  //read

  getStory(id?: number): Story[] | Story | undefined {
    if (id == null || id == undefined) {
      return this.stories;
    }

    if (this.stories != undefined) {
      const story = this.stories.find((story) => story.id === id);
      console.log(story);
      return story;
    }
    console.log("====================================");
    console.log("Couldn't find the story");
    console.log("====================================");
  }

  //update
  updateStory(
    id: number,
    name?: string,
    desc?: string,
    priority?: Priority,
    projectId?: number,
    state?: State,
    userID?: number
  ) {
    let story = this.getStory(id) as Story;
    if(name){
      story.name = name;
    }
    if(desc){
      story.desc = desc;
    }
    if(priority){
      story.priority = priority;
    }
    if(projectId){
      let projectUpdate: Project = this.getProject(projectId) as Project;
      story.project = projectUpdate;
    }
    if(state){
      story.state = state;
    }
    if(userID){
      let user = this.userService.getUser(userID)
      story.owner = user as User;

    }
    this.saveStoriesToLocalStorage();

  }

  //delete
  deleteStory(id: number): boolean {
    const index = this.stories.findIndex((story) => story.id === id);
    if (index === -1) {
      console.log(`Project with id ${id} not found.`);
      return false;
    }
    this.stories.splice(index, 1);
    this.saveStoriesToLocalStorage();

    return true;
  }

  /////

  resetStories() {
    this.stories = [];
    this.saveStoriesToLocalStorage();
    this.storiesIdIndex = 0;
    this.saveStoriesIndexToLocalStorage();
  }
  /*
  //
  Project CRUD Functions
  //
  */

  addProject(nazwa: string, opis: string) {
    let project = new Project(this.projectsIdIndex + 1, nazwa, opis);
    this.projects.push(project);
    this.projectsIdIndex++;
    this.saveProjectsToLocalStorage();
    this.saveProjectIndexToLocalStorage();
  }

  getProject(id?: number): Project[] | Project | undefined {
    if (id == null || id == undefined) {
      return this.projects;
    }

    const project = this.projects.find((project) => project.id === id);
    return project;
  }

  resetProjects() {
    this.projects = [];
    this.saveProjectsToLocalStorage();
    this.projectsIdIndex = 0;
    this.saveProjectsToLocalStorage();
  }

  // wszystkie powinny zwracac boolean żeby wiadomo było, czy funkcja dziala, czy nie ale nie chce mi sie
  deleteProject(id: number): boolean {
    const index = this.projects.findIndex((project) => project.id === id);
    if (index === -1) {
      // If the index is -1, no object was found with the given id
      console.log(`Project with id ${id} not found.`);
      return false;
    }

    this.projects.splice(index, 1);
    this.saveProjectsToLocalStorage();

    return true;
  }

  updateProject(id: number, name?: string, desc?: string): boolean {
    const index = this.projects.findIndex((project) => project.id === id);
    if (index === -1) {
      // If the index is -1, no object was found with the given id
      console.log(`Project with id ${id} not found.`);
      return false;
    }
    if (name) {
      this.projects[index].nazwa = name;
    }
    if (desc) {
      this.projects[index].opis = desc;
    }

    this.saveProjectsToLocalStorage();
    return true;
  }

  /*
  //
  Saving Functions
  //
  */

  //Projects
  chooseCurrentProject(id: number) {
    const currProject = this.getProject(id);
    if (currProject == undefined || currProject == null) {
      console.log("undefined project");
      return;
    } else {
      this.currentProject = currProject as Project;
      localStorage.setItem("currentProject", JSON.stringify(currProject));
    }
  }

  saveProjectsToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  saveProjectIndexToLocalStorage() {
    localStorage.setItem(
      "projectsIdIndex",
      JSON.stringify(this.projectsIdIndex)
    );
  }

  //Stories
  saveStoriesToLocalStorage() {
    localStorage.setItem("stories", JSON.stringify(this.stories));
  }

  saveStoriesIndexToLocalStorage() {
    console.log('====================================');
    console.log(this.storiesIdIndex);
    console.log('====================================');
    localStorage.setItem("storiesIdIndex", JSON.stringify(this.storiesIdIndex));
  }

  //Tasks

  saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  saveTasksIndexToLocalStorage() {
    console.log('===Task Index to Save===');
    console.log(this.tasksIdIndex);
    console.log('====================================');
    localStorage.setItem("tasksIdIndex", JSON.stringify(this.tasksIdIndex));
  }


  addExampleTasks(){

      console.log('====================================');
      console.log(this.stories);
      console.log('====================================');
    const task1 = new Task(
      1,
      "Task 1",
      "Description of Task 1",
      Priority.High,
      this.stories[0],
      new Date('2024-09-01'), // aproxTime: Should be completed by September 1, 2024
      State.Todo,
      new Date(), // createDate: Created today
      undefined, // startDate: Not started yet
      undefined, // completeDate: Not completed
      undefined // owner: No owner yet
    );
    
    const task2 = new Task(
      2,
      "Task 2",
      "Description of Task 2",
      Priority.Medium,
      this.stories[0],
      new Date('2024-08-30'), // aproxTime: Should be completed by August 30, 2024
      State.Doing,
      new Date(), // createDate: Created today
      new Date(), // startDate: Started today
      undefined, // completeDate: Not completed
      this.userService.users[1] // owner: Assigned to Bob
    );
    
    const task3 = new Task(
      3,
      "Task 3",
      "Description of Task 3",
      Priority.Low,
      this.stories[0],
      new Date('2024-08-25'), // aproxTime: Should be completed by August 25, 2024
      State.Done,
      new Date(), // createDate: Created today
      new Date('2024-08-20'), // startDate: Started on August 20, 2024
      new Date('2024-08-24'), // completeDate: Completed on August 24, 2024
      this.userService.users[1] // owner: Assigned to Bob
    );


    this.tasks = [];
    this.tasks.push(task1)
    this.tasks.push(task2)
    this.tasks.push(task3)
    this.tasksIdIndex = 3;
    this.saveTasksIndexToLocalStorage;
    this.saveTasksToLocalStorage();
  }

}
