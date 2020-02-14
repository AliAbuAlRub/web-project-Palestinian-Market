var customerID = 0;

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  
  getCustomerID();

  var xhttp = new XMLHttpRequest();

  setTimeout(() => {
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText, "customer id");
        var res = JSON.parse(this.responseText);
        console.log(res, "res account out");
        if (res.length != 0) {
          console.log(res.length, "res.length account");
          var html = "";
          for (var i = 0; i < res.length; i++) {
            console.log(i, res[i].customerID, "res[i].customerid")
            console.log(i ,customerID, "customerid")
            // if(res[i].customerID == customerID) {
              console.log(res[i], "if yes")
              html += `    <tr class="table-row" id="${res[i].productID}">
              <td>
              <p style="text-align: center;font-size: 39px;opacity: 0.6;" " class="my-account-quantity-item">
              ${res[i].customerID}
              </p>
              </td> 
              <td>
              <p style="text-align: center;font-size: 39px;opacity: 0.6;" " class="my-account-quantity-item">
              ${res[i].productID}
              </p>
              </td> 
            <td >
          <p style="text-align: center;font-size: 39px;opacity: 0.6;" " class="my-account-quantity-item">
                  ${res[i].quantity}
              </p>
            </td>
              <td >
                  <p style="text-align: center;font-size: 39px;opacity: 0.6;" " class="my-account-quantity-item">${res[i].orderTime}</p>
              </td>
              <td >
              <p style="text-align: center;font-size: 39px;opacity: 0.6;" " class="my-account-quantity-item">${res[i].orderDate}</p>
              </td>
         </tr>`;
            // }
            
          }
          console.log(html, "html");
          console.log(
            document.getElementsByClassName("my-account-tbody"),
            "document.getElementsByClassName('my-account-tbody')"
          );
          document.getElementsByClassName("my-account-tbody")[0].innerHTML = html;
        }
      }
    };
  }, );
 
  xhttp.open("GET", "MyAccountHistoryDatabase.php", true);
  xhttp.send();

  //       <tr class="table-row" id="${productID}">
  //       <td class="checkout-first-column">
  //       <img class="checkout-first-column-img" src="${picture}" alt="${productName}" />
  //       <span style="left: 376px;position: absolute;font-size: 31px">
  //       ${productName.charAt(0).toUpperCase() + productName.slice(1)}
  //       </span>
  //   </td>
  //   <td >
  //   <p style="text-align: center;font-size: 39px;opacity: 0.6;" id="${productID}" class="checkout-quantity-item">${quantity}</p>
  //    </td>
  //   <td class="checkout-table-cell">
  //       <div class="quantity-total-price">${price * quantity} NIS</div>
  //   </td>
  //   </tr>
}

function getCustomerID() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText, "id")
      customerID = this.responseText
    }
  };
  xhttp.open("GET", "../getCustomerID.php", true);
  xhttp.send();
}
