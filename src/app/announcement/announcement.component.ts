import {
  Component, OnInit, Inject,
  LOCALE_ID
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Announcement } from '../announcement';
import { customValidator } from '../customValidator';
import { formatDate } from '@angular/common';
import { NgxConfirmBoxService } from 'ngx-confirm-box';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  id: number = 0;
  title: string = "";
  description: string = "";
  startdate: Date = new Date();
  enddate:Date = new Date();

  successAlert = false;
  successMessage = "";
  errorMessage = "";

  visible = true;
  dismissible = true;

  dangerAlert = false;

  list: any;
  data: Array<Announcement> = [];
  dataSearch: Array<Announcement> = [];

  minDate: any;

  announcement: any;
  announcements: Array<Announcement> = [];
  constructor(@Inject(LOCALE_ID) public locale: string, private confirmBox: NgxConfirmBoxService, private api: ApiService) {

    this.announcements = JSON.parse(localStorage.getItem('announcements') || "[]");
  }

  bgColor = 'rgba(5,6,8,0.6)'; // overlay background color
  confirmHeading = '';
  confirmContent = "Are you sure want to delete this Announcement?";
  confirmCanceltext = "Cancel";
  confirmOkaytext = "Okay";

  addAnnouncement !: FormGroup;
  EditAnnouncement !: FormGroup;

  ngOnInit(): void {

    const today = new Date();

    const curr = formatDate(today, 'yyyy-MM-dd', this.locale);
    this.minDate = curr;

    this.api.getAnnouncement().subscribe((d) => {
      console.log(d);
      this.list = d;
      this.announcements = this.list;
    })



    this.addAnnouncement = new FormGroup({
      // id: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
      title: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      description: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      startdate: new FormControl("", [Validators.required]),
      enddate: new FormControl("", [Validators.required])
    },
      {
        validators: [customValidator.CheckUniqueId, customValidator.DateValidation]
      }
    );
  
    this.EditAnnouncement = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      description: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      startdate: new FormControl("", [Validators.required]),
      enddate: new FormControl("", [Validators.required])
    },
    {
      validators: [customValidator.CheckUniqueId, customValidator.DateValidation]
      }
    );
  }
 

  get Title(): FormControl {
    return this.addAnnouncement.get("title") as FormControl;
  }

  get Description(): FormControl {
    return this.addAnnouncement.get("description") as FormControl;
  }

  get StartDate(): FormControl {
    return this.addAnnouncement.get("startdate") as FormControl;
  }

  get EndDate(): FormControl {
    return this.addAnnouncement.get("enddate") as FormControl;
  }

  Add() {

    this.announcement = this.addAnnouncement.value;
    this.api.addAnnouncement(this.announcement).subscribe(a => this.announcements.push(a));

  }

  removeObjectWithId(arr: any, id: number) {
    const objWithIdIndex = arr.findIndex((obj: { id: number; }) => obj.id === id);
    console.log(objWithIdIndex);
    arr.splice(objWithIdIndex, 1);
    return arr;
  }

  deleteAnnouncement(id: number) {
    this.id = id;
    this.confirmBox.show();
  }

  confirmChange(showConfirm: boolean) {
    if (showConfirm) {
      
      this.api.deleteAnnouncement(this.id).subscribe();

      this.successAlert = true;
      this.successMessage = "Announcement Deleted Successfully";
      alert("Announcement Deleted Successfully")
      window.location.reload();
    }
  }

  Edit() {
    this.api.updateAnnouncement(this.id, this.EditAnnouncement.value).subscribe();
    setTimeout( () => window.location.reload(),1500);
  }

  sendData(a: Announcement) {

    this.id = a.id;
    this.EditAnnouncement.setValue({
      title: a.title,
      description: a.description,
      startdate : a.startdate,
      enddate : a.enddate
    })
  }
}
