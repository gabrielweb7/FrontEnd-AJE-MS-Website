<?php
    /**
    * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
    *                   Criado por Gabriel Azuaga Barbosa
    *                  E-mail: gabrielbarbosaweb7@gmail.com
    *  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
    * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
    */

    /* Load Framework PHP created by Gabriel A. Barbosa */
    require "EnginePHP7/enginephp7.init.php";
  
	/* ****SECURITY**** Verifica se está logado ou não ****SECURITY**** */
	if(!autenticacaoUsuario::getStatusLogin()) {
		jsTools::redirecionar(RAIZ_DIR);
		die("o.o?");
	}

    /* Resetar sessoes do menu */
    adminMenu::unsetSessions();
    
?>

<!doctype html>
<html lang="en-us">
<head>
    <!-- Head -->
    <?php
      $pageTitle = "Dashboard";
      include "includes/head.php";
    ?>
</head>
<body>

<!-- App -->
<div id="app" class="<?php echo $configAppClass; ?>">

    <!-- inject-body-start:js -->
    <script src="<?php echo RAIZ_DIR; ?>assets/js/settings.js"></script>
    <!-- endinject -->

    <!--Begin Header-->
    <header id="header" class="header-wrap clearfix">

      <!-- Header-Tools -->
      <?php
	  	/* faicon (icon) */
		$faicon = "fa-home";
		/* headerTitle */
        $headerTitle = "Página Inicial";
        include "includes/header-tools.php";
      ?>

    </header>
    <!--End Header-->

    <!--Begin Loader-->
    <div class="page-loader loader-wrap" id="loader-wrap">
        <div class="loader loading-icon"></div>
    </div>
    <!--End Loader-->

    <!--Begin Content-->
    <section id="main" class="main-wrap bgc-white-darkest" role="main">
        <div class="container-fluid content-wrap">
            <div class="row panel-grid grid-stack" id="panel-grid">


            </div>
        </div>
    </section>
    <!--End Content-->

	<!--Begin Sidebar-->
	<?php 
		/* SetMenu */
		$setMenu = "dashboard";
		include "includes/sidebar.php"; 
	?>
	<!--End Sidebar-->

      <!-- Footer -->
      <?php include "includes/footer.php"; ?>

      <script>
          SystemJS.import('scripts/dash1');
      </script>

</body>
</html>
