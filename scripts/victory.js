$(function () {
    let victoryShown = false;

    // Check score every 200ms
    setInterval(function () {
        const scoreText = $("#score-display").text();
        const score = parseInt(scoreText, 10);

        if (score >= 1000 && !victoryShown) {
            $("#victory-gif").fadeIn(300);
            victoryShown = true;
        }
    }, 200);
});
