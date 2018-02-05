//package Detailsentrainement

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';

//pages
import { DetailsExercicePage } from '../detailsExercice/detailsExercicePage';
import { AjouterExerciceEntrainementPage } from '../ajouterExerciceEntrainement/ajouterExerciceEntrainementPage';
import { ModifierEntrainementPage } from '../modifierEntrainement/modifierEntrainementPage';
import { EntrainementsPage } from '../entrainements/entrainementsPage';

//providers
import { EntrainementDAO } from '../../app/providers/entrainementDAO';
import { ExerciceDAO } from '../../app/providers/exerciceDAO';

//ionic-native
import { NativeStorage } from '@ionic-native/native-storage';

//settings
import { Constantes } from '../../app/settings/constantes';

@Component({
  selector: 'detailsEntrainementPage',
  templateUrl: 'detailsEntrainementPage.html'
})
export class DetailsEntrainementPage {

  entrainement;
  exercices;
  idEntrainement:number;

   constructor(private navCtrl: NavController, private entrainementDAO: EntrainementDAO, private nativeStorage: NativeStorage, private exerciceDAO: ExerciceDAO, private alertCtrl: AlertController) {   
   } // constructor

   //methode déclanchée quand on entre dans la vue
  ionViewWillEnter() {
    this.onCreate ();
  } // ionViewWillEnter

  private onCreate () {
    this.entrainement = [];
    this.exercices = [];
      
    this.nativeStorage.getItem(Constantes.NS_ID_ENTRAINEMENT)
    .then(
      data => {
        this.idEntrainement = data.idEnt;
        this.entrainementDAO.getEntrainement (this.idEntrainement).then((resolve) => {
          this.entrainement = resolve;
          this.exerciceDAO.getExercicesEntrainement(this.idEntrainement).then((resolve) => {
            this.exercices = resolve
          });
        })
      },
      error => console.error(error)
    );
  } // onCreate

  private afficherdetailsExercice (idExe:number) {    
    this.nativeStorage.setItem(Constantes.NS_ID_EXERCICE, idExe)
    .then(() => {
        //console.log('Stored item! idExe : ' + idExe);
        this.navCtrl.push(DetailsExercicePage);
      }
      , error => console.error('Error storing item idEnt', error)
    );
  } // afficherdetailsExercice

  private afficherAjouterExerciceEntrainement () {
    this.navCtrl.push(AjouterExerciceEntrainementPage);
  } // afficherAjouterExerciceEntrainement

  private supprimerExerciceDeEntrainement(idExe:number) {
    let alert = this.alertCtrl.create({
      title: 'Suppression ?!',
      message: 'Voulez-vous vraiment enlever l\'exercice de cet entrainement et effacer les séries qui lui sont liées ?',
      buttons: [{ 
          text: 'Non',
            role: 'non',
            handler: () => {}
        },
        {
            text: 'Oui',
            handler: () => {
              Promise.all([
                this.exerciceDAO.deleteExerciceFromEntrainement(this.idEntrainement,idExe),
                this.exerciceDAO.getExercicesEntrainement(this.idEntrainement).then((resolve) => {this.exercices = resolve })
              ])
              .then(() => {});
            }
          }
      ]});
      alert.present();
  } // supprimerExerciceDeEntrainement

  private supprimerEntrainement (idEntrainement:number) {
	let alert = this.alertCtrl.create({
	    title: 'Suppression ?!',
	    message: 'Voulez-vous vraiment supprimer cet entrainement et toutes les données qui lui sont liées ?',
	    buttons: [{ 
		    	text: 'Non',
		        role: 'non',
		        handler: () => {}
	    	},
	    	{
		        text: 'Oui',
		        handler: () => {
		        	Promise.all([
				      this.entrainementDAO.deleteEntrainement(idEntrainement),
				      this.navCtrl.pop()
    				])
		        }
	      	}
	    ]});
	  	alert.present();
  } // supprimerEntrainement

  private afficherModifierEntrainement (idEntrainement:number) {
    this.navCtrl.push(ModifierEntrainementPage);
  } // afficherModifierEntrainement

} // DetailsEntrainementPage


