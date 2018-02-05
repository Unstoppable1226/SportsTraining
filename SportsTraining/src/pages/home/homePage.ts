//package home

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//pages
import { EntrainementsPage } from '../entrainements/entrainementsPage';
import { GlossairePage } from '../glossaire/glossairePage';
import { StatistiquesPage } from '../statistiques/statistiquesPage';
import { ProfilPage } from '../profil/profilPage';
import { AProposPage } from '../aPropos/aProposPage';
import { SuccesPage } from '../succes/succesPage';

@Component({
  selector: 'homePage',
  templateUrl: 'homePage.html'
})
export class HomePage {

  infoMenu = [
    {name:'Entrainements', icon:'ios-paper'},
    {name:'Glossaire', icon:'ios-book'},//md-walk
    {name:'Statistiques', icon:'ios-stats'},
    {name:'Profil', icon:'md-contact'},
    {name:'Succès', icon:'md-trophy'},
    //{name:'Outils', icon:'md-settings'},
    {name:'À Propos', icon:'md-information-circle'}
  ];
  
  constructor(public navCtrl: NavController) {
  } // constructor

  private afficherPage(indice) {  
    var page;
    switch(indice) {
        case 0:
            page = EntrainementsPage;
            break;
        case 1:
            page = GlossairePage;
            break;
         case 2:
            page = StatistiquesPage;
            break;
         case 3:
            page = ProfilPage;
            break;
         case 4:
            page = SuccesPage;
            break;
         case 5:
            page = AProposPage;
            break;
        default:
            console.log("rien ne se passe");
    } 
    this.navCtrl.push(page);
  } // afficherPage
 
} // HomePage


