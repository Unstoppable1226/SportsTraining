//package providers

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';

// Native components
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { SqliteDAO } from '../../app/providers/sqliteDAO';

//domaines
import { Appreciation } from '../../app/domaines/appreciation';

@Injectable()
export class AppreciationDAO {

	constructor(public sqlite: SQLite, public sqliteDAO:SqliteDAO) {
	} // constructor

	public ajouterAppreciation(nom:string) : void {
		//prepared statement pour les données à insérer !
	    this.sqliteDAO.db.executeSql('INSERT INTO `spt_appreciation` (app_nom) VALUES (?)', [ nom ])
	    .then(() => {console.log("appreciation inserted");})
	    .catch(e => console.log(e));
	} // ajouterAppreciation

	public  getAppreciations () {
		return new Promise ((resolve, reject) => {
	  		let appreciations: Array<Appreciation> = [];
		    let req = "SELECT app_id, app_nom FROM spt_appreciation ORDER BY app_nom ASC";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let app : Appreciation;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	app = new Appreciation (data.rows.item(i).app_id, data.rows.item(i).app_nom);
				            appreciations.push(app);
				      	}
			      		resolve (appreciations);
		        	}
		      	}
		      	resolve (appreciations);
		    });
		});
	} // getAppreciations


	public getAppreciation (id:number) {
	    return new Promise ((resolve, reject) => {
	  		let appreciations: Array<Appreciation> = [];
		    let req = "SELECT app_id, app_nom FROM spt_appreciation WHERE app_id = " + id;
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let app : Appreciation;
		          		let date, annee, mois, jours : string = "";

			      		for(var i = 0; i < data.rows.length; i++) {
				          	app = new Appreciation (data.rows.item(i).app_id, data.rows.item(i).app_nom);
				            appreciations.push(app);
				      	}
			      		resolve (appreciations);
		        	}
		      	}
		      	resolve (appreciations);
		    });
		});
  	} // getAppreciation

 
} // AppreciationDAO


