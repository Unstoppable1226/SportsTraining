//package providers

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Native components
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { SqliteDAO } from '../../app/providers/sqliteDAO';

//domaines
import { Entrainement } from '../../app/domaines/entrainement';
import { Appreciation } from '../../app/domaines/appreciation';

@Injectable()
export class EntrainementDAO {

	constructor(public sqlite: SQLite, public sqliteDAO:SqliteDAO) {
	} // constructor

	public ajouterEntrainement(nom:string, date:string, duree:number, ) : void {
		//prepared statement pour les données à insérer !
	    this.sqliteDAO.db.executeSql('INSERT INTO `spt_entrainement` (ent_nom, ent_date, ent_duree, ent_app_id, ent_uti_id) VALUES (?, ?, ?, ?, ?)', [ nom, date, duree, "1", "1" ])
	    .then(() => {console.log("entrainement inserted");})
	    .catch(e => console.log(e));
	} // ajouterEntrainement

	public updateEntrainement(id:number, nom:string, date:string, duree:number, idApp:number) : void {
		//prepared statement pour les données à insérer !
	    this.sqliteDAO.db.executeSql('UPDATE `spt_entrainement` SET ent_nom = ?, ent_date = ?, ent_duree = ?, ent_app_id = ? WHERE ent_id = ?', [ nom, date, duree, idApp, id ])
	    .then(() => {console.log("entrainement updated");})
	    .catch(e => console.log(e));
	} // updateEntrainement

	public  getEntrainements () {
		return new Promise ((resolve, reject) => {
	  		let entrainements: Array<Entrainement> = [];
		    let req = "SELECT ent_id, ent_nom, ent_date, ent_duree, app_id, app_nom FROM spt_entrainement JOIN spt_appreciation ON ent_app_id = app_id ORDER BY ent_date DESC";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let ent : Entrainement;
		          		let date, annee, mois, jours : string = "";

			      		for(var i = 0; i < data.rows.length; i++) {
				          	ent = new Entrainement ();
				          	ent.setId(data.rows.item(i).ent_id);
				          	ent.setNom(data.rows.item(i).ent_nom);
				          	ent.setDate(this.traiterDate(data.rows.item(i).ent_date));
				          	ent.setduree(data.rows.item(i).ent_duree);
				          	ent.setAppreciation(new Appreciation(data.rows.item(i).app_id, data.rows.item(i).app_nom));
				            entrainements.push(ent);
				      	}
			      		resolve (entrainements);
		        	}
		      	}
		      	resolve (entrainements);
		    });
		});
	} // getEntrainements

	//format du parametre date : "2017-12-31"
	//format de sortie : 31.12.2017
	private traiterDate(date:string) : string {
      	let annee = (date).substr(0,4);
        let mois = (date).substr(5,2);
      	let jours = (date).substr(8,2);
      	return jours + "." + mois + "." + annee;
	} // traiterDate


	public getEntrainement (idEntrainement:number) {
	    return new Promise ((resolve, reject) => {
	  		let entrainements: Array<Entrainement> = [];
		    let req = "SELECT ent_id, ent_nom, ent_date, ent_duree, app_id, app_nom FROM spt_entrainement JOIN spt_appreciation ON ent_app_id = app_id WHERE ent_id = " + idEntrainement;
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let ent : Entrainement;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	ent = new Entrainement ();
				          	ent.setId(data.rows.item(i).ent_id);
				          	ent.setNom(data.rows.item(i).ent_nom);
				          	ent.setDate(this.traiterDate(data.rows.item(i).ent_date));
				          	ent.setduree(data.rows.item(i).ent_duree);
				          	ent.setAppreciation(new Appreciation(data.rows.item(i).app_id, data.rows.item(i).app_nom));
				            entrainements.push(ent);
				      	}
			      		resolve (entrainements);
		        	}
		      	}
		      	resolve (entrainements);
		    });
		});
  	} // getEntrainement

  	public deleteEntrainement (idEntrainement:number) {
  		this.sqliteDAO.db.executeSql('DELETE FROM spt_entrainement WHERE ent_id = ' + idEntrainement, {})
	    .then(() => {
	    	this.deleteExercicesFromEntrainement(idEntrainement);
	    })
	    .catch(e => console.log(e));
  	} // deleteEntrainement

  	private deleteExercicesFromEntrainement(idEntrainement:number) {
  		this.sqliteDAO.db.executeSql('DELETE FROM spt_contient WHERE con_ent_id = ' + idEntrainement, {})
	    .then(() => {
	    	this.deleteSeriesFromExercice (idEntrainement);
	    })
	    .catch(e => console.log(e));
  	} // deleteExercicesFromEntrainement

  	private deleteSeriesFromExercice(idEntrainement:number) {
  		this.sqliteDAO.db.executeSql('DELETE FROM spt_serie WHERE ser_ent_id = ' + idEntrainement, {})
	    .then(() => {
	    })
	    .catch(e => console.log(e));
  	} // deleteSeriesFromExercice

  	public  getNbEntByMonth () {
		return new Promise ((resolve, reject) => {
	  		let list: Array<Object> = [];
		    let req = 'SELECT strftime("%m-%Y", ent_date) as "mois", count(ent_id) as "nbEnt" FROM spt_entrainement GROUP BY strftime("%m-%Y", ent_date) ORDER BY ent_date';
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
			      		for(var i = 0; i < data.rows.length; i++) {
				          	list.push({
				            	mois : parseInt(data.rows.item(i).mois.substr(0, 2), 10),
				            	nbEnt : data.rows.item(i).nbEnt
				            });
				      	}
			      		resolve (list);
		        	}
		      	}
		      	resolve (list);
		    });
		});
	} // getNbEntByMonth
 
} // EntrainementDAO


