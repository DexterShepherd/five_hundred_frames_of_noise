const Twit = require('twit');
const fs = require('fs');
const keys = require('./keys');
const renderer = require('./renderer');

const client = new Twit(keys);
var interval = 1000*60*60*6;



setInterval(renderer.render(function() {
  fs.readFile('./render.png', { encoding: 'base64' }, function(err, data) {
    if(err){
      return console.log(err);
    }
    client.post('media/upload', { media_data: data }, function(err, data, response) {
      var id = data.media_id_string
      var alt = "500 frames of noise";
      var meta = { media_id: id, alt_text: { text: alt } };

      client.post('media/metadata/create', meta, function(err, data, response) {
        if(err){
          console.log(err);
        } else {
          var params = { media_ids: [id] } 

          client.post('statuses/update', params, function(err, data, response) {
            console.log('Tweeted!');
          });
        }
      });
    });
  });
}), interval);
