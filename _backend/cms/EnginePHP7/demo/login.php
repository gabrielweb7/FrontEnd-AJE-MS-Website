<?php
/**
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*                   Criado por Gabriel Azuaga Barbosa
*                  E-mail: gabrielbarbosaweb7@gmail.com
*  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
* ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
*/

/* Iniciando FrameWork EnginePHP7 */
require "../enginephp7.init.php";

if($_SERVER['REQUEST_METHOD'] == "POST") {
	
	/* Iniciando autenticação */
	$resultado = autenticacaoUsuario::login($_POST["email"], $_POST["senha"]);
	
	/* Logado com sucesso! */
	if(isset($resultado["sucesso"])){ 
		echo "logado!";
	}

	/* Erro no login */
	if(isset($resultado["error"])){ 
		echo "Error!";
	}
}	
?>
<form action="?" method="post">
	<div>
		E-mail: <input type="text" name="email" required />
	</div>
	<div>
		Senha: <input type="password" name="senha" autocomplete="off" required />
	</div>
	<input type="submit" value="Autenticar" />
</form>

