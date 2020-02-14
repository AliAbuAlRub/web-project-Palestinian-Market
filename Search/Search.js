if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {}

function search() {
  var searchingValue = document.getElementsByClassName(
    "search-text-input-class"
  )[0].value;
  console.log(searchingValue, "searchingValue");

  if(searchingValue != "") {
    window.location.href = `../searchResults/searchResults.php?name=${searchingValue}`;
  }

//   var xhttp = new XMLHttpRequest();

//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         console.log(this.responseText, "this.responseText search")
//     }
//   };

//   xhttp.open("GET", "../Search/inputChangedSearchDatabase.php?name=" + searchingValue, true);
//   xhttp.send();
}
