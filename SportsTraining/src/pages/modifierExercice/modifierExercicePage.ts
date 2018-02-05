//package ModifierExercice

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup,FormControl} from '@angular/forms';

//pages
import { AjouterExerciceEntrainementPage } from '../ajouterExerciceEntrainement/ajouterExerciceEntrainementPage';

//providers
import { MuscleDAO } from '../../app/providers/muscleDAO';
import { ExerciceDAO } from '../../app/providers/exerciceDAO';
import { UtilisateurDAO } from '../../app/providers/utilisateurDAO';

//settings
import { Constantes } from '../../app/settings/constantes';

//ionic-native
import { NativeStorage } from '@ionic-native/native-storage';

//domaines
import { Exercice } from '../../app/domaines/exercice';

@Component({
  selector: 'modifierExercicePage',
  templateUrl: 'modifierExercicePage.html'
})
export class ModifierExercicePage {

  private muscles;
  private nom:string;
  private description:string;
  private muscle:number;
  private type: number;
  private idExe:number;
  private msgError:string;
  radioGroup;
  radioForm;


  constructor(private navCtrl: NavController, private muscleDAO:MuscleDAO, private exerciceDAO:ExerciceDAO, public utilisateurDAO:UtilisateurDAO, 
    private navParams: NavParams, private alertCtrl: AlertController, private nativeStorage: NativeStorage) {
    this.muscle = 0;
    this.msgError = "";
    muscleDAO.getMuscles ().then((resolve) => {
      this.muscles = resolve;
      this.idExe = navParams.get('idExe');
      exerciceDAO.getExercice(this.idExe).then ((resolve) => {
        let e = resolve[0];
        this.idExe = e.getId();
        this.nom = e.getNom();
        this.description = e.getDescription();
        this.muscle = e.getMusId();
        this.type = e.getType();
      })
    })
    this.radioForm = new FormGroup({
      "radioGroup": new FormControl({value: '1', disabled: false})
    });
  } //constructor

  private enregistrerExercice () {
    if (this.isValide()) {
      this.msgError = "";
      let muscle:number;
      if (this.type == 0) {
        muscle = 1;
      }else {
        muscle = this.muscle;
      }
      Promise.all ([
        this.nativeStorage.setItem(Constantes.NS_UPDATED_EXERCICE_ID, {idExe:this.idExe, nomExe: this.nom}),
        this.exerciceDAO.updateExercice(this.nom, this.description, muscle, this.idExe),
        this.showAlert(),
        this.navCtrl.pop()
      ])
      .then(() => {});
    }else {
      this.msgError = "Donnéés pas valide !";
    }
  } // enregistrerExercice

 private showAlert() {
      let alert = this.alertCtrl.create({
        title: 'Exercice sauvegardé !',
        subTitle: '',
        buttons: ['OK']
      });
      alert.present();
  } // showAlert

  private isValide() : boolean {
    if (this.nom == "" || this.description == "" || this.muscle == 0) {
      return false;
    }
    return true;
  } // isValide

  private doSubmit(event) {
    event.preventDefault();
  } // doSubmit

  private annuler () {
    this.navCtrl.pop();
  } // annuler

} // ModifierExercicePage


