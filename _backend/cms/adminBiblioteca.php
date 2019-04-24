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

	/* Recebendo identificador do MENU em GET e gravando na sessao */
	if(isset($_GET["mactive"]) and !empty($_GET["mactive"])) { 
		$_SESSION["mactive"] = base64_decode(filter_var($_GET["mactive"],FILTER_SANITIZE_STRING));
	}
	/* Recebendo identificador do MENU em GET e gravando na sessao */
	if(isset($_GET["pactive"]) and !empty($_GET["pactive"])) { 
		$_SESSION["pactive"] = base64_decode(filter_var($_GET["pactive"],FILTER_SANITIZE_STRING));
	}

	/* Continuar somente se a sessao existir */
	if(!isset($_SESSION["mactive"])) { die("session:mactive não existe!"); }

	/* Recebe variaveis da pagina via mysql  através do mactive */
	$infoPage = adminMenu::getVarsMenuPage($_SESSION["mactive"]);

	/* Recebendo identificador em GET */
	$identificadorGet = (isset($_REQUEST["identificador"])) ? filter_var($_REQUEST["identificador"],FILTER_SANITIZE_STRING) : false;
	
	/* Variaveis */
	$pageLink = "adminBiblioteca.php";
	$pageLinkGet = "identificador={$identificadorGet}";
	$fullPageLink = "{$pageLink}?{$pageLinkGet}";

	/* Se caso identificadorGet não existir */
	if($_SERVER["REQUEST_METHOD"] == "GET") { 
		if(!$identificadorGet or empty($identificadorGet)) { 
			jsTools::redirecionar("dashboard.php");
		}
	}
	
	/* Recebendo acao em GET */
	$actionGet = (isset($_GET["action"])) ? filter_var($_GET["action"],FILTER_SANITIZE_STRING) : false;

	/* Recebendo Action Ajax em POST */
	$actionPost = (isset($_POST["action"])) ? filter_var($_POST["action"],FILTER_SANITIZE_STRING) : false;

	/* Recebendo ID */
	$id = (isset($_REQUEST["id"])) ? filter_var($_REQUEST["id"],FILTER_SANITIZE_NUMBER_INT) : false;

	/* Recebendo filterString em POST */
	$filterString = (isset($_POST["filtro"])) ? filter_var($_POST["filtro"],FILTER_SANITIZE_STRING) : false;

	/* Recebendo msg sucesso em GET */
	$getSucesso = (isset($_GET["sucesso"])) ? filter_var($_GET["sucesso"],FILTER_SANITIZE_STRING) : false;
	
	/* Recebendo msg error em GET */
	$getError = (isset($_GET["erro"])) ? filter_var($_GET["erro"],FILTER_SANITIZE_STRING) : false;

	
	/* condição para alimentar html via ajax */
	if($actionPost == "getTable") {

		/* Iniciando Where */
		$where = null;
		
		/* Se existe identificador via get adicionar where na sql */
		if(isset($identificadorGet) and $identificadorGet != false) {
			$where = " WHERE (identificador = '{$identificadorGet}')";
		}
		
		/* Comparativo para determinar qual SQL utilizar */
		if($filterString != "allRegisters") {
			
			if(isset($where)) { $where .= " and "; } else { $where .= "WHERE "; }
		
			$where .= "(titulo like '%{$filterString}%'
			or subtitulo like '%{$filterString}%')";
		
		} 
		
		/* Create Sql */
		$sql = "select *,SUBSTRING(subtitulo, 1, 200) as subtitulo from ".TABLE_BIBLIOTECA." {$where} limit 77";
		
		/* Query */
		mysqlidb::query($sql);
		
		/* Se quantidade de registros recebidos for positivo */
		if(mysqlidb::num_rows()) {
			
			/* For */
			for($i=0;$i<mysqlidb::num_rows();$i++) {
				$aw = mysqlidb::fetch_object();

				if(empty($aw->titulo)) { $aw->titulo = "Sem Titulo"; }

				/* Verificando se imagem está disponivel */
			    $arquivo = (isset($aw->file_src))?$aw->file_src:false;
				if(!file_exists($arquivo)) {
					$arquivo = "Nenhum arquivo!";
				} else { 
					$arquivo = "<a href='{$arquivo}' target='_blank'> Download </a>";
				}
				
				echo "<tr>";

				echo "<td style='vertical-align: middle;'><a href='{$fullPageLink}&action=editar&id=".$aw->id."'>".$aw->titulo."</a></td>";
				echo "<td style='vertical-align: middle;'>".mb_strimwidth(strip_tags(htmlspecialchars_decode($aw->subtitulo)),0,100,"...")."</td>";
				echo "<td width='150' style='text-align:center;'><a href='{$fullPageLink}&action=editar&id=".$aw->id."'>
						{$arquivo}
					</td>";
				echo "<td style='vertical-align: middle;'>".tools::convertDateTimeMysqlToBR($aw->data_modificacao)."</td>";
				echo "<td style='vertical-align: middle;text-align:center;'>".tools::convertDateTimeMysqlToBR($aw->data_criacao)."</td>";
				echo "</tr>";
			}
			
		} else {
			echo "0";
		}
		
		/* Die */
		die();
		
	} else if($actionPost == "removerFotoAjax") {
		
		/* Verifica se ID existe */
		if($id) { 
		
			/* Sql */
			$sql = "UPDATE ".TABLE_BIBLIOTECA." SET ";
			$sql .= "file_src = '' ";
			$sql .= "WHERE id = '{$id}'";
		
			/* Query */
			mysqlidb::query($sql);
			
			/* Se registro for afetado.. */
			if(mysqlidb::affected_rows())
			{
				echo "1";
			} 
			else 
			{ 
				echo "0";
			}
			
		}
		
		/* Die */
		die();
		
	} else if($actionPost == "novoRegistro" or $actionPost == "editarRegistro") {
		
		/* Recebendo Variaveis e filtrando */
		$titulo = isset($_POST["titulo"]) ? filter_var($_POST["titulo"],FILTER_SANITIZE_STRING) : null;
		$subtitulo = isset($_POST["subtitulo"]) ? filter_var($_POST["subtitulo"],FILTER_SANITIZE_STRING) : null;
		
		/* Pega DataHora NOW (AGORA!) */
		$dataHoraNow = tools::getDateTimeMysql();

			/* Upload Var */
		$foto = $_FILES['imagem_src'];
		
		/* Inicia Upload */
		$fotoDir = upload::arquivo($foto, upload::getRandomName(), UPLOAD_DIR."biblioteca/", array("pdf","doc","docx"), 20000000); /* Max 20mb */
		
		/* PREPARANDO SQL PARA [ EDITAR REGISTRO ] */
		if($id) { 
					
			/* se titulo estiver estiver vazio [EDITAR] */
			if(isset($titulo) and empty($titulo)) { 
				jsTools::redirecionar("{$fullPageLink}&action=editar&id={$id}&erro=É necessário escrever um título!");
				die();
			}

			/* se titulo estiver estiver vazio [EDITAR] */
			if(isset($subtitulo) and empty($subtitulo)) { 
				jsTools::redirecionar("{$fullPageLink}&action=editar&id={$id}&erro=É necessário escrever um Subtítulo!");
				die();
			}

			if(!$fotoDir and upload::getErrorMsg()) {
				jsTools::redirecionar("{$fullPageLink}&action=editar&id={$id}&erro=".upload::getErrorMsg());
				die();
			}
			
			/* Se foto existir.. incrementar na sql */
			$fotoDirSql = ($fotoDir) ? ", file_src = '{$fotoDir}'" : false;

			/* sql */
			$sql = "UPDATE ".TABLE_BIBLIOTECA." SET titulo = '{$titulo}',subtitulo = '{$subtitulo}', ";
			$sql .= "data_modificacao = '{$dataHoraNow}' {$fotoDirSql} ";
			$sql .= "WHERE id = {$id}";
		
		} 
		/* PREPARANDO SQL PARA [ NOVO REGISTRO ] */
		else { 
		
			/* se titulo estiver estiver vazio [NOVO] */
			if(isset($titulo) and empty($titulo)) { 
				jsTools::redirecionar("{$fullPageLink}&action=novo&erro=É necessário escrever um título!");
				die();
			}
			
			/* sql */
			$sql = "INSERT INTO ".TABLE_BIBLIOTECA." (identificador, titulo, subtitulo, file_src, data_criacao) ";
			$sql .= "VALUES ('{$identificadorGet}', '{$titulo}', '{$subtitulo}', '{$fotoDir}', '{$dataHoraNow}')";
				
		}
		
		/* Query */
		if(mysqlidb::query($sql))
		{
			
			/* Se caso for novo registro recuperar ultimo id inserido na tabela.. */
			if($actionPost == "novoRegistro") { 
				
				/* retornar ultimo id inserido na tabela  */
				$id = mysqlidb::return_insert_id();
				
				/* Redirecionar */
				jsTools::redirecionar("{$fullPageLink}&action=editar&id={$id}&sucesso=Novo registro inserido com sucesso!");
			
			} else { 
			
				/* Redirecionar */
				jsTools::redirecionar("{$fullPageLink}&action=editar&id={$id}&sucesso=Registro atualizado com sucesso!");
			
			}
			
			
		
		}
		
		/* Die */
		die();
		
	} else if($actionGet == "delete") { 
	
		/* SQL */
		$sql = "DELETE FROM ".TABLE_BIBLIOTECA." WHERE id = {$id}";
	
		/* Query */
		if(mysqlidb::query($sql))
		{
			
			/* Redirecionar */
			jsTools::redirecionar("{$fullPageLink}&msgSuccess=Registros deletado com sucesso!");
		
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
		$pageTitle = " | ".ucfirst($infoPage["paginaTitulo"]);
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
		$faicon = ($infoPage["icon_class"])?$infoPage["icon_class"]:"fa fa-circle";

		/* headerTitle */
		$headerTitle = "<a href='".$fullPageLink."' style='color:black;'>Gerenciar Biblioteca (".ucfirst($infoPage["paginaTitulo"]).")</a>";
		
		/* include */
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
          if(!$actionGet) {
        ?>
	    <div class="row panel-grid grid-stack" id="panel-grid">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 panel-wrap">
          <div class="panel bgc-white-dark">
            <div class="panel-body panel-body-p">
              <div style="padding-bottom: 33px; padding-top: 10px;">
				<div class="bs-bars pull-left">
					<?php 
						if(autenticacaoUsuario::getNivelAcesso() == "programador" or autenticacaoUsuario::getNivelAcesso() == "administrador") { 
					?>				
						<div id="user-toolbar">
							<!-- Novo Usuario -->
							<button onclick="javascript:document.location.href='?identificador=<?php echo $identificadorGet; ?>&action=novo'" id="new-table-row" class="btn btn-default" style="background: #5a606d;color: white;">
								<i class="fa icon-user-follow icon-mr-ch"></i>Novo Registro
							</button>
						</div>
					<?php 
						}
					?>
				</div>
				<div class="columns columns-right btn-group pull-right">
                  <!-- Botao Pesquisar  -->
                  <button style="background: #5a606d;color: white;margin-right:20px;" onclick="javascript:getTableAjaxFilter();return false;" class="btn btn-default" type="button" name="paginationSwitch" aria-label="pagination Switch" title="Pesquisar">
                  Ok
                  </button>
                  <!-- Botao Atualizar  -->
                  <button style="background: #5a606d;color: white;" onclick="javascript:atualizar();" class="btn btn-default" type="button" name="refresh" aria-label="refresh" title="Atualizar">
                    <i class="glyphicon icon-refresh"></i>
                  </button>
                </div>
                <div class="pull-right search">
                  <!-- Input Filtrar  -->
                  <input class="form-control" type="text" id="inputFilter" placeholder="Filtrar">
                </div>
              </div>
              <!-- Table-Responsive -->
              <div class="table-responsive" id="targetTabela" style="padding-top:20px;">
                <table class="table nowrap  table-bordered fs-7 c-gray-darker">
                  <thead>
                    <tr style="background: #5a606d;color: white;">
            	      
                      <th>Titulo</th>
                      <th>Subtitulo</th>
                        <th>Arquivo</th>
                      <th>Data Modificação</th>
                      <th>Data Criação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="6" style="text-align:center;"> Carregando... </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </div>
        <?php
          } else if($actionGet == "novo" or $actionGet == "editar") {
			
			/* Editar */
			if($actionGet == "editar") { 
				
				/* Se caso estiver vazio.. DIE :D */
				if(!$id) { jsTools::redirecionar($pageLink); }
				
				/* Criando Consulta SQL */
				$sql = "select * from ".TABLE_BIBLIOTECA." where id = {$id}"; 
				
				/* Query */
				mysqlidb::query($sql);
				
				/* Se caso resultado for negativo DIE :D */
				if(mysqlidb::num_rows() < 1) { jsTools::redirecionar($pageLink); }
				
				/* Alimentar variavel com informações do usuario */
				$dataUser = mysqlidb::fetch_array();
			}
        ?>
		<form action="<?php echo $pageLink; ?>" method="post" enctype="multipart/form-data">
			<div class="row panel-grid grid-stack" id="panel-grid">
			<!-- Action -->
			<input type="hidden" name="action" value="<?php echo ($actionGet == "novo")?"novoRegistro":"editarRegistro"; ?>" />
			<!-- ID -->
			<input type="hidden" name="identificador" value="<?php echo $identificadorGet; ?>" />
			<!-- ID -->
			<input type="hidden" name="id" value="<?php echo $id; ?>" />
				<section class="col-sm-12 col-md-12 col-lg-12 col-xl-12 panel-wrap panel-grid-item">
					<!--Start Panel-->
					<div class="panel bgc-white-dark">
						<div class="panel-header panel-header-p bgc-white-dark panel-header-sm">
							<h2 class="pull-left">Informações da Notícia</h2>
						</div>
						<div class="panel-body panel-body-p">
							<div class="row">
							
								<div class="col-xl-12">
								  <div class="form-group mb-4">
									<label for="nome">Titulo <span style='color:red;'>*</span></label>
									<input type="text" class="form-control" id="titulo" name="titulo" placeholder="Titulo do texto" value="<?php echo (isset($dataUser["titulo"]))?$dataUser["titulo"]:false;?>">
								  </div>
								</div>

								<div class="col-xl-12">
								  <div class="form-group mb-4">
									<label for="nome">Subtitulo <span style='color:red;'>*</span></label>
									<textarea style="height:70px;" class="form-control" id="subtitulo" name="subtitulo" placeholder="Subtitulo do texto"><?php echo (isset($dataUser["subtitulo"]))?$dataUser["subtitulo"]:false;?></textarea>
								  </div>
								</div>


								<div class="col-xl-12">
									<!-- Upload com campos personalizado pelo plugin jquery -->
									<div class="form-group">
										<label for="uploadFiles7"> Arquivo (PDF, DOC, ou DOCX) </label>
										<div class="file-upload">
											<!-- buttonUploadAction -->
											<span class="btn btn-default mr-2" id="buttonUploadAction">Search</span>
											<!-- msgUploadFoto -->
											<span id="msgUploadFoto">Nenhum arquivo</span>
											<!-- buttonRemover -->
											<span id="buttonRemover" class="btn btn-default ml-2" style="color: red;font-size: 12px;">Remove</span>
											<!-- input File -->
											<input type="file" class="form-control-file" accept=".pdf, .doc, .docx" id="uploadFiles7" name="imagem_src"> 
											<!-- errorMenssage -->
											<div id="errorMenssage" style="<?php echo (!isset($_GET["uploadError"]))?"display:none;":false; ?>color:red;font-size:12px;padding-top:13px;">
												<?php echo (isset($_GET["uploadError"]))?$_GET["uploadError"]:false; ?>
											</div>
											<div style="clear:both;"></div>	
											<!-- imagePreview -->
											<div id="imagePreviewContainer" style="display: inline-block;<?php echo (!isset($dataUser["file_src"]) or !upload::arquivoExisteNoDir($dataUser["file_src"])) ?"display:none;":false; ?>padding-top:13px;">
												<a style="    font-size: 13px; border: 1px solid #999; padding: 6px; background: #282d38; color: white;" href='<?php echo RAIZ_DIR; echo (upload::arquivoExisteNoDir($dataUser["file_src"])) ? $dataUser["file_src"]:false; ?>' target='_blank'>Download do Arquivo</a>
											</div>
											<!-- Remover imagem do banco de dados -->
											<?php if(isset($dataUser["file_src"]) and upload::arquivoExisteNoDir($dataUser["file_src"])) {  ?>
												<span id="removerFotoAjax" class="btn btn-default" style="color: red;font-size: 11px;padding:5px;">Remover Arquivo</span>
											<?php } ?>
										</div>
									</div>
								</div>
								
								<?php if(isset($dataUser["data_modificacao"])) { ?>
									<div class="col-xl-3">
									  <div class="form-group mb-4">
										<br />
										<label for="nome"><b>Data da última modificação</b></label>
										<div><?php echo (isset($dataUser["data_modificacao"]))?tools::convertDateTimeMysqlToBR($dataUser["data_modificacao"]):false;?></div>
									  </div>
									</div>
								<?php } ?>
								
								<div class="col-xl-3">
								  <div class="form-group mb-4">
									<br />
									<label for="nome"><b>Data Criação</b></label>
									<div><?php echo tools::convertDateTimeMysqlToBR((isset($dataUser["data_criacao"]))?$dataUser["data_criacao"]:tools::getDateTimeMysql());?></div>
								  </div>
								</div>
		
							</div> <!-- end row -->
						</div>
					</div>
				</section>
				
				<section class="col-sm-12 col-md-12 col-lg-12 col-xl-12 panel-wrap panel-grid-item">
					<div class="panel bgc-white-dark" style="padding-bottom:1rem;">
						<div class="panel-body panel-body-p">    
							<button type="submit" class="btn btn-primary"><?php echo ($actionGet == "editar")?"Atualizar Registro":"Cadastrar"; ?></button>
							<?php if($actionGet == "editar" and autenticacaoUsuario::getNivelAcesso() == "programador") { ?>
								<a href="javascript:void(0);" onclick="javascript:if(confirm('Deseja realmente deletar este registro ?')) { window.location.href='<?php echo $fullPageLink; ?>&action=delete&id=<?php echo $id; ?>'; }"><button type="button" class="btn btn-danger" style="float:right;clear:both;">Deletar</button>
							<?php } ?>
						</div>
					</div>
				</section>
			</div>
		</form>
        <?php
          } else { jsTools::redirecionar($pageLink);  }
        ?>
    </div>
  </section>
  <!--Begin Sidebar-->
  <!-- Modal -->

  <?php
    
	$titlePage = $identificadorGet;
	
	$setMenu = "adminmenu-{$titlePage}";
	$setMenuType = "textos";
	
    include "includes/sidebar.php";

  ?>
  <!--End Sidebar-->
  <!-- Footer -->
  <?php include "includes/footer.php"; ?>

  
     <!-- endinject -->
    <script>
        SystemJS.import('scripts/form-addon');
    </script>
  

<script>	
	
		$(function() { 
			$("#uploadFiles7").uploadFiles7({ 
				buttonUploadById: "#buttonUploadAction",
				messageUploadById: "#msgUploadFoto",
				buttonRemoverById: "#buttonRemover",
				onlyExtensions:false,
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

		$("#removerFotoAjax").on("click", function() { 
		    var data = {action:"removerFotoAjax",id: <?php echo ($id)?$id:"''"; ?>};
			$.ajax({
				url: "<?php echo $pageLink; ?>",
				method: "POST",
				data: data,
				beforeSend: function()  {
				  
				},
				success: function(data) {
					console.log(data);
					if(data == "1") {
						$("#imagePreviewContainer").hide(500);
						$("#imagePreviewContainer").find("img").prop("src", "");
						$("#removerFotoAjax").hide(500);
					}
				}
			});
		});
	</script>
  

  <!-- Scripts Functions -->
  <script>
    var tabela = $("#targetTabela");

    /* Eventos */
    window.onload = function() {
      getTableAjax("allRegisters");
    };

    /* Se caso clicar em enter.. executar funcao de filtro */
    $("#inputFilter").keypress(function(e) {
      if(e.which == 13) {
        getTableAjaxFilter();
      }
    });

    /* Botao para filtrar registros */
    function getTableAjaxFilter() {
      var inputValor = $("#inputFilter").val();
      if(inputValor == "") {
        getTableAjax("allRegisters");
      } else {
        getTableAjax(inputValor);
      }
    }

    /* Funcoes */
    function getTableAjax(filtro) {
      var data = {action:"getTable", identificador:"<?php echo ($identificadorGet)?$identificadorGet:"''"; ?>",filtro:filtro};
      $.ajax({
        url: "<?php echo $pageLink; ?>",
        method: "POST",
        data: data,
        beforeSend: function()  {
          tabela.find("tbody").html('<tr><td colspan="6" style="text-align:center;"> Carregando... </td></tr>');
        },
        success: function(data) {
            if(data != "0") {
              tabela.find("tbody").html(data);
            }
            else {
              tabela.find("tbody").html('<tr><td colspan="6" style="text-align:center;"> Nenhum registro encontrado! </td></tr>');
            }
        }
      });
    }

    function atualizar() { 
    	$("#inputFilter").val('');
    	getTableAjax();
    	return false;
    }
	
	$("input[name=identificadorFront]").on("keyup", function() {
		var novoText = $(this).val().replace(/\s/g,'');
		$(this).val(novoText);
	});
	
  </script>
  
  

</body>
</html>
