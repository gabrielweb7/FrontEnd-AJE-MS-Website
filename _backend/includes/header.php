<!-- Header -->
<header>
	<?php 
		$topoLogo = adminImagens::getRegister("titulo = 'Topo_Logotipo'");
	?>
	
	<!-- logo -->
	<div class="logo">
		<?php if(file_exists("cms/".$topoLogo["imagem_src"])) { ?>
			<a href="./index.php"><img src="<?php echo "cms/".$topoLogo["imagem_src"]; ?>" alt="<?php echo $topoLogo["imagem_alt"]; ?>" /></a>
		<?php } ?>
	</div>

	<!-- menu -->
	<div class="menu">
		<!-- Container -->
		<div class="container">
			<!-- Ul -->
			<ul id="navbar" class="navbar-collapse collapse">
				<li <?php echo ($activeMenu == "index")?'class="active"':''; ?>> <a href="./index.php">  Home  </a> </li>
				<li class="dropdown <?php echo ($activeMenu == "institucional")?'active':''; ?>"> 
					<a href="javascript:void(0);" style="cursor: default;">  Institucional  <span class="caret"></span> </a> 
					<ul class="dropdown-menu">
	                  <li <?php echo (isset($activeSubMenu) and $activeSubMenu == "quemsomos")?'class="active"':''; ?>><a href="./quem-somos">Quem Somos</a></li>
	                  <li <?php echo (isset($activeSubMenu) and $activeSubMenu == "diretoria")?'class="active"':''; ?>><a href="./diretoria">Diretoria</a></li>
	                  <li <?php echo (isset($activeSubMenu) and $activeSubMenu == "estatuto")?'class="active"':''; ?>><a href="./estatuto">Estatuto</a></li>
	                  <li <?php echo (isset($activeSubMenu) and $activeSubMenu == "transparencia")?'class="active"':''; ?>><a href="./transparencia">Transparência</a></li>
	                </ul>
				</li>
					<li <?php echo ($activeMenu == "agenda")?'class="active"':''; ?>> <a href="./agenda"> Agenda  </a> </li>
				<li <?php echo ($activeMenu == "projetos")?'class="active"':''; ?>> <a href="./projetos"> Projetos  </a> </li>
				<li <?php echo ($activeMenu == "cursos")?'class="active"':''; ?>> <a href="./cursos"> Cursos  </a> </li>
				<li <?php echo ($activeMenu == "biblioteca")?'class="active"':''; ?>> <a href="./biblioteca"> Biblioteca  </a> </li>
				<li <?php echo ($activeMenu == "associados")?'class="active"':''; ?>> <a href="./associados"> Associados  </a> </li>
				<li <?php echo ($activeMenu == "mantenedores")?'class="active"':''; ?>> <a href="./mantenedores">  Mantenedores  </a> </li>
				<li <?php echo ($activeMenu == "redeajems")?'class="active"':''; ?>> <a href="./redeEmpreendedora"> Rede Empreendedora  </a> </li>
				<li <?php echo ($activeMenu == "contato")?'class="active"':''; ?>> <a href="./contato"> Contato  </a> </li>
			</ul>
			<div>
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				</button>
			</div>
		</div>
	</div>
</header>