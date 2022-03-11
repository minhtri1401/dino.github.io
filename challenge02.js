let myTable = document.querySelector("#score-table");
function loadScore() {
  let scoreData = [];
  let localData = window.localStorage.getItem("score");
  if (localData) {
    scoreData = JSON.parse(localData);
  } else {
    return;
  }
  let table = document.createElement("table");
  table.innerHTML = `                <tr>
    <th>Time</th>
    <th>Score</th>
  </tr>              
  `;

  scoreData.forEach((data) => {
    let row = document.createElement("tr");
    let dateCol = document.createElement("td");
    let scoreCol = document.createElement("td");
    dateCol.innerHTML = data.time;
    scoreCol.innerHTML = data.score;
    row.appendChild(dateCol);
    row.appendChild(scoreCol);
    table.appendChild(row);
  });
  let btn = document.createElement("button");
  btn.innerHTML = "OK";
  btn.onclick = () => {
    var modal = document.getElementById("myTable");
    modal.style.display = "none";
    onResume();
  };
  table.appendChild(btn);

  document.getElementById("score-table").replaceChildren(table);

  var modal = document.getElementById("myTable");
  modal.style.display = "block";
}
