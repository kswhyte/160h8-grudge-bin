// const socket = io()
const $grudgeForm = $('#grudge-form')
const $grudgeList = $('#grudge-list')
const $jackalName = $('#grudge-person')
const $grudgeOffense = $('#grudge-offense')
const $grudgeDate = $('#grudge-date')

const $totalJackals = $('#total-jackals')
const $totalJackalsUnforgiven = $('#total-jackals-unforgiven')
const $totalJackalsForgiven = $('#total-jackals-vindicated')

$(document).ready(() => {
  $.get('/api/v1/grudges')
    .then(grudges => {
      if (grudges.length > 0) {
        grudges.forEach(grudge => {
          $grudgeList.append(`
            <li>
              <a class="grudge-name-link" href="/grudges/?grudgeID=${grudge.id}">
                ${grudge.jackalName}
              </a>
            </li>
            <li>
              <p class="grudge-crime-time">Crime time: ${grudge.offenseDate}</p>
            </li>
          `)
        })
      }
    })
})

$grudgeForm.on('submit', (e) => {
  e.preventDefault()

  const grudgeDetails = {
    id: Date.now(),
    jackalName: $jackalName.val(),
    offense: $grudgeOffense.val(),
    offenseDate: $grudgeDate.val(),
    forgiven: false
  }

  postGrudges(grudgeDetails)
  resetInputs()
})

const postGrudges = (grudgeDetails) => {
  $grudgeList.text('')

  $.post('/grudges', grudgeDetails)
  .then(grudgeDetails => {
    grudgeDetails.forEach(grudge => {
      $grudgeList.append(`
        <li>
          <a class="grudge-name-link" href="/jackal/?grudgeID=${grudge.id}">
            ${grudge.jackalName}
          </a>
        </li>
        <li>
          <p class="grude-crime-time">Crime time: ${grudge.offenseDate}</p>
        </li>
      `)
    })
  })
}

const resetInputs = () => {
  $jackalName.val('')
  $grudgeOffense.val('')
}
