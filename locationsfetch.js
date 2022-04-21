const fs = require("fs");
const https = require("https");

fs.readFile("data/small.json", (err, data) => {
  let archivedElections = JSON.parse(data);
  const locations = [];
  archivedElections.forEach((election, i) => {
    setTimeout(function () {
      https.get(
        "https://geocode.xyz/" + election.election_location + "?geoit=json",
        (resp) => {
          resp.on("data", (chunk) => {
            data += chunk;
          });

          resp.on("end", () => {
            console.log(JSON.parse(data));
          });
        }
      );
    }, i * 3000);

    // try {
    //   response = await fetch(
    //     "https://geocode.xyz/" + election.election_location + "?geoit=json"
    //   );
    //   if (!response.ok) throw new Error("Request failed");
    // } catch (err) {
    //   console.log(err);
    // }

    // let location = await response.json();
    // if (location.latt != undefined && location.longt != undefined) {
    //   let latlong = [location.latt, location.longt];
    //   let locationObject = {
    //     name: election.name,
    //     latlong: latlong,
    //   };
    //   locations.push(locationObject);
    // }
  });
});
