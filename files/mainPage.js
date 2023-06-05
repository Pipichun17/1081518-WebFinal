var buttons = document.getElementsByClassName('button');
var imgStyle = ["fire", "forest", "rain", "beach"]

function redirectToTarget(option) {
    localStorage.setItem('selectedOption', option);
    window.location.href = 'files/insidePage.html';
}


//for (var i = 0; i < buttons.length; i++) {
//  buttons[i].addEventListener('click', redirectToPage, imgStyle[i]);
//}

document.addEventListener('DOMContentLoaded', function() {
    var button1 = document.getElementById('button1');
    var button2 = document.getElementById('button2');
    var button3 = document.getElementById('button3');
    var button4 = document.getElementById('button4');

    button1.addEventListener('click', function() {
        redirectToTarget("music/fire.mp3");
    });

    button2.addEventListener('click', function() {
        redirectToTarget("music/forest.mp3");
    });

    button3.addEventListener('click', function() {
        redirectToTarget("music/rain.mp3");
    });

    button4.addEventListener('click', function() {
        redirectToTarget("music/beach.mp3");
    });
});