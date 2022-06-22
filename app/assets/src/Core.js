const aNewFunction = () => {
  // A content here

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'update-ticket-cep';

  const button = document.createElement('button');
  button.type = 'button';
  button.innerText = 'Atualizar Ticket'

  let mainContent = document.getElementById('main-content');
  
  const updateButton = document.getElementById('botao-atualizar')
  updateButton.addEventListener('click', async () => {
    const selectInput = document.getElementsByClassName('update-ticket-cep');
    const inputText = selectInput.value;
    if ((inputText !== 8) || (inputText.split('-').join('') !== 8)) {
      return alert('Cep precisa conter exatamente 8 números, com ou sem traço')
    }
    return fetch(`https://viacep.com.br/ws/${inputText}/json/`)
      .then((data) => data)
  })

  mainContent.appendChild(input);
  mainContent.appendChild(button)
  
  return mainContent
};

const Core = {
  aNewFunction,
};

export default Core;
