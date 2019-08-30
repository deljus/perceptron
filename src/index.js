// @flow
import {Matrix} from './core/matrix';
import ACTIVATION from './core/activation';
import { input, output } from './data';
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


class Neuron {
  weightMatrix: Array<MatrixType>;
  epoch: number;
  activation: {
    fn: Function,
    dfn: Function,
  };

  constructor({weightMatrix, schema, activation, epoch}: PerceptronType) {
    this.weightMatrix =
        (weightMatrix && createWeightMatrix(weightMatrix)) ||
        (schema && createRandomWeightMatrix(schema)) ||
        createRandomWeightMatrix([3, 1]);
    this.activation = activation || ACTIVATION.SIGMOID;
    this.epoch = epoch || 100000;
  }

  get weight() {
    return this.weightMatrix;
  }

  set setEpoch(epoch) {
    this.epoch = epoch;
  }

  result(data: Matrix) {
    const steps = new Matrix(data);
    const result = this.weightMatrix.reduce((acc: Matrix, layer: Matrix) => {
      const res = acc.dot(layer.T).deepMap(this.activation.fn);
      steps.push(res);
      return res;
    }, data);
    return {data: result, steps: steps.slice(0, -1)}
  }

  learn(input: Matrix, output: Matrix) {
    for (let i = 0; i < this.epoch; i++) {
      const {data, steps} = this.result(input);
      const divergence = output.sub(data);

      this.weightMatrix.reduceRight((acc: Matrix, layer: Matrix, i: number) => {
        const dResult = (steps[i + 1] || data).deepMap(this.activation.dfn);
        const sigma = acc.multi(dResult);
        // $FlowFixMe
        this.weightMatrix[i] = this.weightMatrix[i].add(steps[i].T.dot(sigma).T);

        return sigma.dot(this.weightMatrix[i]);
      }, divergence);
    }
  }
}



const learnData = new Matrix(...input);
const learnResults = new Matrix(...output);

const neuron = new Neuron({ schema: [3,3,1] });
neuron.learn(learnData, learnResults);

const data = new Matrix([1,0,0]);
const r = neuron.result(data);
console.log(r.data);

