//package app

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
export class Mensuration {

  private id : number;
  private nom : string;
  private unite : string;

  constructor() {} 
  
  //getters
  public getId () : number {return this.id;}
  public getNom () : string {return this.nom;}
  public getUnite () : string {return this.unite;}

  //setters
  public setId (id:number) {this.id = id;}
  public setNom (nom:string) {this.nom = nom;}
  public setUnite (unite:string) {this.unite = unite;}

} // Mensuration


