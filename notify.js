export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { date, time } = req.body;

    try {
        await fetch(process.env.DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `🚀 **Réponse positive !** ❤️\n📅 Date : ${date}\n⏰ Heure : ${time}`
            })
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error sending notification:", error);
        return res.status(500).json({ success: false });
    }
}