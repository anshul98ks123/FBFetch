// SCRIPT FOR TRANSITION FROM END OF LOADING ANIMATION TO DISPLAYING PAGE
window.onload = setTimeout(function() {
    document.getElementById("animation").remove();
    document.querySelector("#box2").classList.add("animate");
},1200);

// SCRPT FOR TRIGGERING MODAL
$('#trigger').click(function () {
    $('#modal').modal();
});