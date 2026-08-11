const descricao= document.getElementById("descricao");
const valor = document.getElementById("valor");
const data = document.getElementById("data");

const btnAdicionar = document.getElementById("btnAdicionar");
const listaGastos = document.getElementById("listaGastos");

const total = document.getElementById("total");

let totalGasto = 0;

let gastos = [];

const gastosSalvos = 
localStorage.getItem("gastos");

if (gastosSalvos) {
  gastos = JSON.parse(gastosSalvos);
}

gastos.forEach(function(gasto) {
  totalGasto += gasto.valor;
});

total.textContent = `Total: ${totalGasto.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
})}`;

function mostrarGasto(gasto, indice){
  const novoGasto = document.createElement ("div");

  novoGasto.classList.add("gasto");

  novoGasto.innerHTML = `
  <p><strong>${gasto.descricao}</strong></p>
  <p>Valor: ${gasto.valor.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  })}</p>
  <p>Data: ${gasto.data}</p>
  
  <button class="btnExcluir">🗑️ Excluir</button>
  `;

  listaGastos. appendChild(novoGasto);

  const btnExcluir = novoGasto.querySelector (".btnExcluir");

  btnExcluir.addEventListener("click", function() {

    totalGasto -= gasto.valor;

    gastos.splice(indice, 1);

    localStorage.setItem("gastos", JSON.stringify(gastos));

    total.textContent = `Total: ${totalGasto.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })}`;

    novoGasto.remove();
  });
}

gastos.forEach (function(gasto, indice){
  mostrarGasto(gasto, indice);
})

btnAdicionar.addEventListener("click", function()
{

  const valorGasto = Number (valor.value);

  const gasto = {
    descricao: descricao.value,
    valor: valorGasto,
    data: data.value
  };

  gastos.push(gasto);

  localStorage.setItem("gastos", JSON.stringify(gastos));

  const valorFormatado =
   valorGasto.toLocaleString("pt-br", {
    style: "currency", 
    currency: "BRL"
  });

  totalGasto += valorGasto;

  total.textContent = `Total:  ${totalGasto.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  })}`;

  mostrarGasto(gasto, gastos.length - 1);

});

  