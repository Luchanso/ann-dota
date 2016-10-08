const fs = require('fs')
let heroes = require('./prepare-heroes.json')

for (let i = 0; i < heroes.length; i++) {
  heroes[i].output = getCounterHeroMask(heroes[i].counter)
  heroes[i].input = heroes[i].mask
}

for (let h of heroes) {
  delete h.mask
  delete h.link
}

fs.writeFile('heroes.json', JSON.stringify(heroes))

function getCounterHeroMask(counter) {
  for (let h of heroes) {
    if (h.name == counter) {
      return h.mask
    }
  }
  console.log('Not found', counter)
}
