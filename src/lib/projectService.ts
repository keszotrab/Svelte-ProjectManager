export class  ProjectService {
  projects: Project[];
  projectsIdIndex: number = 0;

  constructor() {
    this.projects = [];
    const FromLocal = localStorage.getItem("projects");

    if (FromLocal != null) {
      this.projects = JSON.parse(FromLocal);
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

















/*







  updateProject(
    id: number,
    nazwa?: string,
    opis?: string
  ): Project | undefined {
    const project = this.projects.find((project) => project.id === id);
    if (project != undefined) {
      if (nazwa != null || nazwa != undefined) {
        project.nazwa = nazwa;
      }

      if (opis != null || opis != undefined) {
        project.nazwa = opis;
      }

      this.projects[project.id - 1] = project;
    }

    this.saveToLocalStorage();
    return project;
  }

  deleteProject(id: number) {
    delete this.projects[id - 1];
    this.saveToLocalStorage();
  }
*/
  saveProjectsToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  saveIndexToLocalStorage() {
    localStorage.setItem("projectsIdIndex", JSON.stringify(this.projectsIdIndex));
  }
}
