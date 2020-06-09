export const generateInitialGrid = (dimension) => {
  let rows = [];
  for (let i = 0; i < dimension; i++) {
    let cols = [];
    for (let j = 0; j < dimension; j++) {
      let edge = dimension - 1;

      if (i !== edge && j !== edge)
        cols.push({ value: 0, clickable: true, clicked: false });
      else cols.push({ value: 0, clickable: false });
    }
    rows.push(cols);
  }
  rows[dimension - 1].pop();
  console.log(rows);
  return rows;
};
