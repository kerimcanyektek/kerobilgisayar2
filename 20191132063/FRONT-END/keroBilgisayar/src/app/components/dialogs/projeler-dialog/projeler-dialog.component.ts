import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { Projeler } from 'src/app/models/Projeler';

import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-projeler-dialog',
  templateUrl: './projeler-dialog.component.html',
  styleUrls: ['./projeler-dialog.component.css']
})
export class ProjelerDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Projeler;
  islem: string;
  frm: FormGroup;
  dataSource: any;
  kategoriler: Kategori[];
  constructor(
    public dialogRef: MatDialogRef<ProjelerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Proje Ekle';
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = 'Proje Düzenle';
    }

    this.frm=this.FormOlustur();
   }

  ngOnInit() {
    this.ProjelerListe()
  }


  FormOlustur() {
    return this.frmBuild.group({

      projeAdi: [this.yeniKayit.projeAdi],
      projeFiyat: [this.yeniKayit.projeFiyat],
      projeAciklama: [this.yeniKayit.projeAciklama],
      projeGorsel: [this.yeniKayit.projeGorsel],
      projeKatId: [this.yeniKayit.projeKatId],
    });
  }

  ProjelerListe() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
      this.dataSource = new MatTableDataSource(this.kategoriler);

    });
  }
}
