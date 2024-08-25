import { Project } from "./project";
import { Story, Priority, State } from "./story";
import { User, Role } from "./user";
import { UserService } from "./userService";

export class ProjectService {
  userService: UserService; //Serwis w przyszłości do kosza

  projects: Project[];
  stories: Story[];

  projectsIdIndex: number = 0;
  storiesIdIndex: number = 0;

  currentProject?: Project | undefined | null;

  constructor() {
    this.userService = new UserService(); //Serwis w przyszłości do kosza

    this.projects = [];
    this.stories = [];
    const projectsJson = localStorage.getItem("projects");
    const projectIndexJson = localStorage.getItem("projectsIdIndex");
    const storiesJson = localStorage.getItem("stories");
    const storiesIndexJson = localStorage.getItem("storiesIdIndex");

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

    ////////

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

    if (storiesJson) {
      const plainStories = JSON.parse(storiesJson);
      //console.log(plainStories)
      //console.log(userObj);

      //console.log(plainStories);
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
      //console.log(this.stories)

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
  }

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
  Project Functions
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

  saveStoriesToLocalStorage() {
    localStorage.setItem("stories", JSON.stringify(this.stories));
  }

  saveStoriesIndexToLocalStorage() {
    console.log('====================================');
    console.log(this.storiesIdIndex);
    console.log('====================================');
    localStorage.setItem("storiesIdIndex", JSON.stringify(this.storiesIdIndex));
  }
}
