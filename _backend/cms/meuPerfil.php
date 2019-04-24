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
	
	/* Variaveis */
	$pageLink = "meuPerfil.php";

	/* Recebendo msg sucesso em GET */
	$getSucesso = (isset($_GET["sucesso"])) ? filter_var($_GET["sucesso"],FILTER_SANITIZE_STRING) : false;
	
	/* Recebendo msg error em GET */
	$getError = (isset($_GET["erro"])) ? filter_var($_GET["erro"],FILTER_SANITIZE_STRING) : false;

	/* Recebendo Action Ajax em POST */
	$actionPost = (isset($_POST["action"])) ? filter_var($_POST["action"],FILTER_SANITIZE_STRING) : false;

	/* Recebendo ID */
	$id = autenticacaoUsuario::getSessionId();

	/* Recebendo filterString em POST */
	$filterString = (isset($_POST["filtro"])) ? filter_var($_POST["filtro"],FILTER_SANITIZE_STRING) : false;
	
	/* removerFotoAjax */
	if($actionPost == "removerFotoAjax") {
		
		/* Verifica se ID existe */
		if($id) { 
		
			/* Sql */
			$sql = "UPDATE ".TABLE_USUARIOS." SET ";
			$sql .= "foto = '' ";
			$sql .= "WHERE id = '{$id}'";
		
			/* Query */
			mysqlidb::query($sql);
			
			/* Se registro for afetado.. */
			if(mysqlidb::affected_rows())
			{
				
				/* Se caso registro alterado for do proprio usuario logado.. */
				if($id == autenticacaoUsuario::getSessionId()) { 
				
					/* Atualizar sessão do usuario  */
					autenticacaoUsuario::updateUserSessions();
					
				}
				
				echo "1";
			} 
			else 
			{ 
				echo "0";
			}
			
		}
		
		/* Die */
		die();
		
	} else if($actionPost == "editarRegistro") {
		
		/* Recebendo Variaveis e filtrando */
		$nome = isset($_POST["nome"]) ? filter_var($_POST["nome"],FILTER_SANITIZE_STRING) : false;
		$sobrenome = isset($_POST["sobrenome"]) ? filter_var($_POST["sobrenome"],FILTER_SANITIZE_STRING) : false;
		$senha = isset($_POST["senha"]) ? filter_var($_POST["senha"],FILTER_SANITIZE_STRING) : false;
		$cargo = isset($_POST["cargo"]) ? filter_var($_POST["cargo"],FILTER_SANITIZE_STRING) : false;
		
		/* Pega DataHora NOW (AGORA!) */
		$dataHoraNow = tools::getDateTimeMysql();
		
		/* Upload Var */
		$foto = $_FILES['foto'];
		
		/* Inicia Upload */
		$fotoDir = upload::arquivo($foto, upload::getRandomName(), UPLOAD_DIR."usuarios/", array("jpg","jpeg","png"), 9000000); /* Max 9mb */

		/* Em caso de erros no upload .. */
		$msgErrorUpload = (upload::getErrorMsg()) ? "&uploadError=".upload::getErrorMsg() : false;	
		
		/* PREPARANDO SQL PARA [ EDITAR REGISTRO ] */
		if($id) { 
		
			/* Se foto existir.. incrementar na sql */
			$fotoDirSql = ($fotoDir) ? ", foto = '{$fotoDir}'" : false;
			
			/* sql */
			$sql = "UPDATE ".TABLE_USUARIOS." SET nome = '{$nome}', sobrenome = '{$sobrenome}', senha = '{$senha}', cargo = '{$cargo}', ";
			$sql .= "dataHoraModificacao = '{$dataHoraNow}'{$fotoDirSql} ";
			$sql .= "WHERE id = {$id}";
			
		} 
		
		
		/* Query */
		if(mysqlidb::query($sql))
		{
			
			/* Se caso registro alterado for do proprio usuario logado.. */
			if($id == autenticacaoUsuario::getSessionId()) { 
			
				/* Atualizar sessão do usuario  */
				autenticacaoUsuario::updateUserSessions();
				
			}
			
			/* Redirecionar */
			jsTools::redirecionar("{$pageLink}?sucesso=Seu perfil foi atualizado com sucesso!".$msgErrorUpload);
		
		} 
		
		/* Die */
		die();
		
	}

?>
<!doctype html>
<html lang="en-us">
  <head>
  
    <!-- Head -->
    <?php
		$pageTitle = "Editar Perfil";
		include "includes/head.php";
    ?>
	
  </head>
