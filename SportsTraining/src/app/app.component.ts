//package app

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

// Native components
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//pages
import { HomePage } from '../pages/home/homePage';
import { EntrainementsPage } from '../pages/entrainements/entrainementsPage';
import { GlossairePage } from '../pages/glossaire/glossairePage';
import { StatistiquesPage } from '../pages/statistiques/statistiquesPage';
import { ProfilPage } from '../pages/profil/profilPage';
import { AProposPage } from '../pages/aPropos/aProposPage';
import { SuccesPage } from '../pages/succes/succesPage';

//providers
import { SqliteDAO } from './providers/sqliteDAO';
import { EntrainementDAO } from './providers/entrainementDAO';
import { MuscleDAO } from './providers/muscleDAO';
import { ExerciceDAO } from './providers/exerciceDAO';
import { SerieDAO } from './providers/serieDAO';
import { AppreciationDAO } from './providers/appreciationDAO';
import { UtilisateurDAO } from './providers/utilisateurDAO';
import { MensurationDAO } from './providers/mensurationDAO';
import { MesureDAO } from './providers/mesureDAO';
import { SuccesDAO } from './providers/succesDAO';

@Component({
  templateUrl: 'app.html',
  providers: [
      SqliteDAO, 
      EntrainementDAO, 
      MuscleDAO, 
      ExerciceDAO,
      SerieDAO,
      AppreciationDAO,
      UtilisateurDAO,
      MensurationDAO,
      MesureDAO,
      SuccesDAO
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private sqliteDAO:SqliteDAO, private sqlite: SQLite, private nativeStorage: NativeStorage) {
    console.log("Lancement de l'application !")
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', component: HomePage },
      { title: 'Entrainements', component: EntrainementsPage },
      { title: 'Glossaire', component: GlossairePage },
      { title: 'Statistiques', component: StatistiquesPage },
      { title: 'Profil', component: ProfilPage },
      { title: 'Succès', component: SuccesPage },
      { title: 'À Propos', component: AProposPage }
    ];
    
  } // constructor

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      //On crée les tables de l'application si elles n'existe pas encore et on ajoute les données par la même occasion
      this.sqliteDAO.createDatabaseFile();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  } // initializeApp

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.nav.push(page.component);
  } // openPage

} // Myapp
