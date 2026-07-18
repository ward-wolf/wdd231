const lastVisitMessage = document.querySelector("#last-visit");
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
    lastVisitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSinceVisit = Math.floor((now - Number(lastVisit)) / msPerDay);

    if (daysSinceVisit < 1) {
        lastVisitMessage.textContent = "Back so soon! Awesome!";
    } else {
        let dayWord;
        if (daysSinceVisit === 1) {
            dayWord = `day`;
        } else {
            dayWord = `days`;
        }
        lastVisitMessage.textContent = `You last visited ${daysSinceVisit} ${dayWord} ago.`;
    }
}

localStorage.setItem("lastVisit", now);
