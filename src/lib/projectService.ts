import { Project } from "./project";

export class ProjectService {
  projects: Project[];
  projectsIdIndex: number = 0;

  constructor() {
    this.projects = [];
    const FromLocal = localStorage.getItem("projects");
    const IndexFromLocal = localStorage.getItem("projectsIdIndex");

    if (FromLocal != null) {
      //this.projects = JSON.parse(FromLocal);

      const plainProjects = JSON.parse(FromLocal);
      this.projects = plainProjects.map(
        (plainProject: any) =>
          new Project(plainProject.id, plainProject.nazwa, plainProject.opis)
      );
      this.projectsIdIndex = Number(IndexFromLocal);
    }
  }

  addProject(nazwa: string, opis: string) {
    let project = new Project(this.projectsIdIndex + 1, nazwa, opis);
    this.projects.push(project);
    this.projectsIdIndex++;
    this.saveProjectsToLocalStorage();
    this.saveIndexToLocalStorage();
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
    if(desc)
    {
      this.projects[index].opis = desc;

    }

    this.saveProjectsToLocalStorage();
    return true;
  }

  /*











*/
  saveProjectsToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  saveIndexToLocalStorage() {
    localStorage.setItem(
      "projectsIdIndex",
      JSON.stringify(this.projectsIdIndex)
    );
  }
}
