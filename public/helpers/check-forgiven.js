const checkWhoIsForgiven = (grudgeDetails) => {
  let thoseUnforgiven = grudgeDetails.filter(grudge => {
    return grudge.forgiven == 'false'
  })
  return thoseUnforgiven.length
}