<body>
<div id="app" class="reactive-app no-saved-theme header-bg-danger sidebar-type-push sidebar-state-open sidebar-tr-state-open sidebar-bg-default sidebar-option-default">
  <!-- inject-body-start:js -->
  <script src="<?php echo RAIZ_DIR; ?>assets/js/settings.js"></script>
  <!-- endinject -->
  <!--Begin Header-->
  <header id="header" class="header-wrap clearfix">
  
    <!-- Header-Tools -->
    <?php
		/* faicon (icon) */
		$faicon = "fa-user";
		/* headerTitle */
		$headerTitle = "<a href='{$pageLink}' style='color:black;'>Meu Perfil</a>";
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
	
		<!-- GET MENSAGENS DE SUCESSO E ERRO VIA GET -->
		<?php include "includes/getSucessAndErros.php"; ?>
		
        <?php
		
				/* Se caso estiver vazio.. DIE :D */
				if(!$id) { jsTools::redirecionar(RAIZ_DIR); }
				
				/* Criando Consulta SQL */
				$sql = "select * from ".TABLE_USUARIOS." where id = {$id}"; 
				
				/* Query */
				mysqlidb::query($sql);
				
				/* Se caso resultado for negativo Redirecionar :D */
				if(mysqlidb::num_rows() < 1) { jsTools::redirecionar(RAIZ_DIR); }
				
				/* Alimentar variavel com informações do usuario */
				$dataUser = mysqlidb::fetch_array();
		
        ?>
		<form action="<?php echo $pageLink; ?>" method="post" enctype="multipart/form-data">
			<div class="row panel-grid grid-stack" id="panel-grid">
			<!-- Action -->
			<input type="hidden" name="action" value="editarRegistro" />
			<!-- ID -->
			<input type="hidden" name="id" value="<?php echo $id; ?>" />
				<section class="col-sm-12 col-md-12 col-lg-12 col-xl-12 panel-wrap panel-grid-item">
					<!--Start Panel-->
					<div class="panel bgc-white-dark">
						<div class="panel-header panel-header-p bgc-white-dark panel-header-sm">
							<h2 class="pull-left">Informações do Usuário</h2>
						</div>
						<div class="panel-body panel-body-p">
							<div class="row">
								<div class="col-xl-6">
								  <div class="form-group mb-4">
									<label for="nome">Nome</label>
									<input type="text" class="form-control" id="nome" name="nome" placeholder="Nome" value="<?php echo (isset($dataUser["nome"]))?$dataUser["nome"]:false;?>">
								  </div>
								</div>
								<div class="col-xl-6">
								  <div class="form-group mb-4">
									  <label for="sobrenome">Sobrenome</label>
									  <input type="text" class="form-control" id="sobrenome" name="sobrenome" placeholder="Sobrenome" value="<?php echo (isset($dataUser["sobrenome"]))?$dataUser["sobrenome"]:false;?>">
								  </div>
								</div>
								<div class="col-xl-6">
									<div class="form-group mb-4">
										<label for="cargo"> Cargo </label>
										<input type="text" class="form-control" id="cargo" name="cargo" placeholder="Insira nome do cargo"  value="<?php echo (isset($dataUser["cargo"]))?$dataUser["cargo"]:false;?>">
									</div>
								</div>
								
								<div class="col-xl-6">
									<!-- Upload com campos personalizado pelo plugin jquery -->
									<div class="form-group">
										<label for="uploadFiles7"> Foto </label>
										<div class="file-upload">
											<!-- buttonUploadAction -->
											<span class="btn btn-default mr-2" id="buttonUploadAction">Search</span>
											<!-- msgUploadFoto -->
											<span id="msgUploadFoto">No File Chosen</span>
											<!-- buttonRemover -->
											<span id="buttonRemover" class="btn btn-default ml-2" style="color: red;font-size: 12px;">Remove</span>
											<!-- input File -->
											<input type="file" class="form-control-file" id="uploadFiles7" name="foto"> 
											<!-- errorMenssage -->
											<div id="errorMenssage" style="<?php echo (!isset($_GET["uploadError"]))?"display:none;":false; ?>color:red;font-size:12px;padding-top:13px;">
												<?php echo (isset($_GET["uploadError"]))?$_GET["uploadError"]:false; ?>
											</div>	
											<!-- imagePreview -->
											<div id="imagePreviewContainer" style="<?php echo (!isset($dataUser["foto"]) or !upload::arquivoExisteNoDir($dataUser["foto"])) ?"display:none;":false; ?>padding-top:13px;">
												<img src="<?php echo (upload::arquivoExisteNoDir($dataUser["foto"])) ? $dataUser["foto"]:false; ?>" id="imagePreviewImg" style="height: 170px;     object-fit: cover;" />
											</div>
											<!-- Remover imagem do banco de dados -->
											<?php if(isset($dataUser["foto"]) and upload::arquivoExisteNoDir($dataUser["foto"])) {  ?>
												<span id="removerFotoAjax" class="btn btn-default" style="color: red;font-size: 11px;padding:5px;">Remover Foto</span>
											<?php } ?>
										</div>
									</div>
							
								</div>
								
							</div> <!-- end row -->
							
							
						</div>
					</div>
				</section>
				<section class="col-sm-12 col-md-12 col-lg-12 col-xl-12 panel-wrap panel-grid-item">
					<div class="panel bgc-white-dark">
						<div class="panel-header panel-header-p bgc-white-dark panel-header-sm">
							<h2 class="pull-left"> Acesso ao Painel </h2>
						</div>
						<div class="panel-body panel-body-p">
							<div class="form-group mb-4">
								<label for="email"> E-mail </label>
								<input type="email" class="form-control" id="email" name="email" placeholder="Insira o E-mail" disabled value="<?php echo (isset($dataUser["email"]))?$dataUser["email"]:false;?>">
							</div>
							<div class="form-group mb-4">
							  <label for="senha"> Senha <span style='color:red;font-size:11px;margin-left:5px;'>* Senha para acessar o painel</span> </label>
							  <input type="text" class="form-control" id="senha" name="senha" placeholder="Insira a Senha"  value="<?php echo (isset($dataUser["senha"]))?$dataUser["senha"]:false;?>">
							</div>
						</div>
					</div>
				</section>

				<section class="col-sm-12 col-md-12 col-lg-12 col-xl-12 panel-wrap panel-grid-item">
					<div class="panel bgc-white-dark" style="padding-bottom:1rem;">
						<div class="panel-body panel-body-p">    
							<button type="submit" class="btn btn-primary">Atualizar</button>
						</div>
					</div>
				</section>
			</div>
		</form>
       
    </div>
  </section>
  <!--Begin Sidebar-->
  <!-- Modal -->

  <?php
    $setMenu = "meuPerfil";
    include "includes/sidebar.php";

  ?>
  <!--End Sidebar-->
  <!-- Footer -->
  <?php include "includes/footer.php"; ?>
  
	<script>	
		<!-- Configurações para Upload de Arquivos By Gabriel A. Barbosa *-* -->
		$(function() { 
			$("#uploadFiles7").uploadFiles7({ 
				buttonUploadById: "#buttonUploadAction",
				messageUploadById: "#msgUploadFoto",
				buttonRemoverById: "#buttonRemover",
				onlyExtensions: ["image/jpeg","image/jpg","image/png"],
				imagePreviewById: "#imagePreviewImg",
				onErrorEvent: function(msg) { 
				
					/* Mostra erro de mensagem */
					$("#errorMenssage").html(msg).show(500);
					
					/* Esconde Image Preview Div */
					$("#imagePreviewContainer").hide();
					
				},
				onSuccess: function(file) { 
				
					/* Esconde mensagem de erro */
					$("#errorMenssage").hide(500);
					
					/* Mostra Previewm Image Div */
					$("#imagePreviewContainer").show(500);
					
				},
				onReset: function() { 
					
					/* Esconde Previewm Image Div */
					$("#imagePreviewContainer").hide();
					
				}
			});
		});
		
		<!-- Remover Foto já cadastrada no banco de dados via ajax! -->
		$("#removerFotoAjax").on("click", function() { 
		    var data = {action:"removerFotoAjax",id: <?php echo $id; ?>};
			$.ajax({
				url: "<?php echo $pageLink; ?>",
				method: "POST",
				data: data,
				beforeSend: function()  {
				  
				},
				success: function(data) {
					if(data == "1") {
						$("#imagePreviewContainer").hide(500);
						$("#imagePreviewContainer").find("img").prop("src", "");
						$("#removerFotoAjax").hide(500);
					}
				}
			});
		});
		
	</script>
  
  
</body>
</html>
