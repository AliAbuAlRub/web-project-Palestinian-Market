<!DOCTYPE html>

<html>

<head>
    <link rel="stylesheet" type="text/css" href="../Checkout/Checkout.css">
    <link rel="stylesheet" type="text/css" href="../NavigationBar/navigationBar.css">
    <link rel="stylesheet" type="text/css" href="../BottomNavigationBar/bottomNavigationBar.css">
    <link rel="stylesheet" type="text/css" href="../Search/Search.css">
    <link rel="stylesheet" type="text/css" href="../Footer/Footer.css">

    <link rel="icon" href="../assets/palStoreIcon.png" type="image/x-icon">
   
    <script src="../isSetEmail.js"></script>
    <script src="Checkout.js" async></script>
    <script src="../Search/Search.js" async></script>
</head>

<body>
    <?php include "../NavigationBar/navigationBar.php" ?>
    <?php include "../Search/Search.php" ?>
    <?php include "../BottomNavigationBar/bottomNavigationBar.html" ?>
    <?php include "../AddNewProductModal/addNewProduct.php" ?>

    <div class="checkout">
        <h4>Check Out</h4>
        <hr style="opacity: 0.5;width: 787px;margin-right: 796px;" />
        <table class="checkout-table">
            <thead>
                <tr>
                    <th class="checkout-item checkout-first-column">Item</th>
                    <th class="checkout-quantity checkout-col-xs-2">Quantity</th>
                    <th class="checkout-total checkout-col-xs-2">Total</th>
                </tr>
            </thead>

            <tbody class="checkout-tbody">
                <tr>
                    <td>
                        <p class="empty-checkout">Your Cart is empty, time to <a href="../Products/viewProducts.php" style="color:black;"> go shopping</a></p>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="order-summary">
        <div class="h4-order-summary">
            <h4 style="margin-bottom:16px;">Order Summary</h4>
        </div>
        <div style="margin-bottom: 31px;padding-bottom: 12px;border-bottom: 1px dotted #ccc;width: 71px;">
            <span>Subtotal</span>
            <span class="checkout-totalprice">0 NIS</span>
        </div>
        <label>Card number</label><br />
        <input type="text" style="width: 100%;border-radius: 3px;border: 1px solid #ccc" id="bank-card-number" />
        <span class="bank-card-number-err-message" style="color: #ed3d3d;"></span>
        <br /> <br />
        <label>Expiry date</label>
        <label style="float: right;width: 45px;">CVV</label><br />
        <input type="text" placeholder="MM" style="width:28px;border-radius: 3px;border: 1px solid #ccc;text-align: center;" id="expiry-date-month" />
        /
        <input type="text" placeholder="YY" style="width:28px;border-radius: 3px;border: 1px solid #ccc;text-align: center;" id="expiry-date-year" />
        <span class="expiry-date-month-err-message" style="color: #ed3d3d;display: block;"></span>
        <span class="expiry-date-year-err-message" style="color: #ed3d3d;"></span>

        <input type="password" style="position:absolute;top: 225px;right:0px;width:43px;border-radius: 3px;border: 1px solid #ccc;" id="cvv" />
        <span style="float: right;color: #ed3d3d;" class="cvv-err-message"></span>

        <button class="make-payment">MAKE PAYMENT</button>
    </div>

    <div id="checkout-response-message-modal-id" class="checkout-response-message-modal-class">
        <!-- Modal content -->
        <div class="checkout-response-message-modal-content">
            <span class="checkout-response-message-modal-close">&times;</span>

            <span style="font-weight: bold;font-size: 18px;" id="checkout-success-message">Your order has been placed</span>
        </div>
    </div>
    <br /><br /><br /><br /><br /><br />
    <?php include "../Footer/Footer.php" ?>
</body>

</html>