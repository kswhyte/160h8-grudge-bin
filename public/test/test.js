describe('The makeGrudgeTemplate Function', ()=> {
  let grudge, $subject

  beforeEach(() => {
    grudge = {
      id: 11,
      jackalName: 'Joe',
      offenseDate: '2017-2-2',
      forgiven: false
    }

    let subject = makeGrudgeTemplate(grudge)
    $subject = $(subject)
  })

  it('generates a list element(s)', () => {
    $subject.is('li')
  })

  it('contains jackalName and id information', () => {
    let hasNameInSubjectText = $subject.text().indexOf(name) > 0
    let $idSpan = $subject.find('a.grudge-name-link')[0]

    expect(hasNameInSubjectText)
    expect($idSpan.id).to.equal(grudge.id.toString())
  })
})

describe('The checkWhoIsForgiven Function', ()=> {
  let grudgeDetails, subject

  beforeEach(() => {
    grudgeDetails = [
      { forgiven: "false",
        id: "1488224018292",
        jackalName: "Joe",
        offense: "hes an asshole",
        offenseDate: "2017-01-01" },

      { forgiven: "true",
        id: "1488224018292",
        jackalName: "Johnny",
        offense: "hes just such a dick",
        offenseDate: "2017-02-02" },

      { forgiven: "false",
        id: "1488224018292",
        jackalName: "Donald",
        offense: "hes a complete narcissist",
        offenseDate: "2016-12-07" },
    ]

    subject = checkWhoIsForgiven(grudgeDetails)
  })

  it('returns/counts all grudges that are unforgiven', () => {
    expect(subject).to.equal(2)
  })
})

describe('The tailorGrudgeStatus Function', ()=> {
  let forgiven1, forgiven2, subject1, subject2

  beforeEach(() => {
    forgiven1 = false
    forgiven2 = true

    subject1 = tailorGrudgeStatus(forgiven1)
    subject2 = tailorGrudgeStatus(forgiven2)
  })

  it('returns a human-readable alternative to the fogiven boolenan-status of FALSE', () => {
    expect(subject1).to.equal('NOT FORGIVEN')
  })

  it('returns a human-readable alternative to the fogiven boolenan-status of TRUE', () => {
    expect(subject2).to.equal('FORGIVEN')
  })
})
