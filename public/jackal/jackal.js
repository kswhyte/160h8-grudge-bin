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
      toggleGrudgeBtnText(JSON.parse(grudge.forgiven))
    })
}

const renderGrudgeDetails = (grudge) => {
  let grudgeStatus = tailorGrudgeStatus(grudge.forgiven)
  let grudgeStatusStatement = `${grudge.jackalName} is currently ${grudgeStatus}`

  $grudgeName.append(`<h1 class='grudge-detail'>${grudge.jackalName}</h1>`)
  $grudgeOffense.append(`<p class='grudge-detail'>${grudge.offense}</p>`)
  $grudgeForgiven.append(`<p class='grudge-detail forgiven-status'><span id='grudge-status-statement'>${grudgeStatusStatement}</span></p>`)
}

$toggleGrudgeBtn.on('click', (e) => {
  e.preventDefault()
  editJackal()
})

const editJackal = () => {
  let grudgeID = getParameterByName('grudgeID')

  $.ajax({
    method: "PATCH",
    url: `/api/v1/grudges/${grudgeID}`,
    async: true,
    dataType: "json"
  })
    .then(grudge => {
      renderGrudgeUpdate(grudge)
      toggleGrudgeBtnText(JSON.parse(grudge.forgiven))
    })
}

const renderGrudgeUpdate = (grudge) => {
  let grudgeStatus = tailorGrudgeStatus(grudge.forgiven)
  let grudgeStatusStatement = `${grudge.jackalName} is currently ${grudgeStatus}`

  $('.forgiven-status').empty()
  // $grudgeForgiven.html(`<div id='grudge-forgiven' class='grudge-status-root'>To Forgive...or NOT to forgive...</div>`)
  $grudgeForgiven.append(`<p class='grudge-detail forgiven-status'><span id='grudge-status-statement'>${grudgeStatusStatement}</span></p>`)
}

const toggleGrudgeBtnText = (grudgeForgiven) => {
  console.log(grudgeForgiven)
  if (grudgeForgiven == true) {
    $toggleGrudgeBtn.text('Keep your Grudge')
  }
  else {
    $toggleGrudgeBtn.text('Forgive the Monster')
  }
}
