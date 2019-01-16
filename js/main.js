function jsonp(url, rcb, cb) {
    var script = document.createElement('script');
    var random = Math.floor(Math.random() * 100000)
    script.setAttribute('src', url + '&_=' + random);
    script.setAttribute('class', 'jsonp');
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
    var callback = function (data) {
        cb(data);
        head.removeChild(script);
    };
    window[rcb] = callback;
}

function lwlhitokoto(){
    var api = "https://api.lwl12.com/hitokoto/v1?encode=json";
    var rcb = "echokoto";
    var cb = function (data) {
        if ((data.code = 200 && data.hitokoto.length > 30)) {
            jsonp(api, rcb, cb);
        } else {
            document.getElementById("lwlhitokoto").innerText = data.hitokoto;
        }
    };
    jsonp(api, rcb, cb);
}