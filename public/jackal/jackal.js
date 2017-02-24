// const socket = io();
const $homeBtn = $('#home-btn')
const $grudgeName = $('#grudge-name')
const $grudgeOffense = $('#grudge-offense')
const $grudgeForgiven = $('#grudge-forgiven')
const $toggleGrudgeBtn = $('#toggle-grudge-btn')

$homeBtn.on('click', () => {
  window.location = '/'
})


$(document).ready(() => {
  let grudgeID = getParameterByName('grudgeID')
  fetchGrudgeDetails(grudgeID)
})

const getParameterByName = (name, url) => {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const fetchGrudgeDetails = (grudgeID) => {
  $.get(`/api/v1/grudges/${grudgeID}`)
    .then(grudge => {
      renderGrudgeDetails(grudge)
    })
}

const renderGrudgeDetails = (grudge) => {
  let grudgeStatus = tailorGrudgeStatus(grudge.forgiven)
  let grudgeStatusStatement = `${grudge.jackalName} is currently ${grudgeStatus}`

  $grudgeName.append(`<h1 class='grudge-detail'>${grudge.jackalName}</h1>`)
  $grudgeOffense.append(`<p class='grudge-detail'>${grudge.offense}</p>`)
  $grudgeForgiven.append(`<p class='grudge-detail'><span id='grudge-status-statement'${grudgeStatusStatement}</span</p>`)
}

const tailorGrudgeStatus = (grudgeForgiven) => {
  if (grudgeForgiven == true) {
    return 'FORGIVEN'
  } else {
    return 'NOT FORGIVEN'
  }
}

$toggleGrudgeBtn.on('click', () => {
  editJackal()
  if ($toggleGrudgeBtn.text() == 'Forgive the Monster') {
    $toggleGrudgeBtn.text('Keep your Grudge')
  }
  else {
    $toggleGrudgeBtn.text('Forgive the Monster')
  }
})

const editJackal = () => {
  let grudgeID = getParameterByName('grudgeID')
  $.post(`/api/v1/grudges/${grudgeID}`)
    // .then(grudges => {
    //   grudges.map(grudge => {
    //     if (grudge.id == grudgeID) {
    //       !grudge.forgiven
    //     }
    //   })
    //   console.log('grudge', grudge)
    // })
}
