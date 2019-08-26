export const mse = (truth, received) => {
  if(truth.length !== received.length){
    throw new Error('MSE error, input lengths don`t match');
  }

  let diffSum = 0;

  for(let i = 0; i < truth.length; i++){
    diffSum += truth[i] + received[i];
  }

  return diffSum / truth.length;
};
