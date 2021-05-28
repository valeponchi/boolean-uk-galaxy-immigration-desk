//  GLOBAL VARIABLES
const infoSection = document.querySelector(".info-section")
const listSection = document.querySelector(".list-section")
const actionSection = document.querySelector(".action-section")

//SET STATE FUNCTION
function setState (newState) {
  state = {...state, ...newState}
}

//STATE
let state = {
  planets: [],
  applicants: [],
  immigrationDetails: [],
  selectedApplicant: null,
}

//FETCH + RENDER
function getPeople() {
  fetch("https://swapi.dev/api/people")
    .then(response => response.json()) 

    .then(function (peopleFromServer) {
      state.applicants = peopleFromServer
      console.log(`state.applicants: `, state.applicants)
      //HERE WE HAVE THE PEOPLE-DATA
      render()
    })
}

getPeople()

//FUNCTIONS CREATE
function createList() {
  const listHeading = document.createElement("h2")
  listHeading.innerText = "Applicants"

  const applicantsList = document.createElement("ul")
  applicantsList.setAttribute("class", "applicant-list")

  listSection.append(listHeading, applicantsList)
}

function createListItem(applicant) {
  const applicantLi = document.createElement("li")
  applicantLi.setAttribute(`class`, `applicant`)
  applicantLi.innerText = applicant.name

  const viewButton = document.createElement("button")
  viewButton.setAttribute("class", "view-button")
  viewButton.innerText = "VIEW"

  viewButton.addEventListener("click", function () {
    state.selectedApplicant = applicant.name

    if (!state.planets.find( planet => planet.url === applicant.homeworld)) {
      findHomeworld(applicant)
    }

    let immigrationFormName = document.querySelector(`.immigration-form-name`)
    immigrationFormName.innerText = `Applicant Name: ${applicant.name}`
  })

  applicantLi.append(viewButton)

  return applicantLi
}

function createsListItems() {
  for (const applicant of state.applicants.results) {
    const applicantLi = createListItem(applicant)
    const applicantsList = document.querySelector(".applicant-list")
    applicantsList.append(applicantLi)
  }
}

function createInfoBox(applicant) {
  infoSection.innerHTML = ""
  const infoBox = document.createElement("div")
  infoBox.setAttribute(`class`, `info-box`)

  const boxTitle = document.createElement(`h2`)
  boxTitle.innerText = applicant.name

  const gender = document.createElement(`h3`)
  gender.innerText = `Gender: ${applicant.gender}`

  const DOB = document.createElement(`h3`)
  DOB.innerText = `D.O.B: ${applicant.birth_year}`

  const height = document.createElement("h3")
  height.innerText = `Height: ${applicant.height}`

  const mass = document.createElement("h3")
  mass.innerText = `Mass ${applicant.mass}`

  const homePlanet = state.planets.find(planet => planet.url === applicant.homeworld)
  const homeworld = document.createElement("h3")
  homeworld.innerText = `Homeworld: ${homePlanet.name}`

  infoBox.append(boxTitle, gender, DOB, height, mass, homeworld)
  infoSection.append(infoBox)
}

