$(function () {

    /* =========================
       SOUND EFFECTS
    ========================= */
    const scoreSound = new Audio("sounds/acradeui.mp3");

    /* TIMER (30 SECONDS)*/
    let timeLeft = 30;
    let timerStarted = false;

    function startTimer() {
        if (timerStarted) return;
        timerStarted = true;

        const timerInterval = setInterval(function () {
            timeLeft--;
            $("#timer").text("Time: " + timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                $(".doge-img").draggable("disable");
                $("#status-message").text("⏰ Time's up!");
                winSound.play();
            }
        }, 1000);
    }

    /* =========================
       LEADERBOARD (localStorage)
    ========================= */
    let highScore = localStorage.getItem("highScore") || 0;
    $("#high-score").text(highScore);

    /* =========================
       RESET HIGHSCORE ON REFRESH CLICK
    ========================= */
    $("#refresh-btn").on("click", function (e) {
        e.preventDefault();

        localStorage.removeItem("highScore");
        $("#high-score").text("0");

        location.reload();
    });

    /* =========================
       SCORE WATCHER
    ========================= */
    let lastScore = 0;

    setInterval(function () {
        const score = parseInt($("#score-display").text(), 10) || 0;

        // Start timer when game begins
        if (score > 0) startTimer();

        // Play sound every 100 points
        if (score >= lastScore + 100) {
            scoreSound.play();
            lastScore = score;
        }

        // Save high score
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            $("#high-score").text(highScore);
        }

        // Change message based on score
        if (score < 300) {
            $("#status-message").text("Just getting started...");
        } else if (score < 600) {
            $("#status-message").text("powering up!");
        } else if (score < 900) {
            $("#status-message").text("Almost legendary!");
        } else {
            $("#status-message").text("🔥 LEGEND STATUS 🔥");
        }

    }, 200);

});
