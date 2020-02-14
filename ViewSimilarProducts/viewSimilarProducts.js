if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  getSimilarProducts();
}

function getSimilarProducts() {
  const category = document.getElementById("view-product-category").innerText;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var similarProductsArray = JSON.parse(this.responseText);
      console.log(JSON.parse(this.responseText), "responsedd");

      var html = "";

      if (similarProductsArray.length !== 0) {
        console.log("!==0")
        for (var i = 0; i < similarProductsArray.length; i++) {
          var imgURL = similarProductsArray[i].pictures.replace(/,.*$/, "");

          html += `
          <div class="similar-product-content">
              <a href="../ViewProduct/viewProduct.php?id=${similarProductsArray[i].productID}" >
              <img src="${imgURL}" alt="${similarProductsArray[i].productName}" title="${similarProductsArray[i].productName}" 
              class="view-similar-product-img" height="200px" width="150px" />
              </a>
              <p> ${similarProductsArray[i].productName} </p>
              <div class="view-similar-product-price">${similarProductsArray[i].price} NIS</div>
          </div>
         `;
        }
        document.getElementsByClassName('similar-product-container')[0].innerHTML = html;
        document.getElementsByClassName('view-similar-product-wraper')[0].style.display = "block";
      }
    } else {
      document.getElementsByClassName('view-similar-product-wraper')[0].style.display = "none";
    }
  };
  console.log(window.location.search.slice(1), "window.location.search")
  const id= window.location.search.slice(1);
  xhttp.open(
    "GET",
    "../ViewSimilarProducts/getSimilarProductDatabase.php?category=" + category +"&"+ id,
    true
  );
  xhttp.send();
}
