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

$tabelaUploadArquivo = "exampleuploadarquivos";

if($_SERVER['REQUEST_METHOD'] == "POST") {

    $arquivoDir = upload::arquivo($_FILES["arquivo"], upload::getRandomName(), UPLOAD_DIR."star/", array("gif","jpg","jpeg","png"), 1130000);

    $sql = "insert into {$tabelaUploadArquivo}
            (remoteUrl, nameArquivo, extensaoArquivo, tamanhoArquivo, dataTimeUpload)
            VALUES
            ('{$arquivoDir}','".upload::getFileNewName()."','".upload::getExtensionByName()."','".upload::getFileSize()."','".tools::getDateTimeMysql()."')";

    /* Erro no upload ? Mostrar Erro! */
    if(upload::getErrorMsg()) {
      echo "<script> alert('".upload::getErrorMsg()."'); </script>";
    } else {
      /* Se variavel do upload estiver cheio.. executar query.. gravando no banco ! */
      if(!empty($arquivoDir)) {
        if(mysqlidb::query($sql)) {
          echo "<script> alert('Arquivo cadastrado com sucesso! [".$arquivoDir."]'); </script>";
        }
      }
    }

}
?>

  <style>
    * { margin:0; padding:0; }
    body { padding:5px; }
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
  </style>


      <!-- Form -->
      <div style="border:1px solid gray;padding:10px;">
        <form action="?" method="post" enctype="multipart/form-data">
          <input type="file" name="arquivo" />
          <input type="submit" value="Enviar Arquivo" />
        </form>
      </div>

      <!-- Mensagens de Upload -->
      <div style=" padding:10px;">
        <b>Banco de dados selecionado:</b> <?php echo ENGINEPHP7_DB_NAME; ?> <br />
        <b>Tabela selecionado:</b> <?php echo $tabelaUploadArquivo; ?> <br />
      </div>

      <!-- Mensagens de Upload -->
      <div style=" padding:10px;">
        <table border="1">
          <tr>
            <th>
              Imagem
            </th>
            <th>
              Nome Arquivo
            </th>
            <th>
              Extensão
            </th>
            <th>
              Tamanho
            </th>
            <th>
              Data Upload
            </th>
          </tr>

            <?php
              /* Cria consulta e mostra dados! */
              $re = mysqlidb::query("select * from {$tabelaUploadArquivo} order by dataTimeUpload desc", true);
              while($obj = mysqli_fetch_object($re)) {
            ?>
            <tr>
              <td width="100">
                <?php echo "<a href='".$obj->remoteUrl."' target='_blank'><img src='".$obj->remoteUrl."' height='100' /> </a>"; ?>
              </td>
              <td>
                <?php echo $obj->nameArquivo; ?>
              </td>
              <td>
                <?php echo $obj->extensaoArquivo; ?>
              </td>
              <td>
                <?php echo $obj->tamanhoArquivo; ?>
              </td>
              <td>
                <?php echo $obj->dataTimeUpload; ?>
              </td>
            </tr>
            <?php } ?>
            <?php
              if(!mysqlidb::num_rows()) {
            ?>
            <tr>
              <td colspan="5" style='text-align:center;'>
                Nenhum registro!
              </td>
            </tr>
            <?php } ?>

        </table>
      </div>
