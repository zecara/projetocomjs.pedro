
const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');

let tarefas = [];



form.addEventListener('submit', function(evento) {
    evento.preventDefault(); 

    const novaTarefa = {
        id: Date.now(), // Gera um ID único baseado na data e hora
        texto: input.value
    };

    tarefas.push(novaTarefa); 
    input.value = ''; 
    
    renderizarTarefas(); 
});


function renderizarTarefas() {
    lista.innerHTML = ''; 

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        
        
        li.innerHTML = `
            <span class="tarefa-texto" ondblclick="iniciarEdicao(${tarefa.id})">${tarefa.texto}</span>
            <input type="text" class="tarefa-input" id="input-${tarefa.id}" value="${tarefa.texto}" style="display:none;">
            <div>
                <button onclick="editarTarefa(${tarefa.id})">Editar</button>
                <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
            </div>
        `;
        
        lista.appendChild(li);
    });
}


function excluirTarefa(idDaTarefa) {
    
    tarefas = tarefas.filter(tarefa => tarefa.id !== idDaTarefa);
    
    
    renderizarTarefas(); 
}

function editarTarefa(idDaTarefa) {
    const span = document.querySelector(`[ondblclick="iniciarEdicao(${idDaTarefa})"]`);
    const input = document.getElementById(`input-${idDaTarefa}`);
    
    input.style.display = 'inline';
    span.style.display = 'none';
    input.focus();
    input.select();
    
    function salvarEdicao() {
        const novoTexto = input.value.trim();
        
        if (novoTexto !== "") {
            const tarefa = tarefas.find(t => t.id === idDaTarefa);
            tarefa.texto = novoTexto;
        }
        
        renderizarTarefas();
    }
    
    input.addEventListener('blur', salvarEdicao);
    input.addEventListener('keypress', function(evento) {
        if (evento.key === 'Enter') {
            salvarEdicao();
        }
    });
}

function iniciarEdicao(idDaTarefa) {
    editarTarefa(idDaTarefa);
}