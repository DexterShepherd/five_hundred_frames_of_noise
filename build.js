console.log('building 500 frames of noise');
var page = require('webpage').create();

page.open("http://dexterjshepherd.com/five_hundred_frames_of_noise", function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    setTimeout(function() {
      page.render(Date.now() + '.png');
      phantom.exit();
    }, 10000);
  } else {
    console.log('exiting with errors');
    phantom.exit();
  }
});

