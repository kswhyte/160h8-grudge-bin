const $grudgeForm = $('#grudge-form')
const $grudgeList = $('#grudge-list')
const $jackalName = $('#grudge-person')
const $grudgeOffense = $('#grudge-offense')
const $grudgeDate = $('#grudge-date')
const $searchFilter = $('#search-filter')
const $sortByNameBtn = $('#sort-by-name')
const $sortByDateBtn = $('#sort-by-date')

const $totalJackals = $('#total-jackals')
const $totalJackalsUnforgiven = $('#total-jackals-unforgiven')
const $totalJackalsForgiven = $('#total-jackals-vindicated')

$(document).ready(() => {
  $.get('/api/v1/grudges')
    .then(grudges => {
      modifyCounts(grudges)
      if (grudges.length > 0) {
        grudges.forEach(grudge => {
          renderGrudges(grudge)
        })
      }
    })
})

const renderGrudges = (grudge) => {
  $grudgeList.append(`
    <li>
      <a class='grudge-name-link' href='/jackal/?grudgeID=${grudge.id}'>
        ${grudge.jackalName}
      </a>
    </li>
    <li>
      <p class='grudge-crime-time'>Date of Horrid Act: ${grudge.offenseDate}</p>
    </li>
  `)
}

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
    modifyCounts(grudgeDetails)

    grudgeDetails.forEach(grudge => {
      renderGrudges(grudge)
    })
  })
}

const modifyCounts = (grudgeDetails) => {
  let totalJackals = grudgeDetails.length
  let totalJackalsUnforgiven = checkWhoIsForgiven(grudgeDetails)
  let totalJackalsForgiven = totalJackals - totalJackalsUnforgiven

  $totalJackals.text(`Total jackals on your Most-Hated list: ${totalJackals}`)
  $totalJackalsUnforgiven.text(`Total arseholes left unforgiven: ${totalJackalsUnforgiven}`)
  $totalJackalsForgiven.text(`Total vindicated schmucks: ${totalJackalsForgiven}`)
}

const checkWhoIsForgiven = (grudgeDetails) => {
  let thoseUnforgiven = grudgeDetails.filter(grudge => {
    return grudge.forgiven == 'false'
  })
  return thoseUnforgiven.length
}

const resetInputs = () => {
  $jackalName.val('')
  $grudgeOffense.val('')
  $grudgeDate.val('')
}

$sortByNameBtn.on('click', (e) => {
  e.preventDefault()
  $grudgeList.empty()

  $.get('/api/v1/grudges')
    .then(grudges => {
      let grudgesByName = grudges.sort((a, b) => {
        let nameA = a.jackalName.toUpperCase()
        let nameB = b.jackalName.toUpperCase()

        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })

      grudgesByName.forEach(grudge => {
        renderGrudges(grudge)
      })
    })
})

$sortByDateBtn.on('click', (e) => {
  e.preventDefault()
  $grudgeList.empty()

  $.get('/api/v1/grudges')
    .then(grudges => {
      let grudgesByDate = grudges.sort((a, b) => {
        return a.offenseDate - b.offenseDate
      })

      grudgesByDate.forEach(grudge => {
        renderGrudges(grudge)
      })
    })
})
