class UserService {
    user: User;

    
    constructor() {
        this.user = new User(1, "Damian", "Drezyna")
    }


    
 /*
    addProject(nazwa: string, opis: string) {

        let project = new Project(this.projects.length + 1, nazwa, opis)
        this.projects.push(project);
        this.saveToLocalStorage()

    }


    getProject(id?: number): Project[] | Project | undefined {
        if (id == null || id == undefined) {
            return this.projects;
        }

        const project = this.projects.find(project => project.id === id);
        return project;
    }


    updateProject(id: number, nazwa?: string, opis?: string): Project | undefined {
        const project = this.projects.find(project => project.id === id);
        if (project != undefined) {

            if (nazwa != null || nazwa != undefined) {
                project.nazwa = nazwa;
            }

            if (opis != null || opis != undefined) {
                project.nazwa = opis;
            }


            this.projects[project.id - 1] = project;

        }

        this.saveToLocalStorage()
        return project;
    }

    deleteProject(id: number) {

        delete this.projects[id - 1];
        this.saveToLocalStorage()
    }

    saveToLocalStorage() {
        localStorage.setItem("projects", JSON.stringify(this.projects))
    }
*/

}




