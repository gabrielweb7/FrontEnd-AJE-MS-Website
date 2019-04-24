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
    $arquivoDir = upload::arquivo($_FILES["arquivo"], upload::getRandomName(), UPLOAD_DIR."star/", array("gif","jpg","png"), 730000);
}

?>


  <style>
    * { margin:0; padding:0; }
    body { padding:5px; }
  </style>

      <!-- Form -->
      <div style="border:1px solid gray;padding:10px;">
        <form action="?" method="post" enctype="multipart/form-data">
          <input type="file" name="arquivo" />
          <input type="submit" value="Enviar Arquivo" />
        </form>
      </div>

      <!-- Mensagens de Upload -->
      <div style="margin-top:10px; padding:10px;">
        <?php
          /* Erro no upload ? Mostrar Erro! */
          if(upload::getErrorMsg()) {
            echo upload::getErrorMsg();
          }

          /* Upload feito com sucesso ? mostrar caminho remoto do upload ! */
          if(!empty($arquivoDir)) {
            echo "Caminho upload: ".$arquivoDir;
          }
        ?>
      </div>
