if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var btns = document.getElementsByClassName("top-navigationbar-link");
  for (var i = 0; i < btns.length; i++) {
    if (
      btns[i].innerText.includes("Checkout") &&
      window.location.pathname.includes("/Checkout/Checkout.php")
    ) {
      btns[i].className += " active-top-navigationbar";
    }
  }

  getCheckOutItems();

  var onMakePayment = document.getElementsByClassName("make-payment")[0];
  onMakePayment.addEventListener("click", onPayment);
}

function getCheckOutItems() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var isEmpty = true;

      var html = `<tr>
         <td>
         <td>
             <div class="checkout-wrap">
  
             </div>
         </td>
         </td>
     </tr>`;

      for (var i = 0; i < data.length; i++) {
        //   var size = data[i][0].size;
        var price = data[i][0].price;
        var quantity = data[i].quantity;
        var productID = data[i][0].productID;
        var picture = data[i][0].pictures.replace(/,.*$/, "");
        var productName = data[i][0].productName;
        isEmpty = false;

        html += `<tr class="table-row" id="${productID}">
          <td class="checkout-first-column">
          <img class="checkout-first-column-img" src="${picture}" alt="${productName}" />
          <span style="left: 376px;position: absolute;font-size: 31px">
          ${productName.charAt(0).toUpperCase() + productName.slice(1)}
          </span>
      </td>
      <td >
      <p style="text-align: center;font-size: 39px;opacity: 0.6;" id="${productID}" class="checkout-quantity-item">${quantity}</p>
       </td>
      <td class="checkout-table-cell">
          <div class="quantity-total-price">${price * quantity} NIS</div>
      </td>
      </tr>
          `;
      }

      html += `<tr>
         <td>
         <td>
             <div class="checkout-wrap"></div>
         </td>
         </td>
         <td></td>
         <td></td>
         <td></td>
     </tr>`;

      if (!isEmpty) {
        var tbodyInnerHtml = document.getElementsByClassName(
          "checkout-tbody"
        )[0];
        tbodyInnerHtml.innerHTML = html;
        updateTotalPriceToCheckout();
      } else {
        document.getElementById("bank-card-number").value = "";
        document.getElementById("expiry-date-month").value = "";
        document.getElementById("expiry-date-year").value = "";
        document.getElementById("cvv").value = "";

        document.getElementsByClassName(
          "make-payment"
        )[0].style.disabled = true;
        document.getElementsByClassName("make-payment")[0].style.opacity = 0.5;
        document.getElementsByClassName("make-payment")[0].style.pointerEvents =
          "none";
      }
    }
  };
  xhttp.open(
    "GET",
    "CheckoutData.php?checkoutItems=" + localStorage.getItem("shoppingCart"),
    true
  );
  xhttp.send();
}

function updateTotalPriceToCheckout() {
  var totalPriceQuantity = document.getElementsByClassName(
    "quantity-total-price"
  );
  var totalPrice = 0;

  for (var i = 0; i < totalPriceQuantity.length; i++) {
    totalPrice += Number(totalPriceQuantity[i].innerText.replace(" NIS", ""));
  }

  document.getElementsByClassName("checkout-totalprice")[0].innerText =
    totalPrice + " NIS";
}

