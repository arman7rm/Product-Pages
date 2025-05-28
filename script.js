const { JSDOM } = require("jsdom");

const solution = (async (url) => {
  const response = await fetch(
    url
  );
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const tables = document.querySelectorAll("table");
  const map = new Map();
  tables.forEach((table) => {
    const rows = table.querySelectorAll("tr");
    rows.forEach((row, i) => {
      if(i==0) return;
      const cells = row.querySelectorAll("td, th");
      const cellTexts = Array.from(cells).map((td) => td.textContent.trim());
      var x = Number(cellTexts[0]);
      var y = Number(cellTexts[2]);
      if (!map.has(y)) {
        map.set(y, new Map());
      }
      map.get(y).set(x,cellTexts[1]);
    });
  });
  for(let y = map.size-1; y>=0; y--){
    line = "";
    for(let x=0; x<map.get(y).size; x++){
        if(map.get(y).get(x)==undefined){
            line+=' '
        }else{
            line += map.get(y).get(x);
        }
    }
    console.log(line);
  }
});

solution("https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub");