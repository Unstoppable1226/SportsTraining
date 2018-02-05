//package AjouterExerciceEntrainement

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//pages
import { AjouterExercicePage } from '../ajouterExercice/ajouterExercicePage';
import { DetailsEntrainementPage } from '../detailsEntrainement/detailsEntrainementPage';

//providers
import { ExerciceDAO } from '../../app/providers/exerciceDAO';
import { UtilisateurDAO } from '../../app/providers/utilisateurDAO';

//ionic-native
import { NativeStorage } from '@ionic-native/native-storage';

//settings
import { Constantes } from '../../app/settings/constantes';

@Component({
  selector: 'ajouterExerciceEntrainementPage',
  templateUrl: 'ajouterExerciceEntrainementPage.html'
})
export class AjouterExerciceEntrainementPage {

  exercices;
  idEntrainement: number;

  constructor(private navCtrl: NavController, private exerciceDAO:ExerciceDAO, private nativeStorage:NativeStorage, private utilisateurDAO:UtilisateurDAO) {
  } // constructor

  //methode déclanchée quand on entre dans la vue
  ionViewWillEnter() {
    this.onCreate ();
  } // ionViewWillEnter

  private onCreate () {
    this.exercices = [];

    this.nativeStorage.getItem(Constantes.NS_ID_ENTRAINEMENT)
    .then(
      data => {
        this.exerciceDAO.getLstExercicesSansExeEntrainement(data.idEnt).then((resolve) => {
          this.exercices = resolve
        })
      },
      error => console.error(error)
    );
  } // onCreate

 private AfficherCreerExercice () {
    this.navCtrl.push(AjouterExercicePage);
 } // AfficherCreerExercice

 private ajouterExercice (idExercice:number) {
  this.nativeStorage.getItem(Constantes.NS_ID_ENTRAINEMENT)
  .then(
    data => {
      Promise.all ([
        this.exerciceDAO.addExerciceDansEntrainement(data.idEnt, idExercice),
        this.utilisateurDAO.updateExperienceUtilisateur(Constantes.ID_UTILISATEUR, Constantes.EXPERIENCE_EXERCICE),
        this.navCtrl.pop()
      ]);
    },
    error => console.error(error)
  );
 } // ajouterExercice

} // AjouterExerciceEntrainementPage