function onPayment() {
  const cardNumber = document.getElementById("bank-card-number").value;
  const expiryDateMonth = document.getElementById("expiry-date-month").value;
  const expiryDateYear = document.getElementById("expiry-date-year").value;
  const cvv = document.getElementById("cvv").value;
  var noErr = true;

  if (isNaN(cardNumber)) {
    document.getElementById("bank-card-number").style.borderColor = "red";
    document.getElementsByClassName(
      "bank-card-number-err-message"
    )[0].innerText = "Only numbers are allowed!!";

    noErr = false;
  } else if (!cardNumber) {
    document.getElementById("bank-card-number").style.borderColor = "red";
    document.getElementsByClassName(
      "bank-card-number-err-message"
    )[0].innerText = "Card number field is Empty!!";

    noErr = false;
  } else if (isNaN(expiryDateMonth)) {
    document.getElementById("expiry-date-month").style.borderColor = "red";
    document.getElementsByClassName(
      "expiry-date-month-err-message"
    )[0].innerText = "Only numbers are allowed!!";

    document.getElementById("bank-card-number").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "bank-card-number-err-message"
    )[0].innerText = "";

    noErr = false;
  } else if (expiryDateMonth.length > 2) {
    document.getElementById("expiry-date-month").style.borderColor = "red";
    document.getElementsByClassName(
      "expiry-date-month-err-message"
    )[0].innerText = "Must be 2 digits or less!!";

    document.getElementById("bank-card-number").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "bank-card-number-err-message"
    )[0].innerText = "";

    noErr = false;
  } else if (!expiryDateMonth) {
    document.getElementById("expiry-date-month").style.borderColor = "red";
    document.getElementsByClassName(
      "expiry-date-month-err-message"
    )[0].innerText = "Expiry date (month) field is Empty!!";

    document.getElementById("bank-card-number").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "bank-card-number-err-message"
    )[0].innerText = "";

    noErr = false;
  } else if (isNaN(expiryDateYear)) {
    document.getElementById("expiry-date-year").style.borderColor = "red";
    document.getElementsByClassName(
      "expiry-date-year-err-message"
    )[0].innerText = "Only numbers are allowed!!";

    document.getElementById("bank-card-number").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "bank-card-number-err-message"
    )[0].innerText = "";

    document.getElementById("expiry-date-month").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "expiry-date-month-err-message"
    )[0].innerText = "";

    noErr = false;
  } else if (expiryDateYear.length != 2) {
    document.getElementById("expiry-date-year").style.borderColor = "red";
    document.getElementsByClassName(
      "expiry-date-year-err-message"
    )[0].innerText = "Must be 2 digits!!";

    document.getElementById("bank-card-number").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "bank-card-number-err-message"
    )[0].innerText = "";

    document.getElementById("expiry-date-month").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "expiry-date-month-err-message"
    )[0].innerText = "";

    noErr = false;
  } else if (!expiryDateYear) {
    document.getElementById("expiry-date-year").style.borderColor = "red";
    document.getElementsByClassName(
      "expiry-date-year-err-message"
    )[0].innerText = "Expiry date (year) field is Empty!!";

    document.getElementById("bank-card-number").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "bank-card-number-err-message"
    )[0].innerText = "";

    document.getElementById("expiry-date-month").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "expiry-date-month-err-message"
    )[0].innerText = "";

    noErr = false;
  } else if (isNaN(cvv)) {
    document.getElementById("cvv").style.borderColor = "red";
    document.getElementsByClassName("cvv-err-message")[0].innerText =
      "Only numbers are allowed!!";

    document.getElementById("bank-card-number").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "bank-card-number-err-message"
    )[0].innerText = "";

    document.getElementById("expiry-date-month").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "expiry-date-month-err-message"
    )[0].innerText = "";

    document.getElementById("expiry-date-year").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "expiry-date-year-err-message"
    )[0].innerText = "";

    noErr = false;
  } else if (cvv.length > 3 || cvv.length < 1) {
    document.getElementById("cvv").style.borderColor = "red";
    document.getElementsByClassName("cvv-err-message")[0].innerText =
      "Must be 3 digits or 2!!";

    document.getElementById("bank-card-number").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "bank-card-number-err-message"
    )[0].innerText = "";

    document.getElementById("expiry-date-month").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "expiry-date-month-err-message"
    )[0].innerText = "";

    document.getElementById("expiry-date-year").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "expiry-date-year-err-message"
    )[0].innerText = "";

    noErr = false;
  } else if (!cvv) {
    document.getElementById("cvv").style.borderColor = "red";
    document.getElementsByClassName("cvv-err-message")[0].innerText =
      "CVV field is Empty!!";

    document.getElementById("bank-card-number").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "bank-card-number-err-message"
    )[0].innerText = "";

    document.getElementById("expiry-date-month").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "expiry-date-month-err-message"
    )[0].innerText = "";

    document.getElementById("expiry-date-year").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "expiry-date-year-err-message"
    )[0].innerText = "";

    noErr = false;
  } else {
    document.getElementById("bank-card-number").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "bank-card-number-err-message"
    )[0].innerText = "";

    document.getElementById("expiry-date-month").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "expiry-date-month-err-message"
    )[0].innerText = "";

    document.getElementById("expiry-date-year").style.borderColor = "#ccc";
    document.getElementsByClassName(
      "expiry-date-year-err-message"
    )[0].innerText = "";

    document.getElementById("cvv").style.borderColor = "#ccc";
    document.getElementsByClassName("cvv-err-message")[0].innerText = "";

    noErr = true;
  }

  console.log(noErr, "noerr");
  if (noErr) {
    successPayment();
  }
}

