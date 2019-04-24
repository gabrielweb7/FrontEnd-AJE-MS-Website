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
	$pageLink = "page-inscricoes.php";
	
	
	/* Paginacao */
	$pagina = (isset($_REQUEST["pag"])) ? filter_var($_REQUEST["pag"], FILTER_SANITIZE_NUMBER_INT) : 1;
	
	/* Total de registros a ser mostrado na Paginação */
	$registros = 15;
	
	/* Recebendo acao em GET */
	$actionGet = (isset($_GET["action"])) ? filter_var($_GET["action"],FILTER_SANITIZE_STRING) : false;

	/* Recebendo Action Ajax em POST */
	$actionPost = (isset($_POST["action"])) ? filter_var($_POST["action"],FILTER_SANITIZE_STRING) : false;

	/* Recebendo ID */
	$id = (isset($_REQUEST["id"])) ? filter_var($_REQUEST["id"],FILTER_SANITIZE_NUMBER_INT) : false;

	/* Recebendo filterString em POST */
	$filterString = (isset($_REQUEST["filtro"])) ? filter_var($_REQUEST["filtro"],FILTER_SANITIZE_STRING) : "allRegisters";

	$filterStringSaidaInput = ($filterString == "allRegisters") ? "" : $filterString;

	/* Recebendo filterInteger em POST */
	$filtroColuna = (isset($_REQUEST["filtroColuna"])) ? filter_var($_REQUEST["filtroColuna"],FILTER_SANITIZE_STRING) : false;
	$filtroValor = (isset($_REQUEST["filtroValor"])) ? filter_var($_REQUEST["filtroValor"],FILTER_SANITIZE_STRING) : false;

	
	/* Recebendo msg sucesso em GET */
	$getSucesso = (isset($_GET["sucesso"])) ? filter_var($_GET["sucesso"],FILTER_SANITIZE_STRING) : false;
	
	/* Recebendo msg error em GET */
	$getError = (isset($_GET["erro"])) ? filter_var($_GET["erro"],FILTER_SANITIZE_STRING) : false;

	
	/* condição para alimentar html via ajax */
	if($actionPost == "getTable") {

		/* Iniciando Where */
		$where = null;
		
		/* Comparativo para determinar qual SQL utilizar */
		if($filterString != "allRegisters") {
			
			if(isset($where)) { $where .= " and "; } else { $where .= "WHERE "; }
		
			$where .= "(".TABLE_INSCRICOES.".nome like '%{$filterString}%' or ".TABLE_INSCRICOES.".email like '%{$filterString}%' or ".TABLE_INSCRICOES.".celular like '%{$filterString}%' or ".TABLE_TURMAS.".titulo like '%{$filterString}%')";
		
		} else { 
		
			/* Metodo de filtragem mais preciso através do nome da coluna e o valor */
			if(!empty($filtroColuna)) { 
				
				if(isset($where)) { $where .= " and "; } else { $where .= "WHERE "; }
				if($filtroValor != "NULL") { 
					$where .= $filtroColuna." = '".$filtroValor."'";
				} else { 
					$where .= $filtroColuna." IS NULL";
				}
			}
			
		}		
		
		/* Pega total de registros na tabela  */
		$sql = "select ".TABLE_INSCRICOES.".id, ".TABLE_INSCRICOES.".nome, ".TABLE_INSCRICOES.".email, ".TABLE_INSCRICOES.".celular, ".TABLE_INSCRICOES.".telefone_fixo, ".TABLE_INSCRICOES.".data_da_inscricao, ".TABLE_TURMAS.".titulo as turma_titulo from ".TABLE_INSCRICOES." 
				LEFT JOIN turmas ON ".TABLE_INSCRICOES.".turma_id = ".TABLE_TURMAS.".id {$where}";


		/* Query */
		mysqlidb::query($sql);
		
		/* Recebe total de registros */
		$total = mysqlidb::num_rows();

	
		/* Calcula o numero de paginas arredondando o resultado para cima */
		$numPaginas = ceil($total/$registros);
		
		//variavel para calcular o início da visualização com base na página atual 
		$inicio = ($registros*$pagina)-$registros; 

		/* Create Sql */
		$sql = "select ".TABLE_INSCRICOES.".id, ".TABLE_INSCRICOES.".nome, ".TABLE_INSCRICOES.".email, ".TABLE_INSCRICOES.".celular, ".TABLE_INSCRICOES.".telefone_fixo, ".TABLE_INSCRICOES.".data_da_inscricao, ".TABLE_TURMAS.".titulo as turma_titulo from ".TABLE_INSCRICOES." 
				LEFT JOIN turmas ON ".TABLE_INSCRICOES.".turma_id = ".TABLE_TURMAS.".id {$where} order by ".TABLE_INSCRICOES.".nome asc limit $inicio,$registros";

		/* Query */
		mysqlidb::query($sql);
	
		/* Se quantidade de registros recebidos for positivo */
		if(mysqlidb::num_rows()) {
			
			/* For */
			for($i=0;$i<mysqlidb::num_rows();$i++) {
				
				/* aw */
				$aw = mysqlidb::fetch_object();
				
			
				
				$dataEx = explode(" ", $aw->data_da_inscricao);
				
				$aw->telefone_fixo = (!empty($aw->telefone_fixo)) ? ", ".$aw->telefone_fixo : "";
				
				echo "<tr class='hoverTr style='cursor:pointer;' onclick=\"javascript:document.location.href='#{$pageLink}?action=editar&filtro=".$filterString."&pag=".$pagina."&id=".$aw->id."'\">";
				echo "<td style='vertical-align: middle;'>".($aw->id)."</td>";
				echo "<td style='vertical-align: middle;'>".utf8_decode($aw->nome)."</td>";
				echo "<td style='vertical-align: middle;'>".$aw->celular." ".$aw->telefone_fixo."</td>";
				echo "<td style='vertical-align: middle;'>".strtolower($aw->email)."</td>";
				echo "<td style='vertical-align: middle;'>".($aw->turma_titulo)."</td>";
				echo "<td style='vertical-align: middle;text-align:center;'>".tools::convertDateMysqlToBR($dataEx[0])."</td>";
				echo "</tr>";
				
			}
			
		} else {
			echo "0";
		}
		
		/* Die */
		die();
		
	} else if($actionPost == "getPagination") {
		
		/* Iniciando Where */
		$where = null;
		
		/* Comparativo para determinar qual SQL utilizar */
		if($filterString != "allRegisters") {
			
			if(isset($where)) { $where .= " and "; } else { $where .= "WHERE "; }
		
			$where .= "(".TABLE_INSCRICOES.".nome like '%{$filterString}%' or ".TABLE_INSCRICOES.".email like '%{$filterString}%' or ".TABLE_INSCRICOES.".celular like '%{$filterString}%'  or ".TABLE_TURMAS.".titulo like '%{$filterString}%')";
		
		} else { 
			
				/* Metodo de filtragem mais preciso através do nome da coluna e o valor */
			if(!empty($filtroColuna)) { 
			
				if(isset($where)) { $where .= " and "; } else { $where .= "WHERE "; }
				if($filtroValor != "NULL") { 
					$where .= $filtroColuna." = '".$filtroValor."'";
				} else { 
					$where .= $filtroColuna." IS NULL";
				}
			}
			
		}
		
		/* Pega total de registros na tabela  */
		$sql = "select ".TABLE_INSCRICOES.".id, ".TABLE_INSCRICOES.".nome, ".TABLE_INSCRICOES.".email, ".TABLE_INSCRICOES.".celular, ".TABLE_INSCRICOES.".telefone_fixo, ".TABLE_INSCRICOES.".data_da_inscricao, ".TABLE_TURMAS.".titulo as turma_titulo from ".TABLE_INSCRICOES." 
		LEFT JOIN turmas ON ".TABLE_INSCRICOES.".turma_id = ".TABLE_TURMAS.".id {$where}";
		
		/* Query */
		mysqlidb::query($sql);
		
		/* Recebe total de registros */
		$total = mysqlidb::num_rows();
		
		/* Calcula o numero de paginas arredondando o resultado para cima */
		$numPaginas = ceil($total/$registros);
		
		
		for($i = 1; $i < $numPaginas + 1; $i++) { 
			
			$active = ($i == $pagina) ? "active":"";
		
			echo "<a href='javascript:void(0);' class='".$active."' onclick=\"javascript:getTableAjax('".$filterString."', '".$i."', '".$filtroColuna."', '".$filtroValor."');\">".$i."</a> "; 
		} 

		echo "<div style='text-align:center;padding-top:5px;'> Total de registros: {$total} </div>";

		
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
		$sql = "DELETE FROM ".TABLE_INSCRICOES." WHERE id = {$id}";
	
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
		$pageTitle = "Inscrições";
		include "includes/head.php";
    ?>
	<style>
	
		.naoLido { background:#ffe9e4; }
		.hoverTr:hover { background:#f3f3f3; }
		
		#paginationBody { text-align:center;padding-top:10px; }
		#paginationBody > a { padding: 1px 8px; background-color:#a0a2a5; color: white; }
		#paginationBody > a.active { font-weight:bold; background-color:#5a606d; }
		#paginationBody > a:focus { font-weight:bold; background-color:#5a606d; }
		
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
		$faicon = "fa-user";
		/* headerTitle */
		$headerTitle = "<a href='".$pageLink."' style='color:black;'>Inscrições</a>";
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
			  
			  
				<div class="pull-left"> <a href="<?php echo $pageLink; ?>?filtroColuna=turmas.titulo&filtroValor=NULL"> Ver registros sem Turma </a> </div>
				
				<div class="columns columns-right btn-group pull-right">
                  <!-- Botao Pesquisar  -->
                  <button style="background: #5a606d;color: white;margin-right:20px;" onclick="javascript:getTableAjaxFilter();return false;" class="btn btn-default" type="button" name="paginationSwitch" aria-label="pagination Switch" title="Pesquisar">
                  Ok
                  </button>
                  <!-- Botao Atualizar  -->
                  <button style="background: #5a606d;color: white;" onclick="javascript:refreshTable();return false;" class="btn btn-default" type="button" name="refresh" aria-label="refresh" title="Atualizar">
                    <i class="glyphicon icon-refresh"></i>
                  </button>
                </div>
                <div class="pull-right search">
                  <!-- Input Filtrar  -->
                  <input class="form-control" value="<?php echo $filterStringSaidaInput; ?>" type="text" id="inputFilter" placeholder="Filtrar">
                </div>
              </div>
              <!-- Table-Responsive -->
              <div class="table-responsive" id="targetTabela" style="padding-top:20px;">
                <table class="table nowrap  table-bordered fs-7 c-gray-darker">
                  <thead>
                    <tr style="background: #5a606d;color: white;">
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Telefone</th>
                      <th>E-mail</th>
                      <th> Turma </th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="6" style="text-align:center;"> Carregando... </td>
                    </tr>
                  </tbody>
                </table>
				<div id="paginationBody" style=""> </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <?php
          } else if($actionGet == "editar") {
			 
				
				/* Se caso estiver vazio.. DIE :D */
				if(!$id) { jsTools::redirecionar($pageLink); }
				
				/* Seta como lido.. */
					/* Criando Consulta SQL */
				$sql = "UPDATE ".TABLE_INSCRICOES." SET status = '1' where id = {$id}"; 
				
				/* Query */
				mysqlidb::query($sql);
				
				/* Criando Consulta SQL */
				$sql = "select * from ".TABLE_INSCRICOES." where id = {$id}"; 
				
				/* Query */
				mysqlidb::query($sql);
				
				/* Se caso resultado for negativo DIE :D */
				if(mysqlidb::num_rows() < 1) { jsTools::redirecionar($pageLink); }
				
				/* Alimentar variavel com informações do usuario */
				$dataUser = mysqlidb::fetch_array();
				
				
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
							<h2 class="pull-left">Informações da Imagem</h2>
						</div>
						<div class="panel-body panel-body-p">
							<div class="row">
								
								<div class="col-xl-6">
								  <div class="form-group mb-4">
									<label for="nome">Nome</label>
										 <div><b><?php echo (isset($dataUser["nome"]))?$dataUser["nome"]:false;?></b> </div>
								  </div>
								</div>
								
								
								<div class="col-xl-6">
								  <div class="form-group mb-4">
									  <label for="sobrenome">Telefone</label>
									  <div><b><?php echo (isset($dataUser["telefone"]))?$dataUser["telefone"]:false;?></b></div>
								  </div>
								</div>
								
							
								<div class="col-xl-12">
								  <div class="form-group mb-4">
									<label for="nome">E-mail</label>
										 <div><b><?php echo (isset($dataUser["email"]))?$dataUser["email"]:false;?></b></div>
								  </div>
								</div>
								
								
								<div class="col-xl-12">
								  <div class="form-group mb-4">
									<label for="nome">Mensagem</label>
										 <div><b style='white-space: pre-wrap !important;'><?php echo (isset($dataUser["mensagem"]))?$dataUser["mensagem"]:false;?></b></div>
								  </div>
								</div>
								
								
			
									<div class="col-xl-2">
									  <div class="form-group">
									
										<label for="nome"><b>Data do envio</b></label>
										<div><?php echo (isset($dataUser["data_envio"]))?tools::convertDateTimeMysqlToBR($dataUser["data_envio"]):false;?></div>
									  </div>
									</div>
						
							
								
							</div> <!-- end row -->
						</div>
					</div>
				</section>
				
				<section class="col-sm-12 col-md-12 col-lg-12 col-xl-12 panel-wrap panel-grid-item">
					<div class="panel bgc-white-dark" style="padding-bottom:1rem;">
						<div class="panel-body panel-body-p">    
							<a href="javascript:void(0);" onclick="javascript: window.location.href='<?php echo $pageLink; ?>?filtro=<?php echo $filterString; ?>&pag=<?php echo $pagina; ?>'"><button type="button" class="btn btn-primary" id="deletarUsuario">Voltar</button>
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
    $setMenu = "adminmenu-inscrições";
	$setMenuType = "inscrições";
    include "includes/sidebar.php";

  ?>
  <!--End Sidebar-->
  <!-- Footer -->
  <?php include "includes/footer.php"; ?>
  
  
  <!-- Scripts Functions -->
  <script>
    var tabela = $("#targetTabela");

    /* Eventos */
    window.onload = function() {
      getTableAjax("<?php echo $filterString; ?>", "<?php echo $pagina; ?>", "<?php echo $filtroColuna; ?>", "<?php echo $filtroValor; ?>");
    };

    /* Se caso clicar em enter.. executar funcao de filtro */
    $("#inputFilter").keypress(function(e) {
      if(e.which == 13) {
        getTableAjaxFilter();
      }
    });

	/* Funcao criada para atualizar toda tabela para padrao */
	function refreshTable() { 
	
		/* Limpa campo do filtro */
		$('#inputFilter').val('');
	
		/* Limpa html da paginacao */
		$("#paginationBody").html('');
	
		/* Atualiza tabela via ajax */
		getTableAjax();
		
	}
	
    /* Botao para filtrar registros */
    function getTableAjaxFilter() {
		
		/* Limpa html da paginacao */
	  $("#paginationBody").html('');
		
		var inputValor = $("#inputFilter").val();
		
		if(inputValor == "") {
			getTableAjax("allRegisters", "1", false, false);
		} else {
			getTableAjax(inputValor, "1", false, false);
		}
    }

    /* Funcoes */
    function getTableAjax(filtro, pageIndex,  filtroColuna, filtroValor) {
      var data = {action:"getTable", pag:pageIndex,filtro:filtro, filtroColuna:filtroColuna, filtroValor:filtroValor};
      $.ajax({
        url: "<?php echo $pageLink; ?>",
        method: "POST",
        data: data,
        beforeSend: function()  {
          
		  /* Carregando */
		  tabela.find("tbody").html('<tr><td colspan="6" style="text-align:center;"> Carregando... </td></tr>');
		  
		   /* Atualizando pagination */
		  getPagination(filtro, pageIndex, filtroColuna, filtroValor);
			  
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
	
	function getPagination(filtro, pageIndex, filtroColuna, filtroValor) { 
	
		/* Tira o active dos botoes da paginacao */
		$("#paginationBody a").removeClass("active");
	
		 var data = {action:"getPagination", pag:pageIndex, filtro:filtro, filtroColuna:filtroColuna, filtroValor:filtroValor};
		  $.ajax({
			url: "<?php echo $pageLink; ?>",
			method: "POST",
			data: data,
			beforeSend: function()  {
			 
			},
			success: function(data) {
				if(data != "0") {
					$("#paginationBody").html(data);
				}
				else {
					console.log("Pagination: 0");
				}
			}
		  });
		
		
	}
	
  </script>

</body>
</html>
