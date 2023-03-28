import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { customValidator } from '../customValidator';
import { formatDate } from '@angular/common';
import { Announcement } from '../announcement';

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.css']
})
export class EditAnnouncementComponent implements OnInit {

  editAnnouncement!: FormGroup;

  title: string | undefined;
  description: string |undefined;
  startdate: Date | undefined;
  enddate!: Date | undefined;

  array: Array<Announcement> | undefined;
  data: Announcement | undefined;

  id: any;
  minDate: any;
  constructor(private activatedRoute : ActivatedRoute ,@Inject(LOCALE_ID) public locale: string, private router:Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.array = JSON.parse(localStorage.getItem("announcements") || "[]");
    this.data = this.getObjectWithId(this.array, this.id);

    this.title = this.data?.title;
    this.description = this.data?.description;
    this.startdate = this.data?.startdate;
    this.enddate = this.data?.enddate;

    const today = new Date();

    const curr = formatDate(today, 'yyyy-MM-dd', this.locale);
    this.minDate = curr;

    this.editAnnouncement = new FormGroup({
      id: new FormControl(),
      title: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      description: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      startdate: new FormControl("", [Validators.required]),
      enddate: new FormControl("", [Validators.required])
    },
      {
        validators: [customValidator.DateValidation]
      }
    );

    this.editAnnouncement.setValue({
      id: this.id,
      title: this.title,
      description: this.description,
      startdate: this.startdate,
      enddate:this.enddate
    })
  }

  get Id():FormControl {
    return this.editAnnouncement.get("id") as FormControl ;
  }

  get Title(): FormControl {
    return this.editAnnouncement.get("title") as FormControl;
  }

  get Description(): FormControl {
    return this.editAnnouncement.get("description") as FormControl;
  }

  get StartDate(): FormControl {
    return this.editAnnouncement.get("startdate") as FormControl;
  }

  get EndDate(): FormControl {
    return this.editAnnouncement.get("enddate") as FormControl;
  }

  Edit() {
    this.array = this.removeObjectWithId(this.array, this.id);
    this.array?.push(this.editAnnouncement.value);
    localStorage.setItem("announcements", JSON.stringify(this.array));

    
    let array2: Announcement[] = [];
    array2 = JSON.parse(sessionStorage.getItem("announcements") || "[]");
      array2= this.removeObjectWithId(array2, this.id);
    array2?.push(this.editAnnouncement.value);
    sessionStorage.setItem("announcements", JSON.stringify(array2));

    this.router.navigate(['dashboard/announcement']);
  }

  getObjectWithId(arr: any, id: number) {
    const objWithIdIndex = arr.findIndex((obj: { id: number; }) => obj.id === id);
    return arr[objWithIdIndex];
  }

  removeObjectWithId(arr: any, id: number) {
    const objWithIdIndex = arr.findIndex((obj: { id: number; }) => obj.id === id);
    arr.splice(objWithIdIndex, 1);
    return arr;
  }
}
