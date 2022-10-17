let submit = document.getElementById('submit')
console.log(submit)
const formName = 'familyTrainingMeeting'
console.log('form: ' + formName)
let newForm = {}
let pdf = document.getElementById('printToPDF')
newForm.goals = []

document.getElementById('submit').addEventListener("click", (event) => {
  newForm.date = document.querySelector('input#date').value
  newForm.staffEmail = document.querySelector('input#staffEmail').value
  newForm.start = document.querySelector('input#start').value
  newForm.stop = document.querySelector('input#stop').value
  newForm.membersPresent = document.querySelector('input#membersPresent').value
  newForm.location = document.querySelector('input#location').value
  for (let i = 1; i < 4; i++) {
    console.log(i)
    if (document.querySelector(`input#goal${i}`).value != null) {
      newForm.goal[i] = {
        'goalName': document.querySelector(`input#goal${i}`).value,
        'strategies': document.getElementById(`strategies${i}`).innerHTML,
        'nextSteps': document.getElementById(`nextSteps${i}`).innerHTML
      }
    } else { i = 4 }
  }
  newForm.staffName = document.querySelector('input#staffName').value 
  newForm.recordDate = document.querySelector('input#finalDate').value
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
  let message = `You have a new <br/><a href=phoenix-freedom-foundation-backend.webflow.io/completed-forms/iiss-session-note?id=${id}>Family Training Team Meeting</a>`
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