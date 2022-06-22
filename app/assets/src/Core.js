const textInputButton = () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'update-ticket-cep';  
  input.maxLength = '9';

  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'botao-atualizar';
  button.innerText = 'Atualizar Ticket';

  const mainContent = document.getElementById('main-content');
  
  mainContent.appendChild(input);
  mainContent.appendChild(button);
  
  return mainContent;
};

const updateEvent = () => {
  const updateButton = document.getElementById('botao-atualizar')
  updateButton.addEventListener('click', async () => {
    const selectInput = document.getElementById('update-ticket-cep');
    const inputText = selectInput.value;
    
    return fetch(`https://viacep.com.br/ws/${inputText}/json/`)
      .then((data) => data)
  })
}

const Core = {
  textInputButton,
  updateEvent,
};

export default Core;
