let currentStep = 0
const formSteps = document.querySelectorAll(".form-step")
const form = document.querySelector("form")

form.addEventListener("click", (e) => {
  if (!e.target.matches("[data-action]")) {
    return
  }

  const actions = {
    next() {
      if (!isValidInputs()) {
        return
      }
      clearFormFields()
      currentStep++
    },
    prev() {
      currentStep--
    },
  }
  const action = e.target.dataset.action
  actions[action]()
  updateActiveStep()
  updateProgressStep()
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
})

function updateActiveStep() {
  formSteps.forEach((step) => step.classList.remove("active"))
  formSteps[currentStep].classList.add("active")
}

const progressSteps = document.querySelectorAll(".step-progress [data-step]")

function updateProgressStep() {
  progressSteps.forEach((step, idx) => {
    step.classList.remove("active")

    if (idx < currentStep + 1) {
      step.classList.add("active")
    }
  })
}

function clearFormFields() {
  const currentFormStep = formSteps[currentStep]
  const formFields = [
    ...currentFormStep.querySelectorAll("input"),
    ...currentFormStep.querySelectorAll("textarea"),
  ]

  formFields.forEach((field) => {
    if (field.type !== "submit") {
      field.value = ""
    }
  })
}

function isValidInputs() {
  const currentFormStep = formSteps[currentStep]
  const formFields = [
    ...currentFormStep.querySelectorAll("input"),
    ...currentFormStep.querySelectorAll("textarea"),
  ]

  return formFields.every((input) => input.reportValidity())
}
