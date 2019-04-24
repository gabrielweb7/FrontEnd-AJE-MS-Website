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
  
    /* Verifica se POST existe! */
    if(isset($_POST["a"])) {
        if($_POST["a"] == "autenticar") {
            $email = (isset($_POST["email"]))?$_POST["email"]:false;
            $senha = (isset($_POST["senha"]))?$_POST["senha"]:false;
            /* Login */
            $json = autenticacaoUsuario::login($email, $senha, true);
            die($json);
        }
    }
?>
<!doctype html>
<html lang="en-us">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <link rel="icon" href="<?php echo RAIZ_DIR; ?>assets/img/favicon.png" type="image/png">
    <title>~* <?php echo adminVars::getValue("cliente_nome"); ?> *~</title>
    <!-- inject-head:css -->
    <link rel="stylesheet" href="<?php echo RAIZ_DIR; ?>assets/css/style.css?1510690221335">
    <link rel="stylesheet" href="<?php echo RAIZ_DIR; ?>assets/css/style-site.css">
    <!-- endinject -->
</head>
<body>
<div id="app" class="empty-page reactive-app">
    <!-- inject-body-start:js -->
    <script src="<?php echo RAIZ_DIR; ?>assets/js/settings.js?1510690221341"></script>
    <!-- endinject -->
    <div id="main" class="main">
        <!--Begin Content-->
        <section id="content" class="content-wrap bgc-white-darkest" role="main">
   
            <section class="central-block">
                <div class="empty-page-content d-inline-block col-xl-4 col-lg-6 col-md-8 col-sm-10">

                    <?php
                        if(adminVars::getValue("cliente_logo")) {
                            if(file_exists(adminVars::getValue("cliente_logo"))) {
                    ?>
					<img src="<?php echo RAIZ_DIR.adminVars::getValue("cliente_logo"); ?>" width="70%" />
                    <?php
                            }else {
                                echo "<h1 class=\"fw-semibold c-info text-uppercase\">".adminVars::getValue("cliente_nome")."</h1>";
                            }
                        } else {
                            echo "<h1 class=\"fw-semibold c-info text-uppercase\">".adminVars::getValue("cliente_nome")."</h1>";
                        }
                    ?>

                    <div class="transition fade right in">
                        <div class="px-4 pt-3 bgc-white-darker mt-5 text-left" style="border: 1px solid #dcdcdc;">

                            <!-- <h6>Acesse sua conta!</h6> -->
                            <div class="form-group pt-3">
                                <label class="sr-only" for="login-username">E-mail</label>
                                <div class="input-group input-left-icon mb-2 mr-2 mb-0">
                                    <input type="text" class="form-control form-control-lg" id="login-username" placeholder="E-mail" required>
                                    <i class="input-icon icon-user"></i>
                                </div>
                            </div>
                            <div class="form-group pt-2">
                                <label class="sr-only" for="login-password">Senha</label>
                                <div class="input-group input-left-icon mb-2 mr-2 mb-0">
                                    <input type="password" class="form-control form-control-lg" id="login-password" placeholder="Senha" required>
                                    <i class="input-icon icon-lock"></i>
                                </div>
                            </div>

                            <!-- Mensagem Error -->
                            <div class="mensagem form-check mt-3 hide">

                            </div>

                            <div class="pt-1 pb-4">
                                <a href="javascript:void(0);" id="loginButton" class="btn btn-primary btn-lg w-100">Logar</a>
                            </div>
                        </div>
                        <div class="pt-2 clearfix">
                            <div class="pull-left">
                               <!-- <a href="page-register.html">Create an Account</a> -->
                            </div>
                           <!--  <div class="pull-right">
                                <a href="<?php echo RAIZ_DIR; ?>page-recover.html">Perdeu sua senha?</a>
                            </div> -->
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <ul class="list-unstyled list-inline pb-3 fs-7">

                    <li class="list-inline-item px-3 pt-1">
                        <span class="c-gray">

                            <?php echo adminVars::getValue("admin_rodape_copyright"); ?>

                        </span>
                    </li>
                    <li class="list-inline-item px-3 pt-1">
                        <span class="c-gray">
                             <span class="pl-2">Versão: <?php echo adminVars::getValue("admin_version"); ?></span>
                        </span>
                    </li>
                </ul>
            </footer>
        </section>
        <!--End Content-->
    </div>
</div>
<!-- inject-body-end:js -->
<script src="<?php echo RAIZ_DIR; ?>assets/js/shim.js?1510690221342"></script>
<script src="<?php echo RAIZ_DIR; ?>assets/js/system.js?1510690221342"></script>
<script src="<?php echo RAIZ_DIR; ?>assets/js/jspm.config.js?1510690221342"></script>
<script src="<?php echo RAIZ_DIR; ?>assets/js/jquery-3.3.1.min.js"></script>

<script>
    /**
     * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
     *                   Criado por Gabriel Azuaga Barbosa
     *                  E-mail: gabrielbarbosaweb7@gmail.com
     *  `•.¸¸.•´´¯`••._.• [ http://gabrieldaluz7.co.nf/ ] •._.••`¯´´•.¸¸.•`
     * ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄
     */
    $(function() {

        /* Configurando Variavel */
        var loginBtn = $("#loginButton");
        var email = $("#login-username");
        var senha = $("#login-password");
        var antiFloodClick = false;

        /* Evento de Click */
        loginBtn.on("click", function() {

			/* Submit */
            submitForm();

        });

        /* Evento de KeyPress */
        email.on("keypress", function(e) {
			
			/* Remove Classe */
            email.removeClass("placeholder-color-red").removeClass("border-color-red");
			
            /* Quando clicar no enter... Enviar */
            if(e.which == 10 || e.which == 13) {
                submitForm();
            }
        });

        /* Evento de KeyPress */
        senha.on("keypress", function(e) {
			
			/* Remove Classe */
            senha.removeClass("placeholder-color-red").removeClass("border-color-red");
			
            /* Quando clicar no enter... Enviar */
            if(e.which == 10 || e.which == 13) {
                submitForm();
            }
			
        });

		/* Funcao de SubmitForm */
        function submitForm() {
			
            /* Verificando dados.. */
            if(!email.val()) {
                email.focus().addClass("placeholder-color-red").addClass("border-color-red");
                return false;
            }
            else if(!senha.val()) {
                senha.focus().addClass("placeholder-color-red").addClass("border-color-red");
                return false;
            }

            /* Se caso antiFloodClick for falso.. autenticar ususario! */
            if(!antiFloodClick) {
                /* Autenticar Usuario */
                autenticarUsuario();
            }
        }

        /* Função para enviar o usuario via AJAX */
        function autenticarUsuario() {

            /* ativa antiFloodClick */
            antiFloodClick = true;

            var data = { a: "autenticar", email:email.val(), senha:senha.val()};
            $.ajax({
                url: "login.php",
                type: "POST",
                data: data,
                beforeSend: function() {
                    loginBtn.addClass("bgGrayVerde1").html("Autenticando...");
                },
                success: function(data) {
                    antiFloodClick = false;

                    var obj = JSON.parse(data);

                    if(obj.sucesso) {
                        $(".mensagem").css("color","#099000").html("Redirecionando...").show(1000);
                        document.location.href = '<?php echo RAIZ_DIR; ?>';
                    }
                    else if(obj.error) {
                        $(".mensagem").css("color","red").html(obj.error).show(1000);
                        loginBtn.removeClass("bgGrayVerde1").html("Logar");
                        email.focus();
                        senha.val("");
                    }
                }
            });
        }
    });
</script>

</body>
</html>
