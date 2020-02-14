<!doctype html>

<html>

<head>
    <link rel="stylesheet" type="text/css" href="./products.css">
</head>

<body>

    <?php

    $dbhost = "localhost";
    $dbname = "c105dbSchema_1163093_1161564";
    $dbuser = "c105_1163093_19";
    $dbpass = "comp334!";

    $pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $sqlStatement = ("SELECT * FROM products");

    $result = $pdo->query($sqlStatement);
    $rows = $result->fetchAll();

    $prdoucts = getProducts($rows);



    function getProducts($rows)
    {
        $prdoucts = "";
        $imgURL = "";
        $isEmailSet = "";
        $counter = 0;
        session_start();

        foreach ($rows as $row) {
            $counter = ++$counter;

            foreach (explode(",", $row['pictures']) as $picture) {
                $imgURL = $picture;
                break;
            }

            if (isset($_SESSION['email']) && $_SESSION['email'] != "admin@store.ps") {
                $isEmailSet = '
                    <button onClick="viewProduct(' . $row["productID"] . ')"> View Product </button>
                    <button onClick="addToCart(' . $row["productID"] . ')"> Add to cart </button>
                ';
            } else if (isset($_SESSION['email']) && $_SESSION['email'] == "admin@store.ps") {
                $isEmailSet = '
                  <button onClick="viewProduct(' . $row["productID"] . ')" > View Product </button>
                  <button onClick="addToCart(' . $row["productID"] . ')" style="opacity:0.5;" class="disabled-add-to-cart-button" disabled> Add to cart </button>
                ';
            } else {
                $isEmailSet = '
                    <button onClick="onClick()"> View Product </button>
                    <button onClick="onClick()"> Add to cart </button>
                ';
            }

            $prdoucts .= '
            <span class=productContainer>
            <img src="' . $imgURL . '" alt="' . $row["productName"] . '" class="productImg" width="150px" height="150px"/>
            <div class="productContent">
                <h4>' . ucwords($row["productName"]) . '</h4>
                <div class="price" >' . $row["price"] . ' NIS</div>
                ' . $isEmailSet . '
            </div>
        </span>';
        }

        return $prdoucts;
    }
    ?>

    <div class="container" id="products">
        <?php echo $prdoucts; ?>
    </div>

    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 style="margin-bottom: 10px;">Sign In</h2>
            <hr style="margin-bottom: 15px;" />
            <span style="font-weight: bold;font-size: 18px;">Sign In to Continue</span>
            <a href="../SignIn/SignIn.php">Sign In</a>
        </div>
    </div>


    <script>
        function onClick() {

            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks the button, open the modal 
            modal.style.display = "block";

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }

        function viewProduct(id) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("products").innerHTML =
                        this.responseText;
                }
            };
            // xhttp.open("GET", "../ViewProduct/viewProduct.php", true);
            window.location = "../ViewProduct/viewProduct.php?id=" + id
            xhttp.send();
        }

        function addToCart(id) {
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
            // document.getElementById("no-of-cart-items").style.display = "inline";

            localStorage.setItem('cartItemsQuantity', cartitemsQuantity);

            localStorage.setItem('shoppingCart', JSON.stringify(oldItems));
        }

        if (document.getElementsByClassName('disabled-add-to-cart-button')) {
            var addToCartButtons = document.getElementsByClassName('disabled-add-to-cart-button');

            for (var i = 0; i < addToCartButtons.length; i++) {
                     addToCartButtons[i].style.pointerEvents = "none";
            }
        }
    </script>
</body>

</html>