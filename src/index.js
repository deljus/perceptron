// @flow
import { Matrix } from './core/matrix';
import ACTIVATION from './core/activation';
import dataSet from './data';

const createRandomWeightMatrix = (schema) =>
  schema.map((num, i) => {
    if(i === 0){
      return Matrix.createRandomMatrix(num, num);
    }
    return Matrix.createRandomMatrix(num, schema[i-1])
  });

const createWeightMatrix = (data) => data.map(dt => new Matrix(dt));


class Neuron {
  constructor({weightMatrix, schema, activation, epoch }) {
    this.weightMatrix =
            (weightMatrix && createWeightMatrix(weightMatrix)) ||
            createRandomWeightMatrix(schema);
    this.activation = activation || ACTIVATION.SIGMOID;
    this.epoch = epoch || 1;
  }

  get weight() {
    return this.weightMatrix;
  }

  set setEpoch(epoch){
    this.epoch = epoch;
  }

  result(data) {
    const newData = new Matrix(...data);
    const matrix = this.weightMatrix.reduce((acc, layer) =>
      acc.dot(layer.T).deepMap(this.activation.fn)
    , newData);
    return matrix;
  }

  learn({ input, output }){
    const outputMatrix = new Matrix(...output);
    for (let i = 0; i < this.epoch; i++) {
      const results = this.result(input);
      const err = outputMatrix.sub(results);
      this.weightMatrix
        .reverse()
        .forEach(elem =>
        {}
        );
    }
  }
}

const neuron = new Neuron({ schema: [3,1] });
neuron.learn(dataSet);
console.log(neuron.result([[1,2,3]]));

