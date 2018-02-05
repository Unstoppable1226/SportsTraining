//package app

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
export class Muscle {

  private id : number;
  private nom : string;
  private image : string;

  constructor(id:number, nom:string, image:string) {
    this.id = id;
    this.nom = nom;
    this.image = image;
  } // constructor
  
  //getters
  public getId () : number {return this.id;}
  public getNom () : string {return this.nom;}
  public getImage () : string {return this.image;}

  //setters
  public setId (id:number) {this.id = id;}
  public setNom (nom:string) {this.nom = nom;}
  public setImage (image:string) {this.image = image;}

} // Muscle


