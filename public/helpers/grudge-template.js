const makeGrudgeTemplate = (grudge) => {
  return (`
    <li>
      <a class='grudge-name-link' id='${grudge.id}' href='/jackal/?grudgeID=${grudge.id}'>
        ${grudge.jackalName}
      </a>
    </li>
    <li>
      <p class='grudge-crime-time'>Date of Horrid Act: ${grudge.offenseDate}</p>
    </li>
    <li>
      <p class='grudge-status'>Forgiven? ${grudge.forgiven}</p>
    </li>
  `)
}
