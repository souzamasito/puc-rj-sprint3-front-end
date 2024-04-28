/*
  --------------------------------------------------------------------------------------
  Função para obter os dados do CEP da API ViaCEP
  --------------------------------------------------------------------------------------
*/
const getCEPInfo = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para buscar e inserir informações do CEP na lista
  --------------------------------------------------------------------------------------
*/
const searchCEP = async (event) => {
  if (event.key === 'Enter') {
    const cepInput = document.getElementById("newCep").value;
    if (cepInput.trim() !== '') {
      const cepInfo = await getCEPInfo(cepInput);
      if (cepInfo) {
        document.getElementById("newCity").value = cepInfo.localidade || '';
        document.getElementById("newUf").value = cepInfo.uf || '';
      } else {
        alert("CEP não encontrado");
      }
    } else {
      alert("Informe um CEP válido");
    }
  }
}

document.getElementById("newCep").addEventListener("keypress", searchCEP);

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/praias';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.praias.forEach(item => 
        insertList(item.nome, item.cep, item.cidade, item.uf, item.tipo, item.data))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputName, inputCep, inputCity, inputUf, inputType, inputDate) => {
  const formData = new FormData();
  formData.append('nome', inputName);
  formData.append('cep', inputCep);
  formData.append('cidade', inputCity);
  formData.append('uf', inputUf);
  formData.append('tipo', inputType);
  formData.append('data', inputDate);

  let url = 'http://127.0.0.1:5000/praia';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML;
      if (confirm("Você tem certeza?")) {
        div.remove();
        deleteItem(nomeItem);
        alert("Removido!");
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  let url = 'http://127.0.0.1:5000/praia?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, ponto de referencia e tipo de lixo
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputName = document.getElementById("newName").value;
  let inputCep = document.getElementById("newCep").value;
  let inputCity = document.getElementById("newCity").value;
  let inputUf = document.getElementById("newUf").value;
  let inputType = document.getElementById("newType").value;
  let inputDate = document.getElementById("newDate").value;

  if (inputName === '' || inputCep === '' || inputCity === '' || inputUf === '' || inputType === ''|| inputDate === '') {
    alert("Preencha todos os campos");
  } else {
    insertList(inputName, inputCep, inputCity, inputUf,inputType, inputDate);
    postItem(inputName, inputCep, inputCity, inputUf, inputType, inputDate);
    alert("Item adicionado!");
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameName, cep, city, uf, type, date) => {
  var item = [nameName, cep, city, uf, type, date];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cell = row.insertCell(i);
    cell.textContent = item[i];
  }

  insertButton(row.insertCell(-1));
  insertEditButton(row.insertCell(-1), nameName, row);

  document.getElementById("newName").value = "";
  document.getElementById("newCep").value = "";
  document.getElementById("newCity").value = "";
  document.getElementById("newUf").value = "";
  document.getElementById("newType").value = "";
  document.getElementById("newDate").value = "";

  removeElement();
}

/*
  --------------------------------------------------------------------------------------
  Função para atualizar um item da lista no servidor via requisição PUT
  --------------------------------------------------------------------------------------
*/
const putItem = async (inputName, inputType) => {
  const formData = new FormData();
  formData.append('nome', inputName);
  formData.append('tipo', inputType);

  let url = 'http://127.0.0.1:5000/praia';
  fetch(url, {
    method: 'put',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para editar um item da lista
  --------------------------------------------------------------------------------------
*/
const editItem = async (itemName, rowIndex) => {
  let newType = prompt("Digite o novo tipo da praia:");

  if (newType !== null && newType !== '') {
    const table = document.getElementById('myTable');
    const row = table.rows[rowIndex];
    row.cells[4].textContent = newType; // Atualiza o valor na tabela

    await putItem(itemName, newType); // Atualiza no servidor

    alert("Tipo de praia atualizado!");
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão de edição para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertEditButton = (parent, itemName, rowIndex) => {
  let button = document.createElement("button");
  button.innerHTML = "Editar";
  button.onclick = function() {
    // Chamando a função editItem passando o nome do item e a linha da tabela
    editItem(itemName, rowIndex);
  };
  parent.appendChild(button);
}
