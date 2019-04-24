<?php
	require_once "frontphp7/init.php";
	
	$dinamicTitle = "Biblioteca";
	
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
			$titlePage = "AJE-MS | ".$dinamicTitle;
			require_once "includes/head.php"; 
		?>
		
	</head>
	<body>
	
		<!-- Include Head -->
		<?php 
			$activeMenu = "biblioteca";
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

						<?php  
						

								/* Paginacao */
								$pagina = (isset($_REQUEST["pag"])) ? filter_var($_REQUEST["pag"], FILTER_SANITIZE_NUMBER_INT) : 1;

								/* Salva paginacao atual em sessao para mais tarde recuperar.. no noticia-single */
								$_SESSION["noticiaPagination"] = $pagina;

								/* Total de registros a ser mostrado na Paginação */
								$registros = 5;

								/* Pega total de registros */
								$getTotalRegistros = adminBiblioteca::getRowCount("identificador = 'biblioteca'");

								/* Calcula o numero de paginas arredondando o resultado para cima */
								$numPaginas = ceil($getTotalRegistros/$registros);

								//variavel para calcular o início da visualização com base na página atual 
								$inicio = ($registros*$pagina)-$registros; 

								/* alimenta var com as noticias */
								$todosDownloads = adminBiblioteca::getAllRegistersPagination("identificador = 'biblioteca'", "data_criacao desc", "{$inicio},{$registros}");

						?>
							<!-- page-single -->
							<div class="page-single">
								
								<!-- page-title -->
								<div class="page-title"> Biblioteca </div>

								<!-- page-body -->
								<div class="page-body">
									
									<?php 
										/* Caso o registro não esteja alimentado.. voltar para listagem */
										if(!$todosDownloads) {
											echo "Nenhum Registro encontrado!";
										} else { 

											foreach($todosDownloads as $row) { 

												/* tratando data */
												$dataTime = new DateTime($row["data_criacao"]);
												$data = $dataTime->format('d/m/Y');
												$hora = $dataTime->format('H:i');

												$fileSrc = (!empty($row["file_src"]) and file_exists("cms/".$row["file_src"]))? "cms/".$row["file_src"]:false;

												if($fileSrc) { 

									?>
										
											
												<!-- boxedBody -->
												<div class="boxedBody" style='position: relative; padding-right: 115px;'>
													
													<!-- boxedTitle -->
													<div class="boxedTitle"><?php echo $row["titulo"]; ?></div>

													<!-- boxedDesc -->
													<div class="boxedDesc"><?php echo $row["subtitulo"]; ?></div>

													<!-- btn download -->
													<a style='    position: absolute; right: 11px; top: 11px;' href="<?php echo $fileSrc; ?>" class="btn1" target="_blank"> Download </a>
													<!-- boxedData -->
													<div class="boxedData"> <b>Data:</b> <?php echo $data; ?> <b>Hora:</b> <?php echo $hora; ?> </div>

												</div>

									

										<?php } } ?>

										<!-- Pagination -->
										<div class="paginationx">
											<?php 
												echo adminBiblioteca::get_pagination_links($pagina, $numPaginas, "biblioteca.php");
											?>
										</div>

									<?php }  ?>

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