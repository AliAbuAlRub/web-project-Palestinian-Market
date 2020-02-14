let isAdmin = false;

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  checkAdmin();
  console.log(isAdmin, "isAdmin search");
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(this.responseText);
      var html = "";

      console.log(res, "this.responseText search");
      if (res.length != 0) {
        console.log("if search enters");
        for (var i = 0; i < res.length; i++) {
          console.log("for loop search enter");
          var price = res[i].price;
          var picture = res[i].pictures.replace(/,.*$/, "");
          var description = res[i].briefDescription;
          var productID = res[i].productID;
          var productName =
            res[i].productName.charAt(0).toUpperCase() +
            res[i].productName.slice(1).toLowerCase();

          html += `
                   <div class="per-element-search-result">
                    <img src="${picture}" class="search-results-image"/>
                    <div class="search-results-text-content">
                        <h4>${productName}</h4>
                        <p>${description}</p>
                    </div>
                    <label>Price:</label><span class="search-result-price">${price} NIS</span>
                    <button class="search-result-add-to-cart-button" onClick="addToCartSearchResult(${productID})">Add to cart</button>
                   </div>`;
        }
        console.log(
          document.getElementsByClassName("search-results-container"),
          " html seacrh"
        );

        document.getElementsByClassName(
          "search-results-container"
        )[0].innerHTML = html;

        if (isAdmin == "true") {
          console.log("isAdmin true");
          var searchResultsAddToCartbtn = document.getElementsByClassName(
            "search-result-add-to-cart-button"
          );

          for (var i = 0; i < searchResultsAddToCartbtn.length; i++) {
            searchResultsAddToCartbtn[i].disabled = true;
            searchResultsAddToCartbtn[i].style.opacity = 0.5;
            searchResultsAddToCartbtn[i].style.pointerEvents = "none";
          }
        }
      } else {
        html = `<div class="no-search-results-found">
                 <p >Your search <strong>${window.location.search.slice(6)}</strong> did not match any products.</p>
                 <p style="margin-left: -81px;">Try something like</p>
                  <ul style="list-style-type: none;"><li>Use more general terms</li><li style="margin-left: -50px">Check your spelling</li> </ul>
                  </div>`;
                  
        document.getElementsByClassName(
          "search-results-container"
        )[0].innerHTML = html;
      }
    }
  };

  xhttp.open(
    "GET",
    "inputChangedSearchDatabase.php?" + window.location.search.slice(1),
    true
  );
  xhttp.send();

  console.log(isAdmin, "befor if sea");
}

function checkAdmin() {
  var xhttp = new XMLHttpRequest();
  console.log(checkAdmin, "checkAdmin search");
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText, "response search");
      isAdmin = this.responseText;
    }
  };

  xhttp.open("GET", "../isAdmin.php", true);
  xhttp.send();
}

function addToCartSearchResult(id) {
  console.log(id, "search");
  console.log(id);
  var oldItems = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  var isNewItem = false;

  var cartitemsQuantity = 0;

  for (var i = 0; i < oldItems.length; i++) {
    if (oldItems[i].productID === id) {
      oldItems[i].quantity = oldItems[i].quantity + 1;
      console.log(oldItems[i].quantity, "oldItems[i].quantity");
      cartitemsQuantity += Number(oldItems[i].quantity);
      console.log(cartitemsQuantity, "quantityfor");
      isNewItem = true;
    } else {
      cartitemsQuantity += Number(oldItems[i].quantity);
    }
  }
  console.log(document.getElementById("no-of-cart-items"));
  var newItem = {};

  if (!isNewItem) {
    newItem = {
      productID: id,
      quantity: 1
    };
    oldItems.push(newItem);
    cartitemsQuantity += 1;
    console.log(cartitemsQuantity, "quantityif");
  }

  document.getElementById("no-of-cart-items").innerText = cartitemsQuantity;
  localStorage.setItem("cartItemsQuantity", cartitemsQuantity);
  localStorage.setItem("shoppingCart", JSON.stringify(oldItems));
}

function filterByPrice() {
  var input = document.getElementsByClassName("filter-by-price")[0].value;
  var prices = document.getElementsByClassName("per-element-search-result");
  var radioBtn = document.getElementsByClassName("radio-button-search-result");
  var filterBy = "";
  // console.log(document.getElementsByClassName('per-element-search-result')[0].children[3].innerText.replace(" NIS", ""), "document.getElementsByClassName('per-element-search-result')")
  console.log(input);
  console.log(
    document.getElementsByClassName("filter-by-price"),
    "radioBtn[i].checked"
  );

  if (radioBtn[0].value == "greater" && radioBtn[0].checked) {
    filterBy = "greater";
  } else if (radioBtn[1].value == "smaller" && radioBtn[1].checked) {
    filterBy = "smaller";
  } else if (radioBtn[2].value == "equal" && radioBtn[2].checked) {
    filterBy = "equal";
  }
  console.log(filterBy, "filterBy");
  if (filterBy == "greater" && input != "") {
    console.log('filterBy == "greater" && input != "<empty string>"');
    for (var i = 0; i < prices.length; i++) {
      if (Number(prices[i].children[3].innerText.replace(" NIS", "")) > input) {
        prices[i].style.display = "block";
      } else {
        prices[i].style.display = "none";
      }
    }
  } else if (filterBy == "smaller" && input != "") {
    console.log('filterBy == "greater" && input != "<empty string>" 2');

    for (var i = 0; i < prices.length; i++) {
      if (Number(prices[i].children[3].innerText.replace(" NIS", "")) < input) {
        prices[i].style.display = "block";
      } else {
        prices[i].style.display = "none";
      }
    }
  } else if (filterBy == "equal" && input != "") {
    console.log('filterBy == "greater" && input != "<empty string> " 3');

    for (var i = 0; i < prices.length; i++) {
      if (
        Number(prices[i].children[3].innerText.replace(" NIS", "")) == input
      ) {
        prices[i].style.display = "block";
      } else {
        prices[i].style.display = "none";
      }
    }
  } else {
    console.log('filterBy == "greater" && input != "<empty string>" 4');

    for (var i = 0; i < prices.length; i++) {
      prices[i].style.display = "block";
    }
  }
  //   }else {
  //     ready();
  //   }

  if (input == "<empty string>") {
    ready();
    console.log("input ready");
  }
}
