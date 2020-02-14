if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var btns = document.getElementsByClassName("top-navigationbar-link");

    for (var i = 0; i < btns.length; i++) {
      if (
        btns[i].innerText.includes("Shopping Cart") &&
        window.location.pathname.includes("/ShoppingCart/ShoppingCart.php")
      ) {
        btns[i].className += " active-top-navigationbar";
      }
    }

  getShoppingCartItems();

  setTimeout(function() {
    var removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i];
      button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("quantity-input");
    for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i];
      input.addEventListener("change", quantityChanged);
    }
  }, 1000);
}

function getShoppingCartItems() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var isEmpty = true;
      // data = JSON.parse(data);

      var html = `<tr>
       <td>
       <td>
           <div class="wrap">

           </div>
       </td>
       </td>
   </tr>`;

      for (var i = 0; i < data.length; i++) {
        var size = data[i][0].size;
        var price = data[i][0].price;
        var quantity = data[i].quantity;
        var productID = data[i][0].productID;
        var picture = data[i][0].pictures.replace(/,.*$/, "");
        var productName = data[i][0].productName;
        isEmpty = false;

        html += `<tr class="table-row" id="${productID}">
        <td class="first-column">
        <button class="btn-danger">Remove</button>
        <img class="first-column-img" src="${picture}" alt="${productName}" />
    </td>
    <td class="table-cell">
        <div>
            <span class="item-size">${size.toUpperCase()}</span>
        </div>
    </td>
    <td class="table-cell">
        <div>
            <span class="item-price">${price} NIS</span>
        </div>
    </td>
    <td class="table-cell">
        <ul class="quantityCell">
            <li><button onClick="minus(this)" class="minus-button">-</button> </li>
            <li><input type="text" value="${quantity}" class="quantity-input" id="${productID}"/></li>
            <li><button onclick="add(this)">+</button></li>
        </ul>
    </td>
    <td class="table-cell">
        <span class="totalPrice">${price * quantity} NIS</span>
    </td>
</tr>
        `;
      }

      html += `<tr>
       <td>
       <td>
           <div class="wrap"></div>
       </td>
       </td>
       <td></td>
       <td></td>
       <td></td>
   </tr>`;

      console.log(isEmpty, "isEmpty");
      if (!isEmpty) {
        var tbodyInnerHtml = document.getElementsByClassName("tbody")[0];
        tbodyInnerHtml.innerHTML = html;
        document.getElementsByClassName(
          "checkout-button-link"
        )[0].disabled = false;
      } else {
        document.getElementsByClassName(
          "checkout-button-link"
        )[0].disabled = true;

        document.getElementsByClassName(
          "checkout-button-link"
        )[0].style.pointerEvents = "none";

        document.getElementsByClassName(
          "checkout-button-link"
        )[0].style.opacity = 0.3;
      }

      updateSubtotal();
    }
  };
  console.log(localStorage.getItem("shoppingCart"), "localstorage");
  xhttp.open(
    "GET",
    "getShoppingCartItems.php?item=" + localStorage.getItem("shoppingCart"),
    true
  );
  xhttp.send();
}

function quantityChanged(event) {
  var itemPrice = Number(
    event.srcElement.offsetParent.previousElementSibling.childNodes[1].innerText.replace(
      " NIS",
      ""
    )
  );
  var itemTotalPrice = Number(
    event.srcElement.offsetParent.nextElementSibling.innerText.replace(
      " NIS",
      ""
    )
  );

  const prevQuantity = Math.ceil(itemTotalPrice / itemPrice);
  console.log(prevQuantity, "prevQuantity");
  var input = event.target;
  console.log(input.id, "input");
  const nextQuantity = parseInt(input.value);

  if (isNaN(nextQuantity) || nextQuantity <= 0) {
    input.value = prevQuantity;

    // document.getElementById("no-of-cart-items").innerText = prevQuantity;
    // updatelocalStorageQuantityItem(input.id, prevQuantity);
    // updateSubtotal();
  } else if (nextQuantity < prevQuantity) {
    event.srcElement.offsetParent.nextElementSibling.childNodes[1].innerHTML =
      nextQuantity * itemPrice + " NIS";

    document.getElementById("no-of-cart-items").innerText =
      Number(document.getElementById("no-of-cart-items").innerText) -
      prevQuantity +
      Number(nextQuantity);

    //incase the user put float number
    input.value = nextQuantity;

    updatelocalStorageQuantityItem(input.id, nextQuantity);
    updateSubtotal();
  } else {
    event.srcElement.offsetParent.nextElementSibling.childNodes[1].innerHTML =
      nextQuantity * itemPrice + " NIS";

    //incase the user put float number
    input.value = nextQuantity;

    document.getElementById("no-of-cart-items").innerText =
      Number(document.getElementById("no-of-cart-items").innerText) -
      prevQuantity +
      Number(nextQuantity);

    updatelocalStorageQuantityItem(input.id, nextQuantity);
    updateSubtotal();
  }
  updatelocalStorageCartItemsQuantity();
}

