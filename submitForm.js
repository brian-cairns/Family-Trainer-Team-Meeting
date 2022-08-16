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

let todaysDate = document.querySelector('input#todaysDate')
todaysDate.addEventListener('change', (e) => {
	newForm.todaysDate = e.target.value;
  console.log(newForm.todaysDate);
})

let start = document.querySelector('input#start')
start.addEventListener('change', (e) => {
	newForm.start = e.target.value;
  console.log(newForm.start);
})

let AMPM = document.querySelector('select#AMPM')
AMPM.addEventListener('change', (e) => {
	newForm.AMPM = e.target.value;
  console.log(newForm.AMPM);
})

let AMPM2 = document.querySelector('select#AMPM-2')
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

let staffName = document.querySelector('staffName')
staffName.addEventListener('change', (e) => {
	newForm.staffName = e.target.value;
  console.log(newForm.staffName);
})

let goal1 = document.querySelector('input#goal1')
goal1.addEventListener('change', (e) => {
	newForm.goal1 = e.target.value;
  console.log(newForm.goal1);
})

let parentalStrategies1 = document.getElementById('parentalStrategies1')
parentalStrategies1.addEventListener('change', (e) => {
	newForm.parentalStrategies1 = e.target.value;
  console.log(newForm.parentalStrategies1);
})

let nextSteps1 = document.getElementById('nextSteps1')
nextSteps1.addEventListener('change', (e) => {
	newForm.nextSteps1 = e.target.value;
  console.log(newForm.nextSteps1);
})

let goal2 = document.querySelector('input#goal2')
goal2.addEventListener('change', (e) => {
	newForm.goal2 = e.target.value;
  console.log(newForm.goal2);
})

let parentalStrategies2 = document.getElementById('parentalStrategies2')
parentalStrategies2.addEventListener('change', (e) => {
	newForm.parentalStrategies2 = e.target.value;
  console.log(newForm.parentalStrategies2);
})

let nextSteps2 = document.getElementById('nextSteps2')
nextSteps2.addEventListener('change', (e) => {
	newForm.nextStep2 = e.target.value;
  console.log(newForm.nextSteps2);
})

let goal3 = document.querySelector('input#goal3')
goal3.addEventListener('change', (e) => {
	newForm.goal3 = e.target.value;
  console.log(newForm.goal3);
})

let parentalStrategies3 = document.getElementById('parentalStrategies3')
parentalStrategies3.addEventListener('change', (e) => {
	newForm.parentalStrategies3 = e.target.value;
  console.log(newForm.parentalStrategies3);
})

let nextSteps3 = document.getElementById('nextSteps3')
nextSteps3.addEventListener('change', (e) => {
	newForm.nextSteps3 = e.target.value;
  console.log(newForm.nextSteps3);
})

document.getElementById('submit').addEventListener("click", async (event) => {
  submitForm(newForm, formName)
})

let printForm = document.getElementById('printToPDF')
printForm.style.display = 'none'

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
    .then(response => response.json())
    .then(data => respond(data)) 
    .catch((err) => showError(err))
}

function respond(data) {
  let id = data.key
  console.log(id)
  if (id) {
    showSuccess(id)
    sendNotification(id, newForm.clientName,'family', 'not urgent');
    sendNotification(id, newForm.staffName, 'family', 'not urgent');
    sendNotification(id, 'admin', 'family', 'not urgent')
  } else {
    showError(data.error)
  }
}

function showSuccess(id) {
  document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
  document.getElementById('returnMessage').style.display = 'block'
  printForm.style.display = 'inline';
  printForm.addEventListener('click', (e) => {
  location.href = `https://phoenix-freedom-foundation-backend.webflow.io/completed-forms/family-trainer-team-meeting?id=${id}`
  })
}

function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}

async function sendNotification(id, recipient, type, priority) {
  let message = `You have a new <br/><a href=phoenix-freedom-foundation-backend.webflow.io/completed-forms/iiss-session-note?id=${id}>Educational Consultation Summary</a>`
  console.log(message)
  const url = 'https://pffm.azurewebsites.net/notices'
  let notification = {
    'name': recipient,
    'notice': message,
    'type': type,
    'priority': priority
  }
  const header = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
  }
  
  fetch(url, {
    method: "POST",
    headers: header,
    body: JSON.stringify(notification)
  })
    .then(() => console.log('notice sent'))
    .catch(console.error)
}