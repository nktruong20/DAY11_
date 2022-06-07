import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  submitted:boolean = false;
  formContact :FormGroup = new FormGroup ({
    name:new FormControl('',[Validators.required,Validators.minLength(6)]),
    image:new FormControl('',[Validators.required]),
    price: new FormControl('',Validators.min(1000)),
    salePrice :new FormControl('',[Validators.required,Validators.min(0)]),
    description:new FormControl('',[Validators.required,Validators.minLength(20)]),
  });

  contactData:any=[];

  constructor() { 
   
  }
  getIn4(){
    let jsonString = localStorage.getItem('contact-data');
    if(jsonString == null || jsonString == ''){
      this.contactData = [];
    }else{
      this.contactData = JSON.parse(jsonString);
    }
   
  }

  ngOnInit(): void {
    this.getIn4();
   
  }
  
  

  submitForm():any{
    this.submitted = true;
    if(this.formContact.invalid){ return}
    let formData = this.formContact.value;
    this.contactData.push(formData);
    let jsonString = JSON.stringify(this.contactData);
    localStorage.setItem('contact-data',jsonString);
    this.formContact.reset();

  }
  get f():any{
    return this.formContact.controls;
  }

}
