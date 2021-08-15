var navList = document.getElementById("nav-lists");
function Show() {
    navList.classList.add("_Menus-show");
    $(".slideshow-container").hide();
}

function Hide() {
    navList.classList.remove("_Menus-show");
    $(".slideshow-container").show();
}