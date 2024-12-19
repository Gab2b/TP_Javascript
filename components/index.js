// <->  MAIN

document.addEventListener('DOMContentLoaded', async() => {

    // Déclaration des variables importantes

    const nextButton = document.querySelector('#next-btn')
    const previousButton = document.querySelector('#previous-btn')
    const allTabs = document.querySelectorAll('.nav-link')
    
    let tabIndex = 0
    let progressValue = 0
    
    // Ajout d'un EventListener sur chaque tab

    previousButton.addEventListener('click', () => {
        // Gestion de l'état du bouton 'Suivant'
        if (nextButton.hasAttribute('disabled')) {
            nextButton.removeAttribute('disabled')
        }

        // Vérification si l'index est différent de 0
        if (tabIndex !== 0) {
            progressValue -= 10
            previousElementToggle(allTabs, tabIndex, progressValue)
            tabIndex--
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
            nextElementToggle(allTabs, tabIndex, progressValue)
            tabIndex++
        }
        
        if (tabIndex === 10) {
            nextButton.setAttribute('disabled', 'true')
        }

        
    })

})

// <->  FONCTIONS

// Fonction pour activer le tab suivant en simulant un click
const nextElementToggle = (allTabs, tabIndex, progressValue) => {

    const nextTab = allTabs[tabIndex + 1]
    nextTab.removeAttribute('disabled')
    nextTab.click()

    updateProgressBar(progressValue)
    allTabs[tabIndex].setAttribute('disabled', 'true')
}

// Fonction pour activer le tab précédent en simulant un click
const previousElementToggle = (allTabs, tabIndex, progressValue) => {
    const previousTab = allTabs[tabIndex - 1]
    previousTab.removeAttribute('disabled')
    previousTab.click()

    updateProgressBar(progressValue)
    allTabs[tabIndex].setAttribute('disabled', 'true')
}

// Fonction pour update la progress bar 

const updateProgressBar = (value) => {
    const progressBarElement = document.querySelector('.progress-bar')

    progressBarElement.setAttribute('aria-valuenow', value)
    progressBarElement.style.width = `${value}%`
    progressBarElement.innerHTML = `${value}%`  
}