import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { Projeler } from 'src/app/models/Projeler';
import { ProjelerGorsel } from 'src/app/models/ProjelerGorsel';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { GorselyukleDialogComponent } from '../../dialogs/gorselyukle-dialog/gorselyukle-dialog.component';
import { ProjelerDialogComponent } from '../../dialogs/projeler-dialog/projeler-dialog.component';



@Component({
  selector: 'app-projeler',
  templateUrl: './projeler.component.html',
  styleUrls: ['./projeler.component.css'],
})
export class ProjelerComponent implements OnInit {
  dialogRef: MatDialogRef<ProjelerDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  gorselDialogRef: MatDialogRef<GorselyukleDialogComponent>;
  projeler: Projeler[];
  dataSource: any;
  displayedColumns = [
    'projeGorsel',
    'projeAdi',
    'projeFiyat',
    'projeAciklama',
    'projeKatId',
    'islemler',
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {}

  ngOnInit() {
    this.ProjelerListele();
  }

  ProjelerListele() {
    this.apiServis.ProjelerListe().subscribe((d: Projeler[]) => {
      this.projeler = d;
      this.dataSource = new MatTableDataSource(this.projeler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ProjelerFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Ekle() {
    var yeniKayit: Projeler = new Projeler();
    this.dialogRef = this.matDialog.open(ProjelerDialogComponent, {
      width: '60%',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.ProjelerEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.ProjelerListele();
          }
        });
      }
    });
  }

  Duzenle(kayit: Projeler) {
    this.dialogRef = this.matDialog.open(ProjelerDialogComponent, {
      width: '60%',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.projeAdi = d.projeAdi;
        kayit.projeKatId = d.projeKatId;
        kayit.projeFiyat = d.projeFiyat;
        kayit.projeAciklama = d.projeAciklama;
        kayit.projeGorsel = d.projeGorsel;

        this.apiServis.ProjelerDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.ProjelerListele();
          }
        });
      }
    });
  }

  Sil(kayit: Projeler) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj =
      kayit.projeAdi + ' Projesi Silinecektir Onaylıyor Musunuz?';

    this.confirmdialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.ProjelerSil(kayit.projeId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.ProjelerListele();
          }
        });
      }
    });
  }

  GorselGuncelle(kayit: Projeler) {
    this.gorselDialogRef = this.matDialog.open(GorselyukleDialogComponent, {
      width: '40%',
      data: kayit,
    });

    this.gorselDialogRef.afterClosed().subscribe(d=>{
      if (d) {
        d.projeId=kayit.projeId;
        this.apiServis.ProjelerGorselGuncelle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.ProjelerListele();
          }
        });
      }
    });
  }
}


