<?php if(isset($_GET["page"])) { $page = $_GET["page"]; } else { $page = "Accueil"; }; ?>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tweet Academy - <?php echo $page; ?></title>
    <link rel="icon" href="assets/images/logos/logo.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
    <link rel="stylesheet" href="assets/stylesheets/skeleton.css">
    <?php $links = scandir("assets/stylesheets/"); ?>
    <?php foreach($links as $link) { echo ($link != "." && $link != ".." && $link != "skeleton.css") ? "<link rel='stylesheet' href='assets/stylesheets/" . $link . "'>" : null; }; ?>
</head>