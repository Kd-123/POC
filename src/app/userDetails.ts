
export class userDetails{
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    mobile: number = 0;
    gender: string = '';
    password: string = '';
    profilePic: string = '';

    userDetails() { }
    
    setuserDetails(firstName:string,lastName:string,email:string,mobile:number,gender:string,password:string,profilePic:string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobile = mobile;
        this.gender = gender;
        this.password = password;
        this.profilePic = profilePic;
    }

}