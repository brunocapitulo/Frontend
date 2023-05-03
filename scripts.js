const getList = async () => {
    let url = 'http://127.0.0.1:5000/pesquisas';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.pesquisa.forEach(item => insertList(item.nome, item.time, item.idade))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}


getList()


const postItem = async (inputNome, inputTime, inputIdade) => {
    const formData = new FormData();
    formData.append('nome', inputNome);
    formData.append('time', inputTime);
    formData.append('idade', inputIdade);
  
    let url = 'http://127.0.0.1:5000/pesquisa';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
}


const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/pesquisa?nome=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
}


const newItem = () => {
    let inputNome = document.getElementById("newInput").value;
    let inputTime = document.getElementById("newTime").value;
    let inputIdade = document.getElementById("newIdade").value;

    if (inputNome === '') {
        alert("Escreva o seu nome!");
      } else if ((inputTime === '') || isNaN(inputIdade)) {
        alert("Digite seu time e idade!");
      } else {
        insertList(inputNome, inputTime, inputIdade)
        postItem(inputNome, inputTime, inputIdade)
        alert("Pessoa adicionada!")
      }
}

const insertList = (nome, time, idade) => {
  var item = [nome, time, idade]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newTime").value = "";
  document.getElementById("newIdade").value = "";

  removeElement()
}

const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}
