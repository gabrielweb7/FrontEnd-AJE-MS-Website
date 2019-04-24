<?php
	require_once "frontphp7/init.php";
?>
<?php 

	$row = adminTextos::getRegister("identificadorFront = 'associados'");

?>
<!-- /**
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*                   Criado por Gabriel Azuaga Barbosa
*                  E-mail: gabrielbarbosaweb7@gmail.com
*  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*/ -->
<!doctype html>
<html lang="pt-br">
	<head>
		
		<!-- Include Head -->
		<?php 
			$titlePage = "AJE-MS | ".$row["titulo"];
			require_once "includes/head.php"; 
		?>
		
	</head>
	<body>
	
		<!-- Include Head -->
		<?php 
			$activeMenu = "associados";
			require_once "includes/header.php"; 
		?>
		
		<!-- Section :: 1 -->
		<section class="pd-bottom-20 pd-top-20">
			
			<!-- container -->
			<div class="container">
				
				<!-- row -->
				<div class="row">

					<!-- col -->
					<div class="col-lg-12 col-md-12">
					
						<!-- page-single -->
						<div class="page-single page-associados">
							
							<!-- page-title -->
							<div class="page-title"> <?php echo $row["titulo"]; ?> </div>

							<!-- page-body -->
							<div class="page-body">

								<?php echo html_entity_decode($row["texto"]); ?>
								<br />
									<!-- inscrição -->
									<a href="./quero-ser-um-associado" class="btn1 mg-top-20" style='margin: 0 auto;font-size:20px;'> QUERO SER UM ASSOCIADO </a>
							<br />

							</div>
						
						</div>

					</div>

				</div>

			</div>

		</section>
		
		<!-- Include subFooter -->
		<?php require_once "includes/subFooter.php"; ?>	

		<!-- Include Apoiadores -->
		<?php require_once "includes/apoiadores.php"; ?>
		
		<!-- Include Footer -->
		<?php require_once "includes/footer.php"; ?>
		
		<!-- Design e programação BY GABRIEL A. BARBOSA http://gabrieldaluz.com.br -->
		
	</body>
</html>