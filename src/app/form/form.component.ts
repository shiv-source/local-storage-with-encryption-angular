import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
var CryptoJS = require("crypto-js");

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
  getlocalstoragedata:string[];
  displaydata: string;

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
        let key = 'key';
        this.savedvalue = CryptoJS.AES.encrypt(newname.trim(),
        newmeetingStartTime.trim(),
        newmeetingEndTime.trim(),
        newmeetingDate.trim(),key).toString();
        console.log(this.savedvalue);
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
  decryptdata(){
    let key = 'key'
    this.displaydata = JSON.parse(localStorage.getItem('data'));
    console.log(typeof this.displaydata[0]);
    let rawvalue = 'U2FsdGVkX1+tAM1i1tukL1ckuk1i0t78zTuH599QJcc=';
    //let rawvalue =this.displaydata[0];
    this.getlocalstoragedata = CryptoJS.AES.decrypt(rawvalue,key).words.toString(CryptoJS.enc.Utf8);
    console.log(this.getlocalstoragedata);
  }
}
