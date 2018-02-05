//package DetailsExercice

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

//pages
import { AjouterSeriePage } from '../ajouterSerie/ajouterSeriePage';

//providers
import { SerieDAO } from '../../app/providers/serieDAO';
import { ExerciceDAO } from '../../app/providers/exerciceDAO';

//domaines
import { Serie } from '../../app/domaines/serie';
import { Exercice } from '../../app/domaines/exercice';

//ionic-native
import { NativeStorage } from '@ionic-native/native-storage';

//settings
import { Constantes } from '../../app/settings/constantes';

@Component({
  selector: 'detailsExercicePage',
  templateUrl: 'detailsExercicePage.html'
})
export class DetailsExercicePage {

  series;
  private idEnt:number;
  private idExe:number;
  exercice : Exercice;

  constructor(private navCtrl: NavController, private serieDAO:SerieDAO, private nativeStorage: NativeStorage, private exerciceDAO:ExerciceDAO, private alertCtrl: AlertController) {
   this.onCreate ();
  } // constructor

  //methode déclanchée quand on entre dans la vue
  ionViewWillEnter() {
    this.onCreate ();
  } // ionViewWillEnter

  private onCreate () {
    this.series = [];
    this.exercice = new Exercice ();
    this.exercice.setImage("-1")
    //Récupération des NS pour initialiser l'id de l'entrainement, de l'exercice
    this.nativeStorage.getItem(Constantes.NS_ID_ENTRAINEMENT)
    .then(
      data => {
        this.idEnt = data.idEnt;
        this.nativeStorage.getItem(Constantes.NS_ID_EXERCICE)
        .then(
          data => {
            this.idExe = data;
            this.recupererDonnees();
          },
          error => console.error(error)
        );
      },
      error => console.error(error)
    );
  } // onCreate

  private recupererDonnees () {
    this.serieDAO.getSerieExerciceEnt (this.idEnt, this.idExe).then((resolve) => {
      this.series = resolve;

      this.exerciceDAO.getExercice(this.idExe).then((resolveExe:Exercice[]) => {
        this.exercice = resolveExe[0];
      });
    });
  } // recupererDonnees

	private afficherAjouterSerie () {
		this.navCtrl.push(AjouterSeriePage);
	} // afficherAjouterSerie

  private supprimerSerie (idSerie:number) {
    let alert = this.alertCtrl.create({
      title: 'Suppression ?!',
      message: 'Voulez-vous vraiment supprimer cette série ?',
      buttons: [{ 
          text: 'Non',
            role: 'non',
            handler: () => {}
        },
        {
            text: 'Oui',
            handler: () => {
              Promise.all([
                this.serieDAO.deleteSerieFromExercice (idSerie),
                this.serieDAO.getSerieExerciceEnt (this.idEnt, this.idExe).then((resolve) => {this.series = resolve})
              ]).then(() => {});
            }
          }
      ]});
      alert.present();
  } // supprimerSerie

} // DetailsExercicePage


