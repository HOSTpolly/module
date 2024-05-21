import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Observable, Subscription, of, switchMap } from 'rxjs';
import { MatrixService } from '../services/matrix.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{
    form: FormGroup;
    matrixForm: FormGroup;
    name1!:string;
    handInputMatrix$: Observable<number[][]> | undefined;
    handOutputMatrix$: Observable<number[][]> | undefined;
    handAverageNumber$: Observable<number> | undefined;
    inputMatrix$: Observable<number[][]> | undefined;
    outputMatrix$: Observable<number[][]> | undefined;
    averageNumber$: Observable<number> | undefined;

    isChecked: boolean = false;

    private formSub!: Subscription;
    private matrixSub!: Subscription;

    constructor(private fb: FormBuilder, private matrixService: MatrixService) { 
      this.form = this.fb.group({
        cols: [' ', [Validators.required, Validators.min(1), Validators.max(10)]],
        rows: [' ', [Validators.required, Validators.min(1), Validators.max(10)]]
      });

      this.matrixForm = this.fb.group({})
    }

      // this.inputMatrix$ = this.matrixService.getRandomMatrix(this.form.controls['rows'].value, this.form.controls['cols'].value);

  ngOnInit(): void {
    this.formSub = this.form.valueChanges.subscribe(value => {
      if (this.form.valid) {
        this.inputMatrix$ = this.matrixService.getRandomMatrix(value.rows, value.cols);
        this.averageNumber$ = this.matrixService.getMiddleAndAverage(this.inputMatrix$);
        this.outputMatrix$ = this.matrixService.getAddT(this.inputMatrix$, this.averageNumber$);
        this.generateMatrixForm(value.rows, value.cols);
      }
    });

    this.matrixForm.valueChanges.subscribe(object => {
      this.handInputMatrix$ = new Observable<number[][]>(observer => {
        const values = Object.keys(object).map(key => object[key]);
        observer.next(values);
      })
      this.handAverageNumber$ = this.matrixService.getMiddleAndAverage(this.handInputMatrix$);
      this.handOutputMatrix$ = this.matrixService.getAddT(this.handInputMatrix$, this.handAverageNumber$);
    })
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  generateMatrixForm(rows: number, cols: number): void {
    this.deleteAllControls();
  
    for (let i = 0; i < rows; i++) {
      let rowGroup = this.fb.array([]);
      for (let j = 0; j < cols; j++) {
        rowGroup.push(this.fb.control('0'));
      }
      this.matrixForm.addControl(i+'', rowGroup);
    }
  }

  deleteAllControls() {
    const formGroupControls = Object.keys(this.matrixForm.controls);
    const count = formGroupControls.length;
    for (let i = 0; i < count; i++){
      this.matrixForm.removeControl(i+'');
      console.log(this.matrixForm);
    }
  }

    hideTF!:boolean;
    hideRF!:boolean;
    selectedRadioItem:any;
    selectedRadioGroup:any;

    radioGroupChange(event:any) {
      console.log("radioGroupChange",event.detail);
      this.selectedRadioGroup = event.detail;

      if (this.selectedRadioGroup.value==1)
      {
        this.hideTF=true;this.hideRF=false;
      }
      else if (this.selectedRadioGroup.value==2)
      {
        this.hideTF=false;this.hideRF=true;
      }
      else
      {
        this.hideTF=false;this.hideRF=false;
      }
      console.log(this.selectedRadioGroup.value);
      } 
    }
    
