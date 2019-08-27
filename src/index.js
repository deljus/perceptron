// @flow
import {Matrix} from './core/matrix';
import ACTIVATION from './core/activation';
import type {MatrixType} from './core/matrix/matrix';

type Schema = Array<number>;
type WeightMatrix = Array<MatrixType>;

type PerceptronType = {
  weightMatrix?: Array<MatrixType>,
  schema?: Schema,
  epoch?: number,
  activation?: {
    fn: Function,
    dfn: Function,
  }
}

const createRandomWeightMatrix = (schema: Schema): WeightMatrix  =>
  schema.map((num, i) => {
    if(i === 0){
      return Matrix.createRandomMatrix(num, num);
    }
    return Matrix.createRandomMatrix(num, schema[i-1])
  });

const createWeightMatrix = (data: WeightMatrix): WeightMatrix => data.map(dt => new Matrix(dt));


class Neuron{
  weightMatrix: Array<MatrixType>;
  epoch: number;
  activation: {
    fn: Function,
    dfn: Function,
  };

  constructor({weightMatrix, schema, activation, epoch }: PerceptronType) {
    this.weightMatrix =
            (weightMatrix && createWeightMatrix(weightMatrix)) ||
            (schema && createRandomWeightMatrix(schema)) ||
            createRandomWeightMatrix([3,1]);
    this.activation = activation || ACTIVATION.SIGMOID;
    this.epoch = epoch || 1;
  }

  get weight() {
    return this.weightMatrix;
  }

  set setEpoch(epoch){
    this.epoch = epoch;
  }

  result(data: Matrix) {
    return this.weightMatrix.reduce((acc: Matrix, layer: Matrix) =>
      acc.dot(layer.T).deepMap(this.activation.fn)
    , data);
  }

  // learn({ input, output }){
  //   const outputMatrix = new Matrix(...output);
  //   for (let i = 0; i < this.epoch; i++) {
  //     const results = this.result(input);
  //     //const err = outputMatrix.sub(results);
  //     this.weightMatrix
  //       .reverse()
  //   }
  // }
}

const neuron = new Neuron({ schema: [3,1] });
console.log(neuron.result([[1,2,3]]));

