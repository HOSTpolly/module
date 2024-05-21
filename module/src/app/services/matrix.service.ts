import { Injectable } from '@angular/core';
import { Observable, combineLatest, from, map, of, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  constructor() { }

  getRandomMatrix(rows: number, cols: number): Observable<number[][]>{
    return of(Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => Math.floor(Math.random() * 100))
    ));
  } 
  
  
  getMiddleAndAverage(matrix$: Observable<number[][]>): Observable<number> {
    return matrix$.pipe(
      map(matrix => {
        const rows = matrix.length;
        const cols = matrix[0].length;
  
        const middleRowIndex = Math.floor(rows / 2);
  
        let sum = 0;
        const endRow = rows % 2 === 0 ? middleRowIndex : middleRowIndex + 1;
        for (let i = endRow; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            sum += matrix[i][j];
          }
        }
          const averageNumber = sum / ((rows - endRow) * cols);
  
        return  parseFloat(averageNumber.toFixed(1));;
      })
    );
  }

  getAddT(matrix$: Observable<number[][]> , t$:Observable<number> ):  Observable<number[][]> {
    return combineLatest([matrix$, t$]).pipe(
      map(([matrix, t]) => {
        const rows = matrix.length;
        const cols = matrix[0].length;
        
        const middleRowIndex = Math.floor(rows / 2);
        for (let i = 0; i < middleRowIndex; i++) {
          for (let j = 0; j < cols; j++){
            matrix[i][j] += t;
          }
        }
  
        return matrix;
      })
    );
  }

}
