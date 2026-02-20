function adicionarSabor() {
    const input = document.getElementById("sabor");
    const sabor = input.value.trim();

    if (sabor) {
        const li = document.createElement("li");
        li.textContent = sabor;
        document.getElementById("lista-tarefas").appendChild(li);
        input.value = "";
    }
}

document.getElementById("add-sabor").addEventListener("click", adicionarSabor);