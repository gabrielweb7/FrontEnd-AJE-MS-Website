<?php
	require_once "frontphp7/init.php";
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
			$titlePage = "AJE-MS | Contato";
			require_once "includes/head.php"; 
		?>
		
	</head>
	<body>
	
		<!-- Include Head -->
		<?php 
			$activeMenu = "contato";
			require_once "includes/header.php"; 
		?>
		
		<!-- Section :: 1 -->
		<section class="pd-bottom-20 pd-top-20">

			<!-- page-single -->
			<div class="page-single">
								
				<!-- container -->
				<div class="container">
					
					<!-- page-title -->
					<div class="page-title"> Contato </div>

						<!-- page-body -->
						<div class="page-body" style="padding-top: 7px;">

							<!-- form -->
							<form id="contato" onsubmit="return false;">
								
								<!-- row -->
								<div class="row">
									
									<!-- col -->
									<div class="col-lg-3 col-md-3">
										<!-- label -->
										<label for="nome">Nome Completo <span>*</span></label>
										<!-- input -->
										<input type="text" name="nome" />
									</div>
									
									<!-- col -->
									<div class="col-lg-3 col-md-3">
										<!-- label -->
										<label for="nome">E-mail <span>*</span></label>
										<!-- input -->
										<input type="text" name="email" />
									</div>
									
									<!-- col -->
									<div class="col-lg-3 col-md-3">
										<!-- label -->
										<label for="nome">Telefone <span>*</span></label>
										<!-- input -->
										<input type="text" name="telefone" />
									</div>
									
									<!-- col -->
									<div class="col-lg-3 col-md-3">
										<!-- label -->
										<label for="nome">Assunto <span>*</span></label>
										<!-- input -->
										<input type="text" name="assunto" />
									</div>
									
									<!-- col -->
									<div class="col-lg-12 col-md-12">
										<!-- label -->
										<label for="nome">Mensagem <span>*</span></label>
										<!-- textarea -->
										<textarea name="mensagem"></textarea>
									</div>
									
									<!-- col -->
									<div class="col-lg-12 col-md-12">
										<!-- btn-submit -->
										<input type="submit" value="Enviar Mensagem" />
										
									</div>

								</div>

							</form>

						</div>
					</div>
				</div>

			</div>

			<!-- contatoResultAjax -->
			<div id="contatoResultAjax">
				<div class="container"> </div>
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