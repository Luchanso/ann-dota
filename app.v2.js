const synaptic = require('synaptic')
const agregateData = require('./agregate.v2.js')
const fs = require('fs')

const Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect

const heroes = require('./prepare-heroes.json')

let rate = 0.2
let networkImport

try {
   networkImport = fs.readFileSync('network.ann')
} catch(e) {
}

let network

if (networkImport) network = Network.fromJSON(JSON.parse(networkImport))
else network = new Architect.Perceptron(heroes.length * 2, heroes.length, 1)


agregateData()
  .then(activate)

function activate(data) {
  let correct = 0

  for (let i = 0; i < 100; i++) {
    let trainingItem = data[i]

    let result = network.activate(trainingItem.input)
    console.log(`Progress ${i} / ${data.length} correct: ${correct / i * 100} % [${Math.round(result[0])}][${trainingItem.output[0]}]`)

    network.propagate(rate, trainingItem.output)

    if (Math.round(result[0]) === trainingItem.output[0]) correct++
  }

  console.log('Finish')
  console.log('Correct', correct / data.length * 100, '%')

  fs.writeFileSync('network.ann', JSON.stringify(network.toJSON()))

  console.log('Saved in network.ann')

  hero1 
  hero2
}
