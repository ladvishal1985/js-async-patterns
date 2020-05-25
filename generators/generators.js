function fakeAjax(url, cb) {
    var fake_responses = {
        "file1": "The first text",
        "file2": "The middle text",
        "file3": "The last text"
    };
    var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

    console.log("Requesting: " + url);

    setTimeout(function () {
        cb(fake_responses[url]);
    }, randomDelay);
}

function output(text) {
    console.log(text);
}

// **************************************

function getFile(file) {
    return new Promise(function (resolve) {
        fakeAjax(file, resolve);
    });
}


function gnRunner(genFn) {
    const itr = genFn();
    function run(args) {
        const result = itr.next(args);
        if (result.done) {
            return result.value;
        } else {
            return Promise.resolve(result.value).then(run)
        }
    }
    return run();
}

// Request all files at once in
// "parallel" via `getFile(..)`.


function *getAllfiles() {
    var p1 = getFile("file1");
    var p2 = getFile("file2");
    var p3 = getFile("file3");


    output(yield p1)
    output(yield p2)
    output(yield p3)
    output("Complete!");
}

gnRunner(getAllfiles)