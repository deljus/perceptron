// @flow
import { isSameSizes, checkMultipleParams } from './decorators';

export type MatrixElemType = Array<number>
export type MatrixType = Array<MatrixElemType>

class Matrix extends Array {
  static createRandomMatrix(row: number , col: number): MatrixType {
    const matrix = [...Array(row)].map(
      () => [...Array(col)].map(() => Math.random())
    );
    return new Matrix(...matrix);
  }

  get T(): MatrixType {
    const matrix = this[0] 
      ? this[0].map((col, i) => [...this.map(row => row[i])])
      : [];
    return new Matrix(...matrix);
  }

  deepMap(callback: Function): MatrixType {
    return this.map((row, i) => row.map((el, k) => callback(el, i, k, row)));
  }

  mapped(callback: Function){
    return this.map((el, ...arg) => callback(new Matrix([...el]), ...arg))
  }

  // $FlowFixMe
  @isSameSizes
  add(matrix: MatrixType): MatrixType {
    return this.deepMap((el, i, k) => el + matrix[i][k])
  }

  // $FlowFixMe
  @isSameSizes
  sub(matrix: MatrixType): MatrixType {
    return this.deepMap((el, i, k) => el - matrix[i][k])
  }

  // $FlowFixMe
  @isSameSizes
  multi(matrix: MatrixType): MatrixType {
    return this.deepMap((el, i, k) => el * matrix[i][k])
  }

  // $FlowFixMe
  @checkMultipleParams
  dot(matrix: MatrixType): MatrixType {
    return this.map(
      (row) => [...matrix[0].map(
        (val, j) => row.reduce((sum, elm, k) => {
          return sum + (elm * matrix[k][j])
        }, 0)
      )]
    )
  }
}

export default Matrix;
