$(function () {
    console.log("Game ready");

    let activeImg = $("#starting");
    let celebrationPlayed = false;
    

    // Make ALL images draggable
    $(".doge-img").draggable({
        containment: "#containment-wrapper",
        scroll: false,
        drag: function() {
            calculateScore(); // Update score while dragging
        },
        stop: function() {
            calculateScore(); // Update score on drag stop
        }
    });

    // Initial score calculation
    function calculateScore() {
        // Get current position
        var pos = activeImg.position();
        // Calculate score based on position
        var score = Math.floor(pos.top + pos.left);
        console.log("Score:", score);
        // Update score display

        $("#score-display").text(score);
        // Update progress bar
        // Cap at 100%
        var percent = Math.min((score / 1000) * 100, 100);
        $("#score-progress").css("width", percent + "%");

        // Image switching
        if (score < 100) {
            switchImage("#starting");
            $("#status-message").text("Such beginner do better");
        }
        else if (score < 400) {
            switchImage("#starting");
            $("#status-message").text("ayy lmao you can do it");
        }
        else if (score < 500) {
            switchImage("#far");
            $("#status-message").text("oooohhhh my apologize");
        }
         else if (score < 800) {
            switchImage("#far");
            $("#status-message").text("oooohhhh my apologize");
        }
        else if (score < 900) {
            switchImage("#middle");
            $("#status-message").text("Much skill, but so close yet so far");
        }
        else if (score < 1000) {
            switchImage("#middle");
            $("#status-message").text("IM this close yet not even there haha");
        }
        else {
            switchImage("#congrats");
            $("#status-message").text("Its over 9000!!! this calls for celebration!");
            if (!celebrationPlayed) {
                showCelebration();
                celebrationPlayed = true;
            }
        }
    }

    function switchImage(id) {
        if (activeImg.is(id)) return;

        const pos = activeImg.position();

        $(".doge-img").addClass("hidden");
        activeImg = $(id);
        activeImg
            .removeClass("hidden")
            .css({ top: pos.top, left: pos.left });
    }
});
