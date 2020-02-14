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
      var html = "";
      console.log(this.responseText, "modal new");
      if (this.responseText) {
        var res = JSON.parse(this.responseText);
        for (var i = 0; i < res.length; i++) {
          html += `<option value="${res[i].CategoryName}">${res[i].CategoryName}</option> `;
        }

        document.getElementsByClassName(
          "categories-drop-menu-add-new-product-modal"
        )[0].innerHTML = html;
        console.log(html, "html");
      }
    } else {
      console.log(this.responseText, "this.responsetext");
    }
  };

  xhttp.open("GET", "../CategoriesHome.php", true);
  xhttp.send();

  ////////////////////////////////////////////////////////////////////////

  var addNewProductClass = document.getElementsByClassName(
    "add-new-item-button"
  )[0];
  console.log(addNewProductClass, "addnewProduct");
  addNewProductClass.addEventListener("click", addNewProductModal);
}

function addNewProductModal() {
  // Get the modal
  var modal = document.getElementById("add-new-product-modal");

  // When the user clicks the button, open the modal
  modal.style.display = "block";
}

function addNewImage() {
  var images = document.getElementsByClassName(
    "file-input-new-product-name-class"
  );
  //   var string = "";
  // console.log(images, "images")
  for (var i = 0; i < images.length; i++) {
    console.log(images[i].value);
  }
  string =
    '<input type="file"  class="file-input-new-product-name-class" value="" />';
  //  console.log(document.getElementsByClassName("add-new-img-container"), 'document.getElementsByClassName("add-new-img-container")')

  var input = document.createElement("input");
  input.type = "file";
  input.className = "file-input-new-product-name-class";
  input.value = "";

  var removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className = "remove-img-button";
  removeButton.addEventListener("click", () => removeImg(removeButton));

  var x = document.getElementsByClassName("add-new-img-container")[0];
  x.appendChild(input);
  x.appendChild(removeButton);
}

function removeImg(elem) {
  elem.previousElementSibling.remove();
  elem.remove();
}

function onCancel() {
  const productName = document.getElementById("prodcut-name");
  const category = document.getElementById("category");
  const size = document.getElementById("size");
  const price = document.getElementById("price");
  const remarks = document.getElementById("remarks");
  const description = document.getElementById("description");
  const images = document.getElementsByClassName(
    "file-input-new-product-name-class"
  );
  console.log("oncancel");
  checkOnCanceInputsValidation(
    productName,
    category,
    size,
    price,
    remarks,
    description,
    images
  );
}

function checkOnCanceInputsValidation(
  productName,
  category,
  size,
  price,
  remarks,
  description,
  images
) {
  var imagesCounter = 0;
  var leaveWithoutChanges = true;

  var errBackgroundMessage = document.getElementsByClassName(
    "err-background"
  )[0];

  var continueWithouSavingModal = document.getElementById(
    "continue-without-saving-modal-id"
  );
  var modal = document.getElementById("add-new-product-modal");

  // Get the <span> element that closes the modal
  // var span = document.getElementsByClassName("close-new-product-modal")[0];
  var noButton = document.getElementsByClassName(
    "no-button-continue-without-saving"
  )[0];

  var yesButton = document.getElementsByClassName(
    "yes-button-continue-without-saving"
  )[0];
  if (productName.value) {
    leaveWithoutChanges = false;
  } else if (category.value) {
    leaveWithoutChanges = false;
  } else if (size.value) {
    leaveWithoutChanges = false;
  } else if (price.value) {
    leaveWithoutChanges = false;
  } else if (remarks.value) {
    leaveWithoutChanges = false;
  } else if (description.value) {
    leaveWithoutChanges = false;
  } else {
    for (var i = 0; i < images.length; i++) {
      if (images[i].value) {
        imagesCounter++;
      }
    }
    console.log(imagesCounter, "counter");
    if (imagesCounter >= 1) {
      leaveWithoutChanges = false;
    }
  }
  console.log(leaveWithoutChanges, "leavebool");
  if (!leaveWithoutChanges) {
    // When the user clicks the button, open the modal
    continueWithouSavingModal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    noButton.onclick = function() {
      continueWithouSavingModal.style.display = "none";
    };

    yesButton.onclick = function() {
      continueWithouSavingModal.style.display = "none";
      modal.style.display = "none";
      errBackgroundMessage.style.display = "none";
      productName.value = "";
      category.value = "";
      size.value = "";
      price.value = "";
      remarks.value = "";
      description.value = "";
      document.getElementsByClassName("add-new-img-container")[0].innerHTML =
        "";
    };
  } else {
    modal.style.display = "none";
    errBackgroundMessage.style.display = "none";
  }
}

