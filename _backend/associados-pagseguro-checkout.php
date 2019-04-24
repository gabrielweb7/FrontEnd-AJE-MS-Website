<?php  

    
    //URL da chamada para o PagSeguro
    $url = "https://ws.pagseguro.uol.com.br/v2/checkout/";
    
    //Transformando os dados da compra no formato da URL
    $dadosCompra = http_build_query($data);
    
    //Realizando a chamada
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $dadosCompra);
    $respostaPagSeguro = curl_exec($curl);
    $http = curl_getinfo($curl);

    $respostaPagSeguro = simplexml_load_string($respostaPagSeguro);
    
    /*$respostaPagSeguro->code;*/