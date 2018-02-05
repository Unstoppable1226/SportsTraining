//package app

/*
* Auteur : Vincent Jalley
* Date : 15.09.2017
* Sports Training Version 1
*/
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

//pages
import { HomePage } from '../pages/home/homePage';
import { EntrainementsPage } from '../pages/entrainements/entrainementsPage';
import { DetailsEntrainementPage } from '../pages/detailsEntrainement/detailsEntrainementPage';
import { AjouterEntrainementPage } from '../pages/ajouterEntrainement/ajouterEntrainementPage';
import { GlossairePage } from '../pages/glossaire/glossairePage';
import { DetailsExercicePage } from '../pages/detailsExercice/detailsExercicePage';
import { AjouterExercicePage } from '../pages/ajouterExercice/ajouterExercicePage';
import { AjouterExerciceEntrainementPage } from '../pages/ajouterExerciceEntrainement/ajouterExerciceEntrainementPage';
import { AjouterSeriePage } from '../pages/ajouterSerie/ajouterSeriePage';
import { ModifierEntrainementPage } from '../pages/modifierEntrainement/modifierEntrainementPage';
import { ProfilPage } from '../pages/profil/profilPage';
import { AProposPage } from '../pages/aPropos/aProposPage';
import { MensurationPage } from '../pages/mensuration/mensurationPage';
import { AjouterMesurePage } from '../pages/ajouterMesure/ajouterMesurePage';
import { GlossaireDetailsPage } from '../pages/glossaireDetails/glossaireDetailsPage';
import { SuccesPage } from '../pages/succes/succesPage';
import { StatistiquesPage } from '../pages/statistiques/statistiquesPage';
import { ModifierExercicePage } from '../pages/modifierExercice/modifierExercicePage';

//providers
import { SqliteDAO } from '../app/providers/sqliteDAO';
import { EntrainementDAO } from '../app/providers/entrainementDAO';
import { ExerciceDAO } from '../app/providers/exerciceDAO';
import { MuscleDAO } from '../app/providers/muscleDAO';
import { SerieDAO } from '../app/providers/serieDAO';
import { AppreciationDAO } from './providers/appreciationDAO';
import { UtilisateurDAO } from './providers/utilisateurDAO';
import { MensurationDAO } from './providers/mensurationDAO';
import { MesureDAO } from './providers/mesureDAO';
import { SuccesDAO } from './providers/succesDAO';

//ionic-native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EntrainementsPage,
    DetailsEntrainementPage,
    AjouterEntrainementPage,
    GlossairePage,
    DetailsExercicePage,
    AjouterExercicePage,
    AjouterExerciceEntrainementPage,
    AjouterSeriePage,
    ModifierEntrainementPage,
    ProfilPage,
    AProposPage,
    MensurationPage,
    AjouterMesurePage,
    GlossaireDetailsPage,
    SuccesPage,
    StatistiquesPage,
    ModifierExercicePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EntrainementsPage,
    DetailsEntrainementPage,
    AjouterEntrainementPage,
    GlossairePage,
    DetailsExercicePage,
    AjouterExercicePage,
    AjouterExerciceEntrainementPage,
    AjouterSeriePage,
    ModifierEntrainementPage,
    ProfilPage,
    AProposPage,
    MensurationPage,
    AjouterMesurePage,
    GlossaireDetailsPage,
    SuccesPage,
    StatistiquesPage,
    ModifierExercicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SqliteDAO,
    NativeStorage,
    EntrainementDAO,
    ExerciceDAO,
    MuscleDAO,
    SerieDAO,
    AppreciationDAO,
    UtilisateurDAO,
    MensurationDAO,
    MesureDAO,
    SuccesDAO
  ]
})
export class AppModule {}
