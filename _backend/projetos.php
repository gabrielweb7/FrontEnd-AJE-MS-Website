<?php
	require_once "frontphp7/init.php";

	/* Recebe id */
	$id = (isset($_REQUEST["id"])) ? filter_var(strtolower($_REQUEST["id"]),FILTER_SANITIZE_STRING) : false;

	/* Caso ID exista.. */
	if($id) { 

		/* Gambiarra nivel 2 .. caso isolado... que pode acontecer... */
		if($id == "batom-e-prosa") { $id = "batom-&-prosa"; }

		/* Trocar caractere '-' para espaço ' ' */
		$id = str_replace("-", " ", $id);

		$row = adminProjetos::getRegister("titulo = '{$id}'");

		/* Caso o registro não esteja alimentado.. voltar para listagem */
		if(!$row) {
			tools::jsRedirecionar(RAIZ_DIR."projetos");
		}

		/* Seta titulo da pagina dinamico */
		$dinamicTitle = strip_tags($row["titulo"]);

	} else { 
		$dinamicTitle = "Projetos";
	}

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
			$activeMenu = "projetos";
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
							if(!$id) { 

								/* Paginacao */
								$pagina = (isset($_REQUEST["value"])) ? filter_var($_REQUEST["value"], FILTER_SANITIZE_NUMBER_INT) : 1;

								/* caso página for igual a zero.. desbugar.. fix */
								if($pagina == "0") { $pagina = 1; }

								/* Salva paginacao atual em sessao para mais tarde recuperar.. no noticia-single */
								$_SESSION["projetoPagination"] = $pagina;

								/* Total de registros a ser mostrado na Paginação */
								$registros = 6;

								/* Pega total de registros */
								$getTotalRegistros = adminProjetos::getRowCount("identificador = 'projetos'");

								/* Calcula o numero de paginas arredondando o resultado para cima */
								$numPaginas = ceil($getTotalRegistros/$registros);

								//variavel para calcular o início da visualização com base na página atual 
								$inicio = ($registros*$pagina)-$registros; 

								/* alimenta var com as noticias */
								$todosRegistros = adminProjetos::getAllRegistersPagination("identificador = 'projetos'", "data_criacao desc", "{$inicio},{$registros}");

								
						?>
							<!-- page-single -->
							<div class="page-single">
								
								<!-- page-title -->
								<div class="page-title"> Projetos </div>

								<!-- page-body -->
								<div class="page-body">
									
									<?php 

											/* Caso o registro não esteja alimentado.. voltar para listagem */
										if(!$todosRegistros) {
											echo "Nenhum Registro encontrado!";
										} else { 


											foreach($todosRegistros as $row) { 

												/* tratando data */
												$dataTime = new DateTime($row["data_criacao"]);
												$data = $dataTime->format('d/m/Y');
												$hora = $dataTime->format('H:i');

												/* Imagem existe ? */
												$row["imagem_src"] = (!empty($row["imagem_src"]) and file_exists("cms/".$row["imagem_src"]))? "cms/".$row["imagem_src"]:false;

												/* Preparando Title ID */
												$titleId = strtolower($row["titulo"]);
												$titleId = str_replace("&", "e", $titleId);
												$titleId = str_replace(" ", "-", $titleId);

											?>

											<?php if($row["imagem_src"]) {  ?>
												<!-- a -->
												<a href="./projetos/<?php echo $titleId; ?>">
												
													<!-- boxedBody -->
													<div class="boxedImagem">
														
														<!-- boxedTitle -->
														<!-- <div class="boxedTitle"><?php echo $row["titulo"]; ?></div> -->
					
														<img src="<?php echo $row["imagem_src"]; ?>" />													
														<!-- boxedData -->
														<!-- <div class="boxedData"> <b>Data:</b> <?php echo $data; ?> <b>Hora:</b> <?php echo $hora; ?> </div> -->

													</div>
												</a>
											<?php } ?>


										<?php } ?>

										<!-- Pagination -->
										<div class="paginationx">
											<?php 
												echo adminProjetos::get_pagination_links($pagina, $numPaginas, RAIZ_DIR."projetos/pag/");
											?>
										</div>

									<?php } ?>


								</div>

							</div>
						<?php 

							} else {  

							/* Imagem existe ? */
							$row["imagem_src"] = (!empty($row["imagem_src"]) and file_exists("cms/".$row["imagem_src"]))? "cms/".$row["imagem_src"]:false;

						
							$dataTime = new DateTime($row["data_criacao"]);
							$data = $dataTime->format('d/m/Y');
							$hora = $dataTime->format('H:i');

						?>
							<!-- Projeto Single-->
							<div class="projeto-single">

								<!-- Titulo -->
								<div class="titulo"> <?php echo $row["titulo"]; ?>  </div>

								<?php if($row["imagem_src"]) {  ?>
									<!-- Imagem -->
									<div class="imagem">
										<img src="<?php echo $row["imagem_src"]; ?>" />
									</div>
								<?php } ?>

								<!-- Conteudo -->
								<div class="conteudo">
									<?php echo html_entity_decode($row["texto"]); ?>
								</div>

								<!-- clear -->
								<div class="clear"></div>

								<!-- Data Criação -->
								<!-- <div class="dataCriacao"> <b>Data:</b> <?php echo $data; ?> <b>Hora:</b> <?php echo $hora; ?> </div> -->
								<br />
								<br />
								<!-- btn -->
								<a href="./projetos<?php echo (isset($_SESSION["projetoPagination"]))?"/pag/".$_SESSION["projetoPagination"]:""; ?>" class="btn1"> Voltar para Projetos </a>
							</div>

						<?php } ?>
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