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

	/* Nulando sessoes do Menu - sidebar */
    adminMenu::unsetSessions();

	/* Variaveis */
	$pageLink = "adminUsuarios.php";

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

		/* Create Where */
		$where = null;
		
		/* Se não for programador... não mostrar nivelAcesso programador */
		if(autenticacaoUsuario::getNivelAcesso() != "programador") { 
			$where .= "WHERE (nivelAcesso != 'programador')";
		}
		
		/* Comparativo para determinar qual SQL utilizar */
		if($filterString != "allRegisters") {
			
			if(isset($where)) { $where .= " and "; } else { $where .= "WHERE "; }
			
			$where .= "(nome like '%{$filterString}%'
			or sobrenome like '%{$filterString}%'
			or email like '%{$filterString}%'
			or cargo like '%{$filterString}%'
			or nivelAcesso like '%{$filterString}%')";
		}


		/* Create SQL */
		$sql = "select * from ".TABLE_USUARIOS." {$where}";

		/* Query */
		mysqlidb::query($sql);
		
		/* Se quantidade de registros recebidos for positivo */
		if(mysqlidb::num_rows()) {
			
			/* For */
			for($i=0;$i<mysqlidb::num_rows();$i++) {
				$aw = mysqlidb::fetch_object();
				echo "<tr>";
				echo "<td> <a href='{$pageLink}?action=editar&id=".$aw->id."'>".$aw->nome."</td>";
				echo "<td>".$aw->sobrenome."</td>";
				echo "<td>".$aw->email."</td>";
				echo "<td>".$aw->cargo."</td>";
				echo "<td>".$aw->nivelAcesso."</td>";
				echo "<td>".tools::convertDateTimeMysqlToBR($aw->dataHoraCriacao)."</td>";
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
		
	} else if($actionPost == "novoRegistro" or $actionPost == "editarRegistro") {
		
		/* Recebendo Variaveis e filtrando */
		$nome = isset($_POST["nome"]) ? filter_var($_POST["nome"],FILTER_SANITIZE_STRING) : false;
		$sobrenome = isset($_POST["sobrenome"]) ? filter_var($_POST["sobrenome"],FILTER_SANITIZE_STRING) : false;
		$email = isset($_POST["email"]) ? filter_var($_POST["email"],FILTER_SANITIZE_STRING) : false;
		$senha = isset($_POST["senha"]) ? filter_var($_POST["senha"],FILTER_SANITIZE_STRING) : false;
		$cargo = isset($_POST["cargo"]) ? filter_var($_POST["cargo"],FILTER_SANITIZE_STRING) : false;
		$nivelAcesso = isset($_POST["nivelAcesso"]) ? filter_var($_POST["nivelAcesso"],FILTER_SANITIZE_STRING) : false;
		
		/* Pega DataHora NOW (AGORA!) */
		$dataHoraNow = tools::getDateTimeMysql();
		
		/* Upload Var */
		$foto = $_FILES['foto'];
		
		/* Inicia Upload */
		$fotoDir = upload::arquivo($foto, upload::getRandomName(), UPLOAD_DIR."usuarios/", array("jpg","jpeg","png"), 9000000); /* Max 9mb */

		/* Em caso de erros no upload .. */
		$erroMensagem = (upload::getErrorMsg()) ? "&erro=".upload::getErrorMsg() : false;	
		
		/* PREPARANDO SQL PARA [ EDITAR REGISTRO ] */
		if($id) { 
		
			/* Se foto existir.. incrementar na sql */
			$fotoDirSql = ($fotoDir) ? ", foto = '{$fotoDir}'" : false;
			
			/* Se nivelAcesso existir.. incrementar na sql */
			$nivelAcessoSql = ($nivelAcesso) ? ", nivelAcesso = '{$nivelAcesso}'" : false;
			
			/* sql */
			$sql = "UPDATE ".TABLE_USUARIOS." SET nome = '{$nome}', sobrenome = '{$sobrenome}', email = '{$email}', senha = '{$senha}', cargo = '{$cargo}', ";
			$sql .= "dataHoraModificacao = '{$dataHoraNow}'{$fotoDirSql}{$nivelAcessoSql} ";
			$sql .= "WHERE id = {$id}";
			
		} 
		/* PREPARANDO SQL PARA [ NOVO REGISTRO ] */
		else { 
		
			/* sql */
			$sql = "INSERT INTO ".TABLE_USUARIOS." (nome, sobrenome, email, senha, foto, cargo, nivelAcesso, dataHoraCriacao) ";
			$sql .= "VALUES ('{$nome}','{$sobrenome}','{$email}','{$senha}', '{$fotoDir}', '{$cargo}', '{$nivelAcesso}', '{$dataHoraNow}')";
				
		}
		
		/* Query */
		if(mysqlidb::query($sql))
		{
			
			/* Se caso for novo registro recuperar ultimo id inserido na tabela.. */
			if($actionPost == "novoRegistro") { 
				
				/* retornar ultimo id inserido na tabela  */
				$id = mysqlidb::return_insert_id();
				
				/* Redirecionar */
				jsTools::redirecionar("{$pageLink}?action=editar&id={$id}&sucesso=Novo usuário inserido com sucesso!".$erroMensagem);
			
			} else { 
			
				/* Se caso registro alterado for do proprio usuario logado.. */
				if($id == autenticacaoUsuario::getSessionId()) { 
				
					/* Atualizar sessão do usuario  */
					autenticacaoUsuario::updateUserSessions();
					
				}
			
				/* Redirecionar */
				jsTools::redirecionar("{$pageLink}?action=editar&id={$id}&sucesso=Usuário atualizado com sucesso!".$erroMensagem);
			
			}
			
			
		
		}
		
		/* Die */
		die();
		
	} else if($actionGet == "delete") { 
	
		/* Não é possivel apagar seu proprio usuario! Não fazer nada.. */
		if(autenticacaoUsuario::getSessionId() == $id) { 
			
			/* Redirecionar */
			jsTools::redirecionar("{$pageLink}?sucesso=Registros deletado com sucesso!");
			
			/* Die */
			die();
		}
	
		/* SQL */
		$sql = "DELETE FROM ".TABLE_USUARIOS." WHERE id = {$id}";
	
		/* Query */
		if(mysqlidb::query($sql))
		{
			
			/* Redirecionar */
			jsTools::redirecionar("{$pageLink}?msgSuccess=Registros deletado com sucesso!");
		
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
		$pageTitle = " | Usuários";
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
		$headerTitle = "<a href='".$pageLink."' style='color:black;'>Gerenciar Usuários</a>";
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
                  <div id="user-toolbar">
                    <!-- Novo Usuario -->
                    <button onclick="javascript:document.location.href='?action=novo'" id="new-table-row" class="btn btn-default" style="background: #5a606d;color: white;">
						<i class="fa fa-plus icon-mr-ch"></i>Novo Registro
                    </button>
                  </div>
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
                      <th>Nome</th>
                      <th>Sobrenome</th>
                      <th>E-mail</th>
                      <th>Cargo</th>
                      <th>Nível de Acesso</th>
                      <th>Criado em</th>
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
				$sql = "select * from ".TABLE_USUARIOS." where id = {$id}"; 
				
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
			<input type="hidden" name="id" value="<?php echo $id; ?>" />
				<section class="col-sm-12 col-md-12 col-lg-12 col-xl-12 panel-wrap panel-grid-item">
					<!--Start Panel-->
					<div class="panel bgc-white-dark">
						<div class="panel-header panel-header-p bgc-white-dark panel-header-sm">
							<h2 class="pull-left">Informações do Usuário</h2>
						</div>
						<div class="panel-body panel-body-p">
							<div class="row">
								<div class="col-xl-4">
								  <div class="form-group mb-4">
									<label for="nome">Nome</label>
									<input type="text" class="form-control" id="nome" name="nome" placeholder="Nome" value="<?php echo (isset($dataUser["nome"]))?$dataUser["nome"]:false;?>">
								  </div>
								</div>
								<div class="col-xl-4">
								  <div class="form-group mb-4">
									  <label for="sobrenome">Sobrenome</label>
									  <input type="text" class="form-control" id="sobrenome" name="sobrenome" placeholder="Sobrenome" value="<?php echo (isset($dataUser["sobrenome"]))?$dataUser["sobrenome"]:false;?>">
								  </div>
								</div>
								<div class="col-xl-4">
									<div class="form-group mb-4">
										<label for="cargo"> Cargo </label>
										<input type="text" class="form-control" id="cargo" name="cargo" placeholder="Insira nome do cargo"  value="<?php echo (isset($dataUser["cargo"]))?$dataUser["cargo"]:false;?>">
									</div>
								</div>
								<div class="col-xl-6">
									<div class="form-group mb-4">
										<label for="nivelAcesso"> Nível de Acesso </label>
										<select id="nivelAcesso" name="nivelAcesso" class="ui fluid search tags-allow-select select-dropdown" <?php echo (isset($dataUser["nivelAcesso"]) and $dataUser["nivelAcesso"] == "programador")? "disabled":false; ?>>
											<option value="administrador" <?php echo (isset($dataUser["nivelAcesso"]) and $dataUser["nivelAcesso"] == "administrador")? "selected":false; ?>> Administrador </option>
											<option value="programador" <?php echo (isset($dataUser["nivelAcesso"]) and $dataUser["nivelAcesso"] == "programador")? "selected":false; ?>>Programador</option>
										
										</select>
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
								<label for="email">E-mail  <span style='color:red;font-size:11px;margin-left:5px;'>* Login para acessar o painel</span> </label>
								<input type="email" class="form-control" id="email" name="email" placeholder="Insira o E-mail"  value="<?php echo (isset($dataUser["email"]))?$dataUser["email"]:false;?>">
							</div>
							<div class="form-group mb-4">
							  <label for="senha">Senha <span style='color:red;font-size:11px;margin-left:5px;'>* Senha para acessar o painel</span> </label>
							  <input type="text" class="form-control" id="senha" name="senha" placeholder="Insira a Senha"  value="<?php echo (isset($dataUser["senha"]))?$dataUser["senha"]:false;?>">
							</div>
						</div>
					</div>
				</section>

				<section class="col-sm-12 col-md-12 col-lg-12 col-xl-12 panel-wrap panel-grid-item">
					<div class="panel bgc-white-dark" style="padding-bottom:1rem;">
						<div class="panel-body panel-body-p">    
							<button type="submit" class="btn btn-primary"><?php echo ($actionGet == "editar")?"Atualizar Registro":"Cadastrar"; ?></button>
							<?php if($actionGet == "editar" and autenticacaoUsuario::getSessionId() != $dataUser["id"]) { ?>
								<a href="javascript:void(0);" onclick="javascript:if(confirm('Deseja realmente deletar este registro ?')) { window.location.href='<?php echo $pageLink; ?>?action=delete&id=<?php echo $id; ?>'; }"><button type="button" class="btn btn-danger" style="float:right;clear:both;" id="deletarUsuario">Deletar</button>
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
    $setMenu = "adminUsuarios";
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
      var data = {action:"getTable",filtro:filtro};
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
