const fs = require('fs')
let heroes = require('./prepare-heroes.json')

const dictionary = 117;

for (let i = 0; i < heroes.length; i++) {
  heroes[i].mask = getMask(i, 117)
}

function getMask(number, dict) {
  let array = []
  for (let i = 0; i < dict; i++) {
    if (i === number) array.push(1)
    else              array.push(0)
  }

  return array
}

fs.writeFile('./prepare-heroes.json', JSON.stringify(heroes))
