import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GlobalServiceService } from '../service/global-service.service';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private http:HttpService,private formbuilder:FormBuilder,private globalService:GlobalServiceService) { }
asUser:boolean=false;
asAdmin:boolean=false;
type:string='';
form:FormGroup;
adminForm:FormGroup;
  ngOnInit(): void {
    this.form=this.formbuilder.group({
      UniqueId:[,Validators.required],
       password:[,Validators.required],
 
     })
     this.adminForm=this.formbuilder.group({
      adminId:[,Validators.required],
       password:[,Validators.required],
 
     })
    this.asAdmin=false;
    this.asUser=false;
    this.route.queryParamMap.subscribe((arg: any) => {
      this.type = arg.params.as;

    });
  if(this.type=='user'){
this.asUser=true;

  }
  else if(this.type=='admin'){
    this.asAdmin=true;
      }
      else{
        this.router.navigateByUrl("");
        
      }

}

userLogin(){
  this.http.postRequest("http://localhost:8000/login",this.form.value).then((response:any)=>{
    if(response.user){
    alert("Login Successfully");
this.globalService.setInformation(response.user_id,response.user,this.form.value.UniqueId);
this.router.navigateByUrl("user/userDashboard");}
else{
  alert("Login Failed... Enter Correct Credentials");
}
  }).catch((err:HttpErrorResponse)=>{
    console.log(err);
  
  })

}
adminLogin(){
if(this.adminForm.value.adminId=='admin'&& this.adminForm.value.password=='admin' ){
  this.router.navigateByUrl("admin/adminDashboard");}
  else{
    alert("INVALID CREDENTIALS");
  }
}
back(){
  this.router.navigateByUrl("");
}
}
