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
import { NativeStorage } from '@ionic-native/native-storage';

//providers
import { SqliteDAO } from '../../app/providers/sqliteDAO';

//domaines
import { Exercice } from '../../app/domaines/exercice';
import { Muscle } from '../../app/domaines/muscle';

//
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExerciceDAO {

	constructor(private sqlite: SQLite, private sqliteDAO:SqliteDAO, private nativeStorage: NativeStorage) {
	} // constructor
  
	public insertExercice (nom:string, description:string, type:number, muscleId:number, nomImage:string) : void {
    	this.sqliteDAO.db.executeSql('INSERT INTO `spt_exercice` (exe_nom, exe_description, exe_type, exe_mus_id, exe_image) VALUES (?, ?, ?, ?, ?)', [ nom, description, type, muscleId, nomImage ])
    	.then(() => {console.log("exercice inserted");})
    	.catch(e => console.log(e));
	} // insertExercice
	
	public updateExercice (nom:string, description:string, muscleId:number, idExe:number) : void {
    	this.sqliteDAO.db.executeSql('UPDATE `spt_exercice` SET exe_nom = ?, exe_description = ?, exe_mus_id = ? WHERE exe_id = ?', [ nom, description, muscleId, idExe ])
    	.then(() => {console.log("exercice updated");})
    	.catch(e => console.log(e));
	} // updateExercice

	public  getExercices () {
		return new Promise ((resolve, reject) => {
	  		let exercices: Array<Exercice> = [];
		    let req = "SELECT exe_id, exe_nom, exe_description, exe_type, exe_mus_id, exe_image FROM spt_exercice ORDER BY exe_nom ASC";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let exe : Exercice;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	exe = new Exercice ();
				          	exe.setId(data.rows.item(i).exe_id);
				          	exe.setNom(data.rows.item(i).exe_nom);
				          	exe.setDescription(data.rows.item(i).exe_description);
				          	exe.setType(data.rows.item(i).exe_type);
				          	exe.setMusId(data.rows.item(i).exe_mus_id);
				          	exe.setImage(data.rows.item(i).exe_image);
				            exercices.push(exe);
				      	}
			      		resolve (exercices);
		        	}
		      	}
		      	resolve (exercices);
		    });
		});
  	} // getExercices

  	public getExercice (id:number) {
		return new Promise ((resolve, reject) => {
	  		let exercices: Array<Exercice> = [];
		    let req = "SELECT exe_id, exe_nom, exe_description, exe_type, exe_mus_id, exe_image FROM spt_exercice WHERE exe_id = " + id;
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let exe : Exercice;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	exe = new Exercice ();
				          	exe.setId(data.rows.item(i).exe_id);
				          	exe.setNom(data.rows.item(i).exe_nom);
				          	exe.setDescription(data.rows.item(i).exe_description);
				          	exe.setType(data.rows.item(i).exe_type);
				          	exe.setMusId(data.rows.item(i).exe_mus_id);
				          	exe.setImage(data.rows.item(i).exe_image);
				            exercices.push(exe);
				      	}
			      		resolve (exercices);
		        	}
		      	}
		      	resolve (exercices);
		    });
		});
  	} // getExercice

	public getExercicesEntrainement (idEntrainement:number){
		return new Promise ((resolve, reject) => {
	  		let exercices: Array<Exercice> = [];
		    let req = "SELECT exe_id, exe_nom, exe_description, exe_type, exe_mus_id, exe_image FROM spt_exercice JOIN spt_contient ON exe_id = con_exe_id JOIN spt_entrainement ON con_ent_id = ent_id WHERE ent_id = " + idEntrainement;
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let exe : Exercice;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	exe = new Exercice ();
				          	exe.setId(data.rows.item(i).exe_id);
				          	exe.setNom(data.rows.item(i).exe_nom);
				          	exe.setDescription(data.rows.item(i).exe_description);
				          	exe.setType(data.rows.item(i).exe_type);
				          	exe.setMusId(data.rows.item(i).exe_mus_id);
				          	exe.setImage(data.rows.item(i).exe_image);
				            exercices.push(exe);
				      	}
			      		resolve (exercices);
		        	}
		      	}
		      	resolve (exercices);
		    });
  		});
  	} // getExercicesEntrainement

  //permet de récupérer une liste d'exercices sans les exercices deja attribués à l'entrainement
  public  getLstExercicesSansExeEntrainement(idEntrainement:number) {
  	let exercices: Array<Exercice> = [];
    return new Promise ((resolve, reject) => {
	    
	    this.getExercicesEntrainement(idEntrainement).then((res : Array<Exercice>) => {
	    	exercices = res;
	    	let req = this.traiterRequete(exercices);
	    	exercices.splice(0, exercices.length); // Efface le tableau
	    	this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		      
		      if(data == null) {return;}

		      if(data.rows) {
		        if(data.rows.length > 0) {
		        	let exe : Exercice;
		          	for(var i = 0; i < data.rows.length; i++) {
			          	exe = new Exercice ();
			          	exe.setId(data.rows.item(i).exe_id);
			          	exe.setNom(data.rows.item(i).exe_nom);
			          	exe.setDescription(data.rows.item(i).exe_description);
			          	exe.setType(data.rows.item(i).exe_type);
			          	exe.setMusId(data.rows.item(i).exe_mus_id);
			          	exe.setImage(data.rows.item(i).exe_image);
			            exercices.push(exe);
		          	}
		          	resolve(exercices);
		        }
		      }
		      resolve (exercices);
			});
	    },(err) => { reject(err) })
	})

  } // getLstExercicesSansExeEntrainement

	private traiterRequete (exercices : Array<Exercice>) {
	    let req = "SELECT * FROM spt_exercice";
	    if (exercices.length > 0) {
	    	let cpt = 0;
	    	for (let x=0; x < exercices.length; x++) {
	    		if (cpt == 0) {
	    			req = req + " WHERE exe_id <> " + exercices[x].getId();
	    			cpt = 1;
	    		}else {
	    			req = req + " AND exe_id <> " + exercices[x].getId();
	    		}
	    	}
	    }
	    req = req + " ORDER BY exe_nom ASC";
	    return req;
	} // traiterRequete

  public addExerciceDansEntrainement(idEnt:number, idExe:number) : void {
    this.sqliteDAO.db.executeSql('INSERT INTO `spt_contient` (con_ent_id, con_exe_id) VALUES (\'' + idEnt + '\', \'' + idExe + '\')', {})
    .then(() => {console.log("exercice inserted !")})
    .catch(e => console.log(e));
  } // addExerciceDansEntrainement

	public deleteExerciceFromEntrainement (idEnt:number, idExe:number) {
	    this.sqliteDAO.db.executeSql('DELETE FROM `spt_contient` WHERE con_exe_id = ' + idExe + ' AND con_ent_id = ' + idEnt, {})
	    .then(() => {
       		this.sqliteDAO.db.executeSql('DELETE FROM `spt_serie` WHERE ser_exe_id = ? AND ser_ent_id = ?', [ idExe, idEnt ])
	    	.then(() => {console.log("exercice deleted !");})
	    	.catch(e => console.log(e));
	    })
	    .catch(e => console.log(e));
	} // deleteExerciceFromEntrainement

	public getTypeExercice (id:number) {
	    return new Promise ((resolve, reject) => {
	  		let exe : Exercice = new Exercice ();
		    let req = "SELECT exe_id, exe_nom, exe_description, exe_type, exe_mus_id, exe_image FROM spt_exercice WHERE exe_id = " + id;
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
			      		for(var i = 0; i < data.rows.length; i++) {
				          	exe.setId(data.rows.item(i).exe_id);
				          	exe.setNom(data.rows.item(i).exe_nom);
				          	exe.setDescription(data.rows.item(i).exe_description);
				          	exe.setType(data.rows.item(i).exe_type);
				          	exe.setMusId(data.rows.item(i).exe_mus_id);
				          	exe.setImage(data.rows.item(i).exe_image);
				      	}
			      		resolve (exe);
		        	}
		      	}
		      	resolve (exe);
		    });
		});
	} // getTypeExercice

	
	public getExercicesMuscle (idMuscle:number) {
		return new Promise ((resolve, reject) => {
	  		let listObjects: Array<Object> = [];
		    let req = "SELECT exe_id, exe_nom, exe_description, exe_type, exe_mus_id, exe_image, mus_id, mus_nom FROM spt_exercice JOIN spt_muscle ON mus_id = exe_mus_id WHERE mus_id = " + idMuscle + " ORDER BY exe_nom ASC";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
			      		for(var i = 0; i < data.rows.length; i++) {
				            listObjects.push({
				            	exe_id : data.rows.item(i).exe_id,
				            	exe_nom : data.rows.item(i).exe_nom,
				            	exe_description : data.rows.item(i).exe_description,
				            	exe_type : data.rows.item(i).exe_type,
				            	exe_mus_id : data.rows.item(i).exe_mus_id,
				            	exe_image : data.rows.item(i).exe_image,
				            	mus_id : data.rows.item(i).mus_id,
								mus_nom : data.rows.item(i).mus_nom
				            });
				      	}
			      		resolve (listObjects);
		        	}
		      	}
		      	resolve (listObjects);
		    });
		});
	} // getExercicesMuscle

	public getExercicesMuscles (idExe:number) {
		return new Promise ((resolve, reject) => {
	  		let lst: Array<Object> = [];
		    let req = "SELECT exe_id, exe_nom, exe_description, exe_type, exe_image, exe_mus_id, mus_id, mus_nom FROM spt_exercice JOIN spt_muscle ON mus_id = exe_mus_id WHERE exe_id = "+ idExe +" ORDER BY exe_nom ASC";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		    			let exe : Exercice;
			      		for(var i = 0; i < data.rows.length; i++) {
			      			exe = new Exercice ();
			      			exe.setId(data.rows.item(i).exe_id);
			      			exe.setNom(data.rows.item(i).exe_nom);
			      			exe.setDescription (data.rows.item(i).exe_description);
			      			exe.setType(data.rows.item(i).exe_type);
			      			exe.setImage(data.rows.item(i).exe_image);
				            lst.push({
				            	exe : exe,
				            	muscle : {id: data.rows.item(i).mus_id, nom: data.rows.item(i).mus_nom}
				            });
				      	}
			      		resolve (lst);
		        	}
		      	}
		      	resolve (lst);
		    });
		});
	} // getExercicesMuscles

	public  getExercicesMuscuEntrainementsSeries () {
		return new Promise ((resolve, reject) => {
	  		let list: Array<Exercice> = [];
		    let req = "SELECT exe_id, exe_nom FROM spt_exercice JOIN spt_contient ON con_exe_id = exe_id JOIN spt_serie ON ser_exe_id = exe_id WHERE exe_type = 1 GROUP BY exe_id ORDER BY exe_nom";
		    this.sqliteDAO.db.executeSql(req, {})
		    .then((data) => {
		    	if(data == null) {reject(null);}
		    	if(data.rows) {
		    		if(data.rows.length > 0) {
		          		let exe : Exercice;
			      		for(var i = 0; i < data.rows.length; i++) {
				          	exe = new Exercice ();
				          	exe.setId(data.rows.item(i).exe_id);
				          	exe.setNom(data.rows.item(i).exe_nom);
				            list.push(exe);
				      	}
			      		resolve (list);
		        	}
		      	}
		      	resolve (list);
		    });
		});
  	} // getExercicesMuscuEntrainementsSeries

	public  getExercicesCardioEntrainementsSeries () {
			return new Promise ((resolve, reject) => {
		  		let list: Array<Exercice> = [];
			    let req = "SELECT exe_id, exe_nom FROM spt_exercice JOIN spt_contient ON con_exe_id = exe_id JOIN spt_serie ON ser_exe_id = exe_id WHERE exe_type = 0 GROUP BY exe_id ORDER BY exe_nom";
			    this.sqliteDAO.db.executeSql(req, {})
			    .then((data) => {
			    	if(data == null) {reject(null);}
			    	if(data.rows) {
			    		if(data.rows.length > 0) {
			          		let exe : Exercice;
				      		for(var i = 0; i < data.rows.length; i++) {
					          	exe = new Exercice ();
					          	exe.setId(data.rows.item(i).exe_id);
					          	exe.setNom(data.rows.item(i).exe_nom);
					            list.push(exe);
					      	}
				      		resolve (list);
			        	}
			      	}
			      	resolve (list);
			    });
			});
	  	} // getExercicesCardioEntrainementsSeries

	  	public deleteExercice (idExe:number) {
	  		Promise.all([
	  			this.sqliteDAO.db.executeSql('DELETE FROM `spt_exercice` WHERE exe_id = ?', [ idExe ]),
	  			this.sqliteDAO.db.executeSql('DELETE FROM `spt_contient` WHERE con_exe_id = ?', [ idExe ]),
	  			this.sqliteDAO.db.executeSql('DELETE FROM `spt_serie` WHERE ser_exe_id = ?', [ idExe ])
	  		])	    	
	  		.then(() => {console.log("exercice deleted !");})
	    	.catch(e => console.log(e));
	  	} // deleteExercice

} //ExerciceDAO


