<!doctype html>

<html>

<head>
    <link rel="stylesheet" type="text/css" href="../NavigationBar/navigationBar.css">
    <link rel="stylesheet" type="text/css" href="../SignIn/SignIn.css">
    <link rel="stylesheet" type="text/css" href="./signUp.css">
    <link rel="stylesheet" type="text/css" href="../Footer/Footer.css">
    
    <link rel="icon" href="../assets/palStoreIcon.png" type="image/x-icon">
</head>

<body>

    <?php
    session_start();
    if (!isset($_SESSION['email'])) {
        if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['signup'])) {

            $dbhost = "localhost";
            $dbname = "c105dbSchema_1163093_1161564";
            $dbuser = "c105_1163093_19";
            $dbpass = "comp334!";

            $pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);

            $sqlStatement = "INSERT INTO customers (address, DOB, email, telephone, faxNo, password, idNumber) VALUES (?,?,?,?,?,?,?)";

            $stmt = $pdo->prepare($sqlStatement);
            $status = $stmt->execute([$_POST['address'], $_POST['dateOfBirth'], $_POST['email'], $_POST['telephoneNo'], $_POST['faxNo'], $_POST['password'], $_POST['customerIDNumber']]);

            $last_id =  $pdo->query("SELECT LAST_INSERT_ID()");
            $message = $last_id->fetchColumn();
            $email = $_POST['email'];

            if ($status) {
                session_start();
                $_SESSION["newCustomerID"] = $message;
                $_SESSION['email'] = $email;

                header("location: ../Home/home.php");
                exit;
            } else {
                $message = 'error';
            }
        }
    } else {
        header("location: ../Home/home.php");
    }
    ?>


    <?php include "../NavigationBar/navigationBar.php" ?>
    <div class="bg"></div>
    <center>
        <div class="card">
            <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">

                <div class="signUp">

                    <h3>Sign Up</h3>
                    <div id="email">
                        <input type="email" name="email" placeholder="Email" style="height: 23px;width: 230px;" required />
                    </div>

                    <div id="password">
                        <input type="password" name="password" placeholder="Password" style="height: 23px;width: 230px;" required />
                    </div>

                    <div id="customer-id-number">
                        <input type="text" name="customerIDNumber" placeholder="ID number" style="height: 23px;width: 230px;" required />
                    </div>

                    <div id="address">
                        <input type="text" name="address" placeholder="Address" style="height: 23px;width: 230px;" required />
                    </div>

                    <div id="dateOfBirth">
                        <input type="date" name="dateOfBirth" placeholder="Password" style="height: 23px;width: 230px;" required />
                    </div>

                    <div id="telephoneNo">
                        <input type="number" name="telephoneNo" placeholder="Telephone Number" style="height: 23px;width: 230px;" required />
                    </div>

                    <div id="faxNo">
                        <input type="number" name="faxNo" placeholder="Fax Number" style="height: 23px;width: 230px;" required />
                    </div>

                    <button name="signup">Sign Up</button>
                </div>
                <?php echo "<p> <strong style='color: red;'>" . $message . "</strong></p>"; ?>

            </form>
            <div class="links">
                Already have an account?
                <a href="../SignIn/SignIn.php">Sign In</a>
            </div>
        </div>
    </center>

    <script>
        localStorage.removeItem("cartItemsQuantity");
        localStorage.removeItem("shoppingCart");
    </script>
<?php include "../Footer/Footer.php" ?>

</body>

</html>