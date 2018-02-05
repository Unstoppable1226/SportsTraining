//package app

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Appreciation } from './appreciation';

export class Entrainement {

  private id : number;
  private nom : string;
  private date : string;
  private duree : number;
  private appreciation : Appreciation;

  constructor() {}
  
  public getId () : number {return this.id;}
  public getNom () : string {return this.nom;}
  public getDate () : string {return this.date;}
  public getDuree () : number {return this.duree;}
  public getAppreciation () : Appreciation {return this.appreciation;}

  public setId (id:number) { this.id = id;}
  public setNom (nom:string) {this.nom = nom;}
  public setDate (date:string) {this.date = date;}
  public setduree (duree:number) {this.duree = duree;}
  public setAppreciation (appreciation:Appreciation) {this.appreciation = appreciation;}

} //Entrainement


