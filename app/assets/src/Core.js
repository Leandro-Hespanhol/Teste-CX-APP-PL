let client = ZAFClient.init();

const createTextInput = () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'update-ticket-cep';
  input.placeholder = 'CEP (apenas dígitos)'
  input.maxLength = '8';
  return input;
}

const createCepButton = () => {
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'botao-atualizar';
  button.innerText = 'Comentar Ticket com endereço';
  return button;  
}

const appendInputButton = () => {
  const mainContent = document.getElementById('main-content');

  mainContent.appendChild(createTextInput());
  mainContent.appendChild(createCepButton());

  return mainContent;
};

const ticketListButton = () => {
  const divList = document.getElementById('recent-tickets-list');
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'botao-listar';
  button.innerText = 'Listar Tickets recentes';

  divList.appendChild(button)
  return button;  
}

const ticketsList = () => {
  const divList = document.getElementById('recent-tickets-list');
  
  const ol = document.createElement('ol');
  ol.id = 'tickets-list';
    
  ticketListButton();
  divList.appendChild(ol);
}

const ticketsListItens = (title, id) => {
  const ol = document.getElementById('tickets-list')

  const li = document.createElement('li');
  li.innerHTML = `${id} - ${title}`;
  ol.appendChild(li);
}

const fetchCep = async () => {
  const selectInput = document.getElementById('update-ticket-cep');
  const inputText = selectInput.value;

  const cepInfo = await fetch(`https://viacep.com.br/ws/${inputText}/json/`)
    .then((resp) => resp.json())
    .then(({ bairro, cep, complemento, ddd, localidade, logradouro, uf }) => {
      if (!bairro) {
        bairro = 'Sem bairro especificado';
      }
      if (!complemento) {
        complemento = 'Sem complemento especificado';
      }
      if (!localidade) {
        localidade = 'Sem localidade especificado';
      }
      if (!logradouro) {
        logradouro = 'Sem logradouro especificado';
      }
      return `Bairro: ${bairro}, Logradouro: ${logradouro},
    Complemento: ${complemento}, Localidade: ${localidade}, UF: ${uf},
    Cep: ${cep}, DDD: ${ddd}`;
    });

  return cepInfo;
};

const updateEvent = () => {
  const updateButton = document.getElementById('botao-atualizar');
  updateButton.addEventListener('click', async () => {
    const cep = JSON.stringify({
      ticket: {
        comment: {
          body: await fetchCep(),
          public: true,
        },
      },
    });

    const ticketId = await client.get('ticket.id').then((response) => {
      return response['ticket.id'];
    });

    client
      .request({
        url: `/api/v2/tickets/${ticketId}`,
        cors: false,
        contentType: 'application/json',
        data: cep,
        dataType: 'text',
        httpCompleteResponse: true,
        type: 'PUT',
      })
      .then(() => console.log('ticket updated'))
      .catch(() => console.log('ticket failed to update'));
  });
};

const listTicketsEvent = () => {
  
  const listButton = document.getElementById('botao-listar')
  listButton.addEventListener('click', () => {
    client
    .request({
      url: `/api/v2/tickets/recent`,
      cors: false,
      contentType: 'application/json',
      httpCompleteResponse: true,
      type: 'GET',
      })
      .then((data) => data.responseJSON.tickets
        .forEach((ticket) => {
          ticketsListItens(ticket.raw_subject, ticket.id)
        })).then(() => {
          return (
            listButton.disabled = true,
            listButton.innerHTML = 'Tickets listados'
          )
        })
    })
  }
    
const Core = {
  appendInputButton,
  updateEvent,
  ticketsList,
  listTicketsEvent
};

export default Core;
