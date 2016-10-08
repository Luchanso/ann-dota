const request = require('request')
const fs = require('fs')
const jsdom = require('jsdom')
let rowHeroes = require('./row-heroes.json')

let promises = []
let counter = 0;

for (let hero of rowHeroes) {
  let promise = new Promise((resolve, reject) => {
    jsdom.env({
      url: hero.link,
      scripts: ["http://code.jquery.com/jquery.js"],
      done: (err, window) => {
        counter++
        console.log("Progress:", counter, '/ 112', hero.name)
        resolve(prepareHeroData(hero, window))
      }
    })
    // request(hero.link, (err, response, data) => {
    //   hero = prepareHeroData(data, hero)
    //   res(hero)
    // })
  })

  promises.push(promise)
}

Promise.all(promises)
  .then(heroes => {
    console.log('Writed in File')
    fs.writeFile('prepare-heroes.json', JSON.stringify(heroes))
  })
  .catch(err => {
    console.error(err)
  })

function prepareHeroData(hero, window) {
  const tableNumber = 2

  let jQuery = window.jQuery
  let heroName = jQuery(`table:eq(${tableNumber}) tbody tr:eq(0) td:eq(1) a`).text()
  hero.counter = heroName

  return hero
}
