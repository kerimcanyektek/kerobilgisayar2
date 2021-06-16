import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { UyelerComponent } from './components/admin/uyeler/uyeler.component';
import { ProjelerComponent } from './components/admin/projeler/projeler.component';
import { SiparislerComponent } from './components/admin/siparisler/siparisler.component';
import { KategorilerComponent } from './components/admin/kategoriler/kategoriler.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { ApiService } from './services/api.service';
import { MyAlertService } from './services/myAlert.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UyeListeComponent } from './components/ListeComponents/uye-liste/uye-liste.component';

import { KategoriListeComponent } from './components/ListeComponents/kategori-liste/kategori-liste.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { SiparisDialogComponent } from './components/dialogs/siparis-dialog/siparis-dialog.component';
import { SiparisListeComponent } from './components/ListeComponents/siparis-liste/siparis-liste.component';
import { GorselyukleDialogComponent } from './components/dialogs/gorselyukle-dialog/gorselyukle-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { UyeolDialogComponent } from './components/dialogs/uyeol-dialog/uyeol-dialog.component';
import { ProjelerDialogComponent } from './components/dialogs/projeler-dialog/projeler-dialog.component';
import { HakkimizdaComponent } from './components/hakkimizda/hakkimizda.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UyeListeComponent,
    ProjelerComponent,
    KategoriListeComponent,
    SiparisListeComponent,
    LoginComponent,
    HakkimizdaComponent,

    //Admin
    AdminComponent,
    UyelerComponent,
    ProjelerComponent,
    SiparislerComponent,
    KategorilerComponent,


    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    ProjelerDialogComponent,
    KategoriDialogComponent,
    SiparisDialogComponent,
    GorselyukleDialogComponent,
    UyeolDialogComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    ProjelerDialogComponent,
    KategoriDialogComponent,
    SiparisDialogComponent,
    GorselyukleDialogComponent,
    UyeolDialogComponent,

  ],
  providers: [ApiService,MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
