// To connect :
// open new terminal
// 'node server.js' in the folder where the server file is located (cd ../path)
//  web browser 'localhost:3000'
'use strict';
const path = require('path');
const express = require('express'); // retrieve express
const bodyParser = require('body-parser');// To handle post request
const app = express(); // Instancy express
const http = require('http').createServer(app); // Create server http by retrieving the express server
const io = require('socket.io')(http); // socket.io is grafted to http so to the server 


app.use(express.static(path.join(__dirname, 'Client'))); // Allows to attach text elements and allows to adapt the path to all os
// Dirname will search the folder from the absolute root to the file

// List Armors
const armors = [{
  "name": "Armure de chevalier",
  "composition": [{
      "type": "casque",
      "name": "Casque de chevalier",
      "value": "100"
    },
    {
      "type": "bras",
      "name": "Bras de chevalier",
      "value": "100"
    },
    {
      "type": "torse",
      "name": "Torse de chevalier",
      "value": "100"
    },
    {
      "type": "jambe",
      "name": "Jambe de chevalier",
      "value": "100"
    },
    {
      "type": "cape",
      "name": "Cape de chevalier",
      "value": "100"
    },
  ]
},
{
  "name": "Armure de roi du nord",
  "composition": [{
      "type": "casque",
      "name": "Casque de roi du nord",
      "value": "300"
    },
    {
      "type": "bras",
      "name": "Bras de roi du nord",
      "value": "300"
    },
    {
      "type": "torse",
      "name": "Torse de roi du nord",
      "value": "300"
    },
    {
      "type": "jambe",
      "name": "Jambe de roi du nord",
      "value": "300"
    },
    {
      "type": "cape",
      "name": "Cape de roi du nord",
      "value": "300"
    },
  ]
}];

// Create api version
const apiVersion = '/api/v1';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// GET /api/v1/armors
app.get(`${apiVersion}/armors`, (req, res) => {
  res.json({
    data : armors // Return all armors
  })
});

// GET /api/v1/armors/:id
app.get(`${apiVersion}/armors/:id`, (req, res) => {
  //get id
  const id = req.params.id - 1;//- 1 to retrieve the value of the array

  res.json({
    data : armors[id] || res.sendStatus(204)//Return this armors or no content if id doesn't exist
  })
  
});

// POST /api/v1/armors
app.post(`${apiVersion}/armors`, (req, res) => {

  console.log(req.body);
  console.log(req.body.helmetName);

    
  const data = req.body;// Get data with request body

  armors.push(data); // Push new armors in tab

  res.json({
    index : armors.length, // Returns the id corresponding to the new armor
    data : armors[armors.length -1] // Returns the new armor
  })
});

// PUT /api/v1/armors/:id
app.put(`${apiVersion}/armors/:id`, (req, res) => {
  //get id
  const id = req.params.id - 1;//- 1 to retrieve the value of the array 
  const data = req.body;// Get data with request body
  
  armors[id] = Object.assign(armors[id], data); // Merge id armors with data

  res.json({
    data : armors[id] // Returns the modified armor 
  })
});

// DELETE /api/v1/armors/:id
app.delete(`${apiVersion}/armors/:id`, (req, res) => {
  //get id
  const id = req.params.id - 1;//- 1 to retrieve the value of the array 

  armors.splice(id, 1); // Removes the armor where the id is equal to the id given in the url

  console.log("Armor with id : " + (id + 1) + " delete");

  res.sendStatus(200);// Return status OK
});

http.listen(3000, () => console.log('Listening on port 3000'));