<!DOCTYPE html>

<html>


<head>
    <link rel="stylesheet" type="text/css" href="../NavigationBar/navigationBar.css">
    <link rel="stylesheet" type="text/css" href="../BottomNavigationBar/bottomNavigationBar.css">
    <link rel="stylesheet" type="text/css" href="searchResults.css">
    <link rel="stylesheet" type="text/css" href="../Search/Search.css">
    <link rel="stylesheet" type="text/css" href="../Footer/Footer.css">


    <link rel="icon" href="../assets/palStoreIcon.png" type="image/x-icon">

    <script src="../isSetEmail.js"></script> 
    <script src="searchResults.js" async></script>
    <script src="../Search/Search.js" async></script>
</head>

<body>

    <?php include "../NavigationBar/navigationBar.php" ?>
    <?php include "../Search/Search.php" ?>
    <?php include "../BottomNavigationBar/bottomNavigationBar.html" ?>

    <input type="number" placeholder="filter by price"  onkeyup="filterByPrice()" class="filter-by-price"/>
    <input type="radio" name="filter" onclick="filterByPrice()" class="radio-button-search-result" value="greater" checked>greater
    <input type="radio" name="filter" onclick="filterByPrice()" class="radio-button-search-result" value="smaller">smaller
    <input type="radio" name="filter" onclick="filterByPrice()" class="radio-button-search-result" value="equal">equal
    <div class="search-results-container">
        
         <!-- <div class="per-element-search-result">
            <img src="../assets/ceramic3.jpg" class="search-results-image" />
            <div class="search-results-text-content">
                <h4>Cermaic</h4>
                <p>hahahhahahhaskdasoaksodkaskdoaksdkaskdaoskdokaskdaksdnasfnnjnsdssdmasm</p>
            </div>
            <label>Price:</label><span class="search-result-price">25 NIS</span>
            <button class="search-result-add-to-cart-button">Add to cart</button>
        </div> -->

        <!--<div class="per-element-search-result">
            <img src="../assets/ceramic3.jpg" class="search-results-image" />
            <div class="search-results-text-content">
                <h4>Cermaic</h4>
                <p>hahahhahahhaskdasoaksodkaskdoaksdkaskdaoskdokaskdaksdnasfnnjnsdssdmasm</p>
            </div>
        </div> -->
    </div>
    <?php include "../Footer/Footer.php" ?>
</body>

</html>