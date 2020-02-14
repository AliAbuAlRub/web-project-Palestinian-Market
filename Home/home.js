if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // var newCategoryProductModalBtn = document.getElementsByClassName('add-new-category-button')[0];
  // newCategoryProductModalBtn.addEventListener("click", openNewCategoryModal);

  var btns = document.getElementsByClassName("bottom-nav-bar");

  for (var i = 0; i < btns.length; i++) {
    if (
      btns[i].innerText.includes("Home") &&
      window.location.pathname.includes("/Home/home.php")
    ) {
      btns[i].className += " active-bottom-navigationbar";
    }
  }

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var html = "";
      console.log(this.responseText, "modal new");
      if (this.responseText) {
        var res = JSON.parse(this.responseText);

        //     <div class="home-content">
        //     <a href="../Category/Category.php?category=Food" >
        //     <img src="../assets/foodCategory.jpg" alt="Food category" class="category-home-img"/>
        //     </a>
        // </div>

        for (var i = 0; i < res.length; i++) {
          html += ` <div class="home-content">
                      <button class="edit-category-button" onclick="openEditCategoryModal('${res[i].CategoryID}')" title="Edit Category">
                        <img src="../assets/editIconCategory.png" alt="Edit Category" class="edit-category-icon"/>
                      </button>
                        <a href="../Category/Category.php?category=${res[i].CategoryName}">
                            <img src="${res[i].CategoryImg}" alt="${res[i].CategoryName}" class="category-home-img" />
                        </a>
                        <p class="category-name">${res[i].CategoryName}</p>
                    </div>`;
        }
        console.log(
          document.getElementsByClassName("home-container"),
          'document.getElementsByClassName("home-container")'
        );
        document.getElementsByClassName("home-container")[0].innerHTML = html;
        console.log(html, "html");
        
        shouldDisableEditCateogryBtn();
        // isAdmin()
      }
    } else {
      console.log(this.responseText, "this.responsetext");
    }
  };

  xhttp.open("GET", "../CategoriesHome.php", true);
  xhttp.send();

  ////////////////////////////////////



  
}

function shouldDisableEditCateogryBtn() {
  
    console.log("shouldDisableEditCateogryBtn 0")
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText, "asdfda");
        if (this.responseText == "true") {
          // document.getElementsByClassName(
          //   "edit-category-button"
          // )[0].style.display = "block";
  console.log('this.responseText == "true" homenew')
          if (!window.location.pathname.includes("/Home/home.php")) {
            document.getElementsByClassName(
              "edit-category-button"
            )[0].style.display = "none";
          }
        } else {
          console.log("else");
          var editCategoryBtn = document.getElementsByClassName(
            "edit-category-button"
          );
          console.log(editCategoryBtn.length, "edi");
          for (var i = 0; i < editCategoryBtn.length; i++) {
            console.log(editCategoryBtn[i], "homejasidk");
            editCategoryBtn[i].style.display = "none";
            editCategoryBtn[i].style.pointerEvents = "none";
          }
        }
      }
    };
  
    xhr.open("GET", "../isAdmin.php?isAdmin=false", true);
    xhr.send();  
}

// function openNewCategoryModal() {
//    // Get the modal
//    var modal = document.getElementById("add-new-category-modal");

//    // When the user clicks the button, open the modal
//    modal.style.display = "block";
// }
