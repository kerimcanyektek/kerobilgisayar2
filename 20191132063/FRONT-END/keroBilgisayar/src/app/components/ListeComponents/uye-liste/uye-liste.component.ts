import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Uye } from 'src/app/models/Uyeler';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../../dialogs/uye-dialog/uye-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-uye-liste',
  templateUrl: './uye-liste.component.html',
  styleUrls: ['./uye-liste.component.scss'],
})
export class UyeListeComponent implements OnInit {
  dialogRef: MatDialogRef<UyeDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  uye:Uye[];
  uyelerId: number;
  secUye: Uye;
  dataSource: any;
  displayedColumns= [
    'uyelerId',
    'uyeAdi',
    'uyeSoyadi',
    'uyeKullaniciAdi',
    'uyeSifre',
    'uyeTelefon',
    'uyeEposta',
    'uyeYetki',
    'islemler',

  ];

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      // console.log(p);
      if (p) {
        this.uyelerId = p.uyelerId;
        this.UyeGetir();

      }
    });
  }



  UyeGetir() {
    this.apiServis.UyeById(this.uyelerId).subscribe((d: Uye) => {
      this.secUye = d;
      console.log(d);

    });
  }



  Duzenle(kayit:Uye) {
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '60%',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.uyeAdi = d.uyeAdi;
        kayit.uyeSoyadi = d.uyeSoyadi;
        kayit.uyeKullaniciAdi = d.uyeKullaniciAdi;
        kayit.uyeSifre = d.uyeSifre;
        kayit.uyeTelefon = d.uyeTelefon;
        kayit.uyeEposta = d.uyeEposta;
        kayit.uyeYetki=d.uyeYetki;
        this.apiServis.UyeDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeGetir();
          }
        });
      }
    });
  }

  Sil(kayit:Uye) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj = kayit.uyeAdi + " " + kayit.uyeSoyadi + ' İsimli Kullanıcı Silinecektir Onaylıyor Musunuz?';

    this.confirmdialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.UyeSil(kayit.uyelerId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeGetir();
          }
        });
      }
    });
  }


}