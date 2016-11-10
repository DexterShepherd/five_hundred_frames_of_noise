const phantom = require('phantom');

console.log('building 500 frames of noise ' + new Date().toLocaleString());


exports.render = function(callback) {
  var phantom_instance;
  var phantom_page;

  phantom.create().then(instance => {
    phantom_instance = instance; 
    return instance.createPage();
  }).then(page => {
    phantom_page = page;
    return page.open("http://dexterjshepherd.com/five_hundred_frames_of_noise");
  }).then(status => {
    console.log(status);
    if(status === "success") {
      setTimeout(function() {
        phantom_page.render('render.jpg');
        phantom_instance.exit();
        setTimeout(function(){ callback() }, 1000);
      }, 10000);
    } else {
      console.log('exiting with errors');
      phantom_instance.exit();
    }
  });
}