//////////////////////////////////////////////////////////////////////////

function onAdd() {
  const productName = document.getElementById("prodcut-name").value;
  // var category = document.getElementById("category").value;
  var category = document.getElementsByClassName(
    "categories-drop-menu-add-new-product-modal"
  )[0].value;
  const size = document.getElementById("size").value;
  const price = document.getElementById("price").value;
  const remarks = document.getElementById("remarks").value;
  const description = document.getElementById("description").value;
  const images = document.getElementsByClassName(
    "file-input-new-product-name-class"
  );

  category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  console.log(category, "category");
  // productName.charAt(0).toUpperCase() + productName.slice(1).toLowerCase();
  console.log(
    document.getElementsByClassName("add-button-add-new-product"),
    "disab"
  );
  document.getElementsByClassName(
    "add-button-add-new-product"
  )[0].disabled = true;
  document.getElementsByClassName(
    "add-button-add-new-product"
  )[0].style.opacity = "0.5";

  checkOnAddInputsValidation(
    productName,
    category,
    size,
    price,
    remarks,
    description,
    images
  );
}

function checkOnAddInputsValidation(
  productName,
  category,
  size,
  price,
  remarks,
  description,
  images
) {
  var imagesCounter = 0;
  var errBackgroundMessage = document.getElementsByClassName(
    "err-background"
  )[0];

  console.log(
    document.getElementsByClassName("add-button-add-new-product"),
    "disab"
  );

  console.log(size, "size");
  if (!productName) {
    errBackgroundMessage.style.display = "block";
    document.getElementById("error-message").innerHTML =
      "Product Name field is empty!!";

    document.getElementsByClassName(
      "add-button-add-new-product"
    )[0].disabled = false;
    document.getElementsByClassName(
      "add-button-add-new-product"
    )[0].style.opacity = "1";
  } else if (!category) {
    errBackgroundMessage.style.display = "block";
    document.getElementById("error-message").innerHTML =
      "Category field is empty!!";

    document.getElementsByClassName(
      "add-button-add-new-product"
    )[0].disabled = false;
    document.getElementsByClassName(
      "add-button-add-new-product"
    )[0].style.opacity = "1";
  } else if (!size) {
    errBackgroundMessage.style.display = "block";
    document.getElementById("error-message").innerHTML =
      "Size field is empty!!";

    document.getElementsByClassName(
      "add-button-add-new-product"
    )[0].disabled = false;
    document.getElementsByClassName(
      "add-button-add-new-product"
    )[0].style.opacity = "1";
  } else if (!price) {
    errBackgroundMessage.style.display = "block";
    document.getElementById("error-message").innerHTML =
      "Price field is empty!!";

    document.getElementsByClassName(
      "add-button-add-new-product"
    )[0].disabled = false;
    document.getElementsByClassName(
      "add-button-add-new-product"
    )[0].style.opacity = "1";
  } else if (!remarks) {
    errBackgroundMessage.style.display = "block";
    document.getElementById("error-message").innerHTML =
      "Remarks field is empty!!";

    document.getElementsByClassName(
      "add-button-add-new-product"
    )[0].disabled = false;
    document.getElementsByClassName(
      "add-button-add-new-product"
    )[0].style.opacity = "1";
  } else if (!description) {
    errBackgroundMessage.style.display = "block";
    document.getElementById("error-message").innerHTML =
      "Description field is empty!!";

    document.getElementsByClassName(
      "add-button-add-new-product"
    )[0].disabled = false;
    document.getElementsByClassName(
      "add-button-add-new-product"
    )[0].style.opacity = "1";
  } else {
    for (var i = 0; i < images.length; i++) {
      if (images[i].value) {
        imagesCounter++;
      }
    }
    console.log(imagesCounter, "counter");
    if (imagesCounter < 3) {
      errBackgroundMessage.style.display = "block";
      document.getElementById("error-message").innerHTML =
        "Must be 3 images or more";

      document.getElementsByClassName(
        "add-button-add-new-product"
      )[0].disabled = false;
      document.getElementsByClassName(
        "add-button-add-new-product"
      )[0].style.opacity = "1";
    } else if (isNaN(price)) {
      errBackgroundMessage.style.display = "block";
      document.getElementById("error-message").innerHTML =
        "Price field should be numberic data only!!";

      document.getElementsByClassName(
        "add-button-add-new-product"
      )[0].disabled = false;
      document.getElementsByClassName(
        "add-button-add-new-product"
      )[0].style.opacity = "1";
    } else {
      document.getElementById("error-message").innerHTML = "";
      errBackgroundMessage.style.display = "none";

      addDataToDatabase(
        productName,
        category,
        size,
        price,
        remarks,
        description,
        images
      );
    }
  }
}

