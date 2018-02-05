//package app

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
export class Succes {

  private id : number;
  private nom : string;
  private experience : number;
  private image : string;

  constructor() {}
  
  //getters
  public getId () : number {return this.id;}
  public getNom () : string {return this.nom;}
  public getExperience () : number {return this.experience;}
  public getImage () : string {return this.image;}

  //setters
  public setId (id:number) {this.id = id;}
  public setNom (nom:string) {this.nom = nom;}
  public setExperience (experience:number) {this.experience = experience;}
  public setImage (image:string) {this.image = image;}

} // Succes


