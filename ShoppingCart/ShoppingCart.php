<!DOCTYPE html>

<html>

<head>
    <link rel="stylesheet" type="text/css" href="../ShoppingCart/ShoppingCart.css">
    <link rel="stylesheet" type="text/css" href="../NavigationBar/navigationBar.css">
    <link rel="stylesheet" type="text/css" href="../BottomNavigationBar/bottomNavigationBar.css">
    <link rel="stylesheet" type="text/css" href="../AddNewProductModal/addNewProductModal.css">
    <link rel="stylesheet" type="text/css" href="../Search/Search.css">
    <link rel="stylesheet" type="text/css" href="../Footer/Footer.css">

    <link rel="icon" href="../assets/palStoreIcon.png" type="image/x-icon">

    <script src="../isSetEmail.js"></script>
    <script src="ShoppingCart.js" async></script>
    <script src="../AddNewProductModal/addNewProductModal.js"></script>
    <script src="../Search/Search.js" async></script>
</head>

<body>
    <?php include "../NavigationBar/navigationBar.php" ?>
    <?php include "../Search/Search.php" ?>
    <?php include "../BottomNavigationBar/bottomNavigationBar.html" ?>


    <div class="shopping-cart">
        <h4>Shopping Cart</h4>
        <hr style="opacity: 0.5;" />
        <table class="shopping-cart-table">
            <thead>
                <tr>
                    <th class="item first-column">Item</th>
                    <th class="size col-xs-2">Size</th>
                    <th class="price col-xs-2">Price</th>
                    <th class="quantity col-xs-2">Quantity</th>
                    <th class="total col-xs-2">Total</th>
                </tr>
            </thead>

            <tbody class="tbody">
                <tr>
                    <td>
                        <p class="empty-cart">Your Cart is empty, time to <a href="../Products/viewProducts.php" style="color:black;"> go shopping</a></p>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <span class="subtotal-span">Subtotal</span>
        <span class="total-price" id="subtotal">0 NIS</span>

            <button onClick="goToCheckOutPage()" class="checkout-button-link">
                Checkout
            </button>
    </div>
    <?php include "../Footer/Footer.php" ?>

</body>

</html>