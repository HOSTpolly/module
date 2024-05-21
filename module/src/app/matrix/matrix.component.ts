import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})


export class MatrixComponent  implements OnInit {

  @Input() matrix$: Observable<number[][]> | undefined;

  ngOnInit() {}

}
