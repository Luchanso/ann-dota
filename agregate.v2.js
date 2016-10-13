const Dota2Api = require('dota2-api')
const heroes = require('./prepare-heroes.json')
const config = require('./config.json')

let trainingSet = []

// API key
const da = Dota2Api.create(config.key)

function getData() {
  return getMatches()
    .then(checkResult)
    .then(agregateMatches)
    .then(createTrainingData)
}

function checkResult(data) {
  return new Promise((response, reject) => {
    if (!data.result) reject('Empty data from response API Dota 2')
    else response(data)
  })
}

function getMatches() {
  const options = {
    gmae_mode: 1,
    min_players: 10,
    skill: 3
  }

  return da.getMatchHistory(options)
}

function agregateMatches(data) {
  return new Promise((resolve, reject) => {
    const timeout = 175
    let promises = []
    let interval = 0
    let counter = 0

    for (let match of data.result.matches) {
      const options = {
        match_id: match.match_id
      }

      interval += timeout

      // if (interval > timeout * 1) break

      promises.push(new Promise((resolve, reject) => {
        setTimeout(() => {
          counter++
          console.log('Agregate...', counter)
          da.getMatchDetails(options)
            .then(resolve)
            .catch(reject)
        }, interval)
      }))
    }

    Promise.all(promises)
      .then(resolve)
      .catch(reject)
  })
}

function createTrainingData(data) {
  return new Promise((resolve, reject) => {
    let summaryData = []
    for (let match of data) {
      console.log('match_id', match.result.match_id)
      let trainingData = convertToTrainingData(
        match.result.players,
        match.result.radiant_win,
        match.result.match_id
      )
      summaryData = summaryData.concat(trainingData)
    }

    resolve(summaryData)
  })
}

function convertToTrainingData(players, radiantIsWin, matchId) {
  let dataArray = []

  for (let player of players) {
    for (let player2 of players) {
      if (player.hero_id === player2.hero_id) continue
      if (player.hero_id === 0 || player2.hero_id === 0) continue

      let hero = getHeroById(player.hero_id)
      let enemy = getHeroById(player2.hero_id)

      let data = {
        name: hero.name,
        enemy: enemy.name,
        input: hero.mask,
        match_id: matchId
      }

      if (player.player_slot < 128 && player2.player_slot > 127) {
        data.input = data.input.concat(getHeroById(player2.hero_id).mask)
        data.output = [radiantIsWin ? 1 : 0]
        dataArray.push(data)
      } else if (player.player_slot > 127 && player2.player_slot < 128) {
        data.input = data.input.concat(getHeroById(player2.hero_id).mask)
        data.output = [!radiantIsWin ? 1 : 0]
        dataArray.push(data)
      }
    }
  }

  return dataArray
}

function getHeroById(id) {
  for (let hero of heroes) {
    if (hero.id === id) {
      return hero
    }
  }
}

module.exports = getData
