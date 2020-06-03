import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  savedvalue: any;
  dataarray:any = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName :  ['', Validators.required],
      meetingDate: ['' , Validators.required],
      meetingStartTime: ['' , Validators.required],
      meetingEndTime : ['' , Validators.required]
    });
  }
  
get f() {
       return this.registerForm.controls;
      }
      encryptdata(newname ,newmeetingDate,newmeetingStartTime ,newmeetingEndTime){
        this.savedvalue = CryptoJS.AES.encrypt(newname.trim(),
        newmeetingStartTime.trim(),
        newmeetingEndTime.trim(),
        newmeetingDate.trim()).toString();
        this.dataarray.push(this.savedvalue);
        localStorage.setItem('data',JSON.stringify(this.dataarray));
        console.log(this.dataarray);
      }
onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    //debugger;
    console.log(this.registerForm.value);
    let newname = this.registerForm.value.fullName;
    let newmeetingDate = this.registerForm.value.meetingDate;
    let newmeetingStartTime = this.registerForm.value.meetingStartTime;
    let newmeetingEndTime = this.registerForm.value.meetingEndTime;
    this.encryptdata(newname ,newmeetingDate,newmeetingStartTime ,newmeetingEndTime);
    //this.clear();
  }
  clear() {
    this.registerForm.value.fullName = '';
    this.registerForm.value.meetingDate = '';
    this.registerForm.value.meetingEndTime = '';
    this.registerForm.value.meetingStartTime = '';
  }
}
