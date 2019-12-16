'use strict';
const socket = io();

function postArmor() {
  fetch('/api/v1/armors', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: $('#armorName').val(),
      composition: [
        {
          type: "helmet",
          helmetName: $('#helmetName').val(),
          helmetValue: $('#helmetValue').val()
        },
        {
          type: "arms",
          armsName: $('#armsName').val(),
          armsValue: $('#armsValue').val()
        },
        {
          type: "chest",
          chestName: $('#chestName').val(),
          chestValue: $('#chestValue').val()
        },
        {
          type: "legs",
          legsName: $('#legsName').val(),
          legsValue: $('#legsValue').val()
        },
        {
          type: "Mantle",
          mantleName: $('#mantleName').val(),
          mantleValue: $('#mantleValue').val()
        }
      ]
    })
  })
  
}
