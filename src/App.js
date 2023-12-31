import React, { useState, useEffect } from 'react';
import './App.css';
import ProdutoForm from './componentes/ProdutoForm';
import ProdutoList from './componentes/PordutoList';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';



function App() {
  const produto = [
    {
      codigo: 0,
      nome: '',
      categoria: '',
      marca: '',
      preco: ''
    }
  ]
  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [visible, setVisible] = useState(false);

  // UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/api/produto")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  // Obtendo os dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  }

  // Cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/api/produto', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          setProdutos([...produtos, retorno_convertido]);
          alert('Produto cadastrado com sucesso!');
          limparFormulario();
        }

      })
  }

  // Alterar produto
  const alterar = () => {
    fetch('http://localhost:8080/api/produto', {
      method: 'put',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {

          // Mensagem
          alert('Produto alterado com sucesso!');

          // Cópia do vetor de produtos
          let vetorTemp = [...produtos];

          // Índice
          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objProduto.codigo;
          });

          // Alterar produto do vetorTemp
          vetorTemp[indice] = objProduto;

          // Atualizar o vetor de produtos
          setProdutos(vetorTemp);

          // Limpar o formulário
          limparFormulario();
        }

      })
  }

  // Remover produto
  const remover = () => {
    fetch('http://localhost:8080/api/produto' + objProduto.codigo, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        // Mensagem
        alert(retorno_convertido.mensagem);

        // Cópia do vetor de produtos
        let vetorTemp = [...produtos];

        // Índice
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });

        // Remover produto do vetorTemp
        vetorTemp.splice(indice, 1);

        // Atualizar o vetor de produtos
        setProdutos(vetorTemp);

        // Limpar formulário
        limparFormulario();

      })
  }

  // Limpar formulário
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  //Selecionar produto
  const selecionarProduto = (indice) => {
    setObjProduto(indice);
    setBtnCadastrar(false);
  }

 

 

  // Retorno
  return (

    <div className="App">
    
      <ProdutoForm
        botao={btnCadastrar}
        eventoTeclado={aoDigitar}
        cadastrar={cadastrar}
        obj={objProduto}
        remover={remover}
        alterar={alterar}
        cancelar={limparFormulario}
        visivel={visible}
        setVisible={setVisible}
        displayDialog={displayDialog}
      />

      <ProdutoList vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;