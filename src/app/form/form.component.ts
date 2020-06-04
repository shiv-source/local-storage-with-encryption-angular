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
  dataarray: any = [];
  getlocalstoragedata: string[];
  displaydata: string;
  ciphertext: any;
  id: any;
  tempdata: any;
  allData: Storage;
  key = 'secret key 123';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      meetingDate: ['', Validators.required],
      meetingStartTime: ['', Validators.required],
      meetingEndTime: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  encryptdata(newname, newmeetingDate, newmeetingStartTime, newmeetingEndTime) {
    let key = 'key';
    this.savedvalue = CryptoJS.AES.encrypt(newname.trim(),
      newmeetingStartTime.trim(),
      newmeetingEndTime.trim(),
      newmeetingDate.trim(), key).toString();
    console.log(this.savedvalue);
    this.dataarray.push(this.savedvalue);
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
    const data = {
      newname: newname,
      newmeetingDate: newmeetingDate,
      newmeetingStartTime: newmeetingStartTime,
      newmeetingEndTime: newmeetingEndTime
    }

    this.ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
    const i = this.rnd(10, 4000);
    const id = 'id' + i;
    this.id = id;
    localStorage.setItem(this.id, this.ciphertext);
  }
  rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  clear() {
    this.registerForm.value.fullName = '';
    this.registerForm.value.meetingDate = '';
    this.registerForm.value.meetingEndTime = '';
    this.registerForm.value.meetingStartTime = '';
  }


  decryptdata() {
    for (let i = 0; i < localStorage.length; i++) {
      this.tempdata = localStorage.key(i);
      this.ciphertext = localStorage.getItem(this.tempdata);
      const bytes = CryptoJS.AES.decrypt(this.ciphertext, this.key);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      console.log("Decrypted data is", decryptedData);
    }

  }
}
