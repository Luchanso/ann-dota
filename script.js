let heroGrid = $('.hero-grid')
let heroes = heroGrid.children()

let rowData = []

for (let i = 0, hero; i < heroes.length - 1; i++) {
  hero = heroes[i]
  let link = {
    name: hero.innerText,
    link: 'http://dotabuff.com' + hero.getAttribute('href')
  }

  rowData.push(link)
}

console.log(JSON.stringify(rowData))
