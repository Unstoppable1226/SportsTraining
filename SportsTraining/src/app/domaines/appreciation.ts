//package domaines

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
export class Appreciation {

  private id : number;
  private nom : string;

  constructor(id:number, nom:string) {
    this.id = id;
    this.nom = nom;
  } // constructor
  
  //getters
  public getId () : number {return this.id;}
  public getNom () : string {return this.nom;}

  //setters
  public setId (id:number) {this.id = id;}
  public setNom (nom:string) {this.nom = nom;}

} // Appreciation