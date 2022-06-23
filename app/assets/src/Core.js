let client = ZAFClient.init();

client.get('ticket').then(function (data) {
  console.log('ticket object', data);
});

const textInputButton = () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'update-ticket-cep';
  input.maxLength = '8';

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
  const updateButton = document.getElementById('botao-atualizar');
  updateButton.addEventListener('click', async () => {
    const selectInput = document.getElementById('update-ticket-cep');
    const inputText = selectInput.value;

    const cepInfo = await fetch(`https://viacep.com.br/ws/${inputText}/json/`)
      .then((resp) => resp.json())
      .then(({ bairro, cep, complemento, ddd, localidade, logradouro, uf}) => {
        if (!bairro) {
          bairro = 'Sem bairro especificado'
        }
        if (!complemento) {
          complemento = 'Sem complemento especificado'
        }
        if (!localidade) {
          localidade = 'Sem localidade especificado'
        }
        if (!logradouro) {
          logradouro = 'Sem logradouro especificado'
        }
        return `Bairro: ${bairro}, Logradouro: ${logradouro},
        Complemento: ${complemento}, Localidade: ${localidade}, UF: ${uf},
        Cep: ${cep}, DDD: ${ddd}`
      });
      
    const cep = JSON.stringify({
      ticket: {
        comment: {
          body: cepInfo,
          public: true
        },
      },
    });
    const ticketId = await client
      .get('ticket.id')
      .then((response) => {
        return response['ticket.id']
      })

    client.request({
      url: `/api/v2/tickets/${ticketId}`,
      cors: false,
      contentType: 'application/json',
      data: cep,
      dataType: 'text',
      httpCompleteResponse: true,
      type: 'PUT',
    }).then(() => console.log('ticket updated'))
    .catch(() => console.log('ticket failed to update'));
  });
};

const Core = {
  textInputButton,
  updateEvent,
};

export default Core;
