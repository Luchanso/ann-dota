const synaptic = require('synaptic')
const fs = require('fs')

const Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect

const heroes = require('./prepare-heroes.json')
const trainingSet = require('./training-data.json')

let networkImport

try {
  networkImport = fs.readFileSync('network.ann')
}
catch (err) { }

let network = new Architect.Perceptron(heroes.length * 2, heroes.length, 1)
let trainer = new Trainer(network)
// let rate = 0.09

let startTrainingTime = Date.now()

if (networkImport) {
  network = Network.fromJSON(JSON.parse(networkImport))
} else {
  trainer.train(trainingSet, {
    log: 1,
    iterations: 5,
    shuffle: true
    // error: 0.1,
    // rate: rate
  })
}

console.log('Training time:', Date.now() - startTrainingTime, 'ms.')

let hero2 = getByName("Phoenix").mask
let hero1 = getByName("Pugna").mask

let input = hero1.concat(hero2)

console.log(network.activate(input))
// fs.writeFileSync('network.ann', JSON.stringify(network.toJSON()))
//
// let counter = 0
// for (let i = 0; i < trainingSet.length; i++) {
//   let result = network.activate(trainingSet[i].input)
//   if (Math.round(result[0]) === trainingSet[i].output[0]) counter++
//   console.log(result, trainingSet[i].output, Math.round(result[0]) === trainingSet[i].output[0])
//   fs.appendFile('result.json', JSON.stringify(result) + '\r\n')
// }
//
// console.log(counter / trainingSet.length * 100, '%')

function getByName(name) {
  for (let hero of heroes) {
    if (hero.name === name) return hero
  }
}
