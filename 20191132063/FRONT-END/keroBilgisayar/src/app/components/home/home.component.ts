import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { Projeler } from 'src/app/models/Projeler';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { GorselyukleDialogComponent } from '../dialogs/gorselyukle-dialog/gorselyukle-dialog.component';
import { ProjelerDialogComponent } from '../dialogs/projeler-dialog/projeler-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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

  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public alert: MyAlertService,
    public matDialog: MatDialog,
    public apiServis: ApiService
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
}
