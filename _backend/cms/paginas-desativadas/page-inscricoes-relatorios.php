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
	$pageLink = "page-inscricoes-relatorios.php";
	
	
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
				
				echo "<tr class='hoverTr style='cursor:pointer;' onclick=\"javascript:document.location.href='{$pageLink}?action=editar&filtro=".$filterString."&pag=".$pagina."&id=".$aw->id."'\">";
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
		
			echo "<a href='javascript:void(0);' class='".$active."' onclick=\"javascript:getTableAjax('".$filterString."', '".$i."');\">".$i."</a> "; 
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
		$pageTitle = "Inscrições Relatórios";
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
		$faicon = "fa-circle";
		/* headerTitle */
		$headerTitle = "<a href='".$pageLink."' style='color:black;'>Relatório Personalizado (Inscrições) </a>";
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

	    <div class="row panel-grid grid-stack" id="panel-grid">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 panel-wrap">
          <div class="panel bgc-white-dark">
            <div class="panel-body panel-body-p">
			
			<div style="padding-bottom:10px;">
				<label for="nome">Tipo do relatório:</label> 
				<select name="tipo" id="tipo" class="form-control">
					<option value="" <?php echo (!$actionGet)?"selected":"";?>> 1. Inscrições separadas por Cidade (ID, NOME, EMAIL, CELULAR E TELEFONE) </option>
					<option value="exportEmails" <?php echo ($actionGet == "exportEmails")?"selected":"";?>> 1.1 Inscrições separadas por Cidade (EMAIL) </option>
				</select>
			</div>
		
        <?php
          if(!$actionGet) {
        ?>

             
				<div style="padding-top:10px">
			
					<?php
						$sql = "select I.id, I.nome, I.celular, I.telefone_fixo, I.email, T.titulo as turma_titulo from inscricao as I 
								INNER JOIN turmas as T ON I.turma_id = T.id 
								where T.titulo like '%Campo Grande%'";
								
						/* Query */
						mysqlidb::query($sql);
						
						/* Recebe total de registros */
						$total = mysqlidb::num_rows();
					?>
					<b style="fonte-size:30px;"> INSCRIÇÕES EM CAMPO GRANDE (Total: <span style='color:blue;'><?php echo $total;?></span> Registros) </b>
			
						<div style=' padding-top:5px;'>
<textarea style="width:100%; height:200px;font-size:11px;">
<?php
for($i=0;$i<$total;$i++) {

$aw = mysqlidb::fetch_object();

$aw->telefone_fixo = (!empty($aw->telefone_fixo)) ? ", ".$aw->telefone_fixo : "";

if($aw->turma_titulo == "CAMPO GRANDE - INTEGRAL") { $aw->turma_titulo = "(INTEGRAL)"; }
else if($aw->turma_titulo == "CAMPO GRANDE - DIURNO") { $aw->turma_titulo = "(DIURNO)"; }
else if($aw->turma_titulo == "CAMPO GRANDE - NOTURNO") { $aw->turma_titulo = "(NOTURNO)"; }

echo $aw->id." | ".utf8_decode($aw->nome)." | ".$aw->email." | ".$aw->celular.$aw->telefone_fixo." | ".$aw->turma_titulo;

echo "\n";

}
?>
</textarea>
						</div>
			
				</div>
				
				
				
						<div style="padding-top:10px">
			
					<?php
						$sql = "select I.id, I.nome, I.celular, I.telefone_fixo, I.email, T.titulo as turma_titulo from inscricao as I 
								INNER JOIN turmas as T ON I.turma_id = T.id 
								where T.titulo like '%Dourados%'";
								
						/* Query */
						mysqlidb::query($sql);
						
						/* Recebe total de registros */
						$total = mysqlidb::num_rows();
					?>
					<b style="fonte-size:30px;"> INSCRIÇÕES EM DOURADOS (Total: <span style='color:blue;'><?php echo $total;?></span> Registros) </b>
			
						<div style=' padding-top:5px;'>
<textarea style="width:100%; height:200px;font-size:11px;">
<?php
for($i=0;$i<$total;$i++) {

$aw = mysqlidb::fetch_object();

$aw->telefone_fixo = (!empty($aw->telefone_fixo)) ? ", ".$aw->telefone_fixo : "";

if($aw->turma_titulo == "CAMPO GRANDE - INTEGRAL") { $aw->turma_titulo = "(INTEGRAL)"; }
else if($aw->turma_titulo == "DOURADOS - DIURNO") { $aw->turma_titulo = "(DIURNO)"; }
else if($aw->turma_titulo == "DOURADOS - NOTURNO") { $aw->turma_titulo = "(NOTURNO)"; }

echo $aw->id." | ".utf8_decode($aw->nome)." | ".$aw->email." | ".$aw->celular.$aw->telefone_fixo." | ".$aw->turma_titulo;

echo "\n";

}
?>
</textarea>
						</div>
			
				</div>
				
				
				
				
						<div style="padding-top:10px">
			
					<?php
						$sql = "select I.id, I.nome, I.celular, I.telefone_fixo, I.email, T.titulo as turma_titulo from inscricao as I 
								INNER JOIN turmas as T ON I.turma_id = T.id 
								where T.titulo like '%Três Lagoas%'";
								
						/* Query */
						mysqlidb::query($sql);
						
						/* Recebe total de registros */
						$total = mysqlidb::num_rows();
					?>
					<b style="fonte-size:30px;"> INSCRIÇÕES EM TRÊS LAGOAS (Total: <span style='color:blue;'><?php echo $total;?></span> Registros) </b>
			
						<div style=' padding-top:5px;'>
<textarea style="width:100%; height:200px;font-size:11px;">
<?php
for($i=0;$i<$total;$i++) {

$aw = mysqlidb::fetch_object();

$aw->telefone_fixo = (!empty($aw->telefone_fixo)) ? ", ".$aw->telefone_fixo : "";

if($aw->turma_titulo == "TRÊS LAGOAS - INTEGRAL") { $aw->turma_titulo = "(INTEGRAL)"; }
else if($aw->turma_titulo == "TRÊS LAGOAS - DIURNO") { $aw->turma_titulo = "(DIURNO)"; }
else if($aw->turma_titulo == "TRÊS LAGOAS - NOTURNO") { $aw->turma_titulo = "(NOTURNO)"; }

echo $aw->id." | ".utf8_decode($aw->nome)." | ".$aw->email." | ".$aw->celular.$aw->telefone_fixo." | ".$aw->turma_titulo;

echo "\n";

}
?>
</textarea>
						</div>
			
				</div>
				
				
				
				
				
						<div style="padding-top:10px">
			
					<?php
						$sql = "select I.id, I.nome, I.celular, I.telefone_fixo, I.email, T.titulo as turma_titulo from inscricao as I 
								INNER JOIN turmas as T ON I.turma_id = T.id 
								where T.titulo like '%CORUMBÁ%'";
								
						/* Query */
						mysqlidb::query($sql);
						
						/* Recebe total de registros */
						$total = mysqlidb::num_rows();
					?>
					<b style="fonte-size:30px;"> INSCRIÇÕES EM CORUMBÁ (Total: <span style='color:blue;'><?php echo $total;?></span> Registros) </b>
			
						<div style=' padding-top:5px;'>
<textarea style="width:100%; height:200px;font-size:11px;">
<?php
for($i=0;$i<$total;$i++) {

$aw = mysqlidb::fetch_object();

$aw->telefone_fixo = (!empty($aw->telefone_fixo)) ? ", ".$aw->telefone_fixo : "";

if($aw->turma_titulo == "CORUMBÁ - INTEGRAL") { $aw->turma_titulo = "(INTEGRAL)"; }
else if($aw->turma_titulo == "CORUMBÁ - DIURNO") { $aw->turma_titulo = "(DIURNO)"; }
else if($aw->turma_titulo == "CORUMBÁ - NOTURNO") { $aw->turma_titulo = "(NOTURNO)"; }

echo $aw->id." | ".utf8_decode($aw->nome)." | ".$aw->email." | ".$aw->celular.$aw->telefone_fixo." | ".$aw->turma_titulo;

echo "\n";

}
?>
</textarea>
						</div>
			
				</div>
				
				
				
				
        <?php
		
			} else if($actionGet == "exportEmails") {
			 
        ?>
	         
				<div style="padding-top:10px">
			
					<?php
						$sql = "select I.id, I.nome, I.celular, I.telefone_fixo, I.email, T.titulo as turma_titulo from inscricao as I 
								INNER JOIN turmas as T ON I.turma_id = T.id 
								where T.titulo like '%Campo Grande%' group by I.email";
								
						/* Query */
						mysqlidb::query($sql);
						
						/* Recebe total de registros */
						$total = mysqlidb::num_rows();
					?>
					<b style="fonte-size:30px;"> INSCRIÇÕES EM CAMPO GRANDE (Total: <span style='color:blue;'><?php echo $total;?></span> Registros) </b> <span style='color:red;font-size:12px;'> * Os e-mails duplicados foram removidos da lista. </span>
			
						<div style=' padding-top:5px;'>
<textarea style="width:100%; height:200px;font-size:11px;">
<?php
for($i=0;$i<$total;$i++) {

$aw = mysqlidb::fetch_object();

echo strtolower($aw->email);

echo "\n";

}
?>
</textarea>
						</div>
			
				</div>
				
				
				
						<div style="padding-top:10px">
			
					<?php
						$sql = "select I.id, I.nome, I.celular, I.telefone_fixo, I.email, T.titulo as turma_titulo from inscricao as I 
								INNER JOIN turmas as T ON I.turma_id = T.id 
								where T.titulo like '%Dourados%' group by I.email";
								
						/* Query */
						mysqlidb::query($sql);
						
						/* Recebe total de registros */
						$total = mysqlidb::num_rows();
					?>
					<b style="fonte-size:30px;"> INSCRIÇÕES EM DOURADOS (Total: <span style='color:blue;'><?php echo $total;?></span> Registros) </b> <span style='color:red;font-size:12px;'> * Os e-mails duplicados foram removidos da lista. </span>
						<div style=' padding-top:5px;'>
<textarea style="width:100%; height:200px;font-size:11px;">
<?php
for($i=0;$i<$total;$i++) {

$aw = mysqlidb::fetch_object();

echo strtolower($aw->email);

echo "\n";

}
?>
</textarea>
						</div>
			
				</div>
				
				
				
				
						<div style="padding-top:10px">
			
					<?php
						$sql = "select I.id, I.nome, I.celular, I.telefone_fixo, I.email, T.titulo as turma_titulo from inscricao as I 
								INNER JOIN turmas as T ON I.turma_id = T.id 
								where T.titulo like '%Três Lagoas%' group by I.email";
								
						/* Query */
						mysqlidb::query($sql);
						
						/* Recebe total de registros */
						$total = mysqlidb::num_rows();
					?>
					<b style="fonte-size:30px;"> INSCRIÇÕES EM TRÊS LAGOAS (Total: <span style='color:blue;'><?php echo $total;?></span> Registros) </b> <span style='color:red;font-size:12px;'> * Os e-mails duplicados foram removidos da lista. </span>
			
						<div style=' padding-top:5px;'>
<textarea style="width:100%; height:200px;font-size:11px;">
<?php
for($i=0;$i<$total;$i++) {

$aw = mysqlidb::fetch_object();

echo strtolower($aw->email);

echo "\n";

}
?>
</textarea>
						</div>
			
				</div>
				
				
				
				
				
						<div style="padding-top:10px">
			
					<?php
						$sql = "select I.id, I.nome, I.celular, I.telefone_fixo, I.email, T.titulo as turma_titulo from inscricao as I 
								INNER JOIN turmas as T ON I.turma_id = T.id 
								where T.titulo like '%CORUMBÁ%' group by I.email";
								
						/* Query */
						mysqlidb::query($sql);
						
						/* Recebe total de registros */
						$total = mysqlidb::num_rows();
					?>
					<b style="fonte-size:30px;"> INSCRIÇÕES EM CORUMBÁ (Total: <span style='color:blue;'><?php echo $total;?></span> Registros) </b> <span style='color:red;font-size:12px;'> * Os e-mails duplicados foram removidos da lista. </span>
			
						<div style=' padding-top:5px;'>
<textarea style="width:100%; height:200px;font-size:11px;">
<?php
for($i=0;$i<$total;$i++) {

$aw = mysqlidb::fetch_object();

echo strtolower($aw->email);

echo "\n";

}
?>
</textarea>
						</div>
			
				</div>
				
				
				
	
        <?php
          } else { jsTools::redirecionar($pageLink);  } 
        ?>
		
		
				
            </div>
          </div>
        </div>
        </div>
		
    </div>
  </section>
  <!--Begin Sidebar-->
  <!-- Modal -->

  <?php
    $setMenu = "adminmenu-inscrições";
	$setMenuType = "relatórios";
    include "includes/sidebar.php";

  ?>
  <!--End Sidebar-->
  <!-- Footer -->
  <?php include "includes/footer.php"; ?>
  
  
  <!-- Scripts Functions -->
  <script>
	$(function() { 
		
		$("select#tipo").on("change", function() { 
		
			var valor = $(this).val();
			
			
			if(valor == "") { 
			
				document.location.href='?';
				
				
			} else if (valor == "exportEmails") {
				
				document.location.href='?action=exportEmails';
				
			}
		});
	
	});
  </script>

</body>
</html>
