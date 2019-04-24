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
	$pageLink = "adminVars.php";

	/* Recebendo identificador em GET */
	$identificadorGet = (isset($_REQUEST["categoria"])) ? filter_var($_REQUEST["categoria"],FILTER_SANITIZE_STRING) : false;
	
	/* Se caso identificadorGet não existir */
	if(!$identificadorGet or empty($identificadorGet)) { 
		jsTools::redirecionar("dashboard.php");
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
			$where = " WHERE (categoria = '{$identificadorGet}')";
		}
		
		/* Comparativo para determinar qual SQL utilizar */
		if($filterString != "allRegisters") {
			
			if(isset($where)) { $where .= " and "; } else { $where .= "WHERE "; }
		
			$where .= "(identificador like '%{$filterString}%' or valor like '%{$filterString}%' 
			or tipo like '%{$filterString}%')";
		
		} 
		
		/* Create Sql */
		$sql = "select * from ".TABLE_ADMINVARS." {$where}";

		/* Query */
		mysqlidb::query($sql);
		
		/* Se quantidade de registros recebidos for positivo */
		if(mysqlidb::num_rows()) {
			
			/* For */
			for($i=0;$i<mysqlidb::num_rows();$i++) {
				$aw = mysqlidb::fetch_object();
				
				/* Verificando se imagem está disponivel */
			    $foto = (isset($aw->imagem_src))?$aw->imagem_src:IMAGE_NOIMAGE_DIR;
				if(!file_exists($foto)) {
					$foto = IMAGE_NOIMAGE_DIR;
				}
				
				if(empty($aw->valor)) { $aw->valor = "Nenhum"; }
				
				echo "<tr class='hoverTr' style='cursor:pointer;' onclick=\"javascript:document.location.href='{$pageLink}?categoria={$identificadorGet}&action=editar&id=".$aw->id."'\">";
				echo "<td style='vertical-align: middle;'><b>".$aw->identificador."</b></td>";
				echo "<td style='vertical-align: middle;'>".$aw->valor."</td>";
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
			$sql = "UPDATE ".TABLE_ADMINVARS." SET ";
			$sql .= "valor = '' ";
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
		$identificador = isset($_POST["identificador"]) ? filter_var($_POST["identificador"],FILTER_SANITIZE_STRING) : null;
		$tipo = isset($_POST["tipo"]) ? filter_var($_POST["tipo"],FILTER_SANITIZE_STRING) : null;
		$valor = isset($_POST["valor"]) ? filter_var($_POST["valor"],FILTER_SANITIZE_STRING) : null;
		
		/* Pega DataHora NOW (AGORA!) */
		$dataHoraNow = tools::getDateTimeMysql();
		
		/* Upload Var */
		$foto = $_FILES['imagem_src'];
		
		/* Inicia Upload */
		$fotoDir = upload::arquivo($foto, upload::getRandomName(), UPLOAD_DIR."adminVars/", array("jpg","jpeg","png"), 9000000); /* Max 9mb */

		/* Em caso de erros no upload .. */
		$erroMensagem = (upload::getErrorMsg()) ? "&erro=".upload::getErrorMsg() : false;	
		
		/* PREPARANDO SQL PARA [ EDITAR REGISTRO ] */
		if($id) { 
					
			/* se titulo estiver estiver vazio */
			if(isset($identificador) and empty($identificador)) { 
				jsTools::redirecionar("{$pageLink}?categoria={$identificadorGet}&action=editar&id={$id}&erro=É necessário escrever um Identificador!");
				die();
			}
		
			/* Verifica se tipo é imagem ou texto */
			if($tipo == "imagem" and $fotoDir) { 
				/* Se foto existir.. incrementar na sql */
				$valor = "valor = '{$fotoDir}'";
			} else { 
				$valor = "valor = '{$valor}'";
			}
		
			/* prepara identificador para entrar no sql  */
			$identificador = (!is_null($identificador) and autenticacaoUsuario::getNivelAcesso() == "programador") ? ", identificador = '{$identificador}'": false;
				
			/* prepara tipo para entrar no sql como tipoSql  */
			$tipoSql = (!is_null($tipo)) ? ", tipo = '{$tipo}'": false;
			
			/* sql */
			$sql = "UPDATE ".TABLE_ADMINVARS." SET ";
			$sql .= "{$valor} {$identificador} {$tipoSql} ";
			$sql .= "WHERE id = {$id}";
			
		} 
		/* PREPARANDO SQL PARA [ NOVO REGISTRO ] */
		else { 
		
			/* se titulo estiver estiver vazio */
			if(isset($titulo) and empty($titulo)) { 
				jsTools::redirecionar("{$pageLink}?categoria={$identificadorGet}&action=novo&erro=É necessário escrever um título!");
				die();
			}
			
			/* Confere se titulo existe */
			$tipo = (is_null($tipo)) ? "texto": $tipo;
		
			/* sql */
			$sql = "INSERT INTO ".TABLE_ADMINVARS." (categoria, identificador, tipo, valor) ";
			$sql .= "VALUES ('{$identificadorGet}', '{$identificador}','{$tipo}','{$valor}')";
				
		}
		
		/* Query */
		if(mysqlidb::query($sql))
		{
			
			/* Se caso for novo registro recuperar ultimo id inserido na tabela.. */
			if($actionPost == "novoRegistro") { 
				
				/* retornar ultimo id inserido na tabela  */
				$id = mysqlidb::return_insert_id();
				
				/* Redirecionar */
				jsTools::redirecionar("{$pageLink}?categoria={$identificadorGet}&action=editar&id={$id}&sucesso=Novo registro inserido com sucesso!".$erroMensagem);
			
			} else { 
			
				/* Redirecionar */
				jsTools::redirecionar("{$pageLink}?categoria={$identificadorGet}&action=editar&id={$id}&sucesso=Registro atualizado com sucesso!".$erroMensagem);
			
			}
			
			
		
		}
		
		/* Die */
		die();
		
	} else if($actionGet == "delete") { 
	
		/* Não é possivel apagar seu proprio usuario! Não fazer nada.. */
		if(autenticacaoUsuario::getSessionId() == $id) { 
			
			/* Redirecionar */
			jsTools::redirecionar("{$pageLink}?categoria={$identificadorGet}&sucesso=Registros deletado com sucesso!");
			
			/* Die */
			die();
		}
	
		/* SQL */
		$sql = "DELETE FROM ".TABLE_ADMINVARS." WHERE id = {$id}";
	
		/* Query */
		if(mysqlidb::query($sql))
		{
			
			/* Redirecionar */
			jsTools::redirecionar("{$pageLink}?categoria={$identificadorGet}&msgSuccess=Registros deletado com sucesso!");
		
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
		$pageTitle = "Gerenciar Imagens [".ucfirst($identificadorGet)."]}";
		include "includes/head.php";
    ?>
	
	<style>
		.hoverTr:hover { background:#f3f3f3; }
	</style>
	
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
		$faicon = "fa-gear"; 
		
		/* identificadorLabel */
		$identificadorLabel = ($identificadorGet == "contato_configuracoes")?"Contato":$identificadorGet;
		
		/* headerTitle */
		$headerTitle = "<a href='".$pageLink."?categoria={$identificadorGet}' style='color:black;'>Configurações (".ucfirst($identificadorLabel).")</a>";
		
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
              	<?php 
						if(autenticacaoUsuario::getNivelAcesso() == "programador") { 
					?>
			  <div style="padding-bottom: 33px; padding-top: 10px;">
				<div class="bs-bars pull-left">
								
						
						<div id="user-toolbar">
							<!-- Novo Usuario -->
							<button onclick="javascript:document.location.href='?categoria=<?php echo $identificadorGet; ?>&action=novo'" id="new-table-row" class="btn btn-default" style="background: #5a606d;color: white;">
								<i class="fa icon-user-follow icon-mr-ch"></i>Novo Registro
							</button>
						</div>
						
				
				</div>
					
              
              </div>
              
			    <?php 
					}
				?>
			  <!-- Table-Responsive -->
              <div class="table-responsive" id="targetTabela" style="padding-top:10px;">
                <table class="table nowrap  table-bordered fs-7 c-gray-darker">
                  <thead>
                    <tr style="background: #5a606d;color: white;">
						<th width="30%">Opções</th>
						<th>Valor</th>                     
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
				$sql = "select * from ".TABLE_ADMINVARS." where id = {$id}"; 
				
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
			<input type="hidden" name="categoria" value="<?php echo $identificadorGet; ?>" />
			<!-- ID -->
			<input type="hidden" name="id" value="<?php echo $id; ?>" />
				<section class="col-sm-12 col-md-12 col-lg-12 col-xl-12 panel-wrap panel-grid-item">
					<!--Start Panel-->
					<div class="panel bgc-white-dark">
						<?php if(autenticacaoUsuario::getNivelAcesso() != "programador") { ?>
						<div class="panel-header panel-header-p bgc-white-dark panel-header-sm">
							<h2 class="pull-left"><?php echo (isset($dataUser["identificador"]))?$dataUser["identificador"]:false;?></h2>
						</div>
						<?php } else { ?>
							<div class="panel-header panel-header-p bgc-white-dark panel-header-sm">
							<h2 class="pull-left">Informações da Variável</h2>
						</div>
						<?php } ?>
						<div class="panel-body panel-body-p">
							<div class="row">
									
								<?php if(autenticacaoUsuario::getNivelAcesso() == "programador") { ?>
								<div class="col-xl-12">
								  <div class="form-group mb-4">
									<label for="nome">Identificador</label>
									<input type="text" class="form-control" id="identificador" name="identificador" placeholder="Identificador da Variável" <?php echo (autenticacaoUsuario::getNivelAcesso() != "programador")?"disabled":false; ?> value="<?php echo (isset($dataUser["identificador"]))?$dataUser["identificador"]:false;?>">
								  </div>
								</div>
								<?php } ?>
								
								<?php if(autenticacaoUsuario::getNivelAcesso() == "programador") { ?>
									<div class="col-xl-2">
									  <div class="form-group mb-4">
										<label for="nome">Tipo</label>
										<select name="tipo" id="tipo" class="form-control">
											<option value="texto" <?php echo (isset($dataUser["tipo"]) and $dataUser["tipo"] == "texto")?"selected":"";?>> Texto </option>
											<option value="imagem" <?php echo (isset($dataUser["tipo"]) and $dataUser["tipo"] == "imagem")?"selected":"";?>> Imagem </option>
										</select>
										</div>
									</div>
								<?php } ?>
									
								<div class="col-xl-<?php echo (autenticacaoUsuario::getNivelAcesso() == "programador") ? "10":"12"; ?>" id="colValor" style="<?php echo (isset($dataUser["tipo"]) and $dataUser["tipo"] != "texto")?"display:none;":"";?>">
								  <div class="form-group mb-4">
									<?php if(autenticacaoUsuario::getNivelAcesso() == "programador") { ?> <label for="nome">Valor</label> <?php } ?>
									<input type="text" class="form-control" id="valor" name="valor" placeholder="Valor da Variável" value="<?php echo (isset($dataUser["valor"]))?$dataUser["valor"]:false;?>">
								  </div>
								</div>
								
								<div class="col-xl-<?php echo (autenticacaoUsuario::getNivelAcesso() == "programador") ? "10":"12"; ?>" id="colImagem" style="<?php echo (!isset($dataUser["tipo"]) or $dataUser["tipo"] != "imagem")?"display:none;":"";?>">
									<!-- Upload com campos personalizado pelo plugin jquery -->
									<div class="form-group">
										<?php if(autenticacaoUsuario::getNivelAcesso() == "programador") { ?><label for="uploadFiles7"> Imagem </label><?php } ?>
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
											<div id="imagePreviewContainer" style="<?php echo (!isset($dataUser["valor"]) or !upload::arquivoExisteNoDir($dataUser["valor"])) ?"display:none;":false; ?>padding-top:13px;">
												<img src="<?php echo (upload::arquivoExisteNoDir($dataUser["valor"])) ? $dataUser["valor"]:false; ?>" id="imagePreviewImg" style="background:gray;object-fit: cover; max-width:100%;" />
											</div>
											<!-- Remover imagem do banco de dados -->
											<?php if(isset($dataUser["valor"]) and upload::arquivoExisteNoDir($dataUser["valor"])) {  ?>
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
					<div class="panel bgc-white-dark" style="padding-bottom:1rem;">
						<div class="panel-body panel-body-p">    
							<button type="submit" class="btn btn-primary"><?php echo ($actionGet == "editar")?"Atualizar Registro":"Cadastrar"; ?></button>
							<?php if($actionGet == "editar" and autenticacaoUsuario::getNivelAcesso() == "programador") { ?>
								<a href="javascript:void(0);" onclick="javascript:if(confirm('Deseja realmente deletar este registro ?')) { window.location.href='<?php echo $pageLink; ?>?identificador=<?php echo $pageLink; ?>&action=delete&id=<?php echo $id; ?>'; }"><button type="button" class="btn btn-danger" style="float:right;clear:both;" id="deletarUsuario">Deletar</button>
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
    $setMenu = "adminmenu-contato";
	$setMenuType = "configurações";
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
		
		$("select#tipo").on("change", function() { 
			var valor = $(this).val();
			
			$("#colImagem, #colValor").hide();
				
			if(valor == "imagem") { 
			
				$("#colImagem").show(777);
				
			} else {
				
				
				$("#colValor input").val("");
				$("#colValor").show(777);
				
			}
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
      var data = {action:"getTable", categoria:"<?php echo ($identificadorGet)?$identificadorGet:"''"; ?>",filtro:filtro};
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
