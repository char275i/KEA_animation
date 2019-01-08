window.addEventListener("load", sidenVises);

"use strict";
let points = 0;
let liv = 3;
let timeLeft = 60;
let showSettingsEffektSound = true;
let showSettingsMusic = true;
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function sidenVises() {
    console.log("siden vises");

    // NB: Udkommenteret, og spring direkte til startGame
    //document.querySelector("#info_screen").classList.add("show");
    //document.querySelector("#info_close").addEventListener("click", hideInfo);

    //hideInfo();
    showStart();
}

/*function hideInfo() {
    console.log("hideInfo");
    document.querySelector("#info_screen").classList.toggle('hide');
    document.querySelector("#info_screen").classList.add('inactive');
    showStart();
}*/

function showStart() {
    console.log("showStart");
    document.querySelector("#game").classList.remove("blur");
    document.querySelector("#start").classList.remove("hide");
    document.querySelector("#start").classList.add("show");
    document.querySelector("#play").classList.add("pulse");
    document.querySelector("#settings").classList.add("active");
    document.querySelector("#settings").classList.add("pulse");
    document.querySelector("#settings").addEventListener("click", showSettings);
    document.querySelector("#setting_close").addEventListener("click", showSettings);
    document.querySelector("#setting_effekt_sound").addEventListener("click", toggleSounds);
    document.querySelector("#setting_music").addEventListener("click", toggleMusic);
    //Fjern gameover og lavelC
    document.querySelector("#play").addEventListener("click", hideStart);

}

function hideStart() {
    console.log("hideStart");
    document.querySelector("#musik").play();
    document.querySelector("#play").classList.remove("pulse");
    document.querySelector("#start").classList.add("fade_out");
    document.querySelector("#start").addEventListener("animationend", startGame);
}

function startGame() {
    console.log("startGame");
    document.querySelector("#start").classList.add("hide");
    document.querySelector("#start").classList.remove("show");
    tidenGaar();
    //skul gameOver
    document.querySelector("#gameover").classList.add("hide");
    document.querySelector("#gameover").classList.remove("show");

    //skjul levelComplete
    document.querySelector("#levelcomplete").classList.add("hide");
    document.querySelector("#levelcomplete").classList.remove("show");
    //stone_sprite
    document.querySelector("#stone_sprite").classList.add("silly");


    // Vis spilskærm
    document.querySelector("#game").classList.add("show");

    // tilføj falling på stone0,1,2,3
    document.querySelector("#stone0").classList.add("falling");
    document.querySelector("#stone1").classList.add("falling");
    document.querySelector("#stone2").classList.add("falling");
    document.querySelector("#stone3").classList.add("falling");
    document.querySelector("#stone4").classList.add("falling");

    // så er der klasser på ... nu skal vi kunne klikke
    document.querySelector("#stone0").addEventListener("click", clickStone);
    document.querySelector("#stone1").addEventListener("click", clickStone);
    document.querySelector("#stone2").addEventListener("click", clickStone);
    document.querySelector("#stone3").addEventListener("click", clickStone);
    document.querySelector("#stone4").addEventListener("click", clickStone);
    document.querySelector("#banan1").addEventListener("click", clickBanan);
    document.querySelector("#banan1").addEventListener("click", clickBananas);
    document.querySelector("#start").classList.add("titel_side");
    tidenGaar();
    // genstart falling på stone0,1,2,3
    document.querySelector("#stone0").addEventListener("animationiteration", genstartStone);
    document.querySelector("#stone1").addEventListener("animationiteration", genstartStone);
    document.querySelector("#stone2").addEventListener("animationiteration", genstartStone);
    document.querySelector("#stone3").addEventListener("animationiteration", genstartStone);
    document.querySelector("#stone4").addEventListener("animationiteration", genstartStone);
}

function genstartStone() {
    console.log(this);
    console.log("genstart stone");

    this.classList.remove("hide");
}

function tidenGaar() {
    console.log("timeLeft" + timeLeft);

    timeLeft--;
    console.log(timeLeft);

    if (timeLeft > 0) {
        setTimeout(tidenGaar, 1000);
    } else {
        gameOver();
    }

    document.querySelector("#tid").textContent = timeLeft;
}

