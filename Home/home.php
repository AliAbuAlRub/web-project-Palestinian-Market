<!doctype html>

<html>

<head>
    <link rel="stylesheet" type="text/css" href="../NavigationBar/navigationBar.css">
    <link rel="stylesheet" type="text/css" href="../BottomNavigationBar/bottomNavigationBar.css">
    <link rel="stylesheet" type="text/css" href="home.css">
    <link rel="stylesheet" type="text/css" href="../Search/Search.css">
    <link rel="stylesheet" type="text/css" href="../Footer/Footer.css">
    <link rel="stylesheet" type="text/css" href="../AddNewCategoryModal/AddNewCategoryModal.css">
    <link rel="stylesheet" type="text/css" href="../EditCategoryModal/EditCategoryModal.css">

    <link rel="icon" href="../assets/palStoreIcon.png" type="image/x-icon">

    <script src="../EditCategoryModal/EditCategoryModal.js"></script>
    <script src="../isSetEmail.js"></script>
    <script src="../AddNewCategoryModal/AddNewCategoryModal.js"></script>
    <script src="bottomNavigationBar.js" async></script>
    <script src="home.js" async></script>
    <script src="../Search/Search.js" async></script>
</head>

<body>

    <?php
    session_start();
    $time = $_SESSION["newCustomerID"];
    if (isset($_SESSION["newCustomerID"])) {
        echo "<script>alert('Your id is= $_SESSION[newCustomerID]');</script>";
        unset($_SESSION["newCustomerID"]);
    }
    ?>

    <?php include "../NavigationBar/navigationBar.php" ?>
    <?php include "../Search/Search.php" ?>
    <?php include "../BottomNavigationBar/bottomNavigationBar.html" ?>
    <?php include "../AddNewCategoryModal/AddNewCategoryModal.php" ?>
    <?php include "../EditCategoryModal/EditCategoryModal.php" ?>

    <h2 style="margin: 27px 250px -56px;text-decoration: underline;">Categories</h2>
    <div class="home-container">

        <div class="home-content">
            <!-- <button class="edit-category-button" onclick="openEditCategoryModal('beaut-0001')">
                <img src="../assets/editIconCategory.png" alt="Edit Category" class="edit-category-icon"/>
            </button>
            <a href="../Category/Category.php?category=Food">
                <img src="../assets/foodCategory.jpg" alt="Food category" class="category-home-img" />
            </a>
            <p class="category-name">food</p>
        </div>

        <div class="home-content">
            <button class="edit-category-button" title="Edit Category">
                <img src="../assets/editIconCategory.png" alt="Edit Category" class="edit-category-icon"/>
            </button>
            <a href="../Category/Category.php?category=Food">
                <img src="../assets/foodCategory.jpg" alt="Food category" class="category-home-img" />
            </a>
            <p class="category-name">food</p>
        </div> -->
        </div>
    </div>
    <?php include "../Footer/Footer.php" ?>
</body>

</html>