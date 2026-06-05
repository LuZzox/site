const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Sert les fichiers statiques (index.html, style.css, app.js)
app.use(express.static(__dirname));

// Route pour le webhook Discord
app.post('/api/notify', async (req, res) => {
    const { date, time } = req.body;
    const webhookUrl = process.env.DISCORD_WEBHOOK;

    if (!webhookUrl) {
        return res.status(500).json({ error: "URL Webhook manquante" });
    }

    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `🚀 **Réponse positive !** ❤️\n📅 Date : ${date}\n⏰ Heure : ${time}`
            })
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));