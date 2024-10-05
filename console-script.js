let currentIndex = 0; // Indice de l'icône actuelle
const menuIcons = document.querySelectorAll('.menu-icon');

// Fonction pour changer l'arrière-plan
function changeBackground(index) {
    const backgroundUrl = menuIcons[index].getAttribute('data-background');
    document.body.style.background = `url('${backgroundUrl}') no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';
}

// Fonction pour gérer le survol des icônes avec la manette
function hoverWithGamepad() {
    // Vérifie si un gamepad est connecté
    const gamepads = navigator.getGamepads();
    if (gamepads[0]) {
        const axes = gamepads[0].axes;

        // Vérifie si l'axe Y est utilisé pour la navigation (up/down)
        if (axes[1] > 0.5 && currentIndex < menuIcons.length - 1) {
            currentIndex++;
            changeBackground(currentIndex);
        } else if (axes[1] < -0.5 && currentIndex > 0) {
            currentIndex--;
            changeBackground(currentIndex);
        }
    }
}

// Mise à jour de l'affichage chaque seconde
setInterval(hoverWithGamepad, 100);

// Écouteur d'événements pour la souris
menuIcons.forEach((icon, index) => {
    icon.addEventListener('mouseenter', () => {
        currentIndex = index; // Met à jour l'indice actuel
        changeBackground(currentIndex);
    });
    icon.addEventListener('mouseleave', () => {
        // Réinitialiser à l'arrière-plan par défaut ou un autre fond si nécessaire
        document.body.style.background = ''; // Remplacez par un fond par défaut si souhaité
    });
});
