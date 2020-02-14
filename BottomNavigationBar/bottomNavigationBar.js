if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }

function ready() {
    var xhttp = new XMLHttpRequest();
console.log("ready")
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log( this.responseText, "asda")
      }
    };
    
    xhttp.open(
      "GET",
      "../isAdmin.php",
      true
    );
    xhttp.send();
}
