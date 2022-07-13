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
class Goal {
    constructor(goal, strategies, nextSteps) {
        this.goal = goal;
        this.strategies = strategies;
        this.nextSteps = nextSteps
    }
}

async function getGoals() {
    let goals = []
    for (i = 1; i < 4; i++) {
        if (document.getElementById(`goal${i}`).value == "") {
            i = 4;
            return goals
        } else {
            let item = new Goal
            item.goal = document.getElementById(`goal${i}`).value;
            item.strategies = document.getElementById(`strategies${i}`).value;
            item.nextSteps = document.getElementById(`nextSteps${i}`).value;
            goals.push(item)
        }
    }
}

document.getElementById('submit').addEventListener("click", async (event) => {
  const goals = await getGoals()
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
