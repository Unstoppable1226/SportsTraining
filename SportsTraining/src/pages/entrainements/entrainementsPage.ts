//package Entrainements

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//pages
import { DetailsEntrainementPage } from '../detailsEntrainement/detailsEntrainementPage';
import { AjouterEntrainementPage } from '../ajouterEntrainement/ajouterEntrainementPage';

//providers
import { EntrainementDAO } from '../../app/providers/entrainementDAO';

//ionic-native
import { NativeStorage } from '@ionic-native/native-storage';

//settings
import { Constantes } from '../../app/settings/constantes';//Constantes.NS_ID_ENTRAINEMENT

@Component({
  selector: 'entrainementsPage',
  templateUrl: 'entrainementsPage.html'
})
export class EntrainementsPage {

  entrainements;

  constructor(private navCtrl: NavController, private entrainementDAO: EntrainementDAO, private nativeStorage: NativeStorage) {
  } // constructor

  //methode déclanché quand on entrera dans la vue
  ionViewWillEnter() {this.onCreate ();} // ionViewWillEnter

  private onCreate () {
    this.entrainements = [];
    this.entrainementDAO.getEntrainements ().then((resolve) => {
      this.entrainements = resolve
    })
  } // onCreate

  private afficherDetailsEnt (id:number) {
    this.nativeStorage.setItem(Constantes.NS_ID_ENTRAINEMENT, {idEnt: id})
    .then(() => { this.navCtrl.push(DetailsEntrainementPage);}, error => console.error('Error storing item idEnt', error));
  } // afficherDetailsEnt
  
  private afficherAjouterEnt () {
    this.navCtrl.push(AjouterEntrainementPage); // on ajoute au stack la page AjouterEntrainementPage
  } // afficherAjouterEnt

  private afficherBtnAnnuler() {
    this.navCtrl.pop (); // on enlève du stack la page courante
  } // afficherBtnAnnuler

} // EntrainementsPage


