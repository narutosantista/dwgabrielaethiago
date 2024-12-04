/*Acessa o formulário através do getElementById e fica "escutando"/esperando através do addEventListener o evento(submint)  que ocorrerá no caso o click no botão cadastrar. Quando isso ocorre ele executa a função anonima function(event) desencadeando as ações desejadas* */
document.getElementById("formFinanceiro").addEventListener("submit", function(event) {
    /* Impede que a página recarregue ao enviar o formulário */
    event.preventDefault();

    /* Coleta os valores dos campos do formulário */
    var descricao = document.getElementById("descricao").value;
    var categoria = document.getElementById("categoria").value;
    var data = document.getElementById("data").value;
    var valor = parseFloat(document.getElementById("valor").value);

    /* Cria um objeto para armazenar os dados da transação */
    var transacao = { descricao: descricao, categoria: categoria, data: data, valor: valor };

    /* Recupera a lista de transações armazenada no LocalStorage, ou cria uma nova lista vazia */
    var transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

    /* Adiciona a nova transação à lista */
    transacoes.push(transacao);

    /* Salva a lista atualizada no LocalStorage */
    localStorage.setItem("transacoes", JSON.stringify(transacoes));

    /* Limpa os campos do formulário */
    document.getElementById("formFinanceiro").reset();

    /* Atualiza a lista de transações e o resumo */
    atualizarLista();
    atualizarResumo();
});

/* Atualizar Lista de Transações */
function atualizarLista() {
    /* Carrega as transações do LocalStorage */
    var transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

    var lista = document.getElementById("listaTransacoes");

    /* Limpa a lista antes de exibir os itens */
    lista.innerHTML = "";

    /* Percorre todas as transações e as exibe */
    transacoes.forEach(function(transacao, index) {
        /* Cria um item de lista para cada transação */
        var li = document.createElement("li");
        li.innerHTML = `
            <span>${transacao.descricao} - ${transacao.categoria} - ${new Date(transacao.data).toLocaleDateString()} - R$ ${transacao.valor.toFixed(2)}</span>
            <button onclick="removerTransacao(${index})">Excluir</button>
        `;
        /* Adiciona o item à lista */
        lista.appendChild(li);
    });
}

/* Atualizar Resumo Financeiro */
function atualizarResumo() {
    /* Carrega as transações do LocalStorage */
    var transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

    /* Inicializa os totais de receitas e despesas */
    var totalReceitas = 0;
    var totalDespesas = 0;

    /* Soma os valores de receitas e despesas */
    transacoes.forEach(function(t) {
        if (t.categoria === "Receita") {
            totalReceitas += t.valor;
        } else {
            totalDespesas += t.valor;
        }
    });

    /* Atualiza os valores no resumo */
    document.getElementById("totalReceitas").textContent = `R$ ${totalReceitas.toFixed(2)}`;
    document.getElementById("totalDespesas").textContent = `R$ ${totalDespesas.toFixed(2)}`;
    document.getElementById("saldoFinal").textContent = `R$ ${(totalReceitas - totalDespesas).toFixed(2)}`;
}

/* Remover Transação */
function removerTransacao(index) {
    /* Carrega as transações do LocalStorage */
    var transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

    /* Remove a transação pelo índice */
    transacoes.splice(index, 1);

    /* Atualiza o LocalStorage */
    localStorage.setItem("transacoes", JSON.stringify(transacoes));

    /* Atualiza a lista exibida e o resumo */
    atualizarLista();
    atualizarResumo();
}

/* Carregar Dados ao Iniciar */
atualizarLista();
atualizarResumo();