function updatelocalStorageCartItemsQuantity() {
  localStorage.setItem(
    "cartItemsQuantity",
    document.getElementById("no-of-cart-items").innerText
  );
}

function updatelocalStorageQuantityItem(productID, productNewQuantity) {
  console.log(productID, productNewQuantity);
  var shoppingCartItems = JSON.parse(localStorage.getItem("shoppingCart"));

  for (var i = 0; i < shoppingCartItems.length; i++) {
    if (shoppingCartItems[i].productID === Number(productID)) {
      shoppingCartItems[i].quantity = Number(productNewQuantity);
    }
  }
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartItems));
}

function updateSubtotal() {
  const totalPrice = document.getElementsByClassName("totalPrice");

  var subtotal = 0;

  for (var i = 0; i < totalPrice.length; i++) {
    subtotal += Number(totalPrice[i].textContent.replace(" NIS", ""));
  }
  subtotal = Math.round(subtotal * 100) / 100;
  document.getElementById("subtotal").innerHTML = subtotal + " NIS";
}

function removeCartItem(event) {
  console.log(event.target.parentElement.parentElement.id);

  const itemID = event.target.parentElement.parentElement.id;
  var newCartItemsQuantity = 0;

  var cartItems = JSON.parse(localStorage.getItem("shoppingCart"));
  var updatedItems = [];

  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].productID != itemID) {
      console.log(cartItems[i].quantity, "cartItems[i].quantity");
      newCartItemsQuantity += cartItems[i].quantity;
      updatedItems.push(cartItems[i]);
    }
  }

  console.log(newCartItemsQuantity, "cartItems[i].quantity");
  if (updatedItems.length !== 0) {
    localStorage.setItem("shoppingCart", JSON.stringify(updatedItems));
    localStorage.setItem("cartItemsQuantity", newCartItemsQuantity);
    document.getElementById(
      "no-of-cart-items"
    ).innerText = newCartItemsQuantity;
  } else {
    
    document.getElementsByClassName("checkout-button-link")[0].disabled = true;
    document.getElementsByClassName(
      "checkout-button-link"
    )[0].style.pointerEvents = "none";
    document.getElementsByClassName(
      "checkout-button-link"
    )[0].style.opacity = 0.3;

    localStorage.removeItem("shoppingCart");
    localStorage.removeItem("cartItemsQuantity");
    document.getElementById("no-of-cart-items").innerText = 0;
    document.getElementsByClassName("tbody")[0].innerHTML = ` <tr>
                                                              <td ><p class="empty-cart">Your Cart is empty
                                                              , time to <a href="../Products/viewProducts.php" style="color:black;"> go shopping</a></p></td>
                                                              <td></td><td></td><td></td><td></td>
                                                              </tr>`;
  }

  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateSubtotal();
}

function minus(elem) {
  const productQuantity =
    elem.parentNode.nextElementSibling.childNodes[0].value;

  const itemPrice = Number(
    elem.parentElement.parentElement.offsetParent.previousElementSibling.innerText.replace(
      " NIS",
      ""
    )
  );
  console.log(itemPrice, "itemPrice");

  const productID = elem.parentNode.nextElementSibling.childNodes[0].id;
  if (productQuantity > 1) {
    elem.parentNode.nextElementSibling.childNodes[0].value =
      productQuantity - 1;

    const totalPrice = elem.parentNode.parentNode.parentNode.nextElementSibling.children[0].innerText.replace(
      " NIS",
      ""
    );
    elem.parentNode.parentNode.parentNode.nextElementSibling.children[0].innerHTML =
      totalPrice - itemPrice + " NIS";

    document.getElementById("no-of-cart-items").innerText =
      Number(document.getElementById("no-of-cart-items").innerText) - 1;

    updatelocalStorageQuantityItem(productID, productQuantity - 1);
    updatelocalStorageCartItemsQuantity();
    updateSubtotal();
  }
}

function add(elem) {
  const productID = elem.parentNode.previousElementSibling.childNodes[0].id;

  const itemPrice = Number(
    elem.parentElement.parentElement.offsetParent.previousElementSibling.innerText.replace(
      " NIS",
      ""
    )
  );
  console.log(itemPrice, "itemPrice");
  const productQuantity =
    Number(elem.parentNode.previousElementSibling.childNodes[0].value) + 1;
  elem.parentNode.previousElementSibling.childNodes[0].value = productQuantity;

  const totalPrice = Number(
    elem.parentNode.parentNode.parentNode.nextElementSibling.children[0].innerText.replace(
      " NIS",
      ""
    )
  );

  elem.parentNode.parentNode.parentNode.nextElementSibling.children[0].innerHTML =
    totalPrice + itemPrice + " NIS";

  document.getElementById("no-of-cart-items").innerText =
    Number(document.getElementById("no-of-cart-items").innerText) + 1;

  updatelocalStorageQuantityItem(productID, productQuantity);
  updatelocalStorageCartItemsQuantity();
  updateSubtotal();
}

function goToCheckOutPage() {
  window.location.href = "../Checkout/Checkout.php";
}