function addDataToDatabase(
  productName,
  category,
  size,
  price,
  remarks,
  description,
  images
) {
  var xhttp = new XMLHttpRequest();

  var concatImages = "";
  for (var i = 0; i < images.length; i++) {
    // console.log(data[0][0].pictures.replace(/,.*$/, ""), "picture");
    console.log(images[i].value.replace("C:\\fakepath\\", "../assets/"));

    if (images[i].value) {
      if (i !== images.length - 1) {
        concatImages +=
          images[i].value.replace("C:\\fakepath\\", "../assets/") + ",";
      } else {
        concatImages += images[i].value.replace("C:\\fakepath\\", "../assets/");
      }
    }
  }

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText, "this.respons");

      if (this.responseText) {
        successResponseMessage();
        cleanInputs();
        // document.getElementById("add-new-product-modal").style.display = "none";
      }

      document.getElementsByClassName(
        "add-button-add-new-product"
      )[0].disabled = false;
      document.getElementsByClassName(
        "add-button-add-new-product"
      )[0].style.opacity = "1";
    }
  };

  xhttp.open(
    "GET",
    "../AddNewProductModal/addNewProductModalInsterToDatabase.php?productName=" +
      productName +
      "&category=" +
      category +
      "&size=" +
      size +
      "&price=" +
      price +
      "&remarks=" +
      remarks +
      "&description=" +
      description +
      "&images=" +
      concatImages,
    true
  );
  xhttp.send();
}

function successResponseMessage() {
  // Get the modal
  var responseModal = document.getElementsByClassName(
    "response-message-modal-class"
  )[0];
  var addNewProductModal = document.getElementsByClassName(
    "add-new-product-modal"
  )[0];
  addNewProductModal.style.display = "none";
  // Get the <span> element that closes the modal
  var closeButton = document.getElementsByClassName(
    "response-message-modal-close"
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

function cleanInputs() {
  var errBackgroundMessage = document.getElementsByClassName(
    "err-background"
  )[0];
  const productName = document.getElementById("prodcut-name");
  const category = document.getElementById("category");
  const size = document.getElementById("size");
  const price = document.getElementById("price");
  const remarks = document.getElementById("remarks");
  const description = document.getElementById("description");

  errBackgroundMessage.style.display = "none";
  productName.value = "";
  category.value = "";
  size.value = "";
  price.value = "";
  remarks.value = "";
  description.value = "";
  document.getElementsByClassName("add-new-img-container")[0].innerHTML = "";
}
