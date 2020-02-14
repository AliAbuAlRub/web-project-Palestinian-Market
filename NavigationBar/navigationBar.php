<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="navigationBar.css">
    <link rel="icon" href="../assets/palStoreIcon.png" type="image/x-icon">
    <script src="../ShoppingCart/ShoppingCart.js" async></script>
    <title>PalStore</title>
</head>

<body>

    <?php
    session_start();
    $topNavItems = "";

    if (isset($_SESSION['email'])) {

        if ($_SESSION['email'] == "admin@store.ps") {
            $topNavItems = '<a href="../SignIn/SignIn.php" class="top-navigationbar-link" onClick="unsetEmail()" >Logout</a>';
        }

        $topNavItems =
            '<a href="../SignIn/SignIn.php" class="top-navigationbar-link" onClick="unsetEmail()" >Logout</a>
            <a href="../Checkout/Checkout.php" class="top-navigationbar-link">Checkout</a>
            <a href="../ShoppingCart/ShoppingCart.php" class="top-navigationbar-link">Shopping Cart<span id="no-of-cart-items" >0</span></a>
            <a href="../MyAccount/MyAccount.php" class="top-navigationbar-link">My Account</a>';
    } else {
        if (strpos($_SERVER['REQUEST_URI'], "/SignIn/SignIn.php") !== false) {
            $topNavItems = '<a href="../SignUp/signUp.php" id="sign-in">Sign Up</a>';

        }else {
            $topNavItems = '<a href="../SignIn/SignIn.php" id="sign-in">Sign In</a>';
        }
    }
    ?>

    <nav class="navigationBar">

        <span>
            <a href="../Home/home.php" class="topNavBarLink">
                <span class="topNavBarSpan" id="PalStoreTitle">PalStore</span>
                <img class="topNavBarImg" src="../assets/palStoreIcon.png" alt="PalStore Icon">
            </a>
        </span>
        <?php echo $topNavItems; ?>

    </nav>

    <script>
        function unsetEmail() {
            var xhttp = new XMLHttpRequest();

            xhttp.open("GET", "../unsetSession.php", true);
            xhttp.send();
            localStorage.removeItem("shoppingCart");
            localStorage.removeItem("cartItemsQuantity");

        }

        if (localStorage.getItem('cartItemsQuantity')) {
            document.getElementById("no-of-cart-items").innerText = localStorage.getItem('cartItemsQuantity');
        }

        //active buttons
        var btns = document.getElementsByClassName("top-navigationbar-link");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
                var current = document.getElementsByClassName("active-top-navigationbar");
                console.log(current[0], "current[0]")
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
    </script>

</body>

</html>