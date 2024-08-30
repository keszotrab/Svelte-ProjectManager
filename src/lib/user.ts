export class User {
  id: string;
  name: string;
  surname: string;
  role: Role;

  constructor(id: string, name: string, surname: string, role: Role) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.role = role;
  }
}

export enum Role {
  Admin = "admin",
  Devops = "devops",
  Developer = "developer",
}
