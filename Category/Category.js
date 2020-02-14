if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var btns = document.getElementsByClassName("bottom-nav-bar");

  for (var i = 0; i < btns.length; i++) {
    if (
      btns[i].innerText.includes("Home") &&
      (window.location.pathname.includes("/Home/home.php") || window.location.pathname.includes("/Category/Category.php"))
    ) {
      btns[i].className += " active-bottom-navigationbar";
    }
  }

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText, "this.responseText category");

      if (this.responseText) {
        var res = JSON.parse(this.responseText);
        var html = "";

        for (var i = 0; i < res.length; i++) {
          var price = res[i].price;
          var productName = res[i].productName;
          var productID = res[i].productID;
          var img = res[i].pictures.replace(/,.*$/, "");

          html += ` <span class="category-product-container">
            <img src="${img}" alt="${productName}" class="category-product-img" width="150px" height="150px"/>
            <div class="category-product-content">
                <h4>${productName}</h4>
                <div class="category-product-price" >${price} NIS</div>
                <button onClick="viewProductCategory(${productID})"> View Product </button>
                    <button onClick="addToCartProductCategory(${productID})" class="category-add-to-cart-button"> Add to cart </button>
            </div>
        </span>`;
        }

        if(html != "") {
          document.getElementsByClassName(
            "category-container"
          )[0].innerHTML = html;  
        }else {
          document.getElementsByClassName(
            "category-container"
          )[0].innerHTML = `<p style="font-weight:bold;position:absolute;right:40%;top:476px;font-size:30px;">No products was found for this category</p>`;
        }
        
        isAdmin();
      }
    }
  };

  xhttp.open(
    "GET",
    "getCategoryProducts.php?" + window.location.search.slice(1),
    true
  );
  xhttp.send();
}

function isAdmin() {
  console.log("isAdmin");
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText, "this.responseText ca");
      if (this.responseText == "true") {
        var addToCartBtn = document.getElementsByClassName(
          "category-add-to-cart-button"
        )[0];

        addToCartBtn.disabled = true;
        addToCartBtn.style.pointerEvents = "none";
        addToCartBtn.style.opacity = 0.6;
      }
    }
  };

  xhttp.open("GET", "../isAdmin.php", true);
  xhttp.send();
}

function viewProductCategory(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("products").innerHTML = this.responseText;
    }
  };
  window.location = "../ViewProduct/viewProduct.php?id=" + id;
  xhttp.send();
}

function addToCartProductCategory(id) {
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
  // document.getElementById("no-of-cart-items").style.display = "inline";

  localStorage.setItem("cartItemsQuantity", cartitemsQuantity);

  localStorage.setItem("shoppingCart", JSON.stringify(oldItems));
}
