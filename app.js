const synaptic = require('synaptic')
const Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect

const data = require('./heroes.json')

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
console.log(hero.name)
console.log(hero.counter)
let result = network.activate(hero.input)
// console.log(result)
console.log(findInCatalog(result.map(Math.round)).name)

function findInCatalog(rowData) {
  for (let hero of data) {
    let counter = 0;
    for (let i = 0; i < 117; i++) {
      if (hero.input[i] === rowData[i]) counter++
    }
    if (counter === 117) return hero
  }
}

function getByName(name) {
  for (let hero of data) {
    if (hero.name === name) return hero
  }
}
