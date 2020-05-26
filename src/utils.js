const mockAJAXRequest = (url, cb) => {
  var fake_responses = {
    "url-1": "Response from First URL",
    "url-2": "Response from Second URL",
    "url-3": "Response from Third URL",
  };
  var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;
  console.log("Requesting: " + url);

  setTimeout(function () {
    cb(fake_responses[url]);
  }, randomDelay);
};

const output = (text) => {
  console.log(text);
};

module.exports = { mockAJAXRequest, output };
