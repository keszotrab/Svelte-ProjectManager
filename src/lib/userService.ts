import { User, Role } from "./user";
//
//  Nie projektuje oddzielnej tabeli/array etc.
//  Bo I tak finalnie, dane mają być kompletnie poza aplikacją dostępną
//  dla użytkownika, I jedyne do czego ma mieć dostęp, to do danych
//  do których się loguje.
//
export class UserService {
  // THIS IS ONLY TEMPRARY
    users: User[] = [];
  // THIS IS ONLY TEMPRARY ^^^^^^^^^

  loggedUser: User;
  IsUserLogged?: User


  constructor() {
    this.loggedUser = new User(1, "Adam", "Adamski", Role.Admin);
    this.users.push(this.loggedUser),
    this.users.push(new User(2, "Damian", "Drezyna", Role.Developer)),
    this.users.push(new User(3, "Olaf", "Orkeusz", Role.Devops))

  }
  //????? Tam potem jest implementacja konta google to pewnie nie potrzebne
  // ale sie zobaczy
  registerUser() {}
  login(login: string, passwd: string) {}
  saveToCookie(Token: any) {}  //Nie wiem czy potrzebne? I czy w takiej formie. 
  generateJWTToken(){}
  // validateData(){} //nawet nie ma co validowac
  checklogin(login: string, passwd: string) {}
  hashpassword(passwd: string) {}

  //CRUD todo
  getUser(id?: number){
    if (id == null || id == undefined) {
      return this.users;
    }

    const user = this.users.find((user) => user.id === id);
    return user;

  }


}
