const synaptic = require('synaptic')
const agregateData = require('./agregate.v2.js')
const fs = require('fs')

const Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect

const heroes = require('./prepare-heroes.json')

let networkImport = fs.readFileSync('network.ann')
let network = Network.fromJSON(JSON.parse(networkImport))
let rate = 0.2

let hero1 = getByName('Pugna')
let hero2 = getByName('Huskar')

let input = hero1.mask.concat(hero2.mask)
let input2 = hero2.mask.concat(hero1.mask)

// console.log(network.activate(input))
console.log(network.activate(input))
// network.propagate(rate, [0])
// console.log(network.activate(input))
console.log(network.activate(input2))
network.propagate(rate, [1])
console.log(network.activate(input2))
console.log(network.activate(input))

function getByName(name) {
  for (let hero of heroes) {
    if (hero.name === name) return hero
  }
}
