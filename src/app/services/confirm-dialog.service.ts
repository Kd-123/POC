import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementComponent } from '../announcement/announcement.component';


@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private _dialog: MatDialog) { }
  
  openConfirmDialog(msg:string) {
    return this._dialog.open(AnnouncementComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
      data: {
        message: msg
      }
    });
  }
}
