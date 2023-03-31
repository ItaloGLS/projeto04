const form = document.querySelector('form');
const input = document.querySelector('input');
const listaTarefas = document.querySelector('#tarefas');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (input.value.trim()) {
    adicionarTarefa(input.value);
    salvarTarefas();
    input.value = '';
    input.focus();
  }
});

function adicionarTarefa(texto) {
  const tarefa = document.createElement('li');
  tarefa.innerHTML = `<span>${texto}</span><button class="remover">Remover</button>`;
  listaTarefas.appendChild(tarefa);
  const botaoRemover = tarefa.querySelector('.remover');
  botaoRemover.addEventListener('click', () => {
    listaTarefas.removeChild(tarefa);
    salvarTarefas();
  });
}

function salvarTarefas() {
  const tarefas = [];
  for (let i = 0; i < listaTarefas.children.length; i++) {
    const tarefa = listaTarefas.children[i];
    const texto = tarefa.querySelector('span').innerText;
    tarefas.push(texto);
  }
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  for (let i = 0; i < tarefas.length; i++) {
    const texto = tarefas[i];
    adicionarTarefa(texto);
  }
}

carregarTarefas();
