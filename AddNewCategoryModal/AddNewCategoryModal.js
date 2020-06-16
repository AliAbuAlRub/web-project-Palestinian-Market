if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  //delete commentsssdasd
  ready();
}

function ready() {
  var newCategoryProductModalBtn = document.getElementsByClassName(
    "add-new-category-button"
  )[0];
  newCategoryProductModalBtn.addEventListener("click", openNewCategoryModal);

  var addNewCategoryBtn = document.getElementsByClassName(
    "add-button-add-new-category"
  )[0];
  addNewCategoryBtn.addEventListener("click", addNewCategory);

  var cancelAddNewCategoryBtn = document.getElementsByClassName(
    "cancel-button-add-new-category"
  )[0];
  cancelAddNewCategoryBtn.addEventListener("click", cancelAddeNewCategory);

 var noModalBtn = document.getElementsByClassName('no-button-continue-without-saving-category')[0];
 noModalBtn.addEventListener('click', noCancelAddNewCategory);
 
 var yesModalBtn = document.getElementsByClassName('yes-button-continue-without-saving-category')[0];
 yesModalBtn.addEventListener('click', yesCancelAddNewCategory);
}



function openNewCategoryModal() {
  // Get the modal
  var modal = document.getElementById("add-new-category-modal");

  // When the user clicks the button, open the modal
  modal.style.display = "block";
}

function addNewCategory() {
  var categoryName = document.getElementById("category-name").value;
  var categoryID = document.getElementById("category-id").value;
  var categoryImg = document.getElementsByClassName(
    "file-input-new-category-img-class"
  )[0].value;
  var noErr = true;
  categoryImg = categoryImg.replace("C:\\fakepath\\", "../assets/");
  console.log(categoryID, categoryName, categoryImg);

  if (categoryName.trim() == "") {
    console.log(
      document.getElementsByClassName("category-err-background"),
      "empty catename"
    );
    document.getElementsByClassName(
      "category-err-background"
    )[0].style.display = "block";
    document.getElementById("categoty-modal-error-message").innerText =
      "Category Name field is empty!!";
    noErr = false;
  } else if (categoryID.trim() == "") {
    document.getElementsByClassName(
      "category-err-background"
    )[0].style.display = "block";
    document.getElementById("categoty-modal-error-message").innerText =
      "Category ID field is empty!!";
    noErr = false;
  } else if (categoryImg.trim() == "") {
    document.getElementsByClassName(
      "category-err-background"
    )[0].style.display = "block";
    document.getElementById("categoty-modal-error-message").innerText =
      "Category Image field is empty!!";
    noErr = false;
  }
  console.log(noErr, "noerr");
  if (noErr) {
    console.log("if norr");
    addCategoriesIntoDatabase(categoryName, categoryID, categoryImg);
  }
}

function addCategoriesIntoDatabase(categoryName, categoryID, categoryImg) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText, "category is set");
      if (this.responseText) {
        console.log("added succesfully");
        responseSuccessMessage();
        closeCategoryModal();
      }
    }
  };

  xhttp.open(
    "GET",
    "../AddNewCategoryModal/AddNewCategoryToDatabase.php?categoryName=" +
      categoryName +
      "&categoryID=" +
      categoryID +
      "&categoryImg=" +
      categoryImg,
    true
  );
  xhttp.send();
}

function responseSuccessMessage() {
  console.log("respon ");
  // Get the modal
  var responseModal = document.getElementsByClassName(
    "category-response-message-modal-class"
  )[0];

  // Get the <span> element that closes the modal
  var closeButton = document.getElementsByClassName(
    "category-response-message-modal-close"
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

function closeCategoryModal() {
  var modal = document.getElementById("add-new-category-modal");

  document.getElementById("category-name").value = "";
  document.getElementById("category-id").value = "";
  document.getElementsByClassName(
    "file-input-new-category-img-class"
  )[0].value = "";
  document.getElementsByClassName("category-err-background")[0].style.display =
    "none";
  document.getElementById("categoty-modal-error-message").innerText = "";
  // When the user clicks the button, open the modal
  modal.style.display = "none";
}

function cancelAddeNewCategory() {
  var categoryName = document.getElementById("category-name").value;
  var categoryID = document.getElementById("category-id").value;
  var categoryImg = document.getElementsByClassName(
    "file-input-new-category-img-class"
  )[0].value;
  var modal = document.getElementById(
    "continue-without-saving-category-modal-id"
  );
  var categoryModal = document.getElementById("add-new-category-modal");

  if (categoryName.trim() != "") {
    modal.style.display = "block";
  } else if (categoryID.trim() != "") {
    modal.style.display = "block";
  }else if(categoryImg != ""){
    modal.style.display = "block";
  }else {
    categoryModal.style.display = "none";
  }
}

function yesCancelAddNewCategory() {
  // Get the modal
  var modal = document.getElementById("add-new-category-modal");
  var continueWithouSavingModal = document.getElementById(
    "continue-without-saving-category-modal-id"
  );
   continueWithouSavingModal.style.display = "none";

  document.getElementById("category-name").value = "";
  document.getElementById("category-id").value = "";
  document.getElementsByClassName(
    "file-input-new-category-img-class"
  )[0].value = "";
  document.getElementsByClassName("category-err-background")[0].style.display =
    "none";
  document.getElementById("categoty-modal-error-message").innerText = "";

  // When the user clicks the button, open the modal
  modal.style.display = "none";
}

function noCancelAddNewCategory() {
  var modal = document.getElementById(
    "continue-without-saving-category-modal-id"
  );
  modal.style.display = "none";
}