function successPayment() {
  var d = new Date();
  const time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText == "true") {
        successCheckoutResponseMessage();
        clearShoppingCartCheckout();
      } else {
        console.log(this.responseText, "failure");
        failureCheckoutResponseMessage();
      }
    }
  };
  console.log(time, "time");
  xhttp.open(
    "GET",
    "CheckoutInsertDatabase.php?items=" +
      localStorage.getItem("shoppingCart") +
      "&time=" +
      time,
    true
  );
  xhttp.send();
}

function successCheckoutResponseMessage() {
  // Get the modal
  var responseModal = document.getElementsByClassName(
    "checkout-response-message-modal-class"
  )[0];

  document.getElementsByClassName("make-payment")[0].style.disabled = true;
  document.getElementsByClassName("make-payment")[0].style.opacity = 0.5;
  document.getElementsByClassName("make-payment")[0].style.pointerEvents =
    "none";

  document.getElementById("checkout-success-message").innerText =
    "Your order has been placed";
  document.getElementsByClassName(
    "checkout-response-message-modal-content"
  )[0].style.borderLeftColor = "#6ac259";

  // Get the <span> element that closes the modal
  var closeButton = document.getElementsByClassName(
    "checkout-response-message-modal-close"
  )[0];
  // When the user clicks the button, open the modal
  responseModal.style.display = "block";

  setTimeout(() => {
    responseModal.style.display = "none";
  }, 10000);

  // When the user clicks on <span> (x), close the modal
  closeButton.onclick = function() {
    responseModal.style.display = "none";
  };
}

function failureCheckoutResponseMessage() {
  var responseModal = document.getElementsByClassName(
    "checkout-response-message-modal-class"
  )[0];

  document.getElementById("checkout-success-message").innerText =
    "Something went wrong!";
  document.getElementsByClassName(
    "checkout-response-message-modal-content"
  )[0].style.borderLeftColor = "red";

  // Get the <span> element that closes the modal
  var closeButton = document.getElementsByClassName(
    "checkout-response-message-modal-close"
  )[0];
  console.log(closeButton, "closeButton");
  // When the user clicks the button, open the modal
  responseModal.style.display = "block";

  setTimeout(() => {
    responseModal.style.display = "none";
  }, 10000);

  // When the user clicks on <span> (x), close the modal
  closeButton.onclick = function() {
    responseModal.style.display = "none";
  };
}

function clearShoppingCartCheckout() {
  console.log(
    document.getElementsByClassName("checkout-tbody")[0].innerHTML,
    `document.getElementsByClassName("checkout-tbody")[0].innerHTML`
  );

  document.getElementsByClassName("checkout-tbody")[0].innerHTML = `<tr>
  <td>
      <p class="empty-checkout">Your Cart is empty, time to <a href="../Products/viewProducts.php" style="color:black;"> go shopping</a></p>
  </td>
  <td></td>
  <td></td>
</tr>`;

console.log(document.getElementById("bank-card-number").value, 'document.getElementById("bank-card-number").value')
  document.getElementById("bank-card-number").value = "";
  document.getElementById("expiry-date-month").value = "";
  document.getElementById("expiry-date-year").value = "";
  document.getElementById("cvv").value = "";

  document.getElementById("no-of-cart-items").innerText = 0;
  localStorage.removeItem("cartItemsQuantity");
  localStorage.removeItem("shoppingCart");
}
