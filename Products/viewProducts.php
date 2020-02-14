<!doctype html>

<html>

<head>
    <link rel="stylesheet" type="text/css" href="../NavigationBar/navigationBar.css">
    <link rel="stylesheet" type="text/css" href="../BottomNavigationBar/bottomNavigationBar.css">
    <link rel="stylesheet" type="text/css" href="products.css">
    <link rel="stylesheet" type="text/css" href="../AddNewProductModal/addNewProductModal.css">
    <link rel="stylesheet" type="text/css" href="../Search/Search.css">
    <link rel="stylesheet" type="text/css" href="../Footer/Footer.css">

    <link rel="icon" href="../assets/palStoreIcon.png" type="image/x-icon">

    <script src="../Search/Search.js" async></script>
    <script src="../AddNewProductModal/addNewProductModal.js"></script>
    <script src="bottomNavigationBar.js" async></script>
    <script src="products.js" async></script>

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
    <?php include "products.php" ?>
    
    <div id="add-new-product-modal" class="add-new-product-modal">
        <!-- Modal content -->
        <div class="new-product-modal-content">
            <div class="add-new-product-header">
                <!-- <span class="close-new-product-modal">&times;</span> -->
                <h2 style="margin-bottom: 10px;">Add New Product</h2>
            </div>
            <hr style="margin-bottom: 15px;color: rgba(169, 169, 169, 0.5);width: 546px;" />

            <div class="new-product-modal-middle">
                <label class="label-new-product-modal">Product Name:</label>
                <input type="text" id="prodcut-name" class="input-new-product-name-class" value="" />
                <hr class="hr-add-new-product-modal" />

                <label class="label-new-product-modal">Category:</label>
                <!-- <input type="text" id="category" class="input-new-product-name-class" value="" /> -->
                <select class="categories-drop-menu-add-new-product-modal input-new-product-name-class" id="category" name="categories">

                </select>
                <hr class="hr-add-new-product-modal" />

                <label class="label-new-product-modal">Size:</label>
                <input type="text" id="size" class="input-new-product-name-class" value="" />
                <hr class="hr-add-new-product-modal" />

                <label class="label-new-product-modal">Price:</label>
                <input type="text" id="price" class="input-new-product-name-class" value="" />
                <hr class="hr-add-new-product-modal" />

                <label class="label-new-product-modal">Remarks:</label>
                <textarea id="remarks" class="textarea-new-product-name-class"></textarea>
                <hr class="hr-add-new-product-modal" />

                <label class="label-new-product-modal">Description:</label>
                <textarea id="description" class="textarea-new-product-name-class"></textarea>
                <hr class="hr-add-new-product-modal" />

                <label class="label-new-product-modal">Images:</label>
                <div class="add-new-img-container">
                    <!-- <input type="file" class="file-input-new-product-name-class" value="" />
                    <button class="remove-img-button" onclick="removeImg(this)">Remove</button>
                    <input type="file" class="file-input-new-product-name-class" value="" />
                    <button class="remove-img-button" onclick="removeImg(this)">Remove</button> -->

                </div>
                <button onclick="addNewImage()" style="margin-top: 10px;">Add New Image</button>

                <hr class="hr-add-new-product-modal" />

            </div>
            <hr style="margin-bottom: 15px;color: rgba(169, 169, 169, 0.5);width: 546px;" />
            <div style="text-align: center; width: 370px; position: absolute;display: none;
                        margin: 8px; background-color: #fff3cd; height: 36px;border-color: #ffeeba;" class="err-background">
                <strong id="error-message" style="vertical-align: -webkit-baseline-middle;color: red;"></strong>
            </div>
            <div style="float: right;padding: 7px;margin-right: 10px;">
                <button class="cancel-button-add-new-product" onclick="onCancel()">Cancel</button>
                <button class="add-button-add-new-product" onclick="onAdd()">Add</button>
            </div>
        </div>

        <div id="continue-without-saving-modal-id" class="continue-without-saving-modal-class">
            <!-- Modal content -->
            <div class="continue-without-saving-modal-content">
                <h2 style="margin-bottom: 10px;">Continue without saving</h2>
                <hr style="margin-bottom: 15px;" />
                <div style="text-align: center; width: 538px;border-radius: 4px;
                        margin: 20px auto 20px auto; background-color: #fff3cd; height: 36px;border-color: #ffeeba;">
                    <strong id="error-message" style="vertical-align: -webkit-baseline-middle;color: #856404;">
                        Are you sure you want to leave without continuing adding a new product?
                    </strong>
                </div>
                <hr />

                <div style="float: right;padding: 7px;margin-right: 10px;">
                    <button class="no-button-continue-without-saving">No</button>
                    <button class="yes-button-continue-without-saving" onclick="">Yes</button>
                </div>

            </div>
        </div>



    </div>

    <div id="response-message-modal-id" class="response-message-modal-class">
        <!-- Modal content -->
        <div class="response-message-modal-content">
            <span class="response-message-modal-close">&times;</span>

            <span style="font-weight: bold;font-size: 18px;" id="success-message">Data Inserted Successfully</span>
        </div>
    </div>
    <?php include "../Footer/Footer.php" ?>

</body>

</html>