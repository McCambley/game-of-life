/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
  // Store initial board in array
  const initialState = JSON.parse(JSON.stringify(board));
  // Iterate over the board and map over rows and update with function
  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      let current = cell;
      let sumAll = 0;
      let newVal = cell;
      // Row above
      const aboveRow = initialState[rowIndex - 1];
      if (aboveRow) {
        sumAll += aboveRow[columnIndex - 1] || 0;
        sumAll += aboveRow[columnIndex] || 0;
        sumAll += aboveRow[columnIndex + 1] || 0;
      }
      // Current row
      sumAll += initialState[rowIndex][columnIndex - 1] || 0;
      sumAll += initialState[rowIndex][columnIndex + 1] || 0;
      const belowRow = initialState[rowIndex + 1];
      if (belowRow) {
        sumAll += belowRow[columnIndex - 1] || 0;
        sumAll += belowRow[columnIndex] || 0;
        sumAll += belowRow[columnIndex + 1] || 0;
      }
      // Assess newVal
      if (current && (sumAll < 2 || 3 < sumAll)) {
        newVal = 0;
      }
      if (current && (sumAll === 2 || sumAll === 3)) {
        newVal = 1;
      }
      if (!current && sumAll === 3) {
        newVal = 1;
      }
      // Assign newVal
      board[rowIndex][columnIndex] = newVal;
    });
  });
};

const n = 20;
const rowAmount = 16;
const columnAmount = 9;
const newBoard = Array.from({ length: n * rowAmount }, () =>
  Array(n * columnAmount).fill(0)
);
const interval = Math.round(Math.random() * 50) + 3;
newBoard.forEach((row, rowIndex) => {
  row.forEach((column, columnIndex) => {
    const start = rowIndex * columnAmount + columnIndex;
    const value = start & interval ? 0 : 1;
    newBoard[rowIndex][columnIndex] = value;
  });
});

function createTable(data) {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  data.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((num) => {
      const td = document.createElement("td");

      td.style.backgroundColor = num
        ? "oklch(80.17% 0.091 258.88)"
        : "oklch(39.53% 0.15 259.87)";

      td.textContent = "";
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}

function updateBoardDisplay() {
  document.body.textContent = "";
  document.body.appendChild(createTable(newBoard));
}

setInterval(() => {
  gameOfLife(newBoard);
  updateBoardDisplay();
}, 1000 / 2);
