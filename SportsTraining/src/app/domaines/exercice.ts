
//package app

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
export class Exercice {

  private id : number;
  private nom : string;
  private description : string;
  private type : number;
  private musId : number;
  private image : string;

  constructor() {} 
  
  public getId () : number {return this.id;}
  public getNom () : string {return this.nom;}
  public getDescription () : string {return this.description;}
  public getType () : number {return this.type;}
  public getMusId () : number {return this.musId;}
  public getImage () : string {return this.image;}

  public setId (id:number) {this.id = id;}
  public setNom (nom:string) {this.nom = nom;}
  public setDescription (description:string) {this.description = description;}
  public setType (type:number) {this.type = type;}
  public setMusId (mus_id:number) {this.musId = mus_id;}
  public setImage (image:string) {this.image = image;}

} // Exercice


