import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, FormBuilder  } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-matrix-form',
  templateUrl: './matrix-form.component.html',
  styleUrls: ['./matrix-form.component.scss']
})

export class MatrixFormComponent {

  @Input() matrixForm!: FormGroup;

  constructor() { }

  getArrays(formGroup: FormGroup): FormArray[] {
    const formArrays: FormArray[] = [];

    const formGroupValue = formGroup.getRawValue();
    const keys: string[] = []
    Object.keys(formGroupValue).forEach(key => {
      keys.push(key);
    });
    for (let key of keys) {
      formArrays.push(formGroup.get(key) as FormArray);
    }
  
    return formArrays;
  }

  getControls(array: FormArray): FormControl[] {
    const controls: FormControl[] = [];
    array.controls.forEach(control => {
      if (control instanceof FormControl) {
        controls.push(control);
      }
    });
    
    return controls;
  }

}
