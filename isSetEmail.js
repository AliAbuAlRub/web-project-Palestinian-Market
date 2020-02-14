if (document.readyState == "loading") {
    console.log("loading");
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    console.log("hi");
    ready();
  }

  function ready() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText, "issetemail")
            if(this.responseText != "true") {
                window.location.href = "../SignIn/SignIn.php";
            }
        }
    };

    xhttp.open(
        "GET",
        "../isSetEmail.php",
        true
    );
    xhttp.send();
  }