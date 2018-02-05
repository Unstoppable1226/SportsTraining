//package app

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
export class Utilisateur {

  private id : number;
  private nom : string;
  private prenom : string;
  private dateNais : string;
  private experience : number;

  constructor() {}
  
  //getters
  public getId () : number {return this.id;}
  public getNom () : string {return this.nom;}
  public getPrenom () : string {return this.prenom;}
  public getDateNais () : string {return this.dateNais;}
  public getExperience () : number {return this.experience;}

  //setters
  public setId (id:number) {this.id = id;}
  public setNom (nom:string) {this.nom = nom;}
  public setPrenom (prenom:string) {this.prenom = prenom;}
  public setDateNais (dateNais:string) {this.dateNais = dateNais;}
  public setExperience (experience:number) {this.experience = experience;}

} // Utilisateurs


