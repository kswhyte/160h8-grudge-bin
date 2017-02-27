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
          let grudgeTemplate = makeGrudgeTemplate(grudge)
          $grudgeList.append(grudgeTemplate)
        })
      }
    })
})

const renderGrudges = (grudge) => {
  let grudgeTemplate = makeGrudgeTemplate(grudge)
  $grudgeList.append(grudgeTemplate)
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
      let grudgeTemplate = makeGrudgeTemplate(grudge)
      $grudgeList.append(grudgeTemplate)
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
        let grudgeTemplate = makeGrudgeTemplate(grudge)
        $grudgeList.append(grudgeTemplate)
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
        let grudgeTemplate = makeGrudgeTemplate(grudge)
        $grudgeList.append(grudgeTemplate)
      })
    })
})
