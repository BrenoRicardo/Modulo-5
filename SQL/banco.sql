-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02-Mar-2023 às 01:53
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `banco`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `agencia`
--

CREATE TABLE `agencia` (
  `id_da_agencia` int(11) NOT NULL,
  `endereco` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `agencia`
--

INSERT INTO `agencia` (`id_da_agencia`, `endereco`, `email`, `telefone`) VALUES
(1, 'Madureira', 'exemplo@gmail.com', '21649075139');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cartao`
--

CREATE TABLE `cartao` (
  `iddocartao` int(11) NOT NULL,
  `coddeseg` bigint(11) NOT NULL,
  `dataexp` varchar(20) NOT NULL,
  `tipodecartao` varchar(20) NOT NULL,
  `limitecartao` int(100) NOT NULL,
  `saldocartao` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `cartao`
--

INSERT INTO `cartao` (`iddocartao`, `coddeseg`, `dataexp`, `tipodecartao`, `limitecartao`, `saldocartao`) VALUES
(1, 215759654, '02/2030', 'Crédito', 5000, 2500),
(2, 753159852, '01/2028', 'Débito', 3500, 1200),
(3, 786324950, '12/2028', 'Débito', 4200, 2200);

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id_do_cliente` int(11) NOT NULL,
  `nome_cliente` varchar(30) NOT NULL,
  `cpf` bigint(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefone` bigint(20) NOT NULL,
  `endereco_cliente` varchar(30) NOT NULL,
  `id_do_emprestimo` int(11) NOT NULL,
  `id_do_cartao` int(11) NOT NULL,
  `id_da_agencia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id_do_cliente`, `nome_cliente`, `cpf`, `email`, `telefone`, `endereco_cliente`, `id_do_emprestimo`, `id_do_cartao`, `id_da_agencia`) VALUES
(1, 'Felipe Barreiro', 15935786252, 'lipebarreiro3@gmail.com', 21999998888, 'Madureira', 13, 565, 155),
(2, 'Maria Eduarda', 46575315958, 'eduarda@gmail.com', 21987556145, 'Guadalupe', 24, 21, 105),
(3, 'Breno Ricardo', 24986135746, 'breno@gmail.com', 21840628154, 'Taquara', 42, 81, 205),
(4, 'Kaylane Mattos', 15935745685, 'kaylane@gmail.com', 21972465914, 'Anchieta', 45, 62, 215);

-- --------------------------------------------------------

--
-- Estrutura da tabela `contas`
--

CREATE TABLE `contas` (
  `id_da_conta` int(11) NOT NULL,
  `nome_cliente` varchar(30) NOT NULL,
  `id_do_cliente` int(11) NOT NULL,
  `tipo_de_conta` varchar(20) NOT NULL,
  `saldo` int(11) NOT NULL,
  `id_da_agencia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `contas`
--

INSERT INTO `contas` (`id_da_conta`, `nome_cliente`, `id_do_cliente`, `tipo_de_conta`, `saldo`, `id_da_agencia`) VALUES
(1, 'Felipe Barreiro', 25, 'Poupança', 4500, 105),
(3, 'Maria Eduarda', 21, 'Salário', 50000, 106),
(4, 'Breno Ricardo', 26, 'Poupança', 45000, 601),
(5, 'Kaylane Mattos', 45, 'Corrente', 7500, 95);

-- --------------------------------------------------------

--
-- Estrutura da tabela `emprestimo`
--

CREATE TABLE `emprestimo` (
  `id_do_emprestimo` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `valor_emprestimo` bigint(20) NOT NULL,
  `parcelas` int(11) NOT NULL,
  `juros` int(11) NOT NULL,
  `data` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `emprestimo`
--

INSERT INTO `emprestimo` (`id_do_emprestimo`, `nome`, `valor_emprestimo`, `parcelas`, `juros`, `data`) VALUES
(1, 'Felipe Barreiro', 3200, 7, 5, '10/04/2023');

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `id_funcionario` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cargo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `funcionarios`
--

INSERT INTO `funcionarios` (`id_funcionario`, `nome`, `cpf`, `email`, `telefone`, `cargo`) VALUES
(1, 'Felipe Barreiro', '45335175985', 'lipebarreiro3@gmail.com', '21999998889', 'Técnico'),
(2, 'Maria Eduarda', '16597214256', 'eduarda@gmail.com', '21497214578', 'Técnica');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `agencia`
--
ALTER TABLE `agencia`
  ADD PRIMARY KEY (`id_da_agencia`);

--
-- Índices para tabela `cartao`
--
ALTER TABLE `cartao`
  ADD PRIMARY KEY (`iddocartao`);

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_do_cliente`);

--
-- Índices para tabela `contas`
--
ALTER TABLE `contas`
  ADD PRIMARY KEY (`id_da_conta`);

--
-- Índices para tabela `emprestimo`
--
ALTER TABLE `emprestimo`
  ADD PRIMARY KEY (`id_do_emprestimo`);

--
-- Índices para tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`id_funcionario`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agencia`
--
ALTER TABLE `agencia`
  MODIFY `id_da_agencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `cartao`
--
ALTER TABLE `cartao`
  MODIFY `iddocartao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_do_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `contas`
--
ALTER TABLE `contas`
  MODIFY `id_da_conta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `emprestimo`
--
ALTER TABLE `emprestimo`
  MODIFY `id_do_emprestimo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `id_funcionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
