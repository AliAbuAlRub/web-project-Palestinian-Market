<html>

<head>
    <link rel="stylesheet" type="text/css" href="./viewProduct.css">
    <link rel="stylesheet" type="text/css" href="../NavigationBar/navigationBar.css">
    <link rel="stylesheet" type="text/css" href="../BottomNavigationBar/bottomNavigationBar.css">
    <link rel="stylesheet" type="text/css" href="../AddNewProductModal/addNewProductModal.css">
    <link rel="stylesheet" type="text/css" href="../ViewSimilarProducts/viewSimilarProducts.css">
    <link rel="stylesheet" type="text/css" href="../EditProduct/editProduct.css">
    <link rel="stylesheet" type="text/css" href="../Search/Search.css">
    <link rel="stylesheet" type="text/css" href="../Footer/Footer.css">

    <link rel="icon" href="../assets/palStoreIcon.png" type="image/x-icon">

    <script src="../Search/Search.js" async></script>
    <script src="../isSetEmail.js"></script>
    <script src="../AddNewProductModal/addNewProductModal.js"></script>
    <script src="../ViewSimilarProducts/viewSimilarProducts.js"></script>
    <script src="../EditProduct/editProduct.js"></script>
</head>

<body>

    <?php include "../NavigationBar/navigationBar.php" ?>
    <?php include "../Search/Search.php" ?>
    <?php include "../BottomNavigationBar/bottomNavigationBar.html" ?>
    <?php include "../EditProduct/editProduct.php" ?>

    <?php
    $dbhost = "localhost";
    $dbname = "c105dbSchema_1163093_1161564";
    $dbuser = "c105_1163093_19";
    $dbpass = "comp334!";

    $pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $sqlStatement = ("SELECT * FROM products WHERE productID='" .  $_GET['id'] . "'");
    $result = $pdo->query($sqlStatement);
    $row = $result->fetch();

    $productDetails = getProductDetails($row);
    function getProductDetails($row)
    {
        // echo $row['productName'] . ' ' . $row['productID'] . ' ' . $row['category'] . ' ' . $row['price'];  
        $button = '<button class="addShoppingCart" onClick="addToCart(' . $row["productID"] . ')"> Add to cart </button>';
        $deleteBtn = "";
        session_start();
        if ($_SESSION['email'] == "admin@store.ps") {
            // $deleteBtn = '<button class="view-product-delete-item" onClick="deleteItem('.  $row["productID"] .')"> Delete </button>';
            $button = '<button class="view-product-edit-item" onClick="editItem(' . $row["productID"] . ')"> EDIT </button>';
        }

        $product = '
        <div style="margin-top: 20px;">
        <h1 style="display: inline;margin-left: 200px;"> ' . ucwords($row['productName'])  . ' </h1>'
            . $deleteBtn
            . $button .
            '</div>
        <div class="slideshow-container">
        ';
        $count = 0;

        foreach (explode(",", $row['pictures']) as $picture) {
            $count = ++$count;
            $product .=
                '<div class="mySlides fade">
            <div class="numbertext">' . $count . "/" . sizeof(explode(",", $row['pictures'])) . '</div>
            <img src="' . $picture . '" alt="' . $row['productName'] . '" width="100%" height="600px">
            </div>';
        }

        $product .= ' <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                      <a class="next" onclick="plusSlides(1)">&#10095;</a>
                      </div>
                      <br>';

        $product .= '
        <div class="productDetails">
        <label style="font-weight: bold;">Description:</label><br />
        <p>' . ucfirst($row['briefDescription']) . '</p>
            <h3>Product Details</h3>
            </hr>
            <label>Price:</label> <span style="opacity: 0.5;">' . $row['price'] . ' NIS</span><br />
            <label>Size:</label> <span style="opacity: 0.5;">' . ucfirst($row['size']) . '</span><br />
            <label>Category:</label> <span style="opacity: 0.5;" id="view-product-category">' . ucfirst($row['category']) . '</span><br />
            <label>Remarks:</label> <span style="opacity: 0.5;">' . ucfirst($row['remarks']) . '</span><br />
        </div>';

        return $product;
    }
    ?>

    <?php echo $productDetails ?>

    <?php include "../ViewSimilarProducts/ViewSimilarProducts.php" ?>

    <script>
        if (window.location.pathname.includes("/ViewProduct/viewProduct.php")) {
            document.getElementsByClassName('search-text-input-class')[0].style.height = "37px";
            document.getElementById('search-icon').style.height = "13px";
            document.getElementsByClassName('search-text-input-class')[0].style.width = "20.5%";
            // docum
        }

        var slideIndex = 1;
        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            if (n > slides.length) {
                slideIndex = 1
            }
            if (n < 1) {
                slideIndex = slides.length
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
        }

        function addToCart(id) {
            console.log(id)
            var oldItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            var isNewItem = false;

            var cartitemsQuantity = 0;

            for (var i = 0; i < oldItems.length; i++) {
                if (oldItems[i].productID === id) {
                    oldItems[i].quantity = oldItems[i].quantity + 1;
                    console.log(oldItems[i].quantity, "oldItems[i].quantity");
                    cartitemsQuantity += Number(oldItems[i].quantity);
                    console.log(cartitemsQuantity, "quantityfor")
                    isNewItem = true;
                } else {
                    cartitemsQuantity += Number(oldItems[i].quantity);
                }
            }
            console.log(document.getElementById("no-of-cart-items"));
            var newItem = {};

            if (!isNewItem) {
                newItem = {
                    productID: id,
                    quantity: 1
                };
                oldItems.push(newItem);
                cartitemsQuantity += 1;
                console.log(cartitemsQuantity, "quantityif")
            }

            document.getElementById("no-of-cart-items").innerText = cartitemsQuantity;
            localStorage.setItem('cartItemsQuantity', cartitemsQuantity);
            localStorage.setItem('shoppingCart', JSON.stringify(oldItems));
        }
    </script>
    <?php include "../Footer/Footer.php" ?>

</body>

</html>