function clickStone() {
    console.log("clickStone");
    // TODO: giv point!

    points++;
    console.log(points);
    document.querySelector("#points").innerHTML = points;
    document.querySelector("#falder").currentTime = 0;
    document.querySelector("#falder").play();

    console.log(this);
    this.classList.add("hide");
    this.addEventListener("animationend", nyStone);

    gameStatus();
}

function nyStone() {
    console.log("nyStone");
    this.className = "nyStone";
    this.classList.add("type" + Math.floor((Math.random() * 2) + 1));
    this.classList.add("position" + Math.floor((Math.random() * 6) + 1));
}

function clickBanan() {
    console.log("clickBanan");

    if (this.classList.contains("type1")) {
        console.log("Type1");
        document.querySelector("#bananLl" + liv).classList.add("hide");
        liv--;

    } else if (this.classList.contains("type2")) {
        console.log("Type2");
        points++;
        document.querySelector("#points").innerHTML = points;
    }
    this.classList.add("dissappear");
    this.addEventListener("animationend", nyBanan);

    gameStatus();
}

function nyBanan() {
    console.log("nyBanan");
    this.className = "";
    this.classList.add("type" + Math.floor((Math.random() * 2) + 1));
    this.classList.add("position" + Math.floor((Math.random() * 10) + 1));
}

function clickBananas() {
    console.log("clickBananas");
    if (this.classList.contains("type1")) {
        document.querySelector("#plukA").currentTime = 0;
        document.querySelector("#plukA").play();
    } else if (this.classList.contains("type2")) {
        document.querySelector("#plukB").currentTime = 0;
        document.querySelector("#plukB").play();
    }
}

function showSettings() {
    console.log("showSettings");
    document.querySelector("#settings_screen").classList.toggle('hide');

}

function toggleSounds() {
    console.log("toggleSounds");
    //    showSettingsEffektSound = !showSettingsEffektSound;

    if (showSettingsEffektSound == false) {
        //her klikker vi lyden på
        showSettingsEffektSound = true;
        document.querySelector("#sfx_sprite").classList.add("off_on");
        document.querySelector("#sfx_sprite").classList.remove("off");
        document.querySelector("#sfx_sprite").addEventListener("animationend", soundsOn);
        //        soundsOff();
    } else {
        //her kikker vi lyden af - slukker den
        showSettingsEffektSound = false;
        document.querySelector("#sfx_sprite").classList.add("on_off");
        document.querySelector("#sfx_sprite").classList.remove("on");
        document.querySelector("#sfx_sprite").addEventListener("animationend", soundsOff);
        //        soundsOn();
    }

}

function soundsOff() {
    console.log("soundsOff function værdi er " + showSettingsEffektSound);
    document.querySelector("#sfx_sprite").removeEventListener("animationend", soundsOff);
    document.querySelector("#sfx_sprite").classList.remove("on_off");
    document.querySelector("#sfx_sprite").classList.add("off");
    //    her slukkes for efx
    document.querySelector("#plukA").muted = true;
    document.querySelector("#plukB").muted = true;

}

function soundsOn() {
    console.log("soundsOn function værdi er " + showSettingsEffektSound);
    document.querySelector("#sfx_sprite").removeEventListener("animationend", soundsOn);
    document.querySelector("#sfx_sprite").classList.remove("off_on");
    document.querySelector("#sfx_sprite").classList.add("on");
    //    her tændes for efx
    document.querySelector("#plukA").muted = false;
    document.querySelector("#plukB").muted = false;
}

function toggleMusic() {
    console.log("showSettingsMusic function " + showSettingsMusic);
    //showSettingsMusic = !showSettingsMusic;


    if (showSettingsMusic == false) {
        showSettingsMusic = true;
        document.querySelector("#music_sprite").classList.add("off_on");
        document.querySelector("#music_sprite").classList.remove("off");
        document.querySelector("#music_sprite").addEventListener("animationend", musicOn);

        //        musicOn();

    } else {
        showSettingsMusic = false;
        document.querySelector("#music_sprite").classList.add("on_off");
        document.querySelector("#music_sprite").classList.remove("on");
        document.querySelector("#music_sprite").addEventListener("animationend", musicOff);

        //        musicOff();
    }
}

function musicOff() {
    console.log("musicOff function værdi er " + showSettingsEffektSound);
    document.querySelector("#music_sprite").removeEventListener("animationend", musicOff);
    document.querySelector("#music_sprite").classList.remove("on_off");
    document.querySelector("#music_sprite").classList.add("off");


    //    her slukkes for musikken

    document.querySelector("#musik").pause();
}

function musicOn() {
    console.log("musicOn function værdi er " + showSettingsEffektSound);
    document.querySelector("#music_sprite").removeEventListener("animationend", musicOn);
    document.querySelector("#music_sprite").classList.remove("off_on");
    document.querySelector("#music_sprite").classList.add("on");

    //    her tændes for musikken

    document.querySelector("#musik").play();
}

function gameStatus() {
    if (liv == 0) {
        gameOver();
    }
    if (points >= 10) {
        levelcomplete();
    }
}

function gameOver() {
    console.log("gameOver");
    document.querySelector("#game").classList.add("blur");
    document.querySelector("#game").classList.remove("show");
    document.querySelector("#gameover").classList.remove("hide");
    document.querySelector("#newGame").classList.add("active");
    document.querySelector("#newGame").classList.add("pulse");
    document.querySelector("#GameOverSign").classList.add("faded_out");
    //    her skifter musikken
    document.querySelector("#musik").pause();
    document.querySelector("#gameOverMusic").play();
    //document.querySelector("#tidenGaar").addEventListener("animationen", timeLeft);
    //remove falling
    document.querySelector("#stone0").classList.remove("falling");
    document.querySelector("#stone1").classList.remove("falling");
    document.querySelector("#stone2").classList.remove("falling");
    document.querySelector("#stone3").classList.remove("falling");
    document.querySelector("#stone4").classList.remove("falling");

    //
    document.querySelector("#newGame").addEventListener("click", genStartFc);

}

function levelcomplete() {
    console.log("levelcomplete");
    document.querySelector("#game").classList.add("blur");
    document.querySelector("#game").classList.remove("show");
    document.querySelector("#levelcomplete").classList.remove("hide");
    document.querySelector("#playAgain").classList.add("active");
    document.querySelector("#playAgain").classList.add("pulse");
    document.querySelector("#YouRockSign").classList.add("faded_out");
    //remove falling
    document.querySelector("#stone0").classList.remove("falling");
    document.querySelector("#stone1").classList.remove("falling");
    document.querySelector("#stone2").classList.remove("falling");
    document.querySelector("#stone3").classList.remove("falling");
    document.querySelector("#stone4").classList.remove("falling");
    document.querySelector("#musik").pause();
    //    her skifter musikken
    document.querySelector("#levelCompleteMusik").play();
    document.querySelector("#tid").classList.add("hide");
    document.querySelector("#playAgain").addEventListener("click", genStartFc);
    /*document.querySelector("#playAgain").addEventListener("click", hideStart);*/

}

function genStartFc() {
    console.log("replay");
    document.location.href = "";
}

/*function genStart() {
    console.log("funktionen genstart");
    document.querySelector("#tid").classList.add("hide");
    document.querySelector("#tid").removeEventListener("animationend", timeLeft);
    document.querySelector("#newGame").addEventListener("click", sidenVises);

    document.querySelector("#newGame").removeEventListener("click", genStart);
    document.querySelector("#newGame").classList.remove("spil_igen");

    document.querySelector("#start").className = "";

    document.querySelector("#slut").classList.remove("active");
    document.querySelector("#slut").classList.add("inactive");

    //    document.querySelector("#liv").classList = "";
    document.querySelector("#UI_lag").classList = "";
    document.querySelector("#tid").classList.remove("empty");
    clearTimeout(myGameTimer);

    hits = 0;
    antalLiv = 3;
    showScore();


    startSpillet();
}*/
