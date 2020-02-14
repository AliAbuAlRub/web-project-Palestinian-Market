<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="../ShoppingCart/ShoppingCart.css">
    <link rel="stylesheet" type="text/css" href="../NavigationBar/navigationBar.css">
    <link rel="stylesheet" type="text/css" href="../BottomNavigationBar/bottomNavigationBar.css">
    <link rel="stylesheet" type="text/css" href="../AddNewProductModal/addNewProductModal.css">
    <link rel="stylesheet" type="text/css" href="../Search/Search.css">
    <link rel="stylesheet" type="text/css" href="../Footer/Footer.css">
    <link rel="stylesheet" type="text/css" href="MyAccount.css">

    <link rel="icon" href="../assets/palStoreIcon.png" type="image/x-icon">
    <title>PalStore</title>

    <script src="Myaccount.js"></script>
    <script src="../isSetEmail.js" async></script>
    <script src="../Search/Search.js" async></script>
</head>

<body>
    <?php include "../NavigationBar/navigationBar.php" ?>
    <?php include "../Search/Search.php" ?>
    <?php include "../BottomNavigationBar/bottomNavigationBar.html" ?>

    <div class="my-account-container">
        <div class="col-xs-6">
            <div class="panel panel-success">
                <!-- <div class="panel-heading">Flex Table with Sticky Headers</div> -->
                <div class="panel-body panel-flex-table">
                    <table class="my-account-table flex-table table table-striped table-hover">
                        <thead>
                            <tr>
                                <th class="my-account-item checkout-first-column">Customer ID</th>
                                <th class="my-account-item checkout-first-column">Product ID</th>
                                <th class="my-account-quantity checkout-col-xs-2">Quantity</th>
                                <th class="my-account-total checkout-col-xs-2">Order Time</th>
                                <th class="my-account-total checkout-col-xs-2">Order Date</th>
                            </tr>
                        </thead>

                        <tbody class="my-account-tbody scroll">
                            <tr>
                                <td>
                                    <p class="empty-my-account">Your history is empty</p>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script>
        var btns = document.getElementsByClassName("top-navigationbar-link");

        for (var i = 0; i < btns.length; i++) {
            if (btns[i].innerText == "My Account" &&
                window.location.pathname.includes("/MyAccount/MyAccount.php")) {
                btns[i].className += " active-top-navigationbar";
            }
        }
    </script>
    <?php include "../Footer/Footer.php" ?>
</body>

</html>