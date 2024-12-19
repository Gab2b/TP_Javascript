document.addEventListener('DOMContentLoaded', async() => {
    const nextButton = document.querySelector('#next-btn')
    const previousButton = document.querySelector('#previous-btn')
    const allTabs = document.querySelectorAll('.nav-link')
    
    let tabIndex = 0
    
    // Ajout d'un EventListener sur chaque tab

    previousButton.addEventListener('click', () => {
        previousElementToggle(allTabs, tabIndex)
        tabIndex--
    })

    nextButton.addEventListener('click', () => {
        nextElementToggle(allTabs, tabIndex)
        tabIndex++
    })

})

// Fonction pour activer le tab suivant en simulant un click
const nextElementToggle = (allTabs, tabIndex) => {
    const nextTab = allTabs[tabIndex + 1]
    nextTab.click()
}

// Fonction pour activer le tab précédent en simulant un click
const previousElementToggle = (allTabs, tabIndex) => {
    const previousTab = allTabs[tabIndex - 1]
    previousTab.click()
}