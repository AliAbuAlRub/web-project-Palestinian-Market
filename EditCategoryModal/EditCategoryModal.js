let oldCategoryName = "";
let oldImgSrc = "";

if (document.readyState == "loading") {
  console.log("loading");
  document.addEventListener("DOMContentLoaded", ready);
} else {
  console.log("hi");
  ready();
}

function ready() {
  //   const editButton = document.getElementsByClassName("edit-category-button")[0];
  //   editButton.addEventListener("click", openEditCategoryModal);
}

function openEditCategoryModal(categoryID) {
  getCategoryDataItemFromDatabaseToEdit(categoryID);

  document.getElementById("edit-category-img").value = "";

  var modal = document.getElementById("edit-category-modal-id");
  modal.style.display = "block";
}

function getCategoryDataItemFromDatabaseToEdit(categoryID) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(this.responseText);
      oldCategoryName = res.CategoryName;
      oldImgSrc = res.CategoryImg;
      document.getElementById("edit-category-name").value = res.CategoryName;
      document.getElementById("edit-category-id").value = res.CategoryID;
    }
  };

  xhttp.open(
    "GET",
    "../EditCategoryModal/getCategoryDataFromDatabaseToedit.php?categoryID=" +
      categoryID,
    true
  );
  xhttp.send();
}

function onEdit() {
  var categoryName = document.getElementById("edit-category-name").value;
  var categoryImg = document.getElementById("edit-category-img").value;

  categoryImg = categoryImg.replace("C:\\fakepath\\", "../assets/");

  if (categoryName.trim() == oldCategoryName && categoryImg.trim() == "") {
    document.getElementsByClassName(
      "edit-category-err-background"
    )[0].style.display = "block";
    document.getElementById("edit-category-error-message").innerText =
      "Nothing to edit!!";
  } else if (categoryName.trim() == "") {
    document.getElementsByClassName(
      "edit-category-err-background"
    )[0].style.display = "block";
    document.getElementById("edit-category-error-message").innerText =
      "You can't set Category Name to empty!!";
  } else {
    editCategoryIntoDatabase(categoryName, categoryImg);
  }
}

function onCancelEditCategoryModal() {
  var categoryName = document.getElementById("edit-category-name").value;
  var categoryImg = document.getElementById("edit-category-img").value;
  var modal = document.getElementById(
    "continue-without-saving-edit-category-modal-id"
  );

  if (categoryName.trim() != oldCategoryName || categoryImg != "") {
      modal.style.display = "block";
  }else {
      closeEditCategoryModal();
  }


}

function editCategoryIntoDatabase(categoryName, categoryImg) {
  var img = categoryImg == "" ? oldImgSrc : categoryImg;
  var categoryID = document.getElementById("edit-category-id").value;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText, "edit categorymodal");

      if (this.responseText == "true") {
        closeEditCategoryModal();
        successEditCategoryResponseMessage();
      } else {
        failureEditCategoryResponseMessage();
      }
    }
  };

  xhttp.open(
    "GET",
    "../EditCategoryModal/EditCategoryDatabase.php?categoryName=" +
      categoryName +
      "&categoryImg=" +
      img +
      "&categoryID=" +
      categoryID,
    true
  );
  xhttp.send();
}

function closeEditCategoryModal() {
  var modal = document.getElementById("edit-category-modal-id");
  modal.style.display = "none";
}

function successEditCategoryResponseMessage() {
  var responseModal = document.getElementsByClassName(
    "response-message-edit-category-modal-class"
  )[0];

  // Get the <span> element that closes the modal
  var closeButton = document.getElementsByClassName(
    "response-message-edit-category-modal-close"
  )[0];
  console.log(closeButton, "closeButton");

  document.getElementById("edit-category-success-message").innerText =
    "Data Edited Successfully";
  document.getElementsByClassName(
    "response-message-edit-category-modal-content"
  )[0].style.borderLeftColor = "#6ac259";
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

function failureEditCategoryResponseMessage() {
  var responseModal = document.getElementsByClassName(
    "response-message-edit-category-modal-class"
  )[0];

  document.getElementById("edit-category-success-message").innerText =
    "Something went wrong";
  document.getElementsByClassName(
    "response-message-edit-category-modal-content"
  )[0].style.borderLeftColor = "red";
  // Get the <span> element that closes the modal
  var closeButton = document.getElementsByClassName(
    "response-message-edit-category-modal-close"
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

function continueEditingCategoryModal() {
    var modal = document.getElementById(
        "continue-without-saving-edit-category-modal-id"
      );

      modal.style.display = "none";
}

function dontContinueEditingCategoryModal() {
    var modal = document.getElementById(
        "continue-without-saving-edit-category-modal-id"
      );

      modal.style.display = "none";

      closeEditCategoryModal();      
}