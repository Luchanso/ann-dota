const synaptic = require('synaptic')
const Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect

const heroes = require('./prepare-heroes.json')
const trainingSet = require('./training-data.json')

let network = new Architect.Perceptron(117, 117, 117)
let trainer = new Trainer(network)
let rate = 0.9

trainer.train(data, {
  iterations: 30000,
  log: 1,
  error: 0.1
  // rate
})

let hero = getByName('Sand King')
let hero2 = getByName('Abaddon')

const input = hero.concat(hero2)
let result = network.activate(hero.input)
console.log(result)

function getByName(name) {
  for (let hero of heroes) {
    if (hero.name === name) return hero
  }
}
