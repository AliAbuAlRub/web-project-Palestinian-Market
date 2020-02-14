<!doctype html>

<html>

<head>
    <link rel="stylesheet" type="text/css" href="../NavigationBar/navigationBar.css">
    <link rel="stylesheet" type="text/css" href="./SignIn.css">
    <link rel="stylesheet" type="text/css" href="../SignUp/signUp.css">
    <link rel="stylesheet" type="text/css" href="../Footer/Footer.css">

    <link rel="icon" href="../assets/palStoreIcon.png" type="image/x-icon">
</head>

<body>

    <?php
    session_start();
    if (!isset($_SESSION['email'])) {
        if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['signin'])) {

            $dbhost = "localhost";
            $dbname = "c105dbSchema_1163093_1161564";
            $dbuser = "c105_1163093_19";
            $dbpass = "comp334!";

            $pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);

            $sqlStatement = ("SELECT * FROM customers");

            $result = $pdo->query($sqlStatement);

            $rows = $result->fetchAll();

            $checkUserName = checkAuth($rows);

            $email = $_POST['email'];
            if ($checkUserName != "false") {
                session_start();
                $_SESSION['email'] = $email;
                $_SESSION['customerID'] = $checkUserName;
                header("location: ../Home/home.php");
                exit;
            }else if($email == "admin@store.ps" && $_POST['password'] == "hello"){
                session_start();
                $_SESSION['email'] = $email;
                header("location: ../Home/home.php");
                exit;
            } else {
                $messageError = "Wrong username or password";
            }
        }
    }else {
        header("location: ../Home/home.php");
    }

    function checkAuth($rows)
    {

        $isUser = "false";

        foreach ($rows as $row) {
            if ($row['email'] == $_POST['email']  && $row['password'] == $_POST['password']) {
                $isUser = $row['customerID'];
            }
        }
        return $isUser;
    }
    ?>

    <?php include "../NavigationBar/navigationBar.php" ?>
    <div class="bg"></div>
    <center>
        <div class="card" id="signinForm">
            <h3>Sign In</h3>
            <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                <center>
                    <div class="username">
                        <span class="usericonImg">
                            <img src="../assets/usericon.png" alt="user Icon" width="30px" height="30px" />
                        </span>
                        <input type="email" name="email" placeholder="Email" style="height: 23px;width: 230px;" required /><br /><br />
                    </div>

                    <div class="password">

                        <span class="passwordiconImg">
                            <img src="../assets/passwordiconn.png" alt="password Icon" width="30px" height="30px" />
                        </span>

                        <input type="password" name="password" placeholder="Password" style="height: 23px;width: 230px;" required />
                    </div>

                </center>
                <button class="signInBtn" name="signin">Sign In</button>

            </form>
            <div class="links">
                Don't have an account?
                <a href="../SignUp/signUp.php">Sign Up</a>
                <!-- <button onclick="loadDoc()" >SignUp </button> -->
            </div>
            <?php echo "<p> <strong style='color: red;'>" . $messageError . "</strong></p>"; ?>
        </div>
    </center>

    <script>
        localStorage.removeItem("cartItemsQuantity");
        localStorage.removeItem("shoppingCart");
    </script>

<?php include "../Footer/Footer.php" ?>

</body>

</html>