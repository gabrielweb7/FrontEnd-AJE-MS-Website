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
	$pageLink = "adminCarrousel.php";
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
			or imagem_alt like '%{$filterString}%')";
		
		} 
		
		/* Create Sql */
		$sql = "select * from ".TABLE_CARROUSEL." {$where} order by ordem asc";
		
		/* Query */
		mysqlidb::query($sql);
		
		/* Se quantidade de registros recebidos for positivo */
		if(mysqlidb::num_rows()) {
			
			/* For */
			for($i=0;$i<mysqlidb::num_rows();$i++) {
				
				/* aw */
				$aw = mysqlidb::fetch_object();
				
				/* Verificando se imagem está disponivel */
			    $foto = (isset($aw->imagem_src))?$aw->imagem_src:IMAGE_NOIMAGE_DIR;
				if(!file_exists($foto)) {
					$foto = IMAGE_NOIMAGE_DIR;
				}
				
				if(empty($aw->imagem_href) or $aw->imagem_href == "#") { 
					$aw->imagem_href = "#";
				} else { 
					$aw->imagem_href = "<a href='".$aw->imagem_href."' target='_blank'> ".$aw->imagem_href." </a>";
				}
				
				echo "<tr>";
				echo "<td width='150'><a href='{$pageLink}?identificador={$identificadorGet}&action=editar&id=".$aw->id."'><div id='imagePreviewContainer'><img src='{$foto}' alt='".$aw->imagem_alt."'  style='width:100%;    background: gray;' /></div></td>";
				echo "<td style='vertical-align: middle;'>".$aw->titulo."</td>";
				echo "<td style='vertical-align: middle;'>".$aw->imagem_alt."</td>";
				echo "<td style='vertical-align: middle;'>".$aw->imagem_href."</td>";
				echo "<td style='vertical-align: middle;'>".tools::convertDateTimeMysqlToBR($aw->data_modificacao)."</td>";
				echo "<td style='vertical-align: middle;'>".tools::convertDateTimeMysqlToBR($aw->data_criacao)."</td>";
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
			$sql = "UPDATE ".TABLE_CARROUSEL." SET ";
			$sql .= "imagem_src = '' ";
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
		$imagem_alt = isset($_POST["imagem_alt"]) ? filter_var($_POST["imagem_alt"],FILTER_SANITIZE_STRING) : null;
		$imagem_href = isset($_POST["imagem_href"]) ? filter_var($_POST["imagem_href"],FILTER_SANITIZE_STRING) : null;
		$ordem = isset($_POST["ordem"]) ? filter_var($_POST["ordem"],FILTER_SANITIZE_STRING) : null;
		

		/* Pega DataHora NOW (AGORA!) */
		$dataHoraNow = tools::getDateTimeMysql();
		
		/* Upload Var */
		$foto = $_FILES['imagem_src'];
		
		/* Inicia Upload */
		$fotoDir = upload::arquivo($foto, upload::getRandomName(), UPLOAD_DIR."carrousel/", array("jpg","jpeg","png"), 9000000); /* Max 2mb */

		/* Em caso de erros no upload .. */
		$erroMensagem = (upload::getErrorMsg()) ? "&erro=".upload::getErrorMsg() : false;	
		
		/* PREPARANDO SQL PARA [ EDITAR REGISTRO ] */
		if($id) { 
		
			/* se titulo estiver estiver vazio */
			if(isset($titulo) and empty($titulo)) { 
				jsTools::redirecionar("{$pageLink}?identificador={$identificadorGet}&action=editar&id={$id}&erro=É necessário escrever um título!");
				die();
				
			}	
			
			/* se caso imagem_href estiver vazio.. */
			if(isset($imagem_href) and empty($imagem_href)) { 
				$imagem_href = "#";
			}
		
			/* Se foto existir.. incrementar na sql */
			$fotoDirSql = ($fotoDir) ? ", imagem_src = '{$fotoDir}'" : false;
			
			/* Confere se titulo existe */
			$titulo = (!is_null($titulo)) ? ", titulo = '{$titulo}'": false;
			$ordem = (!is_null($ordem)) ? ", ordem = '{$ordem}'": false;
		
			/* sql */
			$sql = "UPDATE ".TABLE_CARROUSEL." SET imagem_alt = '{$imagem_alt}', imagem_href = '{$imagem_href}', ";
			$sql .= "data_modificacao = '{$dataHoraNow}'{$titulo}{$fotoDirSql}{$ordem} ";
			$sql .= "WHERE id = {$id}";
		
		} 
		/* PREPARANDO SQL PARA [ NOVO REGISTRO ] */
		else { 
		
			/* se titulo estiver estiver vazio */
			if(isset($titulo) and empty($titulo)) { 
				jsTools::redirecionar("{$pageLink}?identificador={$identificadorGet}&action=novo&erro=É necessário escrever um título!");
				die();
			}
		
			/* sql */
			$sql = "INSERT INTO ".TABLE_CARROUSEL." (identificador, titulo, imagem_src, imagem_alt, imagem_href, data_criacao, ordem) ";
			$sql .= "VALUES ('{$identificadorGet}', '{$titulo}', '{$fotoDir}', '{$imagem_alt}', '{$imagem_href}', '{$dataHoraNow}', '{$ordem}')";
				
		}
	
		/* Query */
		if(mysqlidb::query($sql))
		{
			
			/* Se caso for novo registro recuperar ultimo id inserido na tabela.. */
			if($actionPost == "novoRegistro") { 
				
				/* retornar ultimo id inserido na tabela  */
				$id = mysqlidb::return_insert_id();
				
				/* Redirecionar */
				jsTools::redirecionar("{$pageLink}?identificador={$identificadorGet}&action=editar&id={$id}&sucesso=Novo registro inserido com sucesso!".$erroMensagem);
			
			} else { 
			
				/* Redirecionar */
				jsTools::redirecionar("{$pageLink}?identificador={$identificadorGet}&action=editar&id={$id}&sucesso=Registro atualizado com sucesso!".$erroMensagem);
			
			}
			
			
		
		}
		
		/* Die */
		die();
		
	} else if($actionGet == "delete") { 
	
		/* SQL */
		$sql = "DELETE FROM ".TABLE_CARROUSEL." WHERE id = {$id}";
	
		/* Query */
		if(mysqlidb::query($sql))
		{
			
			/* Redirecionar */
			jsTools::redirecionar("{$pageLink}?identificador={$identificadorGet}&msgSuccess=Registros deletado com sucesso!");
		
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
		$faicon = "fa-object-ungroup";

		/* headerTitle */
		$headerTitle = "<a href='".$fullPageLink."' style='color:black;'>Gerenciar Carrousel (".ucfirst($infoPage["paginaTitulo"]).")</a>";

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
						/*if(autenticacaoUsuario::getNivelAcesso() == "programador") { */
					?>				
						<div id="user-toolbar">
							<!-- Novo Usuario -->
							<button onclick="javascript:document.location.href='?identificador=<?php echo $identificadorGet; ?>&action=novo'" id="new-table-row" class="btn btn-default" style="background: #5a606d;color: white;">
								<i class="fa fa-plus icon-mr-ch"></i>Novo Registro
							</button>
						</div>
					<?php 
						/*}*/
					?>
				</div>
				<div class="columns columns-right btn-group pull-right">
                  <!-- Botao Pesquisar  -->
                  <button style="background: #5a606d;color: white;margin-right:20px;" onclick="javascript:getTableAjaxFilter();return false;" class="btn btn-default" type="button" name="paginationSwitch" aria-label="pagination Switch" title="Pesquisar">
                  Ok
                  </button>
                  <!-- Botao Atualizar  -->
                  <button style="background: #5a606d;color: white;" onclick="javascript:getTableAjax();return false;" class="btn btn-default" type="button" name="refresh" aria-label="refresh" title="Atualizar">
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
                      <th>Imagem</th>
                      <th>Titulo</th>
                      <th>Descrição (Alt)</th>
                      <th>Redirecionamento</th>
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
				$sql = "select * from ".TABLE_CARROUSEL." where id = {$id}"; 
				
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
							<h2 class="pull-left">Informações da Imagem</h2>
						</div>
						<div class="panel-body panel-body-p">
							<div class="row">
								
								<div class="col-xl-5">
								  <div class="form-group mb-4">
									<label for="nome">Titulo</label>
									<input type="text" class="form-control" id="titulo" name="titulo" placeholder="Titulo da Imagem" value="<?php echo (isset($dataUser["titulo"]))?$dataUser["titulo"]:false;?>">
								  </div>
								</div>
								
								
								
								<div class="col-xl-6">
								  <div class="form-group mb-4">
									  <label for="sobrenome">Descrição (ALT)</label>
									  <input type="text" class="form-control" id="imagem_alt" name="imagem_alt" placeholder="Descrição da imagem (ALT)" value="<?php echo (isset($dataUser["imagem_alt"]))?$dataUser["imagem_alt"]:false;?>">
								  </div>
								</div>
								
								<!-- label -->
								<div class="col-xl-1">
								  <div class="form-group mb-4">
									  <label for="sobrenome"><b>Ordem</b></label>
									  <input type="text" class="form-control" id="ordem" name="ordem" value="<?php echo (isset($dataUser["ordem"]))?$dataUser["ordem"]:"0";?>">
								  </div>
								</div>
								
								<div class="col-xl-12">
								  <div class="form-group mb-4">
									<label for="nome">Imagem Link (Href)</label>
									<input type="text" class="form-control" id="imagem_href" name="imagem_href" placeholder="https://www.website.com/" value="<?php echo (isset($dataUser["imagem_href"]))?$dataUser["imagem_href"]:false;?>">
								  </div>
								</div>
								
								<div class="col-xl-12">
									<!-- Upload com campos personalizado pelo plugin jquery -->
									<div class="form-group">
										<label for="uploadFiles7"> Imagem </label>
										<div class="file-upload">
											<!-- buttonUploadAction -->
											<span class="btn btn-default mr-2" id="buttonUploadAction">Search</span>
											<!-- msgUploadFoto -->
											<span id="msgUploadFoto">No File Chosen</span>
											<!-- buttonRemover -->
											<span id="buttonRemover" class="btn btn-default ml-2" style="color: red;font-size: 12px;">Remove</span>
											<!-- input File -->
											<input type="file" class="form-control-file" id="uploadFiles7" name="imagem_src"> 
											<!-- errorMenssage -->
											<div id="errorMenssage" style="<?php echo (!isset($_GET["uploadError"]))?"display:none;":false; ?>color:red;font-size:12px;padding-top:13px;">
												<?php echo (isset($_GET["uploadError"]))?$_GET["uploadError"]:false; ?>
											</div>	
											<!-- imagePreview -->
											<div id="imagePreviewContainer" style="<?php echo (!isset($dataUser["imagem_src"]) or !upload::arquivoExisteNoDir($dataUser["imagem_src"])) ?"display:none;":false; ?>padding-top:13px;">
												<img src="<?php echo (upload::arquivoExisteNoDir($dataUser["imagem_src"])) ? $dataUser["imagem_src"]:false; ?>" id="imagePreviewImg" style="background:gray;object-fit: cover; max-width:100%;" />
											</div>
											<!-- Remover imagem do banco de dados -->
											<?php if(isset($dataUser["imagem_src"]) and upload::arquivoExisteNoDir($dataUser["imagem_src"])) {  ?>
												<span id="removerFotoAjax" class="btn btn-default" style="color: red;font-size: 11px;padding:5px;">Remover Foto</span>
											<?php } ?>
										</div>
									</div>
								</div>
								
						
								
								<?php if(isset($dataUser["data_modificacao"])) { ?>
									<div class="col-xl-2">
									  <div class="form-group">
									
										<label for="nome"><b>Data da última modificação</b></label>
										<div><?php echo (isset($dataUser["data_modificacao"]))?tools::convertDateTimeMysqlToBR($dataUser["data_modificacao"]):false;?></div>
									  </div>
									</div>
								<?php } ?>
								
								<div class="col-xl-2">
								  <div class="form-group">
								
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
							<?php if($actionGet == "editar") { ?>
								<a href="javascript:void(0);" onclick="javascript:if(confirm('Deseja realmente deletar este registro ?')) { window.location.href='<?php echo $pageLink; ?>?identificador=<?php echo $identificadorGet; ?>&action=delete&id=<?php echo $id; ?>'; }"><button type="button" class="btn btn-danger" style="float:right;clear:both;" id="deletarUsuario">Deletar</button>
							<?php  }  ?>
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

  <!-- include sidebar -->
  <?php include "includes/sidebar.php"; ?>

  <!--End Sidebar-->
  <!-- Footer -->
  <?php include "includes/footer.php"; ?>
  
	<script>	
		<!-- Configurações para Upload de Arquivos By Gabriel A. Barbosa *-* -->
	
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

		
		<!-- Remover Foto já cadastrada no banco de dados via ajax! -->
		$("#removerFotoAjax").on("click", function() { 
		    var data = {action:"removerFotoAjax",id: <?php echo ($id)?$id:"''"; ?>};
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
  </script>

</body>
</html>
