//package succes

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

//providers
import { SuccesDAO } from '../../app/providers/succesDAO';
import { UtilisateurDAO } from '../../app/providers/utilisateurDAO';

//domaines
import { Utilisateur } from '../../app/domaines/utilisateur';
import { Succes } from '../../app/domaines/succes';

//settings
import { Constantes } from '../../app/settings/constantes'

@Component({
  selector: 'succesPage',
  templateUrl: 'succesPage.html'
})
export class SuccesPage {  
  
  utilisateur:Utilisateur;
  succesUtilisateur;
  succes;
	experienceUti : number;
  
	constructor(private navCtrl: NavController, private succesDAO:SuccesDAO, private utilisateurDAO:UtilisateurDAO, private alertCtrl: AlertController) {
  		this.experienceUti = 0;
      utilisateurDAO.getUtilisateur(Constantes.ID_UTILISATEUR).then ((resolve:Utilisateur) => { 
        this.utilisateur = resolve;
        this.experienceUti = this.utilisateur.getExperience();
        utilisateurDAO.getSuccesUtilisateur(Constantes.ID_UTILISATEUR).then ((resolve2:Succes[]) => {
          this.succesUtilisateur = resolve2; 
          succesDAO.getSuccesExperience(this.utilisateur.getExperience()).then ((resolve3:Succes[]) => { 
            this.succes = resolve3;
            this.insererSuccesDebloque();
          })
        })
      })
  	} // constructor

    private insererSuccesDebloque () {
      for (let i=0; i<this.succes.length; i++) {
        if (this.estContenu(this.succes[i], this.succesUtilisateur)) {
          //Il est dedans, donc on l'a deja inséré par le passé!
        }else {
          //on insert dans la table
          Promise.all([
            this.succesUtilisateur.push(this.succes[i]),
            this.succesDAO.insertSuccesUtilisateur(this.utilisateur.getId(), this.succes[i].getId()),
            this.afficherMsgSuccesDebloque(this.succes[i])
          ])
        }
      }
    } // insererSuccesDebloque

    private afficherMsgSuccesDebloque(s:Succes) {
      let alert = this.alertCtrl.create({
        title: 'Succès Débloqué !',
        subTitle: 'Félicitation, vous venez de recevoir le succès "' + s.getNom() + '"',
        buttons: ['Cool']
      });
      alert.present();
    } // afficherMsgSuccesDebloque

    //
    private estContenu (s:Succes, lstSucces) : boolean {
      let trouve = false;
      for (let i=0; i < lstSucces.length; i++) {
        if (s.getId() == lstSucces[i].getId()) {
          //Il est dedans, donc on l'a deja inséré par le passé!
          trouve = true;
        }
      }
      return trouve;
    } // estContenu

} // SuccesPage


