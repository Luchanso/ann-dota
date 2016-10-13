const synaptic = require('synaptic')

const Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect

let network = new Architect.Perceptron(6, 3, 1)

let hero1 = [1, 0, 0]
let hero2 = [0, 1, 0]
let hero3 = [0, 0, 1]

let trainingSet = [{
    input: hero1.concat(hero2),
    output: [1]
  }, {
    input: hero2.concat(hero3),
    output: [1]
  }, {
    input: hero3.concat(hero1),
    output: [1]
  }, {
    input: hero1.concat(hero3),
    output: [0]
  }, {
    input: hero2.concat(hero1),
    output: [0]
  }, {
    input: hero3.concat(hero2),
    output: [0]
  }
]


let trainer = new Trainer(network)
trainer.train(trainingSet)

console.log(network.activate(hero1.concat(hero2)))
console.log(network.activate(hero1.concat(hero3)))
console.log(network.activate(hero3.concat(hero1)))
