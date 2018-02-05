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
import { Mensuration } from '../../app/domaines/mensuration';

@Injectable()
export class MensurationDAO {

	constructor(public sqlite: SQLite, public sqliteDAO:SqliteDAO) {
	} // constructor

	public  getMensurations () {
		return new Promise ((resolve, reject) => {
	  		let mensurations: Array<Mensuration> = [];
		    let req = "SELECT men_id, men_nom, men_unite FROM spt_mensuration ORDER BY men_nom ASC";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let men : Mensuration;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	men = new Mensuration ();
				          	men.setId(data.rows.item(i).men_id);
				          	men.setNom(data.rows.item(i).men_nom);
				          	men.setUnite(data.rows.item(i).men_unite);
				            mensurations.push(men);
				      	}
			      		resolve (mensurations);
		        	}
		      	}
		      	resolve (mensurations);
		    });
		});
	} // getMensurations

	public  getMensurationsWithMesure () {
		return new Promise ((resolve, reject) => {
	  		let mensurations: Array<Mensuration> = [];
		    let req = "SELECT men_id, men_nom, men_unite FROM spt_mensuration JOIN spt_mesure ON mes_men_id = men_id GROUP BY men_nom ORDER BY men_nom";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let men : Mensuration;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	men = new Mensuration ();
				          	men.setId(data.rows.item(i).men_id);
				          	men.setNom(data.rows.item(i).men_nom);
				          	men.setUnite(data.rows.item(i).men_unite);
				            mensurations.push(men);
				      	}
			      		resolve (mensurations);
		        	}
		      	}
		      	resolve (mensurations);
		    });
		});
	} // getMensurationsWithMesure


} // MensurationDAO