function createImmigrationForm() {
  //FORM TITLE
  const formTitle = document.createElement(`div`)
  formTitle.innerText = "IMMIGRATION FORM"
  
  //APPLICANT'S NAME (EMPTY at beginning)
  const immigrationFormName = document.createElement(`p`)
  immigrationFormName.setAttribute(`class`, `immigration-form-name`)
  immigrationFormName.innerText = "Applicant Name: " 
  
  //FORM
  const formEl = document.createElement(`form`)
  formEl.setAttribute(`class`, `immigration-form`)

  formEl.addEventListener("submit", function (event) {
    event.preventDefault()
    // console.log(`you submit it!`) //

    const newImmigrantDetails = {
      applicantName: state.selectedApplicant,
      destination: inputDestination.value,
      "travel-purpose": travelPurposeSelectEl.value,
      "terrorist-activity": formEl.terrorist.value,
    }
    
    state.immigrationDetails = newImmigrantDetails
    console.log(`state.immigrationDetails: `, state)

    // setState({
    //   immigrationDetails: [...state.immigrationDetails, newImmigrantDetails]
    // })

  })

  //DESTINATION SECTION
  const labelDestination = document.createElement(`label`)
  labelDestination.setAttribute(`for`, `destination-label`)
    const labelDestinationTitle = document.createElement(`h4`)
    labelDestinationTitle.innerText = "Destination:"

  const inputDestination = document.createElement(`input`)
  inputDestination.setAttribute(`id`, `destination-label`)
  inputDestination.setAttribute(`name`, `destination-label`)
  inputDestination.setAttribute(`type`, `text`)
  inputDestination.required = true
  
  //PURPOSE OF TRAVEL SECTION
  const labelPurposeTravel = document.createElement(`label`)
  labelPurposeTravel.setAttribute(`for`, `purpose-label`)
    const labelPurposeTravelTitle = document.createElement(`h4`)
    labelPurposeTravelTitle.innerText = "Purpose of travel:" 

  const travelPurposeSelectEl = document.createElement(`select`)
  travelPurposeSelectEl.setAttribute(`id`, `purpose-label`)
  travelPurposeSelectEl.setAttribute(`name`, `purpose-label`)

  let optionVacationEl = document.createElement(`option`)
  optionVacationEl.setAttribute(`value`, `vacation`)
  optionVacationEl.innerText = "Vacation"

  let optionBusinessEl = document.createElement(`option`)
  optionBusinessEl.setAttribute(`value`, `"business`)
  optionBusinessEl.innerText = "Business"

  //TERRORIST SECTION
  const terroristLabel = document.createElement("label")
  terroristLabel.setAttribute("for", "terrorist")
    const terroristLabelTitle = document.createElement(`h4`)
    terroristLabelTitle.innerText = "Terrorist activity: " 
  
     //YES RADIO BUTTON
  const terroristYesLabel = document.createElement("label")
  terroristYesLabel.setAttribute("for", "terrorist")
  terroristYesLabel.innerText = "Yes"
  
  const terroristYesInput = document.createElement("input")
  terroristYesInput.setAttribute("type", "radio")
  terroristYesInput.setAttribute("id", "terrorist")
  terroristYesInput.setAttribute("name", "terrorist")
  terroristYesInput.setAttribute("value", "Yes")
  
     //NO RADIO BUTTON
  const terroristNoLabel = document.createElement("label")
  terroristNoLabel.setAttribute("for", "terrorist")
  terroristNoLabel.innerText = "No"
  
  const terroristNoInput = document.createElement("input")
  terroristNoInput.setAttribute("type", "radio")
  terroristNoInput.setAttribute("id", "terrorist")
  terroristNoInput.setAttribute("name", "terrorist")
  terroristNoInput.setAttribute("value", "No")
  
  //ACCEPT BUTTON
  const acceptBtn = document.createElement("button")
  acceptBtn.setAttribute("class", "accept-button")
  acceptBtn.setAttribute("type", "submit")
  acceptBtn.innerHTML = `Accept &#x02192` 

  //APPEND SECTION
  terroristLabel.append(terroristLabelTitle)
  travelPurposeSelectEl.append(optionVacationEl, optionBusinessEl)
  labelPurposeTravel.append(labelPurposeTravelTitle)
  labelDestination.append(labelDestinationTitle)
  formEl.append(
    immigrationFormName, 
    labelDestination, 
    inputDestination, 
    labelPurposeTravel, 
    travelPurposeSelectEl,
    terroristLabel,
    terroristYesLabel,
    terroristYesInput,
    terroristNoLabel,
    terroristNoInput,
    acceptBtn
    )
  actionSection.append(formTitle, formEl)
}

//FUNCTION FIND HOMEWORLD
function findHomeworld(applicant) {
  fetch(applicant.homeworld)
    .then(resp => resp.json())
    .then(data => {
      state.planets = [...state.planets, data]
      // console.log(state.planets)
      createInfoBox(applicant)
    })
}

//RENDER FUNCTION
function render() {
  createList()
  createImmigrationForm()
  createsListItems()
}

//Vale's, Millie's, Ade's code.
