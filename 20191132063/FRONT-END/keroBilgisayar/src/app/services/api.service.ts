import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { Siparis } from '../models/Siparis';
import { Projeler } from '../models/Projeler';

import { Uye } from '../models/Uyeler';
import { ProjelerGorsel } from '../models/ProjelerGorsel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://localhost:44378/api/';
  siteUrl = 'https://localhost:44378/';

  constructor(public http: HttpClient) {}

  // Oturum İşlemleri
  tokenAl(kullaniciAdi: string, sifre: string) {
    var data = 'username=' + kullaniciAdi + '&password=' + sifre + '&grant_type=password';

    var reqHeader=new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"});
    return this.http.post(this.apiUrl+"/token", data, {headers:reqHeader});
  }

  oturumKontrol(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  yetkiKontrol(yetkiler) {
    var uyeYetkileri: string[] = JSON.parse(localStorage.getItem('uyeYetkileri'));
    var sonuc: boolean = false;

    if (uyeYetkileri) {
      yetkiler.forEach(element => {
        if (uyeYetkileri.indexOf(element)>-1) {
          sonuc=true;
          return false;
        }
      });
    }

    return sonuc;
  }


  //Kategori Servis
  KategoriListe() {
    return this.http.get(this.apiUrl + 'kategoriliste');
  }

  KategoriById(katId: number) {
    return this.http.get(this.apiUrl + 'kategoribyid/' + katId);
  }

  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + 'kategoriekle', kat);
  }

  KategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiUrl + 'kategoriduzenle', kat);
  }

  KategoriSil(katId: number) {
    return this.http.delete(this.apiUrl + 'kategorisil/' + katId);
  }

  //Projeler Servis

  ProjelerListe() {
    return this.http.get(this.apiUrl + 'projelerliste');
  }

  ProjelerById(projeId: number) {
    return this.http.get(this.apiUrl + 'projelerbyid/' + projeId);
  }

  ProjelerEkle(urn: Projeler) {
    return this.http.post(this.apiUrl + 'projelerekle', urn);
  }

  ProjelerDuzenle(urn: Projeler) {
    return this.http.put(this.apiUrl + 'projelerduzenle', urn);
  }

  ProjelerSil(projeId: number) {
    return this.http.delete(this.apiUrl + 'projelersil/' + projeId);
  }

  ProjelerGorselGuncelle(projeGorsel: ProjelerGorsel) {
    return this.http.post(this.apiUrl + 'projelergorselguncelle', projeGorsel);
  }

  // Üye Servis

  UyeListe() {
    return this.http.get(this.apiUrl + 'uyeliste');
  }

  UyeById(uyelerId: number) {
    return this.http.get(this.apiUrl + 'uyebyid/' + uyelerId);
  }

  UyeEkle(uy: Uye) {
    return this.http.post(this.apiUrl + 'uyeekle', uy);
  }

  UyeDuzenle(uy: Uye) {
    return this.http.put(this.apiUrl + 'uyeduzenle', uy);
  }

  UyeSil(uyelerId: number) {
    return this.http.delete(this.apiUrl + 'uyesil/' + uyelerId);
  }

  // Sipariş Servis

  SiparisListe() {
    return this.http.get(this.apiUrl + 'siparisliste');
  }

  SiparisById(siparisId: number) {
    return this.http.get(this.apiUrl + 'siparisbyid/' + siparisId);
  }

  SiparisEkle(sprs: Siparis) {
    return this.http.post(this.apiUrl + 'siparisEkle', sprs);
  }

  SiparisDuzenle(sprs: Siparis) {
    return this.http.put(this.apiUrl + 'siparisduzenle', sprs);
  }

  SiparisSil(siparisId: number) {
    return this.http.delete(this.apiUrl + 'siparissil/' + siparisId);
  }
}
