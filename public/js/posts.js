// SCRIPT FOR COLLAPSIBLE NAVBAR FOR MOBILE MODE
$(".button-collapse").sideNav();

// SCRIPT FOR LINK FOR TRIGGERING INFO MODAL IN DESKTOP MODE
$('#trigger').click(function () {
    $('#modal').modal();
});

// SCRIPT FOR LINK FOR TRIGGERING INFO MODAL IN MOBILE MODE
$('#trigger2').click(function () {
    $('#modal').modal();
});

// SCRIPT FOR TRANSITION FROM END OF LOADING ANIMATION TO DISPLAYING PAGE
window.onload = setTimeout(function() {
    document.getElementById("animation").remove();
    document.querySelector("#box2").classList.add("animate");
},900);