// <->  MAIN

document.addEventListener('DOMContentLoaded', async() => {

    // Déclaration des variables importantes

    const nextButton = document.querySelector('#next-btn')
    const previousButton = document.querySelector('#previous-btn')
    const allTabs = document.querySelectorAll('.nav-link')
    const radioButtonElementRow = document.querySelectorAll('.mb-3')
    
    let tabIndex = 0
    let progressValue = 0
    
    // Ajout d'un EventListener sur chaque bouton de pagination
    radioButtonElementRow.forEach( siblingsRadioBtnElementsRow => {
        const siblingsRadioBtnElements = siblingsRadioBtnElementsRow.querySelectorAll('input[type=radio]')
        siblingsRadioBtnElements.forEach( radioBtnElement => {

            radioBtnElement.addEventListener('click', () => {
                nextButton.removeAttribute('disabled')
                radioBtnElement.setAttribute('checked', 'true')
            })
        })
    })

    previousButton.addEventListener('click', () => {
        // Gestion de l'état du bouton 'Suivant'
        if (nextButton.hasAttribute('disabled')) {
            nextButton.removeAttribute('disabled')
        }

        // Vérification si l'index est différent de 0
        if (tabIndex !== 0) {
            progressValue -= 10
            previousElementToggle(allTabs, tabIndex, progressValue, nextButton)
            tabIndex--
        }

        if (tabIndex === 0) {
            previousButton.setAttribute('disabled', 'true')
        }
    })

    nextButton.addEventListener('click', () => {

        // Gestion de l'état du bouton 'Précédent'
        if (previousButton.hasAttribute('disabled')) {
            previousButton.removeAttribute('disabled')
        }

        // Vérification si l'index est différent de 10 (correspond aux Résultats)
        if (tabIndex < 10) {
            progressValue += 10
            nextElementToggle(allTabs, tabIndex, progressValue, nextButton)
            tabIndex++
        }
        
        // Arrivée sur les Résultats

        if (tabIndex === 10) {
            resultsMenu(nextButton, previousButton)
        }

        
    })

})

// <->  FONCTIONS

// Fonction pour activer le tab suivant en simulant un click
const nextElementToggle = (allTabs, tabIndex, progressValue, nextButtonElement) => {

    const nextTab = allTabs[tabIndex + 1]
    nextTab.removeAttribute('disabled')
    nextTab.click()

    updateProgressBar(progressValue)
    allTabs[tabIndex].setAttribute('disabled', 'true')
    nextButtonElement.setAttribute('disabled', 'true')
}

// Fonction pour activer le tab précédent en simulant un click
const previousElementToggle = (allTabs, tabIndex, progressValue, nextButtonElement) => {
    const previousTab = allTabs[tabIndex - 1]
    previousTab.removeAttribute('disabled')
    previousTab.click()

    updateProgressBar(progressValue)
    allTabs[tabIndex].setAttribute('disabled', 'true')
    nextButtonElement.setAttribute('disabled', 'true')
    console.log()
}

// Fonction pour update la progress bar 

const updateProgressBar = (value) => {
    const progressBarElement = document.querySelector('.progress-bar')

    progressBarElement.setAttribute('aria-valuenow', value)
    progressBarElement.style.width = `${value}%`
    progressBarElement.innerHTML = `${value}%`  
}

// Fonction pour gérer le menu des résultats

const resultsMenu = (nextButton, previousButton) => {
    nextButton.setAttribute('disabled', 'true')
    previousButton.setAttribute('disabled', 'true')

    let correctAnswers = 0

    // Récupération des résultats des boutons radio
    const questionSelectRadioBtnElements = document.querySelectorAll('input[type=radio][value="maybetheanswer"][checked]')

    questionSelectRadioBtnElements.forEach( radiobtn => {
       correctAnswers++
    })

    const fail = 10 - correctAnswers

    console.log(correctAnswers)
    console.log(fail)

    new Chart(document.getElementById("my-chart"), {
        type: 'doughnut',
        data: {
            labels: ['Bonnes réponses', 'Mauvaises réponses'],
        datasets: [{
            label: 'Nombre :',
            data: [correctAnswers, fail],
            backgroundColor: [
                'rgb(0, 255, 0)',
                'rgb(255, 0, 0)'
            ],
            borderWidth: 1,
            hoverOffset: 4
        }]
        }
    })

    
}