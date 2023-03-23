import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ReactiveForm';
  reactiveForm: FormGroup;
  formStatus;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        firstname: new FormControl(null,[Validators.required,this.noSpaceAllowed]),
        lastname: new FormControl(null,[Validators.required,this.noSpaceAllowed]),
        email: new FormControl(null,[Validators.required,Validators.email],this.emailNotAllowed),
      }),
      gender: new FormControl('male'),
      country: new FormControl('uz'),
      hobbies: new FormControl(null),
      skills: new FormArray([
        new FormControl(null,Validators.required)
      ])
    });

    // this.reactiveForm.get('personalDetails.firstname').valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    // this.reactiveForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // })

    this.reactiveForm.statusChanges.subscribe((value) => {
      console.log(value);
      this.formStatus = value;
    })
  }

  onSubmit() {
    console.log(this.reactiveForm);
  }

  addSkills() {
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null,Validators.required));
  }

  noSpaceAllowed(control:FormControl) {
    if(control.value != null && control.value.indexOf(' ') != -1) {
      return {noSpaceAllowed: true}
    }
    return null;
  }

  // custom async validator
  emailNotAllowed(control: FormControl): Promise<any> | Observable<any> {
    const response = new Promise((resolve,reject) => {
      setTimeout(() => {
        if(control.value === 'procademy@gmail.com') {
          resolve({emailNotAllowed: true})
        } else {
          resolve(null)
        }
      }, 5000);
    });
    return response;
  }

}
