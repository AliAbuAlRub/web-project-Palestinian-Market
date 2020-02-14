if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var btns = document.getElementsByClassName("bottom-nav-bar");

  for (var i = 0; i < btns.length; i++) {
    if (
      btns[i].innerText.includes("Products") &&
      window.location.pathname.includes("/Products/viewProducts.php")
    ) {
      btns[i].className += " active-bottom-navigationbar";
    }
  }
}
