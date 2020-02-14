<!DOCTYPE html>

<html>

<head>
    <link rel="stylesheet" type="text/css" href="AboutUs.css">
    <link rel="stylesheet" type="text/css" href="../NavigationBar/navigationBar.css">
    <link rel="stylesheet" type="text/css" href="../BottomNavigationBar/bottomNavigationBar.css">
    <link rel="stylesheet" type="text/css" href="../Search/Search.css">
    <link rel="stylesheet" type="text/css" href="../Footer/Footer.css">
    
    <link rel="icon" href="../assets/palStoreIcon.png" type="image/x-icon">


    <script src="../isSetEmail.js"></script> 
    <script src="../Search/Search.js" async></script>
</head>

<body>

    <?php include "../NavigationBar/navigationBar.php" ?>
    <?php include "../Search/Search.php" ?>
    <?php include "../BottomNavigationBar/bottomNavigationBar.html" ?>

    <div class="aboutus-container">

        <p><span style="color: red;">*</span> This site is hypothetical and was created as a term project for COMP334 Course at Birzeit University</p>

        <p>The store is marketing Palestinian’s souvenirs for international customers. </p>
        <p>This website is built by Ali Abu Al Rub(1163093) and Abdullah Zyoud(1161564)</p>

        <h2 style="text-decoration: underline;font-weight: bold;">What each member implement?</h2>

        <h4>Ali Abu Al Rub</h4>
        <ol>
            <li>Login page</li>
            <li>Add New Product by the admin</li>
            <li>Shopping cart page</li>
            <li>Edit Product</li>
            <li>Search</li>
            <li>Checkout</li>
            <li>Filtering</li>
            <li>Home Page</li>
            <li>My Account</li>
            <li>Show a specific category</li>
            <li>Edit Category</li>
        </ol>

        <h4>Abdullah Zyoud</h4>
        <ol>
            <li>SignUp</li>
            <li>View product</li>
            <li>Add to cart</li>
            <li>View Similar products</li>
            <li>Contact Us</li>
            <li>Show the categories in the (Home) page</li>
            <li>About Us</li>
            <li>Add New Category</li>
        </ol>
    </div>

    <script>
        var btns = document.getElementsByClassName("bottom-nav-bar");

        for (var i = 0; i < btns.length; i++) {
            if (
                btns[i].innerText.includes("About Us") &&
                window.location.pathname.includes("/AboutUs/AboutUs.php")
            ) {
                btns[i].className += " active-bottom-navigationbar";
            }
        }

    </script>
    <?php include "../Footer/Footer.php" ?>
</body>

</html>