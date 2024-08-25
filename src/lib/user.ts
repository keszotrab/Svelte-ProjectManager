export class User {
    id: number;
    imie: string;
    nazwisko: string;
    role: Role;

    constructor(id: number, imie: string, nazwisko: string, role: Role) {
        this.id = id;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.role = role;
    }


}




export enum Role{
    Admin = "admin",
    Devops = "devops",
    Developer = "developer"
}