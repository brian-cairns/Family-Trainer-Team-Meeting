let submit = document.getElementById('submit')
console.log(submit)
const formName = 'familyTrainingMeeting'
console.log('form: ' + formName)
let newForm = {}

let clientName = document.querySelector('input#clientName')
clientName.addEventListener('change', (e) => {
	console.log('changed')
	newForm.clientName = e.target.value;
  console.log(newForm.clientName);
  })
  
let month = document.querySelector('input#month')
month.addEventListener('change', (e) => {
	newForm.month = e.target.value;
  console.log(newForm.month);
})

let day = document.querySelector('input#day')
day.addEventListener('change', (e) => {
	newForm.day = e.target.value;
  console.log(newForm.day);
})

let year = document.querySelector('input#year')
year.addEventListener('change', (e) => {
	newForm.year = e.target.value;
  console.log(newForm.year);
})

let todaysDate = `${month}/${day}/${year}`
document.getElementById('todaysDate').innerHTML = todaysDate

let start = document.querySelector('input#start')
start.addEventListener('change', (e) => {
	newForm.start = e.target.value;
  console.log(newForm.start);
})

let AMPM = document.querySelector('input#AMPM')
AMPM.addEventListener('change', (e) => {
	newForm.AMPM = e.target.value;
  console.log(newForm.AMPM);
})

let AMPM2 = document.querySelector('input#AMPM-2')
AMPM2.addEventListener('change', (e) => {
	newForm.AMPM2 = e.target.value;
  console.log(newForm.AMPM2);
})

let stop = document.querySelector('input#stop')
stop.addEventListener('change', (e) => {
	newForm.stop = e.target.value;
  console.log(newForm.stop);
})

let membersPresent = document.querySelector('input#membersPresent')
membersPresent.addEventListener('change', (e) => {
	newForm.membersPresent = e.target.value;
  console.log(newForm.membersPresent);
})

let staffName = document.querySelector('input#staffName')
staffName.addEventListener('change', (e) => {
	newForm.name = e.target.value;
  console.log(newForm.staffName);
})

let goal1 = document.querySelector('input#goal1')
goal1.addEventListener('change', (e) => {
	newForm.name = e.target.value;
  console.log(newForm.goal1);
})

let parentalStrategies1 = document.querySelector('input#parentalStrategies1')
parentalStrategies1.addEventListener('change', (e) => {
	newForm.name = e.target.value;
  console.log(newForm.parentalStrategies1);
})

let nextSteps1 = document.querySelector('input#nextSteps1')
nextSteps1.addEventListener('change', (e) => {
	newForm.name = e.target.value;
  console.log(newForm.nextSteps1);
})

let goal2 = document.querySelector('input#goal2')
goal2.addEventListener('change', (e) => {
	newForm.name = e.target.value;
  console.log(newForm.goal2);
})

let parentalStrategies2 = document.querySelector('input#parentalStrategies2')
parentalStrategies2.addEventListener('change', (e) => {
	newForm.name = e.target.value;
  console.log(newForm.parentalStrategies2);
})

let nextSteps2 = document.querySelector('input#nextSteps2')
nextSteps2.addEventListener('change', (e) => {
	newForm.name = e.target.value;
  console.log(newForm.nextSteps2);
})

let goal3 = document.querySelector('input#goal3')
goal3.addEventListener('change', (e) => {
	newForm.name = e.target.value;
  console.log(newForm.goal3);
})

let parentalStrategies3 = document.querySelector('input#parentalStrategies3')
parentalStrategies3.addEventListener('change', (e) => {
	newForm.name = e.target.value;
  console.log(newForm.parentalStrategies3);
})

let nextSteps3 = document.querySelector('input#nextSteps3')
nextSteps3.addEventListener('change', (e) => {
	newForm.name = e.target.value;
  console.log(newForm.nextSteps3);
})

document.getElementById('submit').addEventListener("click", async (event) => {
  submitForm(newForm, formName)
})

async function submitForm(data, form) {
  const document = {
    'form': form,
    'data': data
  }
  console.log(document)
  fetch('https://pffm.azurewebsites.net/form', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then((response) => {
      if (response.status == 200) {
      showSuccess()
      } else {
        showError(response.body)
      }
    })
    .catch((err) => showError(err))
}


function showSuccess() {
    document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
}

function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}
