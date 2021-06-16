import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { Projeler } from 'src/app/models/Projeler';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { ProjelerDialogComponent } from '../../dialogs/projeler-dialog/projeler-dialog.component';


@Component({
  selector: 'app-projeler-liste',
  templateUrl: './projeler-liste.component.html',
  styleUrls: ['./projeler-liste.component.css'],
})
export class ProjelerComponent implements OnInit {
  dialogRef: MatDialogRef<ProjelerDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  projeler: Projeler[];
  projeId: number;
  secProjeler: Projeler;



  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      console.log(p);
      if (p) {
        this.projeId = p.projeId;
        this.ProjeGetir();
      }
    });
  }


  ProjeGetir() {
    this.apiServis.ProjelerById(this.projeId).subscribe((d: Projeler) => {
      this.secProjeler = d;
    });
  }


  ProjeDuzenle(kayit: Projeler) {
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
        kayit.projeFiyat = d.projeFiyat;
        kayit.projeAciklama = d.projeAciklama;
        kayit.projeGorsel = d.projeGorsel;
        kayit.projeKatId = d.projeKatId;
        this.apiServis.ProjelerDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.ProjeGetir();
          }
        });
      }
    });
  }


  Sil(kayit: Projeler) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
      kayit.projeAdi +
      '  Proje Silinecektir Onaylıyor Musunuz?';

    this.confirmdialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.ProjelerSil(kayit.projeId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.ProjeGetir();
          }
        });
      }
    });
  }
}
