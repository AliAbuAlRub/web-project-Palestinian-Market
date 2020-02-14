var productName = "";
var category = "";
var size = "";
var price = 0;
var remarks = "";
var description = "";
var imagesNotRemovedYet = [];
var removedImages = [];
var oldImagesLength = 0;

if (document.readyState == "loading") {
  console.log("loading");
  document.addEventListener("DOMContentLoaded", ready);
} else {
  console.log("hi");
  ready();
}

function ready() {
  console.log("ready");
  const editButton = document.getElementsByClassName(
    "view-product-edit-item"
  )[0];
  editButton.addEventListener("click", editProductModal);

  // getDataItemFromDatabaseToEdit();
}

function editProductModal() {
  console.log("editProductModal");
  getDataItemFromDatabaseToEdit();

  document.getElementsByClassName('edit-err-background')[0].style.display = "none";
    document.getElementById('edit-product-error-message').innerText = "";

  var modal = document.getElementById("edit-product-modal-id");
  modal.style.display = "block";
}

function onCancelEditmodal() {
  var isSomethingEdited = false;
  var editedProductName = document.getElementById("edit-product-name").value;
  var editedCategory = document.getElementById("edit-category").value;
  var editedSize = document.getElementById("edit-size").value;
  var editedPrice = document.getElementById("edit-price").value;
  var editedRemarks = document.getElementById("edit-remarks").value;
  var editedBriefDescription = document.getElementById("edit-description")
    .value;
  var newAndRemainigImages = [];
  var oldImages = document.getElementsByClassName(
    "file-input-edit-product-name-class"
  );
  var inputNewImages = document.getElementsByClassName(
    "input-edit-product-name-img-class"
  );

  if (
    editedProductName != productName ||
    editedCategory != category ||
    editedSize != size ||
    editedPrice != price ||
    editedRemarks != remarks ||
    editedBriefDescription != description
  ) {
    isSomethingEdited = true;
  }

  for (var i = 0; i < oldImages.length; i++) {
    console.log(
      oldImages[i].attributes.src.value,
      "oldImages[i].attributes.src.value"
    );
    newAndRemainigImages[i] = oldImages[i].attributes.src.value;
  }

  if (oldImages.length < oldImagesLength) {
    isSomethingEdited = true;
  }

  for (var i = 0; i < inputNewImages.length; i++) {
    if (inputNewImages[i].value != "") {
      isSomethingEdited = true;
    }
  }

  if(isSomethingEdited) {
    openContinueWithouSavingEditModal()
  }else {
    var editProductModal = document.getElementsByClassName(
      "edit-product-modal"
    )[0];
    
    editProductModal.style.display = "none";
  }

}

function continueEditing() {
  var modal = document.getElementById('continue-without-saving-edit-modal-id');
  modal.style.display = "none";
}

function dontContinueEditing() {
  var modal = document.getElementById('continue-without-saving-edit-modal-id');
  modal.style.display = "none";

  var modal = document.getElementById("edit-product-modal-id");
  modal.style.display = "none";  
}

function openContinueWithouSavingEditModal() {
  var modal = document.getElementById('continue-without-saving-edit-modal-id');

  modal.style.display = "block";
}

function getDataItemFromDatabaseToEdit() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const itemDetails = JSON.parse(this.responseText);
      console.log(itemDetails, "editProduct response");
      if (itemDetails) {
        productName = itemDetails.productName;
        category = itemDetails.category;
        size = itemDetails.size;
        price = itemDetails.price;
        remarks = itemDetails.remarks;
        description = itemDetails.briefDescription;
        oldImagesLength = itemDetails.pictures.split(",").length;
        imagesNotRemovedYet = itemDetails.pictures.split(",");

        document.getElementById("edit-product-name").value =
          itemDetails.productName;
        document.getElementById("edit-category").value = itemDetails.category;
        document.getElementById("edit-size").value = itemDetails.size;
        document.getElementById("edit-price").value = itemDetails.price;
        document.getElementById("edit-remarks").value = itemDetails.remarks;
        document.getElementById("edit-description").value =
          itemDetails.briefDescription;

        var images = itemDetails.pictures.split(",");
        console.log(images, "images");
        var inputImagesHTML = "";

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "edit-remove-img-button";
        removeButton.addEventListener("click", () => removeImg(removeButton));

        for (var i = 0; i < images.length; i++) {
          inputImagesHTML += `
                              <div class="image-edit-container">
                                <button title="Remove Image" 
                                onclick="removeImage(this)"
                                class="remove-image-button-edit" >
                                <img src="../assets/removeIcon.jpg" alt="Remove image" 
                                title="Remove Image" class="remove-image-icon-edit"/>
                                </button>
                                <img src="${images[i]}" alt="${itemDetails.productName}" 
                                class="file-input-edit-product-name-class" />
                                <br/>
                              </div>`;
        }

        inputImagesHTML +=
          '<hr class="hr-edit-product-modal"/> <label class="label-add-new-images-edit-modal">New Images:</label>';
        console.log(removeButton, "removeButton");
        console.log(inputImagesHTML, "inputImagesHTML");
        document.getElementsByClassName(
          "edit-img-container"
        )[0].innerHTML = inputImagesHTML;
      }
    }
  };

  const productID = window.location.search.slice(1);
  console.log(productID, "productid edit");
  xhttp.open(
    "GET",
    "../EditProduct/editProductDatabase.php?" + productID,
    true
  );
  xhttp.send();
}

function removeImage(elem) {
  console.log(elem.nextElementSibling.attributes.src.value, "elem src");
  const removedImage = elem.nextElementSibling.attributes.src.value;
  removedImages.push(removedImage);
  elem.parentElement.remove();
}

