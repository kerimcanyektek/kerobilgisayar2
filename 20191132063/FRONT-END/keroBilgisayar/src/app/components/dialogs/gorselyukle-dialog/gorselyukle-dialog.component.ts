import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Projeler } from 'src/app/models/Projeler';
import { ProjelerGorsel } from 'src/app/models/ProjelerGorsel';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gorselyukle-dialog',
  templateUrl: './gorselyukle-dialog.component.html',
  styleUrls: ['./gorselyukle-dialog.component.css'],
})
export class GorselyukleDialogComponent implements OnInit {
  secilenGorsel: any;
  projelergorsel: ProjelerGorsel = new ProjelerGorsel();
  secProjeler: Projeler;
  constructor(
    public dialogRef: MatDialogRef<GorselyukleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) {
    this.secProjeler = this.data;
  }

  ngOnInit() {

  }

  GorselSec(e) {
    var gorseller = e.target.files;
    var gorsel = gorseller[0];

    var fr = new FileReader();
    fr.onloadend = () => {
      this.secilenGorsel = fr.result;
      this.projelergorsel.gorselData = fr.result.toString();
      this.projelergorsel.gorselUzanti = gorsel.type;
    };

    fr.readAsDataURL(gorsel);
  }


}
