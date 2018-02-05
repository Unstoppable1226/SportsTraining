//package GlossaireDetails

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

//pages
import { DetailsEntrainementPage } from '../detailsEntrainement/detailsEntrainementPage';
import { AjouterEntrainementPage } from '../ajouterEntrainement/ajouterEntrainementPage';
import { ModifierExercicePage } from '../modifierExercice/modifierExercicePage';

//providers
import { ExerciceDAO } from '../../app/providers/exerciceDAO';
import { MuscleDAO } from '../../app/providers/muscleDAO';

//ionic-native
import { NativeStorage } from '@ionic-native/native-storage';

//settings
import { Constantes } from '../../app/settings/constantes';//Constantes.NS_ID_ENTRAINEMENT

@Component({
  selector: 'glossaireDetailsPage',
  templateUrl: 'glossaireDetailsPage.html'
})
export class GlossaireDetailsPage {

  titre:string;
  exercices;
  muscles;
  private id;

  constructor(private navCtrl: NavController, private exerciceDAO: ExerciceDAO, private muscleDAO: MuscleDAO, private navParams: NavParams, 
    private nativeStorage: NativeStorage , private alertCtrl: AlertController) {
  } // constructor

  //methode déclanchée quand on entre dans la vue
  ionViewWillEnter() {
    this.onCreate ();
  } // ionViewWillEnter

  private onCreate () {
    this.exercices = [];
    this.muscles = [];
    
    this.id = this.navParams.get('id');
    let detail = this.navParams.get('detail');
    if (detail == 1) {
      //c'est un Exercice
      this.titre = "de l'exercice"
      this.exerciceDAO.getExercicesMuscles (this.id).then((resolve) => {
        this.exercices = resolve
      })
    }else {
      //c'est un muscle
      this.titre = "du muscle"
      this.muscleDAO.getExercicesMuscle (this.id).then((resolve) => {
        this.muscles = resolve
      })
    }
  } // onCreate

  private afficherDetailsExercice (idExe:number) {
    this.navCtrl.push(GlossaireDetailsPage, {detail : 1, id : idExe}); //1 pour exercice
  } // afficherDetailsExercice

  private supprimerExercice () {
    let alert = this.alertCtrl.create({
      title: 'SUPPRESSION D\'UN EXERCICE ?!',
      message: 'Voulez-vous vraiment supprimer cette exercice ? Cela supprimera toutes les données liées à cette exercice. C\'est à dire toutes les séries créées pour cet exercice. Êtes-vous vraiment certain de vouloir continuer ?',
      buttons: [{ 
          text: 'Annuler',
            role: 'non',
            handler: () => {}
        },
        {
            text: 'Supprimer',
            handler: () => {
              Promise.all ([
                this.nativeStorage.setItem(Constantes.NS_DELETED_EXERCICE_ID, {idExe:this.id}),
                this.exerciceDAO.deleteExercice (this.id),
                this.navCtrl.pop()
              ])
            }
          }
      ]});
      alert.present();
  } // supprimerExercice

  private modifierExercice () {
    this.navCtrl.push(ModifierExercicePage, {idExe : this.exercices[0].exe.id});
  } //modifierExercice
  
} // GlossaireDetailsPage