function addNewImage() {
  var input = document.createElement("input");
  input.type = "file";
  input.className = "input-edit-product-name-img-class";
  input.value = "";

  var removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className = "edit-remove-img-button";
  removeButton.addEventListener("click", () => removeImg(removeButton));

  var x = document.getElementsByClassName("edit-img-container")[0];
  x.appendChild(input);
  x.appendChild(removeButton);
}

function onEdit() {

  var isSomethingEdited = false;
  var editedProductName = document.getElementById("edit-product-name").value;
  var editedCategory = document.getElementById("edit-category").value;
  var editedSize = document.getElementById("edit-size").value;
  var editedPrice = document.getElementById("edit-price").value;
  var editedRemarks = document.getElementById("edit-remarks").value;
  var editedBriefDescription = document.getElementById("edit-description")
    .value;
  var newAndRemainigImages = [];
  var oldImages = document.getElementsByClassName(
    "file-input-edit-product-name-class"
  );
  var inputNewImages = document.getElementsByClassName(
    "input-edit-product-name-img-class"
  );
  var sumOfImages = 0;
  if (
    editedProductName != productName ||
    editedCategory != category ||
    editedSize != size ||
    editedPrice != price ||
    editedRemarks != remarks ||
    editedBriefDescription != description
  ) {
    isSomethingEdited = true;
  }

  for (var i = 0; i < oldImages.length; i++) {
    console.log(
      oldImages[i].attributes.src.value,
      "oldImages[i].attributes.src.value"
    );
    newAndRemainigImages[i] = oldImages[i].attributes.src.value;
  }

  if (oldImages.length < oldImagesLength) {
    isSomethingEdited = true;
  }

  for (var i = 0; i < inputNewImages.length; i++) {
    if (inputNewImages[i].value != "") {
      isSomethingEdited = true;
      ++sumOfImages;
      newAndRemainigImages.push(
        inputNewImages[i].value.replace("C:\\fakepath\\", "../assets/")
      );
    }
  }

  sumOfImages += oldImages.length;
  console.log(sumOfImages, "sumOfImages");
  var arrImagesToStr = newAndRemainigImages.toString();
console.log( isSomethingEdited,"isomethingedited")
  if (isSomethingEdited && sumOfImages > 2) {
    editDataProductInDatabase(
      editedProductName,
      editedCategory,
      editedSize,
      editedPrice,
      editedRemarks,
      editedBriefDescription,
      arrImagesToStr
    );
  }else if(sumOfImages <= 2) {
    console.log( isSomethingEdited,"iso<2222methingedited")

    document.getElementsByClassName('edit-err-background')[0].style.display = "block";
    document.getElementById('edit-product-error-message').innerText = "Images must be 3 or more";
  }else if(isSomethingEdited == false) {
    console.log( isSomethingEdited,"isifififiomethingedited")

    document.getElementsByClassName('edit-err-background')[0].style.display = "block";
    document.getElementById('edit-product-error-message').innerText = "Nothing to edit";

  }

  console.log(sumOfImages, "sumOfImages");

  console.log(newAndRemainigImages, "newAndRemainigImages");

  console.log(
    productName,
    category,
    size,
    price,
    remarks,
    description,
    imagesNotRemovedYet
  );
  console.log(
    "productName, category, size, price, remarks, description,imagesNotRemovedYet"
  );
}

function editDataProductInDatabase(
  editedProductName,
  editedCategory,
  editedSize,
  editedPrice,
  editedRemarks,
  editedBriefDescription,
  arrImagesToStr
) {
  var xhttp = new XMLHttpRequest();
  console.log("editDataProductInDatabase");

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText, "edited success or not");
      if (this.responseText == "true") {
        successEditResponseMessage();
      }else {
        console.log(this.responseText, "this.responseText");
        failureEditResponseMessage();
      }
    }else {
      console.log(this.responseText, "this.responseText");
      failureEditResponseMessage();
    } 
  };

  xhttp.open(
    "GET",
    "../EditProduct/editProductIntoDatabase.php?productName=" +
      editedProductName +
      "&category=" +
      editedCategory +
      "&size=" +
      editedSize +
      "&price=" +
      editedPrice +
      "&remarks=" +
      editedRemarks +
      "&description=" +
      editedBriefDescription +
      "&images=" +
      arrImagesToStr +
      "&" +
      window.location.search.slice(1),
    true
  );
  xhttp.send();
}

function successEditResponseMessage() {
  // Get the modal
  var responseModal = document.getElementsByClassName(
    "response-message-edit-modal-class"
  )[0];
  
  var editProductModal = document.getElementsByClassName(
    "edit-product-modal"
  )[0];
  
  editProductModal.style.display = "none";

  var message = document.getElementById('edit-success-message');
  message.innerText = "Data Updated Successfully";

  document.getElementsByClassName('response-message-edit-modal-content')[0].style.borderLeftColor = "#6ac259";

  // Get the <span> element that closes the modal
  var closeButton = document.getElementsByClassName(
    "response-message-edit-modal-close"
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

function failureEditResponseMessage() {
  // Get the modal
  var responseModal = document.getElementsByClassName(
    "response-message-edit-modal-class"
  )[0];

  var message = document.getElementById('edit-success-message');
  message.innerText = "Something went wrong";

  document.getElementsByClassName('response-message-edit-modal-content')[0].style.borderLeftColor = "red";
  // Get the <span> element that closes the modal
  var closeButton = document.getElementsByClassName(
    "response-message-edit-modal-close"
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