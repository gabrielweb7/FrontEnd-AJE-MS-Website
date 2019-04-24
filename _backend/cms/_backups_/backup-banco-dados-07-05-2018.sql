-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 07-Maio-2018 às 17:31
-- Versão do servidor: 5.7.17
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grupoempreender_admin_backend`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin_carrousel`
--

CREATE TABLE `admin_carrousel` (
  `id` int(11) NOT NULL,
  `identificador` varchar(60) DEFAULT NULL,
  `titulo` varchar(250) DEFAULT NULL,
  `imagem_src` varchar(250) DEFAULT NULL,
  `imagem_alt` varchar(250) DEFAULT NULL,
  `imagem_href` varchar(250) NOT NULL,
  `data_modificacao` datetime DEFAULT NULL,
  `data_criacao` datetime DEFAULT NULL,
  `ordem` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `admin_carrousel`
--

INSERT INTO `admin_carrousel` (`id`, `identificador`, `titulo`, `imagem_src`, `imagem_alt`, `imagem_href`, `data_modificacao`, `data_criacao`, `ordem`) VALUES
(1, 'rodapé', 'AJE', 'EnginePHP7/uploads/carrousel/4752983_1525368690.png', 'Associação de Jovens Empreendedores e Empresários de Goiás', '', NULL, '2018-05-03 01:31:30', 0),
(2, 'rodapé', 'CONAJE', 'EnginePHP7/uploads/carrousel/2169568_1525368847.png', 'Confederação Nacional de Jovens Empresários', '#', '2018-05-03 01:45:44', '2018-05-03 01:34:07', 1),
(3, 'rodapé', 'FECOMÉRCIO', 'EnginePHP7/uploads/carrousel/4658777_1525369880.png', 'Federação do Comercio de Bens, Serviços e Turismo do Estado de Mato Grosso do Sul', '#', '2018-05-03 01:52:34', '2018-05-03 01:51:20', 2),
(4, 'rodapé', 'Sindicom', 'EnginePHP7/uploads/carrousel/3702946_1525370057.jpg', 'Sindicato do comercio atacadista e varejista de dourados', '', NULL, '2018-05-03 01:54:17', 3),
(5, 'rodapé', 'REAL NETWORKING', 'EnginePHP7/uploads/carrousel/5074354_1525370196.jpg', 'Real Networking', '', NULL, '2018-05-03 01:56:36', 4),
(6, 'rodapé', 'SEBRAE', 'EnginePHP7/uploads/carrousel/8459042_1525370315.png', 'SEBRAE', '', NULL, '2018-05-03 01:58:35', 5),
(7, 'rodapé', 'EMPREENDER GRUPO CRIATIVO', 'EnginePHP7/uploads/carrousel/9620007_1525370376.png', 'Empreender Grupo Criativo', '', NULL, '2018-05-03 01:59:36', 6),
(8, 'rodapé', 'SICREDI', 'EnginePHP7/uploads/carrousel/1777665_1525370469.png', 'Sicredi', '', NULL, '2018-05-03 02:01:09', 7),
(9, 'rodapé', 'PARK OFFICE', 'EnginePHP7/uploads/carrousel/2632035_1525370728.jpg', 'Park Office Escritório Virtual', '', NULL, '2018-05-03 02:05:28', 8);

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin_contato`
--

CREATE TABLE `admin_contato` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `telefone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mensagem` text,
  `data_envio` datetime DEFAULT NULL,
  `status` int(11) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `admin_contato`
--

INSERT INTO `admin_contato` (`id`, `nome`, `telefone`, `email`, `mensagem`, `data_envio`, `status`) VALUES
(1, 'Gabriel A. Barbosa', '67 984660441', 'gabrielbarbosaweb7@gmail.com', 'Bom dia\r\namiguinhos!', '2018-05-03 14:00:00', 1),
(2, 'Lucas B.', '6799882233', 'teste@teste.com', 'Olá preciso da sua ajuda\r\ngratidao\r\nviva!', '2018-05-03 15:28:00', 1),
(3, 'Lucas B.', '6799882233', 'teste@teste.com', 'Olá preciso da sua ajuda\r\ngratidao\r\nviva!', '2018-05-03 15:28:00', 1),
(4, 'Lucas B.', '6799882233', 'teste@teste.com', 'Olá preciso da sua ajuda\r\ngratidao\r\nviva!', '2018-05-03 15:28:00', 1),
(5, 'Lucas B.', '6799882233', 'teste@teste.com', 'Olá preciso da sua ajuda\r\ngratidao\r\nviva!', '2018-05-03 15:28:00', 1),
(6, 'Lucas B.', '6799882233', 'teste@teste.com', 'Olá preciso da sua ajuda\r\ngratidao\r\nviva!', '2018-05-03 15:28:00', 1),
(7, 'Lucas B.', '6799882233', 'teste@teste.com', 'Olá preciso da sua ajuda\r\ngratidao\r\nviva!', '2018-05-03 15:28:00', 1),
(8, 'Lucas B.', '6799882233', 'teste@teste.com', 'Olá preciso da sua ajuda\r\ngratidao\r\nviva!', '2018-05-03 15:28:00', 1),
(9, 'Lucas B.', '6799882233', 'teste@teste.com', 'Olá preciso da sua ajuda\r\ngratidao\r\nviva!', '2018-05-03 15:28:00', 1),
(10, 'Lucas B.', '6799882233', 'teste@teste.com', 'Olá preciso da sua ajuda\r\ngratidao\r\nviva!', '2018-05-03 15:28:00', 1),
(11, 'Lucas B.', '6799882233', 'teste@teste.com', 'Olá preciso da sua ajuda\r\ngratidao\r\nviva!', '2018-05-03 15:28:00', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin_imagens`
--

CREATE TABLE `admin_imagens` (
  `id` int(11) NOT NULL,
  `identificador` varchar(60) DEFAULT NULL,
  `titulo` varchar(250) DEFAULT NULL,
  `imagem_src` varchar(250) DEFAULT NULL,
  `imagem_alt` varchar(250) DEFAULT NULL,
  `data_modificacao` datetime DEFAULT NULL,
  `data_criacao` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `admin_imagens`
--

INSERT INTO `admin_imagens` (`id`, `identificador`, `titulo`, `imagem_src`, `imagem_alt`, `data_modificacao`, `data_criacao`) VALUES
(1, 'topo', 'Topo_Logotipo', 'EnginePHP7/uploads/imagens/topo/logo.png', 'Primeira Empresa MS', '2018-04-26 11:18:23', '2018-04-25 00:00:00'),
(5, 'rodapé', 'Rodape_Logotipo', 'EnginePHP7/uploads/imagens/topo/5275525_1524769344.png', 'Primeira Empresa MS', NULL, '2018-04-26 03:02:24'),
(6, 'rodapé', 'Rodape_Semagro', 'EnginePHP7/uploads/imagens/topo/5739487_1524769914.png', 'Semagro - Secretaria de estado de meio ambiente desenvolvimento econômico, produção e agricultura familiar (Gover do estado de Mato Grosso do Sul)', NULL, '2018-04-26 03:11:54'),
(7, 'rodapé', 'Rodape_Aje', 'EnginePHP7/uploads/imagens/topo/4766383_1524769980.png', 'AJE - Associação dos jovens empreendedores de MATO GROSSO DO SUL', '2018-04-26 03:34:52', '2018-04-26 03:13:00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin_logs`
--

CREATE TABLE `admin_logs` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `identificador` varchar(60) DEFAULT NULL,
  `log` varchar(250) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin_menu`
--

CREATE TABLE `admin_menu` (
  `id` int(11) NOT NULL,
  `pai_id` int(11) NOT NULL DEFAULT '0',
  `titulo` varchar(35) COLLATE utf8_unicode_ci DEFAULT NULL,
  `icon_class` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ahref` varchar(250) COLLATE utf8_unicode_ci NOT NULL DEFAULT '#',
  `ordem` int(11) NOT NULL DEFAULT '255',
  `visible` int(11) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `admin_menu`
--

INSERT INTO `admin_menu` (`id`, `pai_id`, `titulo`, `icon_class`, `ahref`, `ordem`, `visible`) VALUES
(1, 0, 'Topo', 'fa fa-list-ul', '#', 1, 1),
(2, 1, 'Slides', 'fa fa-caret-square-o-right', 'adminSlides.php?identificador=topo', 1, 1),
(3, 1, 'Imagens', 'fa fa-file-image-o', 'adminImagens.php?identificador=topo', 3, 1),
(8, 0, 'O Programa', 'fa fa-list-ul', '#', 2, 1),
(9, 0, 'Etapas', 'fa fa-list-ul', '#', 3, 1),
(10, 0, 'Inscrições', 'fa fa-list-ul', '#', 3, 1),
(11, 0, 'Contato', 'fa fa-list-ul', '#', 4, 1),
(12, 0, 'Rodapé', 'fa fa-list-ul', '#', 5, 1),
(13, 8, 'Textos', 'fa fa-font', 'adminTextos.php?identificador=oprograma', 2, 1),
(14, 8, 'Slides', 'fa fa-caret-square-o-right', 'adminSlides.php?identificador=oprograma', 1, 1),
(15, 9, 'Textos', 'fa fa-font', 'adminTextos.php?identificador=etapas', 1, 1),
(16, 10, 'Cursos', 'fa fa-leanpub', 'turmas.php', 1, 1),
(17, 10, 'Inscrições', 'fa fa-user', 'inscricoes.php', 2, 1),
(18, 11, 'Mensagens', 'ion-android-mail', 'adminContato.php', 2, 1),
(19, 11, 'Configurações', 'fa fa-cog', 'adminVars.php?categoria=contato_configuracoes', 3, 1),
(20, 12, 'Imagens', 'fa fa-file-image-o', 'adminImagens.php?identificador=rodapé', 2, 1),
(21, 12, 'Carrousel', 'fa fa-object-ungroup', 'adminCarrousel.php?identificador=rodapé', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin_slides`
--

CREATE TABLE `admin_slides` (
  `id` int(11) NOT NULL,
  `identificador` varchar(60) DEFAULT NULL,
  `titulo` varchar(250) DEFAULT NULL,
  `label_titulo` varchar(250) DEFAULT NULL,
  `label_subtitulo` varchar(250) DEFAULT NULL,
  `imagem_src` varchar(250) DEFAULT NULL,
  `imagem_alt` varchar(250) DEFAULT NULL,
  `data_modificacao` datetime DEFAULT NULL,
  `data_criacao` datetime DEFAULT NULL,
  `ordem` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `admin_slides`
--

INSERT INTO `admin_slides` (`id`, `identificador`, `titulo`, `label_titulo`, `label_subtitulo`, `imagem_src`, `imagem_alt`, `data_modificacao`, `data_criacao`, `ordem`) VALUES
(1, 'topo', 'Segundo Slide', 'CAPACITE-SE!', 'AMPLIE SUA VISÃO DE NEGÓCIO', 'EnginePHP7/uploads/slides/topo/6888487_1524775385.png', 'Primeira Empresa (Slides)', '2018-04-26 04:43:05', '2018-04-26 03:57:36', 2),
(2, 'topo', 'Primeiro Slide', 'PREPARE-SE.', 'CHEGOU SUA VEZ DE EMPREENDER', 'EnginePHP7/uploads/slides/topo/4065543_1524775365.png', 'Primeira Empresa (Slides)', '2018-04-26 04:42:45', '2018-04-26 03:58:29', 1),
(3, 'topo', 'Terceiro Slide', 'FORTALEÇA', 'SUA EMPRESA E AUMENTE SUA COMPETITIVIDADE', 'EnginePHP7/uploads/slides/topo/6355167_1524774754.png', 'Primeira Empresa (Slides)', '2018-04-26 04:42:04', '2018-04-26 03:59:07', 3),
(6, 'oprograma', 'Modulo 1', '', '', 'EnginePHP7/uploads/slides/topo/6549237_1525088216.png', 'iniciação ao empreendedorismo', '2018-04-30 07:36:56', '2018-04-30 07:36:24', 1),
(7, 'oprograma', 'Modulo 2', '', '', 'EnginePHP7/uploads/slides/topo/5806061_1525088311.png', 'Gestão da primeira empresa e plano de negócios', NULL, '2018-04-30 07:38:31', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin_textos`
--

CREATE TABLE `admin_textos` (
  `id` int(11) NOT NULL,
  `identificador` varchar(60) DEFAULT NULL,
  `identificadorFront` varchar(100) DEFAULT NULL,
  `titulo` varchar(250) DEFAULT NULL,
  `texto` text,
  `data_modificacao` datetime DEFAULT NULL,
  `data_criacao` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `admin_textos`
--

INSERT INTO `admin_textos` (`id`, `identificador`, `identificadorFront`, `titulo`, `texto`, `data_modificacao`, `data_criacao`) VALUES
(3, 'oprograma', 'oprograma', 'O Programa', '																		Minha Primeira Empresa se trata de um programa continuado de capacita&ccedil;&atilde;o empreendedora, da Associa&ccedil;&atilde;o dos Jovens Empreendedores de Mato Grosso do Sul, AJE/MS, com intuito desenvolver habilidades empresariais, aprimorar t&eacute;cnicas e ferramentas de gest&atilde;o, e potencializar o network em rede.																																				', '2018-04-30 09:43:42', '2018-04-30 09:07:17'),
(4, 'oprograma', 'oprograma-oquee', 'O que é', '									&lt;p&gt;&lt;b&gt;O Programa&lt;/b&gt;&lt;/p&gt;&lt;p&gt;Minha Primeira Empresa se trata de um programa continuado de capacita&ccedil;&atilde;o empreendedora, da Associa&ccedil;&atilde;o dos Jovens Empreendedores de Mato Grosso do Sul, AJE/MS, com intuito desenvolver habilidades empresariais, aprimorar t&eacute;cnicas e ferramentas de gest&atilde;o, e potencializar o network em rede. Al&eacute;m disso, o programa incentiva a livre iniciativa e concorr&ecirc;ncia, por meio da formaliza&ccedil;&atilde;o e/ou fortalecimento de pequenos neg&oacute;cios, bem como a cria&ccedil;&atilde;o de novos empreendimentos, atrav&eacute;s do planejamento, acompanhamento t&eacute;cnico e encontros peri&oacute;dicos, proporcionando, aos potenciais empreendedores, condi&ccedil;&otilde;es mais competitivas de inser&ccedil;&atilde;o no mercado, a promo&ccedil;&atilde;o do desenvolvimento local.&lt;/p&gt;&lt;p&gt;Neste primeiro ano, o programa ser&aacute; aplicado nas cidades de Campo Grande, Dourados, Tr&ecirc;s Lagoas e Corumb&aacute;, para aproximadamente 500 (quinhentos) participantes, em um total de 20 turmas, com carga hor&aacute;ria de 52 (cinquenta e duas) horas aulas.&lt;/p&gt;&lt;p&gt;&lt;b&gt;A Origem&lt;/b&gt;&lt;/p&gt;&lt;p&gt;Criado em 2013, originalmente em Goi&acirc;nia, por meio de uma parceria da Associa&ccedil;&atilde;o de Jovens Empreendedores e Empres&aacute;rios de Goi&aacute;s (AJE Goi&aacute;s) e Secretaria de Ind&uacute;stria e Com&eacute;rcio de Goi&aacute;s (SIC), o programa tinha como objetivo capacitar empreendedores, facilitar a abertura de novas empresas e oferecer sustentabilidade aos neg&oacute;cios abertos. No Estado de Goi&aacute;s, o programa j&aacute; alcan&ccedil;ou mais de 4 mil empreendedores, e por conta do seu sucesso, passou a integrar os projetos da Confedera&ccedil;&atilde;o Nacional dos Jovens Empres&aacute;rios (CONAJE), com a proposta de ampli&aacute;-lo, levando benef&iacute;cios e capacita&ccedil;&atilde;o aos jovens empreendedores de todo o Brasil.&lt;/p&gt;&lt;p&gt;&lt;b&gt;Etapas&lt;/b&gt;&lt;/p&gt;&lt;p&gt;O programa completo possui 6 (seis) etapas. Quais sejam:&lt;/p&gt;&lt;p&gt;1.&nbsp;Lan&ccedil;amento, Divulga&ccedil;&atilde;o e Abertura de Inscri&ccedil;&otilde;es do Programa Minha Primeira Empresa;&lt;br&gt;2.&nbsp;Sele&ccedil;&atilde;o dos Inscritos e Coloca&ccedil;&atilde;o nos Cursos de Inicia&ccedil;&atilde;o ao Empreendedorismo;&lt;br&gt;3.&nbsp;Curso de Inicia&ccedil;&atilde;o ao Empreendedorismo e Diagn&oacute;stico do Perfil Empreendedor;&lt;br&gt;4.&nbsp;Curso de Gest&atilde;o da Primeira Empresa e Plano de Neg&oacute;cios;&lt;br&gt;5.&nbsp;Cria&ccedil;&atilde;o da Primeira Empresa;&lt;br&gt;6.&nbsp;Acompanhamento, Orienta&ccedil;&otilde;es, Palestras e Atividades Gratuitas Peri&oacute;dicas de Forma Continuada de Fomento ao Empreendedorismo.&lt;/p&gt;&lt;p&gt;O Curso de Inicia&ccedil;&atilde;o ao Empreendedorismo ser&aacute; oferecido durante tr&ecirc;s dias. Nesta etapa, os selecionados para a primeira turma v&atilde;o receber orienta&ccedil;&otilde;es, com aulas expositivas sobre defini&ccedil;&atilde;o, princ&iacute;pios e objetivos de empreendedorismo, o empreendedorismo no mundo e no Brasil, os atributos do empreendedor, estrat&eacute;gias empreendedoras, fun&ccedil;&otilde;es da Administra&ccedil;&atilde;o, conceitos de mercado, &eacute;tica e trabalho, recursos humanos, no&ccedil;&otilde;es de administra&ccedil;&atilde;o financeira, no&ccedil;&otilde;es de marketing e vendas, e casos empresariais.&lt;/p&gt;&lt;p&gt;O resultado do Diagn&oacute;stico do Perfil Empreendedor e a conclus&atilde;o do curso de Inicia&ccedil;&atilde;o ao Empreendedorismo s&atilde;o requisitos imprescind&iacute;veis para que o participante possa integrar a turma do curso de Gest&atilde;o da Primeira Empresa e Plano de Neg&oacute;cios.&lt;/p&gt;&lt;p&gt;&lt;b&gt;Organiza&ccedil;&atilde;o/Realiza&ccedil;&atilde;o&lt;/b&gt;&lt;/p&gt;&lt;p&gt;Em Mato Grosso do Sul, o programa ser&aacute; realizado pela Associa&ccedil;&atilde;o dos Jovens Empreendedores de Mato Grosso do Sul, AJE/MS, juntamente com o Governo do Estado, atrav&eacute;s da Secretaria de Estado de Meio Ambiente, Desenvolvimento Econ&ocirc;mico, Produ&ccedil;&atilde;o e Agricultura Familiar, SEMAGRO.&lt;/p&gt;&lt;p&gt;&lt;b&gt;Recursos Financeiros&lt;/b&gt;&lt;/p&gt;&lt;p&gt;O programa ser&aacute; subsidiado financeiramente com recursos pr&oacute;prios e n&atilde;o reembols&aacute;veis do Fundo de Defesa e de Repara&ccedil;&atilde;o de Interesses Difusos Lesados &ndash; FUNLES, criado pela Lei n&ordm; 1.721/1.996 e regulamentado pelo Decreto Estadual n&ordm; 10.871/2002, e por outras fontes.&lt;/p&gt;&lt;p&gt;Esse programa &eacute; um dos projetos contemplados pelo Chamamento P&uacute;blico CONFUNLES n&ordm; 001/2016, promovido pelo Estado de Mato Grosso do Sul, por interm&eacute;dio da SEMAGRO, e o FUNLES.&lt;/p&gt;									', '2018-04-30 09:54:22', '2018-04-30 09:54:07'),
(5, 'oprograma', 'oprograma-ementa', 'Ementa', '									&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;M&Oacute;DULO I &ndash; INICIA&Ccedil;&Atilde;O AO EMPREENDEDORISMO&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;CAP&Iacute;TULO 1 - EMPREENDEDORISMO E EMPREENDEDORES&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;1.1 - Empreendedorismo&nbsp;&lt;br&gt;1.2 - Empreendedores&nbsp;&lt;br&gt;1.3 - Como adquirir as compet&ecirc;ncias que s&atilde;o necess&aacute;rias?&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;CAP&Iacute;TULO 2 - NOVOS EMPREENDIMENTOS E O AMBIENTE DE NEG&Oacute;CIOS&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;2.1 - Novos Empreendimentos&nbsp;&lt;br&gt;2.1.1 - Fases de desenvolvimento de um novo empreendimento&lt;br&gt;2.1.2 - Funcionamento das empresas&lt;br&gt;2.2 - Ambiente de atua&ccedil;&atilde;o da empresa&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;CAP&Iacute;TULO 3 - OPORTUNIDADES DE NEG&Oacute;CIOS E CRIA&Ccedil;&Atilde;O DE EMPRESAS&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;3.1 - Oportunidades de Neg&oacute;cios&nbsp;&lt;br&gt;3.1.1 - Reconhecimento de oportunidades&lt;br&gt;3.1.2 - Avalia&ccedil;&atilde;o de oportunidades&lt;br&gt;3.2 - Cria&ccedil;&atilde;o de empresas&lt;br&gt;3.2.1 - Atividades do processo de cria&ccedil;&atilde;o de empresa&lt;br&gt;3.2.2 - Procedimentos legais para abertura da empresa&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;Carga Hor&aacute;ria:&lt;/span&gt;&nbsp;12 (doze) horas-aula, dividido em 3 (tr&ecirc;s) dias de curso, com dura&ccedil;&atilde;o de 4 (quatro) horas/dia.&nbsp;&lt;br&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;Metodologia:&lt;/span&gt;&nbsp;Aulas expositivas com material did&aacute;tico exclusivo;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;br&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;M&Oacute;DULO II &ndash; GEST&Atilde;O DA PRIMEIRA EMPRESA E PLANO DE NEG&Oacute;CIOS&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;CAP&Iacute;TULO 1 - GEST&Atilde;O DAS OPERA&Ccedil;&Otilde;ES&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;1.1 - Principais da gest&atilde;o das opera&ccedil;&otilde;es&lt;br&gt;1.1.1 - Prioridades da gest&atilde;o das opera&ccedil;&otilde;es&lt;br&gt;1.1.2 - Planejamento de opera&ccedil;&otilde;es a &aacute;reas de apoio &ndash; estoque e log&iacute;stica&lt;br&gt;1.2 - Qualidade&lt;br&gt;1.3 - Inova&ccedil;&atilde;o&lt;br&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;CAP&Iacute;TULO 2 - GEST&Atilde;O DE MARKETING&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;2.1 - Marketing&lt;br&gt;2.2 - Composto de Marketing&lt;br&gt;2.2.1 - Produto&lt;br&gt;2.2.2 - Pre&ccedil;o&lt;br&gt;2.2.3 - Promo&ccedil;&atilde;o&lt;br&gt;2.2.4 - Pra&ccedil;a&lt;br&gt;2.3 - Processo de Vendas&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;CAP&Iacute;TULO 3 - GEST&Atilde;O FINANCEIRA&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;3.1 - Princ&iacute;pios da gest&atilde;o financeira - captar, controlar e investir recursos&lt;br&gt;3.1.1 - Controle de Caixa&lt;br&gt;3.1.2 - Fluxo de Caixa&lt;br&gt;3.1.2 - Indicadores financeiros&lt;br&gt;3.2 - Fontes de financiamento&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;CAP&Iacute;TULO 4 - GEST&Atilde;O DE RECURSOS HUMANOS&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;4.1 - Princ&iacute;pios da gest&atilde;o de recursos humanos&lt;br&gt;4.2 - Recrutamento da for&ccedil;a de trabalho&lt;br&gt;4.3 - Desenvolvimento da for&ccedil;a de trabalho&lt;br&gt;4.4 - Manuten&ccedil;&atilde;o da for&ccedil;a de trabalho&lt;br&gt;4.4.1 - Sal&aacute;rios, incentivos, benef&iacute;cios e promo&ccedil;&atilde;o&lt;br&gt;4.4.2 - Hierarquia das necessidades de Maslow&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;CAP&Iacute;TULO 5 - PLANO DE NEG&Oacute;CIOS&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;5.1 - Defini&ccedil;&atilde;o e Estrutura do plano de neg&oacute;cios&lt;br&gt;5.2 - Import&acirc;ncia do plano de neg&oacute;cios&lt;br&gt;5.3 - Atributos de um bom plano de neg&oacute;cios&lt;br&gt;5.4 - Como fazer o plano de neg&oacute;cios&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;CAP&Iacute;TULO 6 - AN&Aacute;LISE DE MERCADO E PLANO DE MARKETING&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;6.1 - An&aacute;lise do setor&lt;br&gt;6.2 - Defini&ccedil;&atilde;o do segmento de mercado&lt;br&gt;6.3 - Detalhamento da an&aacute;lise da Concorr&ecirc;ncia&lt;br&gt;6.4 - An&aacute;lise do produto&lt;br&gt;6.5 - Estrat&eacute;gias de marketing&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;CAP&Iacute;TULO 7 - PLANO OPERACIONAL&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;7.1 - Capacidade produtiva e comercial&lt;br&gt;7.2 - Necessidade de pessoal&lt;br&gt;7.3 - Processos operacionais&lt;br&gt;7.4 - Layout&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;CAP&Iacute;TULO 8 - PLANO FINANCEIRO&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;8.1 - Investimento fixo&nbsp;&lt;br&gt;8.2 - Investimentos financeiros&lt;br&gt;8.3 - Investimentos pr&eacute;-operacionais&lt;br&gt;8.4 - Estimativas de receitas&lt;br&gt;8.5 - Ponto de Equil&iacute;brio&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;br&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;CAP&Iacute;TULO 9 - RESPONSABILIDADE SOCIAL EMPRESARIAL E SUGEST&Otilde;ES FINAIS&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;9.1 - Princ&iacute;pios da gest&atilde;o de recursos humanos&lt;br&gt;9.2 - Recrutamento da for&ccedil;a de trabalho&lt;br&gt;9.2.1 - Estabele&ccedil;a crit&eacute;rios de sucesso e determine alguns objetivos&lt;br&gt;9.2.2 - Conhe&ccedil;a e compreenda o seu mercado, saiba ouvir e estar focado no seu cliente&lt;br&gt;9.2.3 - Valorize a oportunidade de neg&oacute;cio identificada e saiba escolher o momento oportuno para explor&aacute;-la&lt;br&gt;9.2.4 - Contribua com uma inova&ccedil;&atilde;o e se diferencie&lt;br&gt;9.2.5 - Mobilize sua rede de contatos desde o in&iacute;cio; tenha rela&ccedil;&otilde;es de apoio e contatos de neg&oacute;cios&lt;br&gt;9.2.6 - Defina seu pr&oacute;prio espa&ccedil;o, o espa&ccedil;o dos outros e delegue&lt;br&gt;9.2.7 - Saiba estar rodeado de empres&aacute;rios&lt;br&gt;9.2.8 - Prepare-se para a polival&ecirc;ncia e saiba perseverar&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;Carga Hor&aacute;ria:&lt;/span&gt;&nbsp;40 (quarenta) horas-aula, dividido em 10 (dez) dias de curso, com dura&ccedil;&atilde;o de 4 (quatro) horas/dia.&nbsp;&lt;br&gt;&lt;/p&gt;&lt;p style=&quot;font-family: &quot;Open Sans&quot;, sans-serif;&quot;&gt;&lt;span style=&quot;font-weight: bolder;&quot;&gt;Metodologia:&lt;/span&gt;&nbsp;Aulas expositivas com material did&aacute;tico exclusivo;&lt;/p&gt;									', '2018-04-30 11:36:41', '2018-04-30 11:26:15'),
(6, 'oprograma', 'oprograma-regulamento', 'Regulamento', '									&lt;div&gt;&lt;b&gt;Inscri&ccedil;&otilde;es&lt;/b&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;As inscri&ccedil;&otilde;es dever&atilde;o ser feitas exclusivamente pela internet, em site espec&iacute;fico do Programa Minha Primeira Empresa, com preenchimento de formul&aacute;rio que permita colher informa&ccedil;&otilde;es necess&aacute;rias para a coloca&ccedil;&atilde;o do inscrito nas vagas/cursos dispon&iacute;veis.&lt;/div&gt;&lt;div&gt;&lt;b&gt;www.primeiraempresams.com.br&lt;/b&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;&lt;b&gt;Vagas&lt;/b&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Por se tratar de um programa gratuito para os participantes, as vagas s&atilde;o limitadas e os inscritos passar&atilde;o por um processo de sele&ccedil;&atilde;o. Ser&atilde;o disponibilizadas 200 (duzentas) vagas para Campo Grande, 100 (cem) Dourados, 100 (cem) Tr&ecirc;s Lagoas e 100 (cem) Corumb&aacute;.&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;&lt;b&gt;Sele&ccedil;&atilde;o dos Inscritos&lt;/b&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;Os candidatos a participante do Programa Minha Primeira Empresa, dever&atilde;o preencher obrigatoriamente os seguintes requisitos:&lt;/div&gt;&lt;div&gt;&nbsp;&nbsp;&nbsp;&nbsp;&bull;&lt;span style=&quot;white-space:pre&quot;&gt;	&lt;/span&gt;Residente no Estado de Mato Grosso do Sul;&lt;/div&gt;&lt;div&gt;&nbsp;&nbsp;&nbsp;&nbsp;&bull;&lt;span style=&quot;white-space:pre&quot;&gt;	&lt;/span&gt;Idade m&iacute;nima de 18 anos;&lt;/div&gt;&lt;div&gt;&nbsp;&nbsp;&nbsp;&nbsp;&bull;&lt;span style=&quot;white-space:pre&quot;&gt;	&lt;/span&gt;Disponibilidade para frequentar os cursos de capacita&ccedil;&atilde;o oferecidos.&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;&lt;b&gt;A sele&ccedil;&atilde;o dos inscritos e coloca&ccedil;&atilde;o no M&oacute;dulo I &ndash; Inicia&ccedil;&atilde;o ao Empreendedorismo, se dar&aacute; mediante prioriza&ccedil;&atilde;o dos participantes seguindo os crit&eacute;rios:&lt;/b&gt;&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;&lt;b&gt;I.&lt;/b&gt; Renda familiar inferior a 3 sal&aacute;rios m&iacute;nimos;&lt;/div&gt;&lt;div&gt;&lt;b&gt;II.&lt;/b&gt; Estar cadastrado em algum benef&iacute;cio social do Governo Estadual nos Programas Renda Cidad&atilde;, Bolsa Universit&aacute;ria ou Bolsa Futuro;&lt;/div&gt;&lt;div&gt;&lt;b&gt;III.&lt;/b&gt; Ter conclu&iacute;do curso superior at&eacute; dois anos anteriores a data da inscri&ccedil;&atilde;o;&lt;/div&gt;&lt;div&gt;&lt;b&gt;IV.&lt;/b&gt; Proximidade residencial ou profissional com o local dos cursos;&lt;/div&gt;&lt;div&gt;&lt;b&gt;V.&lt;/b&gt; Que tenha cursado o ensino m&eacute;dio;&lt;/div&gt;&lt;div&gt;&lt;b&gt;VI.&lt;/b&gt; Ser associado da AJE/MS.&lt;/div&gt;&lt;div&gt;&lt;br&gt;&lt;/div&gt;&lt;div&gt;&lt;b&gt;O M&oacute;dulo II&lt;/b&gt; &ndash; Gest&atilde;o da Primeira Empresa e Plano de Neg&oacute;cios, ser&aacute; ofertado apenas para os 60% (sessenta) participantes melhores classificados no &lt;b&gt;M&oacute;dulo I&lt;/b&gt; &ndash; Inicia&ccedil;&atilde;o ao Empreendedorismo, que obedecer&aacute; ordem de classifica&ccedil;&atilde;o em avalia&ccedil;&atilde;o objetiva a ser aplicada na fase anterior, limitado ao n&uacute;mero de vagas.&lt;/div&gt;																											', '2018-04-30 11:35:36', '2018-04-30 11:34:46'),
(7, 'etapas', 'etapas-t-1', 'SELEÇÃO DOS INSCRITOS', 'POR SE TRATAR DE UM PROGRAMA GRATUITO PARA OS PARTICIPANTES, AS VAGAS S&Atilde;O LIMITADAS E OS INSCRITOS PASSAR&Atilde;O POR UM PROCESSO DE SELE&Ccedil;&Atilde;O. SER&Atilde;O DISPONIBILIZADAS VAGAS PARA CAMPO GRANDE, DOURADOS, TR&Ecirc;S LAGOAS E CORUMB&Aacute;. A ESCOLHA DOS INSCRITOS SE DAR&Aacute; MEDIANTE SELE&Ccedil;&Atilde;O OBJETIVA (VER REGULAMENTO E CRIT&Eacute;RIOS DE SELE&Ccedil;&Atilde;O).																		', NULL, '2018-04-30 11:50:13'),
(8, 'etapas', 'etapas-t-2', 'CURSO DE INICIAÇÃO AO EMPREENDEDORISMO', 'O CURSO DE INICIA&Ccedil;&Atilde;O AO EMPREENDEDORISMO SER&Aacute; OFERECIDO DURANTE 3 DIAS POR PER&Iacute;ODO DE 4 HORAS/DIA. NESTA ETAPA, OS SELECIONADOS PARA A PRIMEIRA TURMA V&Atilde;O RECEBER ORIENTA&Ccedil;&Otilde;ES, COM AULAS EXPOSITIVAS SOBRE DEFINI&Ccedil;&Atilde;O, PRINC&Iacute;PIOS E OBJETIVOS DE EMPREENDEDORISMO, ATRIBUTOS DO EMPREENDEDOR E PROCEDIMENTOS LEGAIS PARA ABERTURA DA EMPRESA.																		', NULL, '2018-04-30 11:51:30'),
(9, 'etapas', 'etapas-t-3', 'DIAGNÓSTICO DO PERFIL EMPREENDEDOR', 'O DIAGN&Oacute;STICO DO PERFIL EMPREENDEDOR SER&Aacute; OFERECIDO AOS PARTICIPANTES, A PARTIR DO PREENCHIMENTO DE UM QUESTION&Aacute;RIO, COM INTUITO DE AJUD&Aacute;-LOS A COMPREENDER A SUA &ldquo;PERSONALIDADE EMPREENDEDORA&rdquo; E FORNECENDO INFORMA&Ccedil;&Otilde;ES IMPORTANTES PARA TOMADA DE DECIS&Otilde;ES E CONDU&Ccedil;&Atilde;O DOS NEG&Oacute;CIOS.																		', NULL, '2018-04-30 11:52:19'),
(10, 'etapas', 'etapas-t-4', 'CURSO DE GESTÃO DA PRIMEIRA EMPRESA E PLANO DE NEGÓCIOS', 'O CURSO DE GEST&Atilde;O DA PRIMEIRA EMPRESA E PLANO DE NEG&Oacute;CIOS SER&Aacute; OFERECIDO APENAS PARA 60% (SESSENTA POR CENTO) DOS PARTICIPANTES MELHORES CLASSIFICADOS NO CURSO DE INICIA&Ccedil;&Atilde;O AO EMPREENDEDORISMO, MEDIANTE AVALIA&Ccedil;&Atilde;O OBJETIVA. O CURSO DE GEST&Atilde;O DA PRIMEIRA EMPRESA E PLANO DE NEG&Oacute;CIOS SER&Aacute; OFERECIDO DURANTE 10 DIAS POR PER&Iacute;ODO DE 4 HORAS/DIA.																		', NULL, '2018-04-30 11:53:08'),
(11, 'etapas', 'etapas-t-5', 'CRIAÇÃO DA PRIMEIRA EMPRESA', 'OS PARTICIPANTES DO PROGRAMA COM PERFIL EMPREENDEDOR E BONS PLANOS DE NEG&Oacute;CIOS, QUE TENHAM CONCLU&Iacute;DO AS FASES ANTERIORES DO PROGRAMA DE FORMA SATISFAT&Oacute;RIA, SER&Atilde;O INCENTIVADOS A TIRAR SUA IDEIA DO PAPEL E COLOC&Aacute;-LAS EM PRATICA, DANDO-LHES TODO O SUPORTE NECESS&Aacute;RIO PARA ABERTURA DA SUA EMPRESA (CONSULTORIA ADMINISTRATIVA, CONT&Aacute;BIL E JUR&Iacute;DICA).																		', NULL, '2018-04-30 11:53:58'),
(12, 'etapas', 'etapas-t-6', 'REDE AJE-MS', 'O PROGRAMA MINHA PRIMEIRA EMPRESA TEM UMA PROPOSTA MODERNA, QUE ALIA A CAPACITA&Ccedil;&Atilde;O E ACOMPANHAMENTO. O ACOMPANHAMENTO SE DAR&Aacute; DE FORMA TRIMESTRAL, EM ENCONTROS QUE SER&Atilde;O CHAMADOS DE REDE AJE-MS, ONDE OCORRER&Atilde;O PALESTRAS, ORIENTA&Ccedil;&Otilde;ES, COLETA DE INFORMA&Ccedil;&Otilde;ES E TROCA DE EXPERI&Ecirc;NCIAS.																		', NULL, '2018-04-30 11:55:37');

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin_usuarios`
--

CREATE TABLE `admin_usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(200) DEFAULT NULL,
  `sobrenome` varchar(200) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `senha` varchar(200) DEFAULT NULL,
  `foto` varchar(250) DEFAULT NULL,
  `cargo` varchar(30) NOT NULL,
  `nivelAcesso` varchar(100) DEFAULT NULL,
  `dataHoraCriacao` datetime DEFAULT NULL,
  `dataHoraModificacao` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `admin_usuarios`
--

INSERT INTO `admin_usuarios` (`id`, `nome`, `sobrenome`, `email`, `senha`, `foto`, `cargo`, `nivelAcesso`, `dataHoraCriacao`, `dataHoraModificacao`) VALUES
(1, 'SenhorÉ', 'XX', 'gabrielbarbosaweb7@gmail.com', '@grupo7', 'EnginePHP7/uploads/usuarios/4618085_1524696220.jpg', 'Developer X', 'programador', '2018-04-03 10:00:00', '2018-04-25 06:43:40'),
(2, 'Sullivan', 'Empreender', 'contato@grupoempreender.com.br', '@grupo7', 'EnginePHP7/uploads/usuarios/5086543_1524661838.jpg', 'Proprietário', 'administrador', '2018-04-03 10:00:00', '2018-04-25 09:11:18');

-- --------------------------------------------------------

--
-- Estrutura da tabela `admin_vars`
--

CREATE TABLE `admin_vars` (
  `id` int(11) NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `identificador` varchar(60) DEFAULT NULL,
  `tipo` varchar(20) DEFAULT 'texto',
  `valor` varchar(250) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `admin_vars`
--

INSERT INTO `admin_vars` (`id`, `categoria`, `identificador`, `tipo`, `valor`) VALUES
(1, 'cms', 'cliente_nome', 'texto', 'Primeira Empresa'),
(2, 'cms', 'cliente_logo', 'imagem', 'grupo.png'),
(3, 'cms', 'cliente_url', 'texto', 'http://primeiraempresams.com.br'),
(4, 'cms', 'admin_version', 'texto', '1.0.0'),
(5, 'cms', 'admin_rodape_copyright', 'texto', 'BY <a href=\"http://grupoempreender.com.br\" target=\"_blank\">GRUPO EMPREENDER</a> '),
(6, 'cms', 'admin_year_created', 'texto', '2018'),
(7, 'cms', 'criador_nome', 'owner', 'Gabriel A. Barbosa'),
(8, 'cms', 'criador_email', 'owner', 'gabrielbarbosaweb7@gmail.com'),
(9, 'cms', 'criador_site', 'owner', 'http://gabrieldaluz7.co.nf'),
(10, 'cms', 'admin_pre_title', 'texto', '[CMS1.0]'),
(13, 'contato_configuracoes', 'Enviar cópia das mensagems para:', 'texto', 'gabrielbarbosaweb7@gmail.com');

-- --------------------------------------------------------

--
-- Estrutura da tabela `inscricao`
--

CREATE TABLE `inscricao` (
  `id` int(11) NOT NULL,
  `turma_id` int(11) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `data_nascimento` varchar(60) DEFAULT NULL,
  `sexo` varchar(30) DEFAULT NULL,
  `endereco` varchar(250) DEFAULT NULL,
  `celular` varchar(30) DEFAULT NULL,
  `telefone_fixo` varchar(30) DEFAULT NULL,
  `escolaridade` varchar(70) DEFAULT NULL,
  `data_conclusao_ano` varchar(10) DEFAULT NULL,
  `possui_empresa_cnpj` varchar(10) DEFAULT NULL,
  `porte_da_empresa` varchar(10) DEFAULT NULL,
  `porte_da_empresa_outro` varchar(250) DEFAULT NULL,
  `nome_da_empresa` varchar(100) DEFAULT NULL,
  `tempo_de_abertura` varchar(100) DEFAULT NULL,
  `ramo_de_atividade` varchar(120) DEFAULT NULL,
  `faturamento_medio_da_empresa` varchar(120) DEFAULT NULL,
  `renda_familiar_aproximada` varchar(50) DEFAULT NULL,
  `cadastrado_beneficio_social` varchar(10) DEFAULT NULL,
  `cadastrado_beneficio_social_qual` varchar(250) DEFAULT NULL,
  `pertence_ou_associado` varchar(10) DEFAULT NULL,
  `pertence_ou_associado_qual` varchar(250) DEFAULT NULL,
  `possui_disponibilidade` varchar(10) DEFAULT NULL,
  `data_da_inscricao` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `inscricao`
--

INSERT INTO `inscricao` (`id`, `turma_id`, `nome`, `email`, `data_nascimento`, `sexo`, `endereco`, `celular`, `telefone_fixo`, `escolaridade`, `data_conclusao_ano`, `possui_empresa_cnpj`, `porte_da_empresa`, `porte_da_empresa_outro`, `nome_da_empresa`, `tempo_de_abertura`, `ramo_de_atividade`, `faturamento_medio_da_empresa`, `renda_familiar_aproximada`, `cadastrado_beneficio_social`, `cadastrado_beneficio_social_qual`, `pertence_ou_associado`, `pertence_ou_associado_qual`, `possui_disponibilidade`, `data_da_inscricao`) VALUES
(27, 3, 'Claudinei da Silva SebastiÃ£o ', 'neybarreto@arrasecosmeticos.com.br ', '20/02/1972', 'Masculino', 'Rua Eng Lutero Lopes 100 apto 101 bloco E', '(67) 99616-6715', '', 'Ensino Medio', '1997', 'nÃ£o', 'MEI', '', '', '', '', '', '', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-03-22 00:00:00'),
(14, 3, 'Monalize SegÃ³via', 'mona__pri@hotmail.com', '25/11/1983', 'Feminino', 'olimpio klafke, 167', '(67) 99236-8066', '', 'Ensino Superior', '2009', 'nÃ£o', 'MEI', '', '', '', '', '', '3500', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-03-20 00:00:00'),
(15, 3, 'Angela Maria R. SegÃ³via', 'angelamariarod1963@gmail.com', '10/03/1963', 'Feminino', 'Av. Alberto de Araujo Arruda, 217 Mata do Jacinto', '(67) 99154-0668', '', 'Ensino Medio', '1979', 'nÃ£o', 'MEI', '', '', '', '', '', '3000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-03-20 00:00:00'),
(16, 1, 'BRUNO PEREIRA SILVA', 'bruno07pereira@gmail.com', '07/05/1996', 'Masculino', 'AntÃ´nio Alves Setti, Casa', '(67) 9912-7566', '(67) 9229-7329', 'Ensino Medio', '2013', 'sim', 'MEI', '', 'Baratim', '3 meses', 'Comercio Eletronico', '1000', '1,600', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-03-20 00:00:00'),
(17, 4, 'Alessandro Francisco da Costa Silva', 'sandro5097@hotmail.com', '20/08/1980', 'Masculino', 'Rua Indaial, 138, Residencial Cedrinho', '(67) 99222-4950', '(67) 3022-7512', 'Ensino Superior', '2012', 'sim', 'EIRELI', '', 'SJ Construrora', '6 meses', 'Civil', '60.000,00', '0,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-03-20 00:00:00'),
(26, 1, 'LUCAS FERNANDES BARROS DE MELO', 'lucas_89barros@hotmail.com', '26/06/1989', 'Masculino', 'AVENIDA TAMANDARE', '(67) 99226-1677', '', 'Ensino Superior Incompleto', '2019', 'sim', 'EI', '', 'LUCAS FERNANDES BARROS DE MELO', '1 MES', 'ATIVIDADES VETERINÃRIAS ', '5000', '2500', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-03-22 00:00:00'),
(19, 2, 'Antoniel GonÃ§alves de Souza', 'antonielsouza@outlook.com.br', '30/04/1987', 'Masculino', 'Travessa Santiago 19', '(67) 99292-8505', '', 'Ensino Superior', '2016', 'nÃ£o', 'MEI', '', '', '', '', '', '1039,00 por pessoa (5)', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-03-20 00:00:00'),
(20, 1, 'JULIANA DA SILVA VIEIRA', 'jv.medvet@gmail.com', '16/09/1984', 'Feminino', 'RUA MONTE NEGRO, 245 VILA IEDA', '(67) 99953-8248', '', 'Ensino Superior', '2011', 'sim', 'MEI', '', 'NUTRI EQUUS', '12 MESES', 'AGRONEGÃ“CIO', '14.000,00/ ANO', '2000,00', 'sim', 'CNPQ', 'sim', 'AJE MS', 'sim', '2018-03-20 00:00:00'),
(21, 2, 'leonardo de oliveira', 'nadoarce@hotmail.com', '07/01/1996', 'Masculino', 'rua japÃ£o 1595', '(67) 98142-8229', '', 'Ensino Medio Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '2000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-03-20 00:00:00'),
(22, 1, 'HENRIQUE DOS SANTOS FERNANDES', 'sfernandes.henrique@gmail.com', '18/05/1993', 'Masculino', 'RUA BERTA LÃšCIA, 530 - CAMPO GRANDE, MS', '(67) 99649-5454', '', 'Ensino Superior', '', 'nÃ£o', 'MEI', '', '', '', '', '', '1800', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-03-20 00:00:00'),
(23, 1, 'Gabriel Edgar Hermann', 'Bielhermann@hotmail.com', '11/09/1995', 'Masculino', 'Rua Jurema', '(67) 99862-0405', '(67) 3351-6631', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$ 2500.00', 'nÃ£o', '', 'sim', 'Empresa Junior da UFMS EngeFour ', 'sim', '2018-03-21 00:00:00'),
(24, 2, 'HELEN CRISTINE CARDOSO DA COSTA', 'helenmardine@outlook.com', '21/07/1989', 'Feminino', 'Hidelbranda reze de Cesar, 61', '(67) 99161-9611', '(67) 3246-1398', 'Ensino Medio', '2007', 'nÃ£o', 'MEI', '', '', '', '', '', '1500,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-03-21 00:00:00'),
(25, 1, 'Luana Cristina Almeida Feitosa', 'luanafeitosa19@gmail.com', '19/12/1994', 'Feminino', 'Tv. Arco Ires, 50', '(67) 99271-0694', '', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$2.800,00', 'nÃ£o', '', 'sim', 'Empresa jÃºnior.', 'sim', '2018-03-21 00:00:00'),
(28, 4, 'SimeÃ£o Arantes de Azevedo', 's12.azevedo@gmail.com', '31/07/1987', 'Masculino', 'Rua Dos Pereiras, 675', '(67) 99272-2067', '', 'Ensino Superior', '2017', 'sim', 'MEI', '', 'RAPIDI ENTREGAS E COLETAS', '10 MESES', 'ServiÃ§os de malote nÃ£o realizados pelo correio nacional e ServiÃ§os de entrega rÃ¡pida', '2.000,00', '3.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-03-24 00:00:00'),
(29, 1, 'VIVIAN MONTEIRO NICOLAU KOBAYASHI', 'vivi22pero@hotmail.com', '22/01/1991', 'Feminino', 'RUA RIO NEGRO N 1188 VILA MARGARIDA, AP 1002 BL B', '(67) 98101-3433', '(67) 3222-6183', 'Ensino Superior Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '7000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-03-26 00:00:00'),
(30, 1, 'Thomas Andrew GuimarÃ£es da Rosa', 'thomasandrewgr@gmail.com', '14/07/1996', 'Masculino', 'Rua Tenente AntÃ´nio JoÃ£o de Figueiredo, 376', '(67) 99140-7531', '(67) 3042-8179', 'Ensino Superior Incompleto', '2020', 'nÃ£o', 'MEI', '', '', '', '', '', '253700', 'sim', 'Fies', 'nÃ£o', '', 'sim', '2018-03-26 00:00:00'),
(31, 1, 'JOSÃ‰ AFONSO DOS SANTOS JÃšNIOR', 'afonso@medeirosedauria.adv.br', '14/05/1985', 'Masculino', 'RUA ANTONIO MARIA COELHO, 3410, JARDIM DOS ESTADOS, CAMPO GRANDE/MS', '(67) 99290-8541', '', 'Ensino Superior', '2009', 'nÃ£o', 'MEI', '', '', '', '', '', '7.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-03-27 00:00:00'),
(32, 1, 'sylvia nogueira de andrade', 'sylvia_nandrade@yahoo.com.br', '09/08/1991', 'Feminino', 'rua diogo bernardes,413', '(67) 98413-4895', '', 'Ensino Medio', '2013', 'sim', 'MEI', '', 'Lotus cristalina', '08/11/2016', 'saude e bem estar', '300,00', '300,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-03-27 00:00:00'),
(33, 2, 'Michele Reis dos Santos', 'michelereis.18@icloud.com', '06/04/1994', 'Feminino', 'Rua do Ouvidor, 346. CaiÃ§ara', '(67) 99111-8351', '', 'Ensino Superior', '2014', 'sim', 'MEI', '', 'Esteticista Michele Reis', '2 anos', 'Atividades de estÃ©tica e outros serviÃ§os de cuidados com a beleza', '1000,00', '1000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-03-28 00:00:00'),
(34, 25, 'Douglas Frigo de Souza', 'douglasfrigo@hotmail.com', '26/01/1991', 'Masculino', 'rua clark', '(67) 99690-8555', '', 'Ensino Superior Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '1.600,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-03-30 00:00:00'),
(35, 21, 'Alysson Figueiredo de Almeida', 'eng.alyssonalmeida@gmail.com', '15/07/1995', '', 'Avenida Marques de Pombal, 1888 - Bl 13 - AP 208', '(67) 99948-4709', '(67) 3022-7340', 'Ensino Superior', '2017', 'nÃ£o', 'MEI', '', '', '', '', '', '1000,00', 'nÃ£o', '', 'sim', 'Crea e IEMS', 'sim', '2018-03-30 00:00:00'),
(36, 17, 'Evandro Ribeiro da Silva ', 'evandroribeirossilva@gmail.com', '17/10/1990', 'Masculino', 'Rua Cezar Ramos Santos, 385 ', '(67) 99820-4125', '', 'Ensino Superior Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '3000,00', 'sim', 'Fies ', 'sim', 'Crea ', 'sim', '2018-03-30 00:00:00'),
(37, 23, 'Lara de Alencar ', 'Laradealencar@gmail.com', '29/07/1989', 'Feminino', 'Rua Manoel laburu, 834, Jd SÃ£o LourenÃ§o ', '(67) 99270-8101', '', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '1000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-03-31 00:00:00'),
(38, 30, 'Victor Hugo de Brito Silvestre ', 'Victor-silvestre@outlook.com.br', '06/12/1985', 'Masculino', 'Rua JosÃ© Lopes Barbosa 1668', '(67) 98214-0184', '', 'Ensino Superior Incompleto', '2018', 'sim', 'MEI', '', 'LÃ¡ veloce transportes ', '8meses', 'Transportes ', '', '2.500,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-01 00:00:00'),
(39, 18, 'leonardo de oliveira', 'nadoarce@hotmail.com', '07/01/1996', 'Masculino', 'rua japao 1595', '(67) 8142-8229', '(67) 3382-2701', 'Ensino Medio Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '2000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-02 00:00:00'),
(40, 26, 'danilo martins chaparro', 'danilo.mchaparro@hotmail.com', '01/12/1993', 'Masculino', 'rua da planicie,47', '(67) 99995-3330', '', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '3000', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-02 00:00:00'),
(41, 17, 'Iranilde Crevelaro', 'cadangacrecelaro@hotmail.com', '09/08/1968', 'Feminino', 'Rua Pernambuco,946 - apt 1203 - Ed Park Avenue', '(67) 9210-4324', '', 'Ensino Superior', '2010', 'nÃ£o', 'MEI', '', '', '', '', '', '15000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-03 00:00:00'),
(42, 23, 'TainÃ¡ da Silva Nogueira', 'tayjrafa@gmail.com', '16/09/1995', 'Feminino', 'Rua TremembÃ© 630', '(67) 99156-4290', '', 'Ensino Medio', '', 'nÃ£o', 'MEI', '', '', '', '', '', '300,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-03 00:00:00'),
(43, 21, 'leticia guilherme de moura', 'leticiaguilherme_13@hotmail.com', '24/09/1993', 'Feminino', 'rua portuguesa, 484, vila maciel', '(67) 98183-8653', '(62) 98579-5364', 'Ensino Superior Incompleto', '2020', 'nÃ£o', 'MEI', '', '', '', '', '', '750,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-03 00:00:00'),
(44, 23, 'TainÃ¡ da Silva Nogueira', 'tayjrafa@gmail.com', '16/09/1995', 'Feminino', 'Rua TremembÃ© 630', '(67) 99156-4290', '', 'Ensino Medio Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-03 00:00:00'),
(45, 17, 'Gabriel Melgarejo Silva Braga', 'neide.madalena@yahoo.com.br', '21/04/1997', 'Masculino', 'Rua da PÃ¡tria 768', '(67) 99237-8544', '(67) 3331-7058', 'Ensino Medio Incompleto', '', 'sim', 'MEI', '', 'Gabriel Melgarejo Silva Braga', '2 anos e 5 meses', 'Lanchonete, casas de chÃ¡, sucos e similares', 'R$5mil ', 'R$1.800', 'nÃ£o', '', 'sim', 'AssociaÃ§Ã£o Comercial de Campo Grande', 'nÃ£o', '2018-04-03 00:00:00'),
(46, 25, 'Dayana Ribeiro', 'dayvet2004@hotmail.com', '07/08/1982', 'Feminino', 'Rua dos IpÃªs, 603', '(67) 99903-0707', '(67) 3285-1566', 'Ensino Superior', '2004', 'nÃ£o', 'MEI', '', '', '', '', '', '2900,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-04 00:00:00'),
(47, 17, 'LetÃ­cia SilvÃ©rio Melhado da Silva', 'leticiacorretoracontato@gmail.com', '17/06/1997', 'Feminino', 'Rua NaviraÃ­, 490', '(67) 99158-9243', '', 'Ensino Superior Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '7 meses', '', '', '2.000', 'sim', 'Estudos na UFMS pelo SISU', 'nÃ£o', '', 'sim', '2018-04-04 00:00:00'),
(48, 23, 'Augusto Lameu Chaves', 'augusto.lameu@gmail.com', '21/05/1993', 'Masculino', 'Rua NaviraÃ­, 490', '(67) 99232-0026', '', 'Ensino Superior Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '2.000', 'sim', 'Estudos na UFMS pelo SISU', 'nÃ£o', '', 'sim', '2018-04-04 00:00:00'),
(49, 23, 'Eduardo Ferreira', 'Eduardofll77@gmail.com', '14/03/1998', 'Masculino', 'Rua do dinar 181', '(67) 99256-2669', '', 'Ensino Superior Incompleto', '2022', 'nÃ£o', 'MEI', '', '', '', '', '', '937', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-04 00:00:00'),
(50, 17, 'diele Aparecida ', 'diele-mendes@hotmail.com', '19/09/1990', 'Feminino', 'rua Ituverava 204', '(67) 99311-7062', '', 'Ensino Medio Incompleto', '2021', 'nÃ£o', 'MEI', '', '', '', '', '', '954,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-04 00:00:00'),
(51, 25, 'nelson pereira da silva', 'diele-mendes@hotmail.com', '03/01/1963', 'Masculino', 'rua Ituverava 204', '(67) 99121-8843', '', 'Ensino Fundamental', '1983', 'nÃ£o', 'MEI', '', '', '', '', '', '800,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-04 00:00:00'),
(52, 24, 'Felipe Itiro Motobayashi', 'felipemotobayashi@gmail.com', '15/07/1994', 'Masculino', 'Avenida Ernesto Geisel, 3991', '(67) 98101-5404', '', 'Ensino Medio', '2011', 'nÃ£o', 'MEI', '', '', '', '', '', '500,00', 'sim', 'ID Jovem', 'nÃ£o', '', 'sim', '2018-04-05 00:00:00'),
(53, 18, 'ValÃ©ria Fernandes Dorvalino', 'Construa_valeriafernandes@hotmail.com', '01/10/1987', 'Feminino', 'Rua iria Loureiro Viana, 323 apto 8', '(67) 98197-2114', '', 'Ensino Superior', '2015', 'nÃ£o', 'MEI', '', '', '', '', '', '1130,00', 'nÃ£o', '', 'sim', 'AssociaÃ§Ã£o brasileira de Designers e interiores ', 'sim', '2018-04-05 00:00:00'),
(54, 25, 'SuÃ©llen Patricia Queiroz Raulino', 'suellen_raulino@hotmail.com', '16/07/1992', 'Feminino', 'Rua Asa Branca, 221 - Enseada dos PÃ¡ssaros', '(67) 99141-9501', '(67) 3346-7078', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-06 00:00:00'),
(55, 21, 'SuÃ©llen Patricia Queiroz Raulino', 'suellen_raulino@hotmail.com', '16/07/1992', 'Feminino', 'Rua Asa Branca, 221 - Enseada dos PÃ¡ssaros', '(67) 99141-9501', '', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-06 00:00:00'),
(57, 29, 'Cristhian Tavares Da Silva', 'cristhian.tavares.94@gmail.com', '10/05/1994', 'Masculino', 'Rua Pastor Ronaldo Costa, 1105', '(67) 99847-3019', '(67) 3426-0783', 'Ensino Superior Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '2011', '', '', '1', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-07 00:00:00'),
(58, 23, 'ThaÃ­s Rodrigues CorrÃªa', 'thais.rdcorrea@gmail.com', '27/01/1998', 'Feminino', 'Bernardo GuimarÃ£es, 688', '(67) 98111-4944', '', 'Ensino Superior', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '5 sÃ¡larios mÃ­nimos', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-09 00:00:00'),
(59, 26, 'ThaÃ­s Rodrigues CorrÃªa', 'thais.rdcorrea@gmail.com', '27/01/1998', 'Feminino', 'Rua Bernardo GuimarÃ£es, 688.', '(67) 98111-4944', '', 'Ensino Superior', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '5 salÃ¡rios mÃ­nimos', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-09 00:00:00'),
(60, 23, 'Luiz Filipe Nunes', 'luizsilva12330@gmail.com ', '08/05/1999', 'Masculino', 'Quintino bocaiuva ', '(67) 99323-1805', '(67) 3241-3718', 'Ensino Medio', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-09 00:00:00'),
(61, 24, 'AndrÃ© Luis Kiyoshi Shimabukuro', 'andreluisks@gmail.com', '19/03/1992', 'Masculino', 'Rua Agnaldo Trouy, 96 CabreÃºva', '(67) 99860-2289', '', 'Ensino Superior', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '3000', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-09 00:00:00'),
(62, 17, 'THAIZ CRISTINA SCONHETZKI MARQUES JARDIM', 'thaizjardim@hotmail.com', '10/11/1982', 'Feminino', 'Av Rita Vieira De Andrade, 658, Torre 3 Ap 45', '(67) 99976-5500', '', 'Ensino Superior', '2005', 'nÃ£o', 'MEI', '', '', '', '', '', '2.500,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-09 00:00:00'),
(63, 18, 'Lucas Rodrigues da Silva', 'lucas.rodrigues.ap@gmail.com', '04/02/1996', 'Masculino', 'Rua Jasmelinda Ferreira de Carvalho, 217', '(67) 98130-4164', '', 'Ensino Medio', '2013', 'nÃ£o', 'MEI', '', '', '', '', '', '6000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-09 00:00:00'),
(64, 24, 'Amanda Duarte da Rocha', 'contato@gestagromarketing.com.br', '30/07/1994', 'Feminino', 'Avenida Senador Antonio Mendes Canale - 1159/Condominio Castelo de Monaco - Bloco 3/Apt 405', '(67) 99956-1532', '', '', '', 'sim', 'MEI', '', 'GEST AGROMARKETING', 'MarÃ§o de 2016 - 25 meses', 'Marketing Rural', '3.000,00', '2.250,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-10 00:00:00'),
(65, 17, 'Sullivan Vareiro Braulio', 'sullivanvareiro@gmail.com', '18/10/1982', 'Masculino', 'Rua Jales, 561, Bairro Monte Carlo, Campo Grande-MS', '(67) 99624-4071', '(67) 3362-7733', 'Ensino Superior', '2008', 'nÃ£o', 'EIRELI', '', '', '', '', '', 'R$5.000,00', 'nÃ£o', '', 'sim', 'AJE-MS', 'sim', '2018-04-10 00:00:00'),
(102, 17, 'Matheus Correa Saucedo', 'teu.saucedo@ gmail.com', '03/10/1997', 'Masculino', 'Ricardo Alexandre Golbett, nÂº 120, Bairro Vila NatÃ¡lia, 79096304.', '(67) 99192-3917', '', 'Ensino Medio', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '954,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(101, 18, 'Patricia Katiuscia Andrade Ocampos', 'patriciaocampos23@hotmail.com', '23/12/1995', 'Feminino', '', '(67) 98111-4559', '(67) 3022-4559', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '1100', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(100, 18, 'ANIELLY RIBAS GONCALVES D&#39;ANDREA', 'aribas@fiems.com.br', '12/12/1991', 'Feminino', 'rua pio rojas', '(67) 9218-6901', '(67) 9218-6901', 'Ensino Superior', '2017', 'nÃ£o', 'MEI', '', '', '', '', '', '2800,00', 'sim', 'programa habitacional do estado', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(69, 17, 'Waldiney Garais', 'neygarais@gmail.com', '21/06/1990', 'Masculino', 'Avenida SÃ£o Nicolau 1535', '(67) 99606-3931', '(67) 3211-0551', 'Ensino Superior', '2012', 'nÃ£o', 'MEI', '', '', '', '', '', '2000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-10 00:00:00'),
(70, 24, '24041982Sarina Moraes Antunes24', 'sarinaantunes@hotmail.com', '24/04/1982', 'Feminino', 'Rua Padre Tomaz 299- Guanandi', '(67) 98406-8282', '', 'Ensino Superior', '2003', 'nÃ£o', 'MEI', '', '', '', '', '', '2000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-10 00:00:00'),
(71, 24, 'Maria Cristina da Costa Gama', 'cristina-moreno@hotmail.com', '02/05/1959', 'Feminino', 'Rua JosÃ© Rodrigues Benfica 167', '(67) 98442-5884', '', 'Ensino Superior', '1983', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$20000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-10 00:00:00'),
(72, 18, 'GLACIELE DE FIGUEIREDO AVALHAES', 'glaciele.figueiredo@hotmail.com', '31/08/1980', 'Feminino', 'Rua Sarutaia,192', '(67) 99233-4818', '(67) 3362-4827', 'Ensino Medio', '2000', 'nÃ£o', 'MEI', '', '', '', '', '', '5,000,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-10 00:00:00'),
(73, 28, 'JEFERSSON DUARTE DE FARIAS', 'arquitetojefersson@gmail.com', '20/10/1978', 'Masculino', 'ACÃCIO LUIZ VIEGAS', '(67) 99902-2793', '', 'Ensino Superior', '2001', 'nÃ£o', 'MEI', '', '', '', '', '', '1500,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(74, 27, 'JÃ©ssica de Castro Silva GalvÃ£o', 'galvaoecastro@gmail.com', '01/08/1989', 'Feminino', 'Rua marche, NÂº 1230 - Vila Toscana', '(67) 99654-4795', '', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '1500,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(75, 7, 'Paulo Henrique Ternovoe Nepomuceno', 'ph_nepomuceno@hotmail.com', '06/06/1991', 'Masculino', 'R. Amael Pompeu Filho 1745 B. Santa fÃ©', '(67) 99699-9227', '', 'Ensino Superior', '2016', 'sim', 'MEI', '', 'Sunlight Engenharia', '4 meses', 'Energia solar e projetos elÃ©tricos', '', '2000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(76, 27, 'Raphael Araujo Bueno', 'rapha_bueno@hotmail.com', '24/12/1987', 'Masculino', 'General Camara, 30', '(67) 99649-9707', '', 'Ensino Medio', '2004', 'sim', 'Outro', 'LTDA', 'Sinergia', '3 anos', 'Marketing Digital', '2000', '1400', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(77, 7, 'Mariel Jara Vieira Morel ', 'mar_yelljara@hotmail.com', '17/01/1985', 'Feminino', 'Av:BonifÃ¡cio Fernandes 1749 Centro JUTI MS', '(67) 98473-2221', '(67) 98481-1749', 'Ensino Medio', '2004', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(78, 24, 'Richard', 'Richardestricolo1@gmail.com', '25/03/1998', 'Masculino', 'Portal caioba', '(67) 9123-5486', '', 'Ensino Fundamental Incompleto', '7', 'nÃ£o', 'MEI', '', '', '', '', '', '900', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(79, 24, 'Regiane Nunes de Andrade ', 'Regianeandrade38@hotmail.com', '20/11/1986', 'Feminino', 'Rua matamavis 108', '(67) 99307-4887', '(67) 3042-8480', 'Ensino Medio', '2003', 'nÃ£o', 'MEI', '', '', '', '', '', '1200', 'sim', 'Bolsa familia', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(80, 18, 'Ferminio', 'ofakelandia@hotmail.cotegipe 1143com', '09/07/1996', '', '', '', '', 'Ensino Medio', '2016', 'sim', 'MEI', '', 'Lucre', '11Meses', 'Financeiro', '6 mil ', '4 mil ', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(81, 23, 'CRISTIANE FERREIRA DIAS', 'crisdias2409@gmail.com', '24/09/1979', 'Feminino', 'Avenida Nelly Martins, 374', '(67) 99177-3838', '(67) 3222-1916', 'Ensino Superior', '2010', 'nÃ£o', 'MEI', '', '', '', '', '', '', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(82, 25, 'Adriana selles', 'selles3786@gmail.com', '03/07/1986', 'Feminino', 'Delia sobral petengil', '(67) 99305-9066', '', 'Ensino Superior Incompleto', '2017', 'nÃ£o', 'MEI', '', '', '', '', '', '2000.00', 'nÃ£o', '', 'sim', 'Mary kay', 'sim', '2018-04-11 00:00:00'),
(83, 24, 'Karlla Fernanda Schunke', 'karlla.schunke@hotmail.com', '19/11/1993', 'Feminino', 'Rua Trinta e Um - Vila Nova Campo Grande', '(67) 99159-5555', '', 'Ensino Superior', '2015', 'nÃ£o', 'MEI', '', '', '', '', '', '2.000', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(84, 24, 'Alexandre Mello', 'lex277xandre@gmail.com', '12/03/1987', 'Masculino', 'JoÃ£o Mizael MamorÃ©', '(67) 99236-3227', '', 'Ensino Superior Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '1000', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(85, 17, 'Eudocio Gregorio Neto', 'eudociogregorioneto@gmail.com', '21/12/1990', 'Masculino', 'Rua Cavaleiro da Rosa 439', '(67) 98419-9470', '', 'Ensino Medio', '2009', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(86, 17, 'NathÃ¡lia Gracielle Santos ', 'ngraciellesantos@gmail.com ', '16/10/1991', 'Feminino', 'Romualdo fontolan n.36', '(67) 99173-1261', '', 'Ensino Medio', '2010', 'nÃ£o', 'MEI', '', '', '', '', '', '900.00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(87, 23, 'Lidiane', 'Lidiane_direito@hotmail.com', '06/02/1979', 'Feminino', 'Rua Caxias do Sul 789', '(67) 99221-8905', '(67) 3351-2085', 'Ensino Superior', '2012', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$2.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(88, 18, 'Katiana', 'kattianna252@gmail.com', '23/10/1986', 'Feminino', 'Descalvado254', '(67) 99254-1534', '', 'Ensino Medio', '2007', 'nÃ£o', 'MEI', '', '', '', '', '', '1000', 'sim', 'Bolsa familia', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(89, 17, 'Lorran Torraca', 'lorran_oliveiratorraca@hotmail.com', '31/01/1994', 'Masculino', 'Rua Bertolino CÃ¢ndido 641 nova lima', '(67) 99136-3044', '', 'Ensino Superior Incompleto', '', 'sim', 'MEI', '', 'Lucro investimentos ', '8 messes ', 'Financeiro', '6 mil ', '4 mil ', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(90, 24, 'Eliane Augusto Bispo', 'elianeaugusto36@gmail.com', '28/08/1978', '', 'rus:Leonor Garcia Rosa Pires', '(67) 99251-6639', '', 'Ensino Medio', '', 'nÃ£o', 'MEI', '', '', '', '', '', '300,00', 'sim', 'bolsa familia', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(91, 23, 'Jessyka GuimarÃ£es Mara', 'andremartins2207@hotmail.com', '17/12/1991', 'Feminino', 'av senador antonio mendes canele 1299', '(67) 99162-8579', '(67) 3342-0880', '', '', 'sim', 'MEI', '', 'Don Pablito Pizzas', '1 mes', 'Pizzaria', '10 mil', 'mil reais', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(92, 23, 'Roque Rogerio j.rojas', 'rock74034@gmail.com', '04/06/1963', 'Masculino', 'R.fernao de MagalhÃ£es 693', '(67) 99235-2813', '', '', '', 'nÃ£o', 'MEI', '', '', '', '', '', '', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(93, 18, 'Isabela Palmeira', 'palmeira.isa@gmai.com', '13/08/1988', 'Feminino', 'Rua Dr. Julio de Almeida, 120, apt0 13', '(67) 98119-9123', '', 'Ensino Superior', '2010', 'nÃ£o', 'MEI', '', '', '', '', '', '2.000,00', 'nÃ£o', '', 'sim', 'Sinduscom', 'sim', '2018-04-11 00:00:00'),
(94, 24, 'Edicleia calvis Rondon', 'lethiciarondon31@gmail.com', '27/09/82', 'Feminino', 'Rua paraibana nÃºmero 200', '(67) 99346-9113', '', 'Ensino Medio Incompleto', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '1.200', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(95, 18, 'Patrici Carvalho Brum Aveiro', 'patricicarvalho@gmail.com', '17/10/1987', 'Feminino', 'rua da promissÃ£o 362 StÂº Antonio', '(67) 99922-4435', '(67) 3222-9129', 'Ensino Superior', '2009', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'sim', 'caums', 'sim', '2018-04-11 00:00:00'),
(96, 18, 'Marcelo AraÃºjo Aveiro', 'aveiro.marcelo@gmail.com', '23/11/1985', 'Masculino', 'Rua da PromissÃ£o, 362', '(67) 99939-4765', '(67) 3222-9129', 'Ensino Superior', '2010', 'nÃ£o', 'MEI', '', '', '', '', '', '1.500,00', 'nÃ£o', '', 'sim', 'CAU MS', 'sim', '2018-04-11 00:00:00'),
(97, 24, 'LuÃ­s Fernando Caetano dos santos', 'lethiciarondon31@gmail.com', '07/09/87', 'Masculino', 'Rua paraibana nÃºmero 200', '(67) 99268-2539', '', 'Ensino Medio', '208', 'nÃ£o', 'MEI', '', '', '', '', '', '1.300', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(98, 17, 'Nidian Souza Ribeiro Correa', 'nidian03@hotmail.com', '06/01/1990', 'Feminino', 'Av. Senador Antonio Mendes Canale', '(67) 99245-0489', '', 'Ensino Superior Incompleto', '2018', 'sim', 'MEI', '', 'Nidian Souza Ribeiro Correa', '2 anos', 'Comercio', '1.000,00', '1200,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(99, 21, 'Nicole Pinheiro de Carvalho', 'nicolepinheirodecarvalho@gmail.com', '22/05/1995', 'Feminino', 'Dr Arthur Jorge 1256', '(67) 99224-2033', '', 'Ensino Superior Incompleto', '2015', 'nÃ£o', 'MEI', '', '', '', '', '', '1000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(103, 17, 'Marcia Correa', 'Marciacorrea2009@yahoo.com.br', '12/11/1979', 'Feminino', 'Ricardo Alexandre Golbett, nÂº 120, Bairro Vila NatÃ¡lia, 79096304.', '(67) 9137-8473', '', 'Ensino Medio', '2012', 'nÃ£o', 'MEI', '', '', '', '', '', '1.500 R$', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(104, 24, 'Patricia Katiuscia Andrade Ocampos', 'patriciaocampos23@hotmail.com', '23/12/1995', 'Feminino', 'Nelsom Figueiredo Junior', '(67) 98111-4559', '(67) 3022-4559', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '1100', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(105, 23, 'Jacilda Ferreira da Silva', 'jacildaferreira12@gmail.com', '23/08/1958', 'Feminino', 'R.fernaode MagalhÃ£es', '(67) 99118-1061', '', '', '', 'nÃ£o', 'MEI', '', '', '', '', '', '', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(106, 18, 'LOURDES RIBAS DE ALMEIDA SANTOS', 'lourdes_ribas@hotmail.com', '04/03/1970', 'Feminino', 'RUA AICAS,2018 TIJUCA II', '(67) 99218-1622', '', 'Ensino Medio', '', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$1200,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(107, 24, 'MARCO ANTONIO DE CAMPOS', 'marquitocampos@gmail.com', '30/04/1972', 'Masculino', 'Rua Onze de Outubro', '(67) 99223-2330', '(67) 3042-3200', 'Ensino Superior Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '3.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(108, 24, 'JessÃ© santos de sousa', 'Jessesanto2385@gemail.com ', '23/03/1985', 'Masculino', 'Rua santa ana N:07 Bairro santa luzia ', '(67) 9933-5868', '(67) 3365-2639', 'Ensino Medio', '2004', 'nÃ£o', 'MEI', '', '', '', '', '', 'Dois salario minimo', 'sim', 'AGEAB ', 'nÃ£o', '', 'sim', '2018-04-11 00:00:00'),
(109, 18, 'Cristina monteiro de Oliveira ', 'Cristinamonteiro109@hotmail.com', '23/05/1991', 'Feminino', 'Rua Aicas 142 Tijuca 2', '(67) 99892-4172', '(67) 3045-6944', 'Ensino Medio', '2010', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$945,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(110, 27, 'KAROLINE ERNANDES DA SILVA', 'karolineernandes@hotmail.com', '25/11/1985', 'Feminino', 'Antonio de Carvalho, apto 301', '(67) 9244-7365', '', '', '', 'nÃ£o', 'MEI', '', '', '', '', '', '2.500,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(111, 24, 'Marcia apatecida peres ribas', 'Jessesanto2385@gemail.com ', '24/12/1982', 'Feminino', 'Rua capistrano de abreu n:143 bairro lozangelis ', '(67) 9933-5868', '', 'Ensino Medio', '1999', 'nÃ£o', 'MEI', '', '', '', '', '', 'Dois salario minimo', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-11 00:00:00'),
(112, 25, 'Karla Carolina Gonzaga Garcia', 'soukarla.garcia@gmail.com', '17/07/1991', 'Feminino', 'Rua AntÃ´nio Maria Coelho 2772', '(67) 99290-3544', '', 'Ensino Superior', '2013', 'nÃ£o', 'MEI', '', '', '', '', '', '1800,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(113, 23, 'Zenaide dos Santos', 'maercio_exportacao@outlook.com', '05/11/1970', 'Feminino', 'Rua Ana Luiza de Souza 1832', '(67) 3042-5075', '', 'Ensino Medio', '1993', 'nÃ£o', 'MEI', '', '', '', '', '', '1000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(114, 23, 'Daniel Maercio dos Santos', 'maercio_exportacao@outlook.com', '06/04/1995', 'Masculino', 'Rua Ana Luiza de Souza 1832', '(67) 99190-0682', '(67) 3042-5075', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$1000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(115, 27, 'jaqueline chimenez gonsalves', 'jaquelinechimenez.adv@gmail.com', '04/08/1992', 'Feminino', 'Rua RamÃ£o OsÃ³rio n.211', '(67) 99912-0692', '', 'Ensino Superior', '2014', 'sim', 'MEI', '', 'golden cell', '04/04/2018', 'venda de celular ', '3.000,00', '1.500,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(116, 7, 'alexandre chimenez gonsalves', 'alexandre369741258@gmail.com', '01/12/1992', 'Masculino', 'Rua RamÃ£o OsÃ³rio n. 211 Parque das NaÃ§Ãµes II', '(67) 99891-9963', '', 'Ensino Superior Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '1.500,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(117, 7, 'Flavio Arakaki', 'ocflavio@gmail.com', '15/12/1972', 'Masculino', 'Balbina de Matos 635', '(67) 99172-1354', '', 'Ensino Superior Incompleto', '1996', 'nÃ£o', 'MEI', '', '', '', '', '', '2000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(118, 18, 'Kellen Gleice Silva', 'kellen_gleice@hotmail.com', '24/10/1985', 'Feminino', 'rua dos democratico, 1198 jardim das perdizes', '(67) 99228-2145', '(67) 3029-5000', 'Ensino Medio', '2003', 'nÃ£o', 'MEI', '', '', '', '', '', '1500,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-12 00:00:00'),
(119, 17, 'ANTONIO SERGIO DOS SANTOS SOUZA', 'antonioofficial27@gmail.com', '13/07/1997', 'Masculino', 'rua fernandopolis 99', '(67) 99122-5523', '', 'Ensino Superior Incompleto', '2022', 'nÃ£o', 'MEI', '', '', '', '', '', '2000,00 ', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-12 00:00:00'),
(120, 25, 'ANDRE AUGUSTO KUSELIAUSKAS MARTINS', 'kmartins1010@gmail.com', '02/02/1977', 'Masculino', 'Casa', '(67) 98476-1945', '', 'Ensino Superior Incompleto', '1999', 'nÃ£o', 'MEI', '', '', '', '', '', '3000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(121, 18, 'Nilton Luiz Batalha', 'Nilton.cnacachoeira@gmail.com', '16/10/1987', 'Masculino', 'Rua TapauÃ¡ 564 jardim Columbia', '(67) 99116-0806', '', 'Ensino Medio', '2008', 'nÃ£o', 'MEI', '', '', '', '', '', '1000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(122, 23, 'Wellington Carlos do Nascimento', 'well_nascimento@icloud.com', '29/03/1991', 'Masculino', 'Rua Abdo Chequer, 87', '(67) 99165-7066', '', 'Ensino Superior Incompleto', '2019', 'sim', 'MEI', '', '', '2 meses', 'Tabacaria', '', '3000,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-12 00:00:00'),
(123, 17, 'Diego cesar Barreiro dos anjos', 'Dieguinhoadm09@hotmail.com', '16/05/1988', 'Masculino', 'Rua janaina chacha de Melo ', '(67) 99842-6110', '(67) 99309-2645', 'Ensino Superior Incompleto', '', 'sim', 'MEI', '', '', '', '', '', '2000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(124, 17, 'Antonio Cesar', 'to-ninho_@hotmail.com', '09/03/1996', 'Masculino', 'Rua vital brasil, 204', '(67) 99340-9147', '(67) 3331-0921', 'Ensino Medio Incompleto', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '1200', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(125, 18, 'Bruno VinÃ­cius Andrade Silva', 'brunovinicius68@hotmail.com', '02/04/1996', 'Masculino', 'Firmo cristaldo, 92, nova lima', '(67) 99685-4673', '', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '2700', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(126, 24, 'Everton Claro de Oliveira Gomesm', 'Claro.everton@yahoo.com.br', '15/09/1991', 'Masculino', 'Rua AntÃ´nio CorrÃªa 1754 Jd Paulista', '(67) 99649-8521', '(67) 3042-5164', 'Ensino Superior', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '2.400,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-12 00:00:00'),
(127, 17, 'Uelton dos santos', 'Uelton_@outlook.com', '12/06/1989', 'Masculino', 'Rua,LÃºcia Martins coelho', '(67) 99204-6180', '', 'Ensino Medio', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '1000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(128, 24, 'Juliane Trindade Fernandes', 'julianetf@yahoo.com.br', '05/11/1990', 'Feminino', 'Paschoal Garcia, 160 - B. Jardim Campina Verde', '(67) 9227-8456', '', 'Ensino Medio', '2008', 'nÃ£o', 'MEI', '', '', '', '', '', 'Dois mil reais', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-12 00:00:00'),
(129, 23, 'Hemerson MendonÃ§a de moura', 'Hemerson.moura@outlook.com', '17/05/1985', 'Masculino', 'Itapiranga, 190', '(67) 98154-8312', '', 'Ensino Fundamental Incompleto', '2019', 'sim', 'MEI', '', 'HEMERSON MENDONCA DE MOURA00217406157', '4anos', 'Manutencao e automacao ', '0', '6000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(130, 17, 'Nayara suellen pereira da silveira', 'Nayaramatpar@gmail.com', '01/09/1987', 'Feminino', 'EusÃ©bio QueirÃ³s 665', '(67) 99107-2499', '', 'Ensino Superior Incompleto', '2013', 'sim', 'MEI', '', 'Nayara suellen pereira da Silveira ', '1 mes', 'Vestuario', 'NÃ£o tem ainda ', '2500,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-12 00:00:00'),
(131, 24, 'Everton Henrique Coelho Carnauba', 'everton909carnauba@gmail.com', '14/02/1990', 'Masculino', 'rua  doutor fause saueia, los angeles', '(67) 99258-0208', '', 'Ensino Medio', '2017', 'nÃ£o', 'MEI', '', '', '', '', '', '700,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-12 00:00:00'),
(132, 23, 'Mirian Vilhalba rodrigues', 'mirianbox1308@icloud.com', '13/08/1995', 'Feminino', 'Rua Aruaja 120 nova serrana', '(67) 99310-3654', '', 'Ensino Medio Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '800', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(133, 17, 'Gustavo Gomes', 'gustavogomes_kingkids@hotmail.com', '25/11/1982', 'Masculino', 'Rua sarg. HÃ©rcules Santos de campos', '(67) 99938-9988', '(67) 99938-9988', 'Ensino Superior Incompleto', '2010', 'sim', 'MEI', '', 'KING KIDS', '2 anos', 'Enxovais e roupas infantis', '4.000,00', '6.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(134, 17, 'Fabiano Rosa Mendes', 'public_arts@hotmail.com', '19/03/1986', 'Masculino', 'R. JosÃ© Dias de CArvalho, 11', '(67) 99278-6636', '', 'Ensino Superior Incompleto', '2013', 'sim', 'MEI', '', 'PublicArt ComunicaÃ§Ã£o Visual', '2 Anos', 'ComunicaÃ§Ã£o Visual', '2.000,00', '3.500,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-12 00:00:00'),
(135, 24, 'Pedro Henrique Araujo Ramos ', 'henriqueeramoss@outlook.com', '17/03/1997', 'Masculino', 'Rua lÃ­rio dos campos ', '(67) 9984-188', '(67) 3045-5083', 'Ensino Superior Incompleto', '2020', 'sim', 'MEI', '', 'Sabor da Mama ', '3 meses ', 'Restaurante ', '4000', '1100', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-12 00:00:00'),
(136, 23, 'Luis Felipe Meira Soares', 'Luis.bid30@gmail.com', '28/12/1995', 'Masculino', 'Rua Nhamunda  1500', '(67) 99164-5520', '', 'Ensino Medio Incompleto', '2011', 'sim', 'ME', '', 'VitÃ³ria  Beer', '11 meses', 'Bebidas e alimentos', '100000,00', '5000,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-12 00:00:00'),
(137, 18, 'RHEGIANE DA SILVA', 'Rhegiane05@gmail.com', '05/10/1988', 'Feminino', 'Rua dulcinopolis 293-Jd.Aeroporto', '(67) 99274-6470', '', 'Ensino Medio Incompleto', '', 'sim', 'MEI', '', '', '', '', '', '1080,00', 'sim', 'Bolsa familia', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(138, 24, 'Max Victor Soares de Souza', 'maxvictor25@gmail.com', '20/12/1990', 'Masculino', 'Rua JoÃ£o Da Mata, 1140', '(67) 9103-6350', '(67) 9103-6350', 'Ensino Medio', '2012', 'nÃ£o', 'MEI', '', '', '', '', '', '200', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(139, 25, 'ENIO PEDROSO DE ALMEIDA FILHO', 'eniopedroso.ms@gmail.com', '12/09/1972', 'Masculino', 'Travessa Primavera, 1990 - AnastÃ¡cio, MS', '(67) 99862-8821', '', 'Ensino Superior Incompleto', '2020', 'nÃ£o', 'MEI', '', '', '', '', '', '4.000,00', 'sim', 'Bolsa PermanÃªncia UFMS', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(140, 18, 'Rosileia Rocha Pereira', 'leiarploro@gmail.com', '26/11/1978', 'Feminino', 'Pepino giordano 609', '(67) 99234-3522', '', 'Ensino Medio', '2000', 'nÃ£o', 'MEI', '', '', '', '', '', '2 salÃ¡rio mÃ­nimo', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(141, 17, 'Evandro Ribeiro da Silva', 'evandroribeirossilva@gmail.com', '17/10/1990', 'Masculino', 'Rua Cezar Ramos', '(67) 99820-4125', '', 'Ensino Superior Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '2000,00', 'sim', 'Fies', 'sim', 'CREA/MS', 'sim', '2018-04-12 00:00:00'),
(142, 17, 'Eliza Paes de Medeiros', 'elizabeth.paesmartins@gmail.com', '22/06/1999', 'Feminino', 'Rua: rua do dÃ³lar nÂ° 579 bairro:vila Carlota', '(67) 99271-6773', '', 'Ensino Fundamental', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '700,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(143, 17, 'Ivana dias da silva ', 'ivanadias21@gmail.com', '17/08/1997', 'Feminino', 'Durval Nantes ', '(67) 99275-8075', '(67) 3022-7248', 'Ensino Medio', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '1100', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(144, 23, 'Kesia Dayane Rodrigues de Souza Blanco', 'kesiadayane28@gmail.com', '16/03/1988', 'Feminino', 'Rua Teodoro Roosevelt, 378', '(67) 99852-0392', '', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '1.350,00', 'sim', 'Bolsa FamÃ­lia ', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(145, 28, 'Larissa Maria Chimenez Hildebrand', 'larissa_hildebrand@hotmail.com', '14/09/1996', 'Feminino', 'Monte Castelo 1305', '(67) 99682-3623', '(67) 3422-4999', 'Ensino Medio', '2013', 'nÃ£o', 'MEI', '', '', '', '', '', '2300,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(146, 17, 'Alberto EspÃ­ndola ', 'rafajardimfernandes@hotmail.com', '07/08/1961', 'Masculino', 'Afonso pena', '(67) 99217-5986', '', 'Ensino Fundamental', '1977', 'nÃ£o', 'MEI', '', '', '', '', '', '5000', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-12 00:00:00'),
(147, 17, 'NilcÃ©ia Queiroz Ferreira', 'essenciadochocolate@hotmail.com', '21/09/1979', 'Feminino', 'humberto Fernandes Lino 286', '(67) 9914-5465', '(67) 3387-6543', 'Ensino Medio', '2007', 'sim', 'MEI', '', 'EssÃªncia do Chocolate', 'um ano e tres meses', 'Confeitaria', '1.500 a 2000', '2.500', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(148, 24, 'Paulo Ricardo Taborga Galharte', 'panda.galharte@gmail.com', '25/05/1989', 'Masculino', 'Rua Dr Julio de Almeida N120', '(67) 99167-4209', '', 'Ensino Superior Incompleto', '2020', 'nÃ£o', 'MEI', '', '', '', '', '', '00,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-12 00:00:00'),
(149, 24, 'danilo de brito semprebon', 'danilodebrito1090@gmail.com', '15/10/1990', 'Masculino', 'rua tolueno 286', '(67) 99969-2848', '', 'Ensino Superior', '2016', 'nÃ£o', 'MEI', '', '', '', '', '', '5000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-13 00:00:00'),
(150, 18, 'Camila Chrystina Farias de Souza ', 'alunacams@gmail.com', '08/08/1996', 'Feminino', 'Rua da DivisÃ£o, 975 Jd. Parati casa 485', '(67) 99653-3625', '', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '2,0000', 'sim', 'Educa Mais Brasil', 'nÃ£o', '', 'sim', '2018-04-13 00:00:00'),
(151, 24, 'Odil Sntana Martins', 'odilsantana@hotmail.com', '22/01/1977', 'Masculino', 'Rua CÃ ceres, 52', '(67) 99935-2847', '(67) 3323-6400', 'Ensino Superior', '2010', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$ 2.000,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-13 00:00:00'),
(152, 24, 'Odil Santana Martins', 'odilsantana@hotmail.com', '22/01/1977', 'Masculino', 'Rua CÃ¡ceres, 52 ', '(67) 99935-2847', '(67) 3323-6400', 'Ensino Superior', '2010', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$ 2.000,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-13 00:00:00'),
(153, 17, 'Gabriel FranÃ§a de Abreu', 'gabriel-13@hotmail.com', '25/09/1991', 'Masculino', 'Euclides Souza Brito, 236', '(67) 99162-6363', '', 'Ensino Superior', '2014', 'sim', 'MEI', '', 'GFA SoluÃ§Ãµes em Engenharia ElÃ©trica', '2 anos', 'PrestaÃ§Ã£o de serviÃ§os elÃ©tricos', '5000,00', '5000,00', 'nÃ£o', '', 'sim', 'CREA - MS', 'sim', '2018-04-13 00:00:00'),
(154, 17, 'DÃªnis Andrade de Queiroz', 'denis.aq@msn.com', '21/04/1992', 'Masculino', 'papilon', '(67) 99116-7837', '', 'Ensino Superior', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '2500,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-13 00:00:00'),
(155, 7, 'DiÃ³genes ', 'jr.fisioterapeuta@hotmail.com', '29/07/1983', 'Masculino', 'Rua Vereador Aguiar de Souza', '(67) 99608-3343', '', 'Ensino Superior', '2006', 'sim', 'ME', '', 'D. Guadagnucci ServiÃ§os ', '5 meses', 'Fisioterapia', '1.800,00', '5.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-13 00:00:00'),
(156, 25, 'fabiana farias dos santos', 'fabiana@saojuliao.org.com.br', '17/07/1982', 'Feminino', 'Rua AbÃ­lio Siqueira', '(67) 99254-3384', '', 'Ensino Superior Incompleto', '2020', 'nÃ£o', 'MEI', '', '', '', '', '', '937,00', 'sim', 'VALE RENDA', 'nÃ£o', '', 'sim', '2018-04-13 00:00:00'),
(157, 17, 'LeticiaPeixoto De Azevedo', 'leticia_lega@hotmail.com', '17/03/1993', 'Feminino', 'rua nagem saad 41 monte alegre', '(67) 99140-9779', '(67) 3386-5461', 'Ensino Superior', '2015', 'nÃ£o', 'MEI', '', '', '', '', '', '1500 ', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-13 00:00:00'),
(158, 24, 'Geny Mendes pitaluga', 'Lpitaluga20@gmail.com', '30/01/1977', 'Feminino', 'Rua bonanÃ§a 87', '(67) 9283-8457', '', 'Ensino Medio', '1997', 'nÃ£o', 'MEI', '', '', '', '', '', '', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-13 00:00:00'),
(159, 24, 'Geny Mendes pitaluga', 'Lpitaluga20@gmail.com', '30/01/1977', 'Feminino', 'Rua bonanÃ§a 87', '(67) 9283-8457', '', 'Ensino Medio', '1997', 'nÃ£o', 'MEI', '', '', '', '', '', '', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-13 00:00:00'),
(160, 24, 'Waldemar dos santos da silva', 'Lpitaluga20@gmail.com', '12/08/1962', 'Masculino', 'Rua bonanÃ§a 87', '(67) 9283-8457', '', 'Ensino Fundamental', '1989', 'nÃ£o', 'MEI', '', '', '', '', '', '', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-13 00:00:00'),
(161, 24, 'roberto da gloria de oliveira', 'roberto_tatu00@hotmail.com', '23/08/1982', 'Masculino', 'rua antonio davi macedo nÂº250', '(67) 9165-4304', '(67) 8102-9626', 'Ensino Medio', '2010', 'nÃ£o', 'MEI', '', '', '', '', '', '1200', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-13 00:00:00'),
(162, 24, 'William Costa dos Santos', 'wccsantos@gmail.com', '18/08/1975', 'Masculino', 'Rua Aqgrinomia, 215', '(67) 9230-3113', '', 'Ensino Medio Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-13 00:00:00'),
(163, 17, 'Ricardo CÃ¢ndido Pereira', 'ricardolinck21@hotmail.com', '19/10/1983', 'Masculino', 'Rua AssunÃ§Ã£o Borba, 1221', '(67) 99688-3518', '(67) 99214-8882', 'Ensino Medio', '2004', 'nÃ£o', 'MEI', '', '', '', '', '', '2000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-14 00:00:00'),
(164, 18, 'Adriana da costa quintana', 'Adriana-quintana1@hotmail.com', '10/02/1995', 'Feminino', 'Rua guarai 920', '(67) 99299-9634', '(67) 3381-3934', 'Ensino Medio', '2012', 'nÃ£o', 'MEI', '', '', '', '', '', '1300', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-15 00:00:00'),
(165, 18, 'Luciana da costa quintana', 'luciana_aislan@hotmail.com', '17/12/19', 'Feminino', 'Rua Benedito Martins bravo 217 bairro aquarius', '(67) 99113-1453', '', 'Ensino Medio', '2008', 'nÃ£o', 'MEI', '', '', '', '', '', '937', 'sim', 'Bolsa famÃ­lia ', 'nÃ£o', '', 'nÃ£o', '2018-04-15 00:00:00'),
(166, 24, 'Maria Cristina de Oliveira ', 'm.cristina_oliveira@hotmai.com', '22/03/1985', 'Feminino', 'Rua Diva Ferreira 998 Bairro Tiradentes Campo Grande MS', '(67) 99251-6099', '', 'Ensino Medio', '2008', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-16 00:00:00'),
(167, 23, 'Priscila Palhanos', 'Pri.palhanos@gmail.com', '12/12/1992', 'Feminino', 'R. Pernambuco, N 455', '(67) 99348-8822', '', 'Ensino Superior', '2016', 'nÃ£o', 'MEI', '', '', '', '', '', '2500', 'nÃ£o', '', 'sim', 'AJE/MS LINKEDIN', 'sim', '2018-04-16 00:00:00'),
(168, 9, 'Maria De Lourdes Constantino da Silva ', 'mlcconstantino@hotmail.com ', '31/05/1962', 'Feminino', 'rua do seminÃ¡rio 505', '(66) 99991-5626', '', 'Ensino Medio', '2012', 'nÃ£o', 'MEI', '', '', '', '', '', '1.500', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-17 00:00:00'),
(169, 30, 'renato alex rodrigues colombo', 'renato-colombo@hotmail.com', '28/09/1979', 'Masculino', 'av jary mercante , 2551 - jd alvorada, tres lagoas, MS', '(17) 99716-1998', '(67) 3521-7000', '', '', 'nÃ£o', 'MEI', '', '', '', '', '', '1800,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-18 00:00:00'),
(170, 30, 'renato alex rodrigues colombo', 'renato-colombo@hotmail.com', '28/09/1979', 'Masculino', 'av jary mercante, 2551, jd alvorada, tres lagoas, MS', '(17) 99716-1998', '(67) 3521-7000', 'Ensino Superior', '2017', 'sim', 'EIRELI', '', 'biorad - diagnostico por imagem', '2meses', 'saÃºde', '2000,00', '1800,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-18 00:00:00'),
(171, 24, 'IVANETE DE ALMEIDA FELIX', 'ivanetefelix@gmail.com', '16/02/1964', 'Feminino', 'Rua Campo Grande, 95', '(67) 99103-4004', '', 'Ensino Superior', '2011', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$5.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-18 00:00:00'),
(172, 15, 'MÃ¡rcia Cristina. Freitas da Silva ', 'freitasesilva2015@gmail.com', '11/08/1969', 'Feminino', 'Rua JoÃ£o Silva 1297. Lapa', '(67) 99323-1716', '(67) 3521-8547', 'Ensino Superior', '2004', 'nÃ£o', 'MEI', '', '', '', '', '', '1.200.00', 'sim', 'Bolsa famÃ­lia', 'nÃ£o', '', 'sim', '2018-04-18 00:00:00'),
(173, 15, 'Reinaldo Monteiro de Campos Junior', 'reinaldo.monteiro.rm7@gmail.com', '08/09/1980', 'Masculino', 'R SEBASTIAO DOS SANTOS', '(67) 99965-2008', '', 'Ensino Superior', '', 'nÃ£o', 'MEI', '', '', '', '', '', '4.000,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-18 00:00:00'),
(174, 17, 'Andreia Santana da Silva', 'andreasantanas@outlook.com', '28/09/1975', 'Feminino', 'Rua: Ciriaco Maymone', '(67) 9974-2921', '(67) 3321-3563', 'Ensino Superior', '2011', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$ 3.200,00 reais', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-18 00:00:00'),
(175, 30, 'Anderson Almeida de Lima', 'julianadudu29@gmail.com', '20/07/1974', 'Masculino', 'Rua Bandeirantes', '(67) 99348-3794', '', 'Ensino Medio', '1992', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$1.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-19 00:00:00'),
(176, 23, 'maria aparecida francisco nery', 'mariadaisonnery@gmail.com.br', '22/03/1971', 'Feminino', 'bacaba coophatrabalho', '(67) 99201-7326', '', 'Ensino Fundamental Incompleto', '2017', 'nÃ£o', 'MEI', '', '', '', '', '', '930', 'sim', 'vale renda', 'nÃ£o', '', 'sim', '2018-04-19 00:00:00'),
(177, 30, 'Danieli de GÃ³is FranÃ§a ', 'Danielifrana@hotmail.com ', '01/08/1979', 'Feminino', 'Rua C,bairro:Nova trÃªs lagoas 2', '(67) 99601-7569', '(67) 99296-8857', 'Ensino Medio', '1998', 'nÃ£o', 'MEI', '', '', '', '', '', '1,000(mil reais)', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-19 00:00:00'),
(178, 23, 'Danilo B Bittar Antunes', 'danbittar@hotmail.com', '08/04/1993', 'Masculino', 'rua ana america', '(67) 98120-0818', '', 'Ensino Superior Incompleto', '', 'sim', 'MEI', '', 'ConstrueArte', '29/01/2015', 'ConstruÃ§Ã£o', '', '', 'nÃ£o', '', 'sim', 'Aje ', 'nÃ£o', '2018-04-19 00:00:00'),
(179, 30, 'Everton Henrique Candido', 'evertonhcandido@gmail.com', '18/04/1984', 'Masculino', 'Rua: Elmano Soares, 2100', '(67) 99184-8839', '(67) 3521-2009', 'Ensino Superior', '2007', 'nÃ£o', 'MEI', '', '', '', '', '', '2 salÃ¡rios', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-19 00:00:00'),
(180, 30, 'FÃ¡bio de Souza Mendes', 'fabio.desouza.mendes@gmail.com', '17/08/1985', 'Masculino', 'Rua Dalvino Alves Mariano, 1330 - SÃ£o Carlos', '(67) 99125-6461', '', 'Ensino Superior Incompleto', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$ 3.200,00', 'sim', 'PROUNI', 'nÃ£o', '', 'sim', '2018-04-19 00:00:00'),
(181, 9, 'Vangley Ortiz Do Nascimento ', 'vangleyortiz_tst74@outlook.com', '01/05/1974', 'Masculino', 'Rua america1598', '(67) 99845-1119', '(67) 3231-3596', 'Ensino Medio', '2000', 'nÃ£o', 'MEI', '', '', '', '', '', '2 salÃ¡rio minimos', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-20 00:00:00'),
(182, 33, 'JONIRCE LEMES DE CAMPOS', 'jonircelemes14@gmail.com', '03/07/1976', 'Feminino', 'JoÃ£o Afonso', '(67) 99947-5778', '', 'Ensino Superior Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '1.036', 'sim', 'Programa vale renda', 'nÃ£o', '', 'sim', '2018-04-20 00:00:00'),
(183, 15, 'ANGELA MARA FERNANDES DE ARAUJO', 'esquadriaevidracaria@gmail.com', '31/08/1982', 'Feminino', 'julio mancine 1211', '(67) 99868-3500', '(67) 3521-0718', 'Ensino Superior Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '1000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-20 00:00:00'),
(184, 34, 'JÃºlio CÃ©sar Pereira da Silva ', 'Juliodasib@hotmail.com', '15/11/1979', 'Masculino', 'Alameda joana darc nÃºmero 5', '(67) 99667-6679', '(67) 99667-6679', 'Ensino Medio', '2000', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-20 00:00:00'),
(185, 33, 'JÃºlio CÃ©sar Pereira da Silva ', 'Juliodasib@hotmail.com', '15/11/1979', 'Masculino', 'Alameda joana darc nÃºmero 5', '(67) 9967-6679', '(67) 99667-6679', 'Ensino Medio', '2000', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-20 00:00:00'),
(186, 30, 'BÃ¡rbara Fernanda Borgo ', 'Barbaraborgotl@hotmail.com', '09/02/1985', 'Feminino', 'Travessa Rouxinol', '(67) 99281-1486', '', 'Ensino Superior', '2012', 'sim', 'MEI', '', 'Pititicos Moda Infantil ', '16 meses', 'VestuÃ¡rio ', '4500', '1500', 'nÃ£o', '', 'sim', 'AssociaÃ§Ã£o comercial de TrÃªs Lagoas ', 'sim', '2018-04-20 00:00:00');
INSERT INTO `inscricao` (`id`, `turma_id`, `nome`, `email`, `data_nascimento`, `sexo`, `endereco`, `celular`, `telefone_fixo`, `escolaridade`, `data_conclusao_ano`, `possui_empresa_cnpj`, `porte_da_empresa`, `porte_da_empresa_outro`, `nome_da_empresa`, `tempo_de_abertura`, `ramo_de_atividade`, `faturamento_medio_da_empresa`, `renda_familiar_aproximada`, `cadastrado_beneficio_social`, `cadastrado_beneficio_social_qual`, `pertence_ou_associado`, `pertence_ou_associado_qual`, `possui_disponibilidade`, `data_da_inscricao`) VALUES
(187, 15, 'Elaine Cristina Barros', 'elaine.cbarros@hotmail.com', '15/03/1982', 'Feminino', 'Rua MarcÃ­lio Dias, 1367', '(67) 99917-3448', '(67) 3522-1749', 'Ensino Superior', '2010', 'nÃ£o', 'MEI', '', '', '', '', '', '6000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-20 00:00:00'),
(188, 30, 'Claudia Fernanda Sakai Barros', 'claudinha_sakai@hotmail.com', '27/09/1989', 'Feminino', 'Rua Izaura Ferreira, 1367, Vila Nova', '(67) 99124-5166', '', 'Ensino Superior', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '2100,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-20 00:00:00'),
(189, 30, 'Elaine Barros', 'gevitec@gmail.com', '14/03/1982', '', 'MarcÃ­lio Dias, 1367', '(67) 99917-3448', '', 'Ensino Superior', '2011', 'nÃ£o', 'MEI', '', '', '', '', '', '1600', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-20 00:00:00'),
(190, 30, 'Diva Sakai Barros', 'diva.sakai@hotmail.com', '04/08/1964', 'Feminino', 'Rua Izaura Ferreira, 2311, Vila Nova', '(67) 99184-4758', '', 'Ensino Medio', '1999', 'nÃ£o', 'MEI', '', '', '', '', '', '954,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-20 00:00:00'),
(191, 30, 'JOSÃ‰ ANTONIO DE FREITAS ALVES', 'joseantoniofreitasalves@gmail.com', '19/03/1980', 'Masculino', 'RUA JOAO CARRATO, 33', '(67) 99945-4054', '(67) 99123-1002', '', '', 'nÃ£o', 'MEI', '', '', '', '', '', '3000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-20 00:00:00'),
(192, 17, 'Mariane Dutra TuraÃ§a', 'turaca.m.d@gmail.com', '29/06/1994', 'Feminino', 'rua Dolores Dutran 1475, casa 10', '(67) 99135-0816', '', 'Ensino Superior', '2016', 'nÃ£o', 'MEI', '', '', '', '', '', '1.000,00', 'sim', 'Id Jovem', 'nÃ£o', '', 'sim', '2018-04-20 00:00:00'),
(193, 17, 'Mariane Dutra TuraÃ§a ', 'turaca.m.d@gmail.com', '29/06/1994', 'Feminino', 'Rua Dolores Duran, 1475 Casa 110', '(67) 99135-0816', '', 'Ensino Superior', '2016', 'nÃ£o', 'MEI', '', '', '', '', '', '600,00', 'sim', 'Id Jovem ', 'sim', 'AJE/MS', 'sim', '2018-04-20 00:00:00'),
(194, 30, 'SUELEN LOPES DE MARIA YAMASSAKI', 'suelenlopes.yamassaki@gmail.com', '19/12/1983', 'Feminino', 'POSSIDÃ”NIO JOSÃ‰ DE SOUZA, 473', '(67) 98117-5117', '(67) 3521-0168', 'Ensino Superior', '2005', 'sim', 'MEI', '', 'ORGANIZE SOB MEDIDA', '6 MESES', 'ORGANIZAÃ‡ÃƒO', '', 'R$ 6.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-20 00:00:00'),
(195, 30, 'Jaqueline de Souza Santos', 'jaque-ursula@hotmail.com', '30/04/1986', 'Feminino', 'Rua JoÃ£o Silva', '(67) 99259-7879', '', 'Ensino Superior', '', 'nÃ£o', 'MEI', '', '', '', '', '', '2800,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-21 00:00:00'),
(196, 24, 'Wilson bellincanta', 'wilsonbellincanta@hotmail.com', '24/06/1980', 'Masculino', 'Av marechal Floriano 1521', '(67) 99981-4811', '', 'Ensino Superior', '2003', 'sim', 'ME', '', 'Wilson J B bellincanta ', '10 anos', 'ClÃ­nica odontolÃ³gica ', '15mil', '15 mil', 'nÃ£o', '', 'sim', 'Aje acicg', 'sim', '2018-04-22 00:00:00'),
(197, 7, 'Micheli Mondini klein ', 'micheliklein1@hotmail.com', '11/11/1986', 'Feminino', 'Rua tamoios 130', '(67) 99648-1568', '(67) 3451-2595', 'Ensino Superior Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '3000', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-22 00:00:00'),
(198, 17, 'WoniÃª D&#39;Augusta Pereira da Silva', 'woniesilva@gmail.com', '08/05/1971', 'Feminino', 'Rua Coronel Salustiano Lima,787 - Tiradentes', '(67) 99152-0886', '(67) 99602-4120', 'Ensino Medio', '2011', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$780,00', 'sim', 'Vale Renda', 'nÃ£o', '', 'sim', '2018-04-23 00:00:00'),
(199, 24, 'asdasd', 'asdasdasd@asdasd.com', '12/31/2312', '', 'dasdasda', '(12) 3123-123', '', 'Ensino Medio', '', 'nÃ£o', 'MEI', '', '', '', '', '', '', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-23 00:00:00'),
(200, 33, 'CLAUDIONOR GIL DA SILVA', 'lojadoporto01@gmail.com', '28/06/1984', 'Masculino', 'ruamanoel cavassa 61', '(67) 99943-0928', '(67) 3232-6178', 'Ensino Medio', '2010', 'sim', 'ME', '', 'claudionor gil da silva me', '02 meses', 'comercio', '10.000,00', '3000.', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-23 00:00:00'),
(201, 33, 'MAIARA LAIS LOPES', 'ricardosamaniego@bol.com.br', '28/01/1986', 'Feminino', 'REPUBLICA DA BOLIVIA, 20', '(67) 99921-4764', '', 'Ensino Medio', '2006', 'sim', 'MEI', '', 'maiara lais empreedimentos', '4meses ', 'lanchonetes ', '1500', '2000', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-23 00:00:00'),
(202, 35, 'RICARDO DIAS SAMANIEGO', 'ricardosamaniego@bol.com.br', '11/09/1983', 'Masculino', 'REPUBLICA DA BOLIVIA, 20', '(67) 9921-4764', '', 'Ensino Superior Incompleto', '2011', 'nÃ£o', 'MEI', '', '', '', '', '', '2000', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-23 00:00:00'),
(203, 30, 'Natalia Teixeira Fidelis Silva', 'na.fidelis@hotmail.com', '06/08/1993', 'Feminino', 'Av jamil jorge salomao, 3000, k28', '(67) 99251-9280', '', 'Ensino Superior', '2012', 'nÃ£o', 'MEI', '', '', '', '', '', '1500,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-23 00:00:00'),
(204, 30, 'Nelson Gomes de Sa Neto', 'Neto.desa@hotmail.com', '29/08/1981', 'Masculino', 'R. Jorge Elias Seba, 2259', '(67) 99187-6874', '', 'Ensino Medio', '2000', 'nÃ£o', 'MEI', '', '', '', '', '', '1500,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-23 00:00:00'),
(205, 30, 'PRISCILA CRISTINA DA SILVA PREGENTINO', 'priscilapregentino06@hotmail.com', '24/08/1989', 'Feminino', 'RUA MANOEL PEDRO DE CAMPOS', '(67) 99302-8238', '(67) 3919-1400', 'Ensino Superior', '2015', 'nÃ£o', 'MEI', '', '', '', '', '', '2200', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(206, 30, 'Roger Augusto de AssunÃ§Ã£o Santana', 'roger_augusto_@hotmail.com', '09/09/1992', 'Masculino', 'Viela Roberto Amado, nÂ° 2476 Jardim Primaveril', '(67) 99958-5888', '', '', '', 'nÃ£o', 'MEI', '', '', '', '', '', '2 salÃ¡rios ', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(207, 9, 'Suelen Victorio Paz', 'suelen.victorio@hotmail.com', '10/10/1982', 'Feminino', 'Rua:Ladario 1188 casa 01', '(67) 99670-9900', '(67) 3231-6110', 'Ensino Medio', '1999', 'nÃ£o', 'MEI', '', '', '', '', '', '1.554', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-24 00:00:00'),
(208, 34, 'Elizeth de olvieira rodrigues', 'cristianocrvg1@gmail.com', '04/04/1976', 'Feminino', 'Tiradentes nÂ°9', '(67) 99637-2354', '', 'Ensino Fundamental Incompleto', '2000', 'nÃ£o', 'MEI', '', '', '', '', '', '6000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(209, 34, 'Suelen Victorio Paz', 'suelen.victorio@hotmail.com', '10/10/1982', 'Feminino', 'Rua: Ladario 1188 casa 01', '(67) 99670-9900', '(67) 3231-6110', 'Ensino Medio', '1999', 'nÃ£o', 'MEI', '', '', '', '', '', '1.554', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-24 00:00:00'),
(210, 34, 'Valquiria Maria Espinoza Brasil', 'valquiriabrasilms@hotmail.com', '05/09/1988', 'Feminino', 'ALAMEDA ACARÃ, 19', '(67) 99918-6207', '(67) 3233-3494', 'Ensino Superior', '2017', 'sim', 'MEI', '', 'Cantinho das variedades e DiversÃµes V&F', '10 meses', 'LocaÃ§Ã£o de brinquedos para eventos, festas, dentre outros', '2000,00', '2850,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(211, 9, 'Mariely R de Oliveira Gomes ', 'marielyadm@gmail.com', '01/05/1983', 'Feminino', 'R TomÃ© Leite GalvÃ£o 18', '(67) 9638-2423', '(67) 3226-2862', 'Ensino Superior Incompleto', '2020', 'nÃ£o', 'MEI', '', '', '', '', '', '3500', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(212, 9, 'Jorcilene Moraes da Silva', 'jorcilenesavio@gmail.com', '20/03/1986', 'Feminino', 'Rua:SÃ£o Paulo nÃºmero 3 bairro: Cristo Redentor  ', '(67) 99858-9431', '', 'Ensino Medio', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '800', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(213, 9, 'Darcy Bruno Manjon', 'dbmanjon@hotmail.com', '04/01/65', 'Feminino', 'Rua presidente joÃ£o goulart ', '(67) 99959-1983', '(67) 3226-2175', 'Ensino Medio', '1994', 'nÃ£o', 'MEI', '', '', '', '', '', '1 salario minimo', 'sim', 'municipal', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(214, 34, 'willian de arruda e silva', 'billy_willian@hotmail.com', '15/08/1993', 'Masculino', 'Alameda militar N51 bairro: dom bosco', '(67) 99643-2873', '', 'Ensino Medio Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '2.500', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(215, 35, 'willian de arruda e silva', 'billy_willian@hotmail.com', '15/08/1993', 'Masculino', 'Alameda militar N51 bairro: dom bosco', '(67) 99643-2873', '', 'Ensino Medio Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '2.500', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(216, 9, 'Cleber Martins da Silva ', 'cleber-ms@hotmail.com', '07/02/1984', 'Masculino', 'JosÃ© fragele 24 guanÃ£2', '(67) 9627-3009', '', 'Ensino Superior Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '1800', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(217, 15, 'Lucas Queiroz dos Santos', 'lucas.santostls1@gmail.com', '24/05/1991', 'Masculino', 'Rua das Flores 10', '(67) 9273-9529', '(67) 99173-8942', 'Ensino Medio', '2010', 'nÃ£o', 'MEI', '', '', '', '', '', '3000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(218, 15, 'Fernanda InÃ¡cio de Jesus Queiroz', 'fer.jesus1994.fj@gmail.conm', '15/10/1994', 'Feminino', 'Rua das Flores 10', '(67) 99173-8942', '(67) 99273-9529', 'Ensino Superior Incompleto', '2020', 'nÃ£o', 'MEI', '', '', '', '', '', '3000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(219, 30, 'Lucas OtÃ¡vio de souza', 'dlucasotavio08@gmail.com', '08/02/2000', 'Masculino', 'Rua Diogenes de Lima n 265 jardim Dourados', '(67) 9309-7209', '', 'Ensino Medio', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '1000', 'sim', 'Bpc', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(220, 15, 'JÃºlio Messias Domingues Pimentel', 'Juliogalego20@gmail.com', '14/05/2001', 'Masculino', 'Rua Diogenes de Lima n265 jardim dourados', '(67) 9349-9403', '', 'Ensino Medio', '2018', 'nÃ£o', 'MEI', '', '', '', '', '', '1000', 'sim', 'Bpc', 'nÃ£o', '', 'nÃ£o', '2018-04-24 00:00:00'),
(221, 24, 'SERGIO JOBA', 'jobasj@bol.com.br', '16/10/1955', 'Masculino', 'RUA ZACARIAS DE PAULA NANTES, 964', '(67) 99154-2064', '(67) 3385-5023', 'Ensino Superior Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '3.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(222, 9, 'Aparecida Conche', 'appmms@hotmail.com', '08/07/1969', 'Feminino', 'Rua CÃ¡ceres, 900, bairro universitÃ¡rio', '(67) 99973-1701', '(', 'Ensino Medio', '1988', 'sim', 'MEI', '', 'Bellasunhas', '2016', 'Cabeleireira e manicure', '', '2.200,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(223, 34, 'Viviane Fonseca Moreira', 'vivoca13@gmail.com', '13/10/1977', 'Feminino', 'Rua joaquim Murtinho, 1790 casa 02', '(67) 99876-5075', '(67) 3231-9859', 'Ensino Superior', '2000', 'nÃ£o', 'MEI', '', '', '', '', '', '3.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(224, 34, 'NIELLY RAYANE DE ARRUDA GOMES', 'niellyarrudagomes@gmail.com', '21/11/1991', 'Feminino', 'Rua Edu Rocha, 56', '(67) 99646-2261', '', 'Ensino Superior Incompleto', '2020', 'nÃ£o', 'MEI', '', '', '', '', '', '1.600,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(225, 30, 'Sakai Fujii Junior', 'sakaifujii@icloud.com', '13/08/1980', 'Masculino', 'R. Manoel Pedro de Campos,', '(67) 99677-0801', '', 'Ensino Superior Incompleto', '2023', 'nÃ£o', 'MEI', '', '', '', '', '', '2500,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(226, 30, 'LUZIANE VILHALVA DE FREITAS ', 'Lluzianevilhalva@hotmail.com', '21/08/1995', 'Feminino', 'Elvirio MÃ¡rio Mancini ', '(67) 99138-8568', '', 'Ensino Medio', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '940', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-24 00:00:00'),
(227, 24, 'Fernanda Aparecida Maia', 'nandaninmaia@gmail.com', '08/11/1979', 'Feminino', 'Rua 38,NÂ°253 Vila Nova Campo Grande', '(67) 99975-0989', '', 'Ensino Superior', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '5250,00', 'nÃ£o', '', 'sim', 'Conselho Regional de Contabilidade - MS', 'sim', '2018-04-24 00:00:00'),
(228, 24, 'Josimar Romeiro da Silva', 'josimar.romeirodasilva@gmail.com', '26/10/1987', 'Masculino', 'Rua 38, NÂ° 253 Vila Nova Campo Grande', '(67) 99254-8558', '', '', '', 'nÃ£o', 'MEI', '', '', '', '', '', '5250,00', 'nÃ£o', '', 'sim', 'Conselho Regional de Engenharia e Agronomia - MS', 'nÃ£o', '2018-04-24 00:00:00'),
(229, 15, 'Jeniffer GonÃ§alves do nascimento', 'Jheny.dy@gmail.com', '11/01/1990', 'Feminino', 'Cond Maria Meireles blc 13 apt 203', '(67) 99300-9475', '', 'Ensino Medio', '2008', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'sim', 'Bolsa famÃ­lia', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(230, 9, 'Lenice Mantero de Jesus', 'Leniceturismo@gmail.com', '26/06/1968', 'Feminino', 'Rua LadÃ¡rio, 657', '(67) 99907-4952', '(67) 3231-1636', 'Ensino Superior Incompleto', '2003', 'nÃ£o', 'MEI', '', '', '', '', '', '1200,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-24 00:00:00'),
(231, 18, 'rafael wilmar dauria martins ribeiro', 'rafaeldauria85@hotmail.com', '19/12/1985', 'Masculino', 'rua do marco, nÂº 1309', '(67) 99129-9303', '', 'Ensino Superior', '', 'sim', 'Outro', 'sociedade simples', 'medeiros e dauria advogados associados', '01 ano', 'advocacia', '10.000,00', '3.000,00', 'nÃ£o', '', 'sim', 'empresarial', 'nÃ£o', '2018-04-24 00:00:00'),
(232, 30, 'Emanuel Gouveia Maiato', 'emanuelmaiato@gmail.com', '20/12/1977', 'Masculino', 'Rua AntÃ´nio Dias,865, casa 2- Santa Terezinha', '(67) 99352-0880', '', 'Ensino Medio', '2001', 'nÃ£o', 'MEI', '', '', '', '', '', 'R$ 2000,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-24 00:00:00'),
(233, 34, 'Eduardo Maciel Duarte de Araujo', 'macieleduardo7@gmail.com', '21/02/1998', 'Masculino', 'Ricardo GuimarÃ£es ', '(67) 99610-1093', '', 'Ensino Medio', '', 'nÃ£o', 'MEI', '', '', '', '', '', '', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-24 00:00:00'),
(234, 30, 'Michele Souza da Silva', 'bruno.silva@eldoradobrasil.com.br', '27/06/1989', 'Feminino', 'Rua: TheÃ´tonio Pimentel Mendes', '(67) 9828-8521', '(67) 3524-1490', 'Ensino Superior', '2009', 'nÃ£o', 'MEI', '', '', '', '', '', '3800,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-24 00:00:00'),
(235, 30, 'NATANAEL JOABE DA SILVA ROCHA', 'lila022011@hotmail.com', '29/04/2002', 'Masculino', 'RUA AUGUSTO CORREA COSTA', '(67) 9826-4092', '(18) 99770-3302', 'Ensino Medio', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '$500,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-25 00:00:00'),
(236, 30, 'ELISANGELA MATIAS DA SILVA ROCHA', 'lila022011@hotmail.com', '06/07/1979', 'Feminino', 'RUA AUGUSTO CORREA COSTA', '(67) 9826-4092', '(18) 99770-3302', 'Ensino Superior', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '$500,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-25 00:00:00'),
(237, 15, 'ELISANGELA MATIAS DA SILVA ROCHA', 'lila022011@hotmail.com', '06/07/1979', 'Feminino', 'RUA AUGUSTO CORREA COSTA', '(67) 9826-4092', '(18) 99728-3913', 'Ensino Superior', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-25 00:00:00'),
(238, 31, 'ELISANGELA MATIAS DA SILVA ROCHA', 'lila022011@hotmail.com', '06/07/1979', 'Feminino', 'RUA AUGUSTO CORREA COSTA', '(67) 9826-4092', '(18) 99770-3302', 'Ensino Superior', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '$500,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-25 00:00:00'),
(239, 32, 'ELISANGELA MATIAS DA SILVA ROCHA', 'lila022011@hotmail.com', '06/07/1979', 'Feminino', 'RUA AUGUSTO CORREA COSTA', '(67) 9826-4092', '(18) 99770-3302', 'Ensino Superior', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '$500,00', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-25 00:00:00'),
(240, 28, 'LETICIA GODOY BIAGATAO', 'leticiagbig@hotmail.com', '05/08/1993', 'Feminino', 'PEDRO JOSE TAVARES', '(67) 99919-6993', '', 'Ensino Superior', '2017', 'sim', 'MEI', '', 'Sogni d&#39;oro doceria', '9 meses', 'doces', '', '2000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(241, 9, 'Mayara carvalho da Silva', 'MAYARA.CARVALHO.SILVA02@GMAIL.COM', '02/01/1993', 'Feminino', 'Alameda riachuelo bairro centro america n 36', '(67) 99803-3385', '', 'Ensino Medio Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-25 00:00:00'),
(242, 9, 'Yasmin Veterano De Aquino', 'Jasmin_rrf@outlook.com', '28/09/1997', 'Feminino', 'Alameda Catarina - Bairro Popular Nova', '(67) 99931-9513', '', 'Ensino Medio', '2016', 'nÃ£o', 'MEI', '', '', '', '', '', '1.200', 'sim', 'Bolsa de Estudo Integral', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(243, 34, 'Mayara carvalho da Silva', 'MAYARA.CARVALHO.SILVA02@GMAIL.COM', '02/01/1993', 'Feminino', 'Alameda riachuelo bairro centro america n36', '(67) 99803-3385', '', 'Ensino Medio Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-25 00:00:00'),
(244, 24, 'Marcelo Duarte', 'marceloduarteduarte6@gmail.com', '05/08/1977', 'Masculino', 'Rua ajuana n 688', '(67) 99258-5832', '(67) 3391-1819', 'Ensino Medio Incompleto', '2008', 'nÃ£o', 'MEI', '', '', '', '', '', 'SalÃ¡rio mÃ­nimo', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(245, 34, 'DAVID RODRIGUES SARAIVA', 'davidsaraiva198@gmail.com', '27/06/1997', 'Masculino', 'Rua Dom Aquino nÂº 3167 - Dom Bosco', '(67) 99848-0921', '', 'Ensino Medio', '2014', 'nÃ£o', 'MEI', '', '', '', '', '', '1.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(246, 9, 'PATRICIA COSTA NOGUEIRA', 'PATYCOSTANOG@HOTMAIL.COM', '05/10/1981', 'Feminino', 'ALAMEDA ILZA NÂº 72 - DOM BOSCO', '(67) 99839-7097', '', 'Ensino Superior Incompleto', '2011', 'sim', 'MEI', '', 'SOS DIARISTA', '2016', 'PRESTAÃ‡ÃƒO DE SERVIÃ‡O', '0,00', '2.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(247, 9, 'EVELYN ARIAS PEREIRA NECO', 'E.ARIAS.PN@GMAIL.COM', '09/03/1991', 'Feminino', 'ALAMEDA RENER NÂº20 - DOM BOSCO', '(67) 99649-7071', '(67) 3231-9497', 'Ensino Medio', '2015', 'nÃ£o', 'MEI', '', '', '', '', '', '1.200,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(248, 9, 'RINALDO CUNHA DURAN', 'adsumus84@hotmail.com', '24/11/1975', 'Masculino', 'RUA GERALDINO MARTINS DE BARROS NÂº 1283 - CENTRO AMÃ‰RICA', '(67) 99228-0297', '(67) 3232-6672', 'Ensino Medio', '2008', 'sim', 'MEI', '', 'DU FRANGO', '7 MESES', 'CHURRASQUEIRO EM DOMICÃLIO', '1.300,00', '1.300,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(249, 34, 'HEULER HERNANY CORREA ', 'heuler.hc@gmail.com', '29/01/1995', 'Masculino', 'RUA AMÃ‰RICA NÂº 288 - CENTRO', '(67) 99686-4016', '(67) 98172-4280', 'Ensino Medio', '2013', 'nÃ£o', 'MEI', '', '', '', '', '', '2.500,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(250, 9, 'Aparecida Conche', 'appmms@hotmail.com', '08/07/1969', 'Feminino', 'Rua CÃ¡ceres, 900, bairro universitÃ¡rio', '(67) 99973-1701', '', 'Ensino Medio', '1989', 'sim', 'MEI', '', 'Bellasunhas', '', 'Cabeleireira e manicure', '', '2.200,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(251, 30, 'Fernando Sgarbi de Brito', 'Fernandosb_2012@hotmail.com', '19/08/1980', 'Masculino', 'Rua Elmano Soares 1605 Centro', '(67) 99277-1374', '(67) 3522-6526', 'Ensino Superior', '2003', 'sim', 'MEI', '', 'ID Identidade Visual', '2 meses', 'ComunicaÃ§Ã£o Visual', 'R$ 2000', 'R $ 4000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(252, 24, 'Fabricia Meira Gouvea', 'fabricia.gouveia@hotmail.com', '30/08/1984', 'Feminino', 'Spipe Calarge', '(67) 99106-4285', '(67) 3342-7162', 'Ensino Fundamental', '2000', 'nÃ£o', 'MEI', '', '', '', '', '', '2.000', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-25 00:00:00'),
(253, 18, 'Fabricia Meira Gouvea', 'fabricia.gouveia@hotmail.com', '30/08/1984', 'Feminino', 'Spipe Calarge', '(67) 99106-4285', '(67) 3342-7162', 'Ensino Fundamental', '2000', 'nÃ£o', 'MEI', '', '', '', '', '', '2.000', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-25 00:00:00'),
(254, 30, 'Andriely Correa de Oliveira', 'andriely.correa_@hotmail.com', '21/01/2000', 'Feminino', 'Rua 36 casa 60 Vila Piloto 5', '(67) 99160-1478', '(67) 3521-1889', 'Ensino Medio Incompleto', '2017', 'nÃ£o', 'MEI', '', '', '', '', '', '1.200 reais', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(255, 30, 'Andriara De Oliveira MendonÃ§a ', 'andriara.oliveira_@hotmail.com', '27/11/1999', 'Feminino', 'Rua:34 nÂ°111 Vila Piloto 5', '(67) 99259-3483', '(67) 3521-7698', 'Ensino Medio', '2016', 'nÃ£o', 'MEI', '', '', '', '', '', '1 SalÃ¡rio mÃ­nimo ', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(256, 9, 'Migdonia Clementina Noguera Arzamendia Penha', 'migdonianoguera@hotmail.com', '23/01/1971', 'Feminino', 'Rua Afonso Pena 1123 LadÃ¡rio santo AntÃ´nio', '(67) 99843-1256', '(67) 3231-3511', 'Ensino Superior', '2012', 'nÃ£o', 'MEI', '', '', '', '', '', '35000$', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-25 00:00:00'),
(257, 34, 'Daphiny Grazielli Ferreira Romero', 'daphiny_.romero@hotmail.com', '19/06/1995', 'Feminino', 'Rua ParanÃ¡ ', '(67) 99904-5570', '(67) 3231-9781', 'Ensino Medio', '2016', 'nÃ£o', 'MEI', '', '', '', '', '', '1800', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-26 00:00:00'),
(258, 34, 'Edney JosÃ© de Medeiros Fernandes', 'edney_.medeiros@hotmail.com', '02/10/1993', 'Masculino', 'Rua ParanÃ¡ ', '(67) 99635-4175', '(67) 3231-9010', 'Ensino Fundamental Incompleto', '2017', 'nÃ£o', 'MEI', '', '', '', '', '', '1800', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-04-26 00:00:00'),
(259, 9, 'DEVANDRO CARVALHO ROJAS', 'DEROJAS.31@YAHOO.COM', '17/07/1986', 'Masculino', 'RUA JOSE MACIEL DE BARROS  CASA 10 ; CONJUNTO GUANÃƒ', '(67) 99655-3528', '', 'Ensino Fundamental', '2001', 'nÃ£o', 'MEI', '', '', '', '', '', '1.000.00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-26 00:00:00'),
(260, 9, 'EDNA ALPIRES VALENTIM SILVA', 'ednaalpires12366@gmail.com', '13/03/1981', 'Feminino', 'rua gonÃ§alves dias 86 ; aeroporto', '(67) 99858-7841', '(67) 3231-1428', 'Ensino Medio', '2004', 'sim', 'MEI', '', 'EDNA ALPIRES VALENTIM SILVA', '8 MESES', 'ROUPAS E ACESSÃ“RIOS', '1.200.00', '3.000.00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-26 00:00:00'),
(261, 9, 'VICTOR DE OLIVEIRA', 'edineiakill@hotmail.com', '22/11/1985', 'Masculino', 'RUA ANTONIO MARIA 897', '(67) 9655-1761', '(67) 3232-2218', 'Ensino Medio', '2004', 'nÃ£o', 'MEI', '', '', '', '', '', '1.500,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-26 00:00:00'),
(262, 9, 'EDNEIA SOUZA DA SILVA', 'neia.rondon79@gmail.com', '20/04/1979', 'Feminino', 'RUA MONTE CASTELO LOTE 09', '(67) 99812-5912', '(67) 2323-983', 'Ensino Medio', '2008', 'sim', 'MEI', '', 'EDNEIA SOUZA DA SILVA', '1 mes', 'vestuÃ¡rios e acessÃ³rios', '800reais', '1500reais', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-26 00:00:00'),
(263, 15, 'SÃ¢mia de Castro haidamus', 'samiadecastro@gmail.com', '14/05/1983', 'Feminino', 'Rua Alceu Silva 386', '67992303144', '', 'Ensino Superior', '2014', 'sim', 'MEI', '', 'SÃ¢mia de Castro Beleza e bem-estar', 'Aprox. 2 anos', 'Depilacao', '6000', '2000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-26 00:00:00'),
(264, 34, 'Kelly Carolayne Antelo da Costa', 'kellly.karolayne55@gmail.com', '15/03/1996', 'Feminino', 'Quadra 10 N19', '(67) 99858-6885', '', 'Ensino Superior Incompleto', '', 'nÃ£o', 'MEI', '', '', '', '', '', '1000', 'sim', 'Bolsa Familia', 'nÃ£o', '', 'sim', '2018-04-26 00:00:00'),
(265, 9, 'Luan Aparecido Pereira Soares', 'luanaparecidofla8@gmail.com', '28/01/2001', 'Masculino', 'Rua Dom Aquino NÂ°255 fundo', '(67) 99922-3605', '(67) 3232-3778', 'Ensino Medio Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '2 salÃ¡rios mÃ­nimos', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-26 00:00:00'),
(266, 9, 'Carlos Gabriel Ribeiro Coelho', 'gabrielflaribeiro2015@gmail.com', '10/02/2000', 'Masculino', 'Rua Celestial Qd 35 LT 30 Maria Leite', '(67) 99801-0340', '', 'Ensino Medio', '2016', 'nÃ£o', 'MEI', '', '', '', '', '', '2 salÃ¡rios mÃ­nimos', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-26 00:00:00'),
(267, 9, 'EDUARDO PEREIRA MARCIAL', 'dudumultlanches@gmail.com', '13/10/1970', 'Masculino', 'Rua 21 de Setembro nÂº2362 - Nossa Senhora de FÃ¡tima', '(67) 98428-9246', '(67) 3233-3382', 'Ensino Medio Incompleto', '1990', 'sim', 'MEI', '', 'Lanchonete Mult Lanches', '06 DIAS', 'ProprietÃ¡rio de Lanchonete', '2.000,00', '2.000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-26 00:00:00'),
(268, 30, 'Kethelen kawany da Silva souza', 'kethelenkawany.3ls@hotmail.com', '02/05/1998', 'Feminino', 'Rua: Carlos leituga Bairro: Jardim planalto', '(67) 99193-0087', '(67) 3524-0656', 'Ensino Medio', '2017', 'nÃ£o', 'MEI', '', '', '', '', '', 'Um salÃ¡rio mÃ­nimo ', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-27 00:00:00'),
(269, 32, 'Kethelen kawany da Silva souza', 'kethelenkawany.3ls@hotmail.com', '02/05/1998', 'Feminino', 'Rua: Carlos leituga Bairro: Jardim planalto', '(67) 99193-0087', '(67) 3524-0656', 'Ensino Medio', '2017', 'nÃ£o', 'MEI', '', '', '', '', '', 'Um salÃ¡rio mÃ­nimo ', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-04-27 00:00:00'),
(270, 24, 'Caroline Merlo', 'carolemerlomidia@gmail.com', '06/12/1993', 'Feminino', 'Rua Boaventura da Silva, 545 ', '(67) 99802-8428', '', 'Ensino Superior', '2014', 'sim', 'MEI', '', 'MerlÃ´ Studio Criativo', '6 meses', 'ProduÃ§Ã£o audiovisual/Marketing', '', '5 mil', 'nÃ£o', '', 'sim', 'AJE MS', 'sim', '2018-04-27 00:00:00'),
(271, 17, 'Alexander Ortiz do Carmo Bueno', 'alexandero.cbueno2@gmail.com', '08/06/1997', 'Masculino', 'Av. Afonso Pena,2515', '(67) 99276-5399', '', 'Ensino Medio', '2015', 'nÃ£o', 'MEI', '', '', '', '', '', '1500', 'nÃ£o', '', 'nÃ£o', '', 'nÃ£o', '2018-05-02 00:00:00'),
(272, 9, 'NatÃ¡lia da Cruz Leite', 'arquitetura.cruz@gmail.com', '06/09/1987', 'Feminino', 'rua cabral n 1458', '(67) 99608-9060', '(67) 99608-9060', 'Ensino Superior', '2011', 'nÃ£o', 'MEI', '', '', '', '', '', '4000', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-05-02 00:00:00'),
(273, 9, 'SONILEY DA SILVA SOUZA', 'sonileysilva@hotmail.com', '27/10/1978', 'Feminino', 'Alameda C NÂº 86 - Conjunto KadwÃ©us', '(67) 99902-0252', '(67) 3233-2960', 'Ensino Medio', '2016', 'sim', 'MEI', '', 'Sony CorumbÃ¡', '3 anos', 'Vendedora de CosmÃ©ticos e roupas', '3.000,00', '2.800,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-05-02 00:00:00'),
(274, 9, 'FRANCISCA GARCIA DA SILVA', 'AMORPEIXE@HOTMAIL.COM', '10/03/1987', 'Feminino', 'AVENIDA PERIMETRAL   NÂ° 425', '(67) 99860-9105', '', 'Ensino Medio', '2008', 'nÃ£o', 'MEI', '', '', '', '', '', '965,00', 'nÃ£o', '', 'sim', 'PROJETO AMOR PEIXE', 'sim', '2018-05-03 00:00:00'),
(275, 34, 'RUBENS LUIZ DIASORTIZ', 'JULIE28WG@HOTMAIL.COM', '10/06/1976', 'Masculino', 'RUA BARAO DE MELGAÃ‡O NÂ°87', '(67) 99906-2683', '', '', '', 'sim', 'MEI', '', 'GWJ PUBLICIDADE ESONORIZAÃ‡ÃƒO', '5 ANOS', 'SONORIZAÃ‡ÃƒO', '5,000,00', '5,000,00', 'nÃ£o', '', 'nÃ£o', '', 'sim', '2018-05-03 00:00:00'),
(276, 34, 'JONIRCE LEMES DE CAMPOS', 'jonircelemes14@gmail.com', '03/07/1976', 'Feminino', 'Rua JoÃ£o Afonso, 62', '(67) 99947-5778', '', 'Ensino Superior Incompleto', '2019', 'nÃ£o', 'MEI', '', '', '', '', '', '1,300', 'sim', 'Vale renda', 'nÃ£o', '', 'sim', '2018-05-03 00:00:00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turmas`
--

CREATE TABLE `turmas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(120) DEFAULT NULL,
  `cidade` varchar(120) DEFAULT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `horario` varchar(120) DEFAULT NULL,
  `data_criacao_turma` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `turmas`
--

INSERT INTO `turmas` (`id`, `titulo`, `cidade`, `data_inicio`, `data_fim`, `horario`, `data_criacao_turma`) VALUES
(25, 'CAMPO GRANDE - INTEGRAL', 'Campo Grande', '2018-08-03', '2018-08-04', 'Sexta:18:30 ás 22:30 Sábado:07:30 ás 11:30 | 13h ás 18h', '2018-03-29'),
(24, 'CAMPO GRANDE - NOTURNO', 'Campo Grande', '2018-07-31', '2018-08-02', '18:30 ás 22h30', '2018-03-29'),
(23, 'CAMPO GRANDE - DIURNO', 'Campo Grande', '2018-07-31', '2018-08-02', '07:30 ás 11h30', '2018-03-29'),
(28, 'DOURADOS - NOTURNO', 'Dourados', '2018-08-07', '2018-08-09', '18:30 ás 22:30', '2018-03-20'),
(7, 'DOURADOS - DIURNO', 'Dourados', '2018-05-15', '2018-05-17', '07:30 ás 11:30', '2018-03-20'),
(27, 'DOURADOS - NOTURNO', 'Dourados', '2018-05-15', '2018-05-17', '18:30 ás 22:30', '2018-03-20'),
(9, 'CORUMBÁ - DIURNO', 'Corumba', '2018-05-28', '2018-05-30', '07:30 ás 11:30', '2018-03-20'),
(33, 'CORUMBÁ - NOTURNO', 'Corumba', '2018-10-02', '2018-10-04', '18:30 ás 22:30', '2018-03-20'),
(34, 'CORUMBÁ - NOTURNO', 'Corumba', '2018-05-28', '2018-05-30', '18:30 ás 22:30', '2018-03-20'),
(30, 'TRÊS LAGOAS - NOTURNO', 'Tres Lagoas', '2018-05-28', '2018-05-30', '18:30 às 22:30', '2018-03-20'),
(31, 'TRÊS LAGOAS - NOTURNO', 'Tres Lagoas', '2018-08-21', '2018-08-23', '07:30 às 11:30', '2018-03-20'),
(15, 'TRÊS LAGOAS - DIURNO', 'Tres Lagoas', '2018-05-28', '2018-05-30', '07:30 às 11:30', '2018-03-20'),
(17, 'CAMPO GRANDE - DIURNO', 'Campo Grande', '2018-05-08', '2018-05-10', '07:30 às 11:30', '2018-03-20'),
(18, 'CAMPO GRANDE - NOTURNO', 'Campo Grande', '2018-05-08', '2018-05-10', '18:30 às 22:30', '2018-03-20'),
(26, 'CAMPO GRANDE - INTEGRAL', 'Campo Grande', '2018-08-10', '2018-08-11', 'Sexta:18:30 ás 22:30 Sábado:07:30 ás 11:30 | 13h ás 18h', '2018-03-29'),
(21, 'CAMPO GRANDE - INTEGRAL', 'Campo Grande', '2018-05-11', '2018-05-12', 'Sexta:18:30 às 22:30 Sábado:07:30 ás 11:30 | 13h ás 18h', '2018-03-29'),
(22, 'CAMPO GRANDE - INTEGRAL', 'Campo Grande', '2018-05-18', '2018-05-19', 'Sexta:18:30 às 22:30 Sábado:07:30 ás 11:30 | 13h ás 18h', '2018-03-29'),
(29, 'DOURADOS - INTEGRAL', 'Dourados', '2018-08-10', '2018-08-11', 'Sex:18:30 ás 22:30 Sáb:07:30 ás 11:30 | 13h ás 18h', '2018-03-20'),
(32, 'TRÊS LAGOAS - INTEGRAL', 'Tres Lagoas', '2018-08-24', '2018-08-25', 'Sex:18:30 ás 22:30 Sáb:07:30 ás 11:30 | 13h ás 18h', '2018-03-20'),
(35, 'CORUMBÁ - INTEGRAL', 'Corumba', '2018-10-05', '2018-10-06', 'Sex:18:30 ás 22:30 Sáb:07:30 ás 11:30 | 13h ás 18h', '2018-03-20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_carrousel`
--
ALTER TABLE `admin_carrousel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_contato`
--
ALTER TABLE `admin_contato`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_imagens`
--
ALTER TABLE `admin_imagens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_menu`
--
ALTER TABLE `admin_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_slides`
--
ALTER TABLE `admin_slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_textos`
--
ALTER TABLE `admin_textos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_usuarios`
--
ALTER TABLE `admin_usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_vars`
--
ALTER TABLE `admin_vars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inscricao`
--
ALTER TABLE `inscricao`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `turmas`
--
ALTER TABLE `turmas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_carrousel`
--
ALTER TABLE `admin_carrousel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `admin_contato`
--
ALTER TABLE `admin_contato`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `admin_imagens`
--
ALTER TABLE `admin_imagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `admin_logs`
--
ALTER TABLE `admin_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `admin_menu`
--
ALTER TABLE `admin_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `admin_slides`
--
ALTER TABLE `admin_slides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `admin_textos`
--
ALTER TABLE `admin_textos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `admin_usuarios`
--
ALTER TABLE `admin_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `admin_vars`
--
ALTER TABLE `admin_vars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `inscricao`
--
ALTER TABLE `inscricao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=277;
--
-- AUTO_INCREMENT for table `turmas`
--
ALTER TABLE `turmas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
