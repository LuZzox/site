const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const form = document.getElementById("dateForm");
const buttonContainer = document.getElementById("buttonContainer");
const mainTitle = document.getElementById("mainTitle");
const dateInput = document.getElementById("date");

// Configuration des limites de date (Aujourd'hui et +1 an)
const today = new Date();
const maxDate = new Date();
maxDate.setFullYear(today.getFullYear() + 2); // Limite à 2 ans

const formatDate = (date) => date.toISOString().split('T')[0];

dateInput.min = formatDate(today);
dateInput.max = formatDate(maxDate);
dateInput.value = "2026-06-05"; 

let yesScale = 1; // Taille initiale du bouton Oui

noBtn.addEventListener("mouseover", () => {
    // On le passe en absolute seulement quand on commence à jouer
    noBtn.style.position = "absolute";
    
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 50);

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    // Faire grossir le bouton Oui
    yesScale += 0.15; // Augmente de 15% à chaque fois
    yesBtn.style.transform = `scale(${yesScale})`;
});

yesBtn.addEventListener("click", () => {
    buttonContainer.classList.add("hidden");
    mainTitle.innerText = "Prépare tes baguettes ! 🥢🍣";
    form.classList.remove("hidden");
});

document.getElementById("submitBtn").addEventListener("click", async () => {
    const date = dateInput.value;
    const time = document.getElementById("time").value;
    
    if (!date || !time) return alert("Choisis une date et une heure ! 😊");

    try {
        await fetch("/api/notify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date, time })
        });
        alert("C’est réservé ! J'ai trop hâte de manger des sushis avec toi ! 🍣✨");
        
        // Lancement des confettis !
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#b2ebf2', '#4dd0e1', '#00bcd4']
        });
    } catch (err) {
        alert("Petit souci technique, mais on ira quand même ! 🍣💙");
    }
});