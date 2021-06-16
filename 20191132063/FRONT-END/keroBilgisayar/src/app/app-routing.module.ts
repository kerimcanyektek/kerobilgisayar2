import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KategorilerComponent } from './components/admin/kategoriler/kategoriler.component';
import { KategoriListeComponent } from './components/ListeComponents/kategori-liste/kategori-liste.component';
import { SiparisListeComponent } from './components/ListeComponents/siparis-liste/siparis-liste.component';
import { UyeListeComponent } from './components/ListeComponents/uye-liste/uye-liste.component';
import { LoginComponent } from './components/login/login.component';
import { SiparislerComponent } from './components/admin/siparisler/siparisler.component';
import { UyelerComponent } from './components/admin/uyeler/uyeler.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ProjelerComponent } from './components/admin/projeler/projeler.component';
import { HakkimizdaComponent } from './components/hakkimizda/hakkimizda.component';


const routes: Routes = [
  {path:'anasayfa', component:HomeComponent},
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'hakkimizda', component:HakkimizdaComponent},
  {path:'projeler', component:ProjelerComponent},











  //Admin
  {path:'admin', component:AdminComponent},
  {path:'admin/uyeler', component:UyelerComponent},
  {path:'admin/projeler', component:ProjelerComponent},
  {path:'admin/siparisler', component:SiparislerComponent},
  {path:'admin/kategoriler', component:KategorilerComponent},
  {path:'admin/uyeliste/:uyelerId', component:UyeListeComponent},
  {path:'admin/projelerliste/:projeId', component: ProjelerComponent},
  {path:'admin/kategoriliste/:katId', component:KategoriListeComponent},
  {path:'admin/siparisliste/:siparisId', component:SiparisListeComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
