function initializeSelectOptions(max) {
    let options = '';
    for (let i = 1; i <= max; i++) {
        options += `<option value="${i}">${i}</option>`;
    }

    document.getElementById('matrix1RowLength').innerHTML = options;
    document.getElementById('matrix1ColumnLength').innerHTML = options;
    document.getElementById('matrix2RowLength').innerHTML = options;
    document.getElementById('matrix2ColumnLength').innerHTML = options;

    
}



function updateRowColumnCount(matrixNumber, isColumnUpdate = false) {
    let rowSelectElement= document.getElementById(`matrix${matrixNumber}RowLength`);
    let columnSelectElement = document.getElementById(`matrix${matrixNumber}ColumnLength`);
    let rowCount = rowSelectElement.value;
    let columnCount = columnSelectElement.value;

    if (matrixNumber === 1 && isColumnUpdate) {
        document.getElementById('matrix2RowLength').value = columnCount;
        updateRowColumnCount(2);
    }

    let tbody = document.getElementById(`matrix${matrixNumber}Body`);
    tbody.innerHTML = ''; 

    let rows = '';
    for (let i = 0; i < rowCount; i++) {
        let cols = '';
        for (let j = 0; j < columnCount; j++) {
            cols += `<td><input type="number" class="inp_Matris" id="inp_Matris${matrixNumber}_${i}_${j}" required></td>`;
        }
        rows += `<tr>${cols}</tr>`;
    }
    tbody.innerHTML = rows;
}

function getMatrix(matrixNumber) {
    let rowSelectElement = document.getElementById(`matrix${matrixNumber}RowLength`);
    let columnSelectElement = document.getElementById(`matrix${matrixNumber}ColumnLength`);
    let rowCount = rowSelectElement.value;
    let columnCount = columnSelectElement.value;

    let matrix = [];
    for (let i = 0; i < rowCount; i++) {
        let row = [];
        for (let j = 0; j < columnCount; j++) {
            let input = document.getElementById(`inp_Matris${matrixNumber}_${i}_${j}`);
            row.push(parseInt(input.value));
        }
        matrix.push(row);
    }
    return matrix;
}

function getRowLengthOfMatrix(matrix){
    return matrix.length;
}

function getColumnLengthOfMatrix(matrix){
    return matrix[0].length;
}

function multiplyMatrix(matrix, matrix2) {
    let resultMatrix = [];

    for (let i = 0; i < getRowLengthOfMatrix(matrix); i++) {
        resultMatrix.push([]);

        for (let j = 0; j < getColumnLengthOfMatrix(matrix2); j++) {
            let sum = 0;

            for (let k = 0; k < getColumnLengthOfMatrix(matrix); k++) {
                sum += matrix[i][k] * matrix2[k][j];
            }

            resultMatrix[i][j] = sum;
        }
    }
    return resultMatrix;
}

function displayMatrix(matrix) {
    let tbody = document.getElementById('matrixResultBody');
    let rows = '';

    for (let i = 0; i < matrix.length; i++) {
        let cols = '';
        for (let j = 0; j < matrix[i].length; j++) {
            cols += `<td>${matrix[i][j]}</td>`;
        }
        rows += `<tr id="matrixResultValue">${cols}</tr>`;
    }

    tbody.innerHTML = rows;
}


function calculate() {
    let matrix1 = getMatrix(1);
    let matrix2 = getMatrix(2);
    let matrixResult = multiplyMatrix(matrix1, matrix2);
    
    displayMatrix(matrixResult);
}

window.onload = function(){
    initializeSelectOptions(10);
    updateRowColumnCount(1);
    updateRowColumnCount(2);
}


