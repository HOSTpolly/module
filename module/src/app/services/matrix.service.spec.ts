import { TestBed } from '@angular/core/testing';
import { MatrixService } from './matrix.service';
import { of } from 'rxjs';

describe('MatrixService', () => {
  let service: MatrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Перевірка середнього значення заданої матриці', (done)=>{
   const matrix =[
    [1,3,54],
    [32,5,12],
    [5,8,7],
    [11,10,39]
   ];

   const matrix$ = of(matrix);

   service.getMiddleAndAverage(matrix$).subscribe(averageNumber =>{
    expect(averageNumber).toBe(13.3);
    done();
   });
  });

  it('Перевірка перетворення першого рядка', (done)=>{
    
    const matrix =[
      [1,3,54],
      [32,5,12],
      [5,8,7]
     ];
     const t =13.3;
     const t$ = of(t)
     const matrix$ = of(matrix)
 
    service.getAddT(matrix$,t$).subscribe(average =>{
     expect(average).toEqual([
      [14.3,16.3,67.3],
      [32,5,12],
      [5,8,7]
     ]);
     done();
    });
   });
  
});
