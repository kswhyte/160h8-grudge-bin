// const socket = io()
const $grudgeForm = $('#grudge-form')
const $grudgeList = $('#grudge-list')
const $jackalName = $('#grudge-person')
const $grudgeOffense = $('#grudge-offense')

// const connectedUsers = $('#connected-users-count')
// const statusMessage = $('#status-message')
// const buttons = document.querySelectorAll('#choices button')
// const voteResults = $('#vote-count')

// $(document).ready(() => {
//   $.get('/api/v1/grudges')
//     .then(grudges => {
//       if (grudges.length > 0) {
//         grudges.forEach(grudge => {
//           grudgeList.append(`
//             <li>
//               <a class="grudge-name-link" href="/grudges/?grudgeID=${grudge.id}">
//                 ${grudge.name}
//               </a>
//             </li>
//           `)
//         })
//       }
//     })
// })

// An id (Integer)
// The name of the person who wrong you (String)
// The offense that caused them to be dead to you (String)
// Whether or not you've forgiven (but not forgotten) them (Boolean)
// Date of offense

$grudgeForm.on('submit', (e) => {
  e.preventDefault()

  const grudgeDetails = {
    id: Date.now(),
    jackalName: $jackalName.val(),
    offense: $grudgeOffense.val(),
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
          <a class="grudge-name-link" href="/grudges/?grudgeID=${grudge.id}">
            ${grudge.jackalName}
          </a>
        </li>
        <li>
          <p>Crime time: ${grudge.id}</p>
        </li>
      `)
    })
  })
}

const resetInputs = () => {
  $jackalName.val('')
  $grudgeOffense.val('')
}
