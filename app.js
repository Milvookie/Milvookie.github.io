const port = 3000;
const express = require("express");
const app = express();

//get data
const data_avenir = require("./avenir.json");
const all_data = require("./thematique_by_col.json");

//serve static files
app.use(express.static("public"));

//app.use(function(req, res, next) {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//    res.setHeader('Access-Control-Allow-Credentials', true);
//    next();
//});

app.get("/participant/:personId", (req, res) => {
  const person = req.params.personId;
  let extraits = [];
  for (let i = 1; i <= 12; i++) {
    let theme = "thematique_" + i;
    let extrait = all_data[theme][person];
    if (extrait.length > 0) {
      extraits.push({ title: theme, src: extrait });
    }
  }

  res.send(extraits);
});
//get an array with participants name (gonne be used to make datalist in html)
app.get("/participants", (req, res) => {
  const data = all_data["Nom"];
  let people = [];
  for (const person in data) {
    people.push(all_data["Prenom"][person] + " " + data[person]);
  }
  res.send(people);
});
app.get("/avenir", (req, res) => {
  res.json(data_avenir);
});
app.get("/theme/:id", (req, res) => {
  const theme = "thematique_" + req.params.id;
  const data = all_data[theme];
  let getData = [];

  for (const index in data) {
    if (data[index].length != 0) {
      getData.push(index);
    }
  }
  res.json(data);
});

app.get("/theme/:id/participants", (req, res) => {
  const theme = "thematique_" + req.params.id;
  const data = all_data[theme];
  let getData = [];
  for (const index in data) {
    if (data[index].length != 0) {
      getData.push(index);
    }
  }
  res.json(getData);
});

app.get("/avenir/:id", (req, res) => {
  const person = req.params;
  res.status(200).send(
    `<figure>
            <figcaption>Ecoutez ${data_avenir.Prenom[person.id]} ${
      data_avenir.Nom[person.id]
    }:</figcaption>
            <audio
                controls>
                <source src="./extraits_montes/${
                  data_avenir.avenir[person.id]
                }" type="audio/mp3">
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
        </figure>`
  );
  //res.json(data_avenir.Nom[person.id])
});

app.get("/theme/:id/:personId", (req, res) => {
  const themeNumber = "thematique_" + req.params.id;
  const personId = req.params.personId;
  const data = all_data;
  res.status(200).send(
    `<figure>
            <figcaption>Ecoutez ${data.Prenom[personId]} ${data.Nom[personId]}:</figcaption>
            <audio
                controls>
                <source src="./extraits_montes/${data[themeNumber][personId]}" type="audio/mp3">
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
        </figure>`
  );
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
