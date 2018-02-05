
//package app

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
export class Serie  {

  private id : number;
  private nombre : number;
  private repetition : number;
  private poids : number;
  private pause : number;
  private tempsMin : number;
  private tempsSec : number;
  private distance : number;
  private depense : number;
  private type : number;
  //private toString : string;

  constructor() {} 
  
  //getters
  public getId () : number {return this.id;}
  public getNombre () : number {return this.nombre;}
  public getRepetition () : number {return this.repetition;}
  public getPoids () : number {return this.poids;}
  public getPause () : number {return this.pause;}
  public getTempsMin () : number {return this.tempsMin;}
  public getTempsSec () : number {return this.tempsSec;}
  public getDistance () : number {return this.distance;}
  public getDepense () : number {return this.depense;}
  public getType () : number {return this.type;}

  //setters
  public setId (id:number) {this.id = id;}
  public setNombre (nombre:number) {this.nombre = nombre;}
  public setRepetition (repetition:number) {this.repetition = repetition;}
  public setPoids (poids:number) {this.poids = poids;}
  public setPause (pause:number) {this.pause = pause;}
  public setTempsMin (tempsMin:number) {this.tempsMin = tempsMin;}
  public setTempsSec (tempsSec:number) {this.tempsSec = tempsSec;}
  public setDistance (distance:number) {this.distance = distance;}
  public setDepense (depense:number) {this.depense = depense;}
  public setType (type:number) {this.type = type;}
  
} // Serie


