import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-react-form',
  templateUrl: './react-form.component.html',
  styleUrls: ['./react-form.component.scss'],
})
export class ReactFormComponent  implements OnInit {
  @Input() form!: FormGroup;

  ngOnInit() {}

  hasErrorCols():boolean {
    if (this.form.controls['cols'].hasError('required')
          || this.form.controls['cols'].hasError('min')
          || this.form.controls['cols'].hasError('max'))
        {
          return true;
        }
    return false;
  }

  hasErrorRows():boolean {
    if (this.form.controls['rows'].hasError('required')
          || this.form.controls['rows'].hasError('min')
          || this.form.controls['rows'].hasError('max'))
        {
          return true;
        }
    return false;
  }

  printErrorRows():string {
    let errorMsg: string = ''
    if (this.form.controls['rows'].hasError('required')){
      errorMsg = 'Кількість рядків повинно бути вказеною';
    } else if (this.form.controls['rows'].hasError('min')){
      errorMsg = 'Кількість рядків повинно бути більше 0';
    } else if (this.form.controls['rows'].hasError('max')){
      errorMsg = 'Кількість рядків повинно бути менше 11';
    }
    return errorMsg;
  }

  printErrorCols():string {
    let errorMsg: string = ''
    if (this.form.controls['cols'].hasError('required')){
      errorMsg = 'Кількість рядків повинно бути вказеною';
    } else if (this.form.controls['cols'].hasError('min')){
      errorMsg = 'Кількість рядків повинно бути більше 0';
    } else if (this.form.controls['cols'].hasError('max')){
      errorMsg = 'Кількість рядків повинно бути менше 11';
    }
    return errorMsg;
  }
}

