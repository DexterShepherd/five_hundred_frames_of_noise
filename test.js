const Twit = require('twit');
const fs = require('fs');
const keys = require('./keys');
const renderer = require('./renderer');

const client = new Twit(keys);
var interval = 1000*60*60*12;


renderer.render(function(){
  fs.readFile('./render.png', { encoding: 'base64' }, function(err, data) {
    if(err){
      return console.log(err);
    }

    console.log('would post media');
    var id = data.media_id_string
    var alt = "500 frames of noise";
    var meta = { media_id: id, alt_text: { text: alt } };
    
    console.log('would post meta');
    var params = { media_ids: [id] } 
    console.log('Tweeted!');
  });
})
