import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class customValidator{

  static MustMatch(control: AbstractControl): ValidationErrors | null{

    const pass = control.get('pwd')?.value;
    const rpass = control.get('rpwd')?.value;
    return pass && rpass && pass === rpass ? null : { passwordMistmatch: true };

  };

  static DateValidation(control: AbstractControl): ValidationErrors | null{
    const sdate = new Date(control.get('startdate')?.value);
    const edate = new Date(control.get('enddate')?.value);

    return sdate && edate && sdate < edate ? null : { wrongdate: true };
  }

  static CheckUniqueId(control: AbstractControl): ValidationErrors | null{
    const id = control.get('id')?.value;
    //console.log(id);
    var announcement = JSON.parse(localStorage.getItem("announcements") || "[]");
    for (var i = 0; i < announcement.length; i++){

     // console.log(id , announcement[i].id)
      if (announcement[i].id == id) {
        return { notUniqueId: true };
      } 
    }
    return null;
  }
}
 