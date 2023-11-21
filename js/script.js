document.getElementById("calculate").addEventListener("click", calculateCost);

function calculateCost() {

    const name = document.querySelector("#name").value;
    const age = parseFloat(document.querySelector("#age").value);
    const weight = parseFloat(document.querySelector("#weight").value.replace(/,/,"."));
    const height = parseFloat(document.querySelector("#height").value.replace(/,/,"."));
    const sex = document.querySelector("#sex").value;
    const phone = document.querySelector("#phone").value;
    const imc = weight / Math.pow(height, 2);
    if(isNaN(imc))
        return;
    
    const Abasic = 100 + (age * 10 * (imc / 10))
    const Astandard = (150 + (age * 15)) * (imc / 10)
    const Apremium = (200 - (imc * 10) + (age * 20)) * (imc / 10)

    const Bbasic = 100 + (getComorbidityFactor(imc) * 10) * (imc / 10)
    const Bstandard = (150 + (getComorbidityFactor(imc) * 15)) * (imc / 10)
    let Bpremium = ((200 - (imc * 10)) + (getComorbidityFactor(imc) * 20)) * (imc / 10)
    if (Bpremium < 0) {
        Bpremium = Bpremium * - 1
        return Bpremium,
            displayResults(Abasic, Astandard, Apremium, Bbasic, Bstandard, Bpremium)
    } else {
        displayResults(Abasic, Astandard, Apremium, Bbasic, Bstandard, Bpremium)
    }
}
function getComorbidityFactor(imc) {
    if (imc < 18.5) return 10; // Below weight
    if (imc < 24.9) return 1; // Normal
    if (imc < 29.9) return 6; // Overweight
    if (imc < 34.9) return 10; // Obesity
    if (imc < 39.9) return 20; // Morbid Obesity
    if (imc > 40) return 30; // Very Morbid Obesity
}

function displayResults(Abasic, Astandard, Apremium, Bbasic, Bstandard, Bpremium) {
    const resultados = [Astandard, Apremium, Bbasic, Bstandard, Bpremium]
    console.log(resultados)
    const menorValor = resultados.reduce((prev, current) => {
        return prev < current ? prev : current;
    }).toFixed(2)
    const table = document.querySelector("table");

    table.classList.add("precos");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Instituição</th>
                <th>Plano</th>
                <th>Preço</th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td>Plano A</td>
            <td>Básico</td>
            <td class='nota'>${Abasic.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Plano A</td>
            <td>Standard</td>
            <td class='nota'>${Astandard.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Plano A</td>
            <td>Premium</td>
            <td class='nota'>${Apremium.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Plano B</td>
            <td>Básico</td>
            <td class='nota'>${Bbasic.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Plano B</td>
            <td>Standard</td>
            <td class='nota'>${Bstandard.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Plano B</td>
            <td>Premium</td>
            <td class='nota'>${Bpremium.toFixed(2)}</td>
        </tr>
        </tbody>
    `;

    let tds = document.querySelectorAll("td[class='nota']");
    tds.forEach((td) => {
        td.parentNode.className = (td.innerHTML == menorValor) ? "table-info" : " ";
    });

}
