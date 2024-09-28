// Lê os dados do arquivo products.json
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    // Cria uma tabela com os produtos
    const table = document.getElementById('products-table');
    data.forEach(product => {
      const row = table.insertRow();
      row.innerHTML = `
        <td>${product.nome}</td>
        <td>${product.descricao}</td>
        <td>${product.preco}</td>
        <td>${product.estoque}</td>
        <td>
          <button onclick="editProduct(${product.id})">Editar</button>
          <button onclick="deleteProduct(${product.id})">Remover</button>
        </td>
      `;
    });
  });

// Adiciona um novo produto
function addProduct() {
  const productName = document.getElementById('product-name').value;
  const productDescription = document.getElementById('product-description').value;
  const productPrice = document.getElementById('product-price').value;
  const productStock = document.getElementById('product-stock').value;

  const newProduct = {
    id: Date.now(),
    nome: productName,
    descricao: productDescription,
    preco: productPrice,
    estoque: productStock
  };

  // Lê os dados do arquivo products.json
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      // Adiciona o novo produto ao array de produtos
      data.push(newProduct);

      // Converte o array de produtos em uma string JSON
      const jsonString = JSON.stringify(data);

      // Escreve a string JSON no arquivo products.json
      fetch('products.json', {
        method: 'PUT',
        body: jsonString,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });
}

// Edita um produto
function editProduct(productId) {
  // Lê os dados do arquivo products.json
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      // Encontra o produto a ser editado
      const product = data.find(product => product.id === productId);

      // Abre um formulário para editar o produto
      const editForm = document.getElementById('edit-form');
      editForm.innerHTML = `
        <label>Nome:</label>
        <input type="text" id="product-name" value="${product.nome}">
        <br>
        <label>Descrição:</label>
       
