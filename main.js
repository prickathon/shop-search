// forked from dairoza's "2018-02-11 1st" http://jsdo.it/dairoza/SrI8
//ボタンが押されたら呼ばれる処理

function search_shop() {
    document.getElementById('search-result').innerHTML = "システム接続中でーす!";
    var text = document.getElementById('search-query').value;
    request(text);
}

//WebAPIにアクセス
function request(text) {
    var script = document.createElement('script');
    var baseurl = "https://script.google.com/macros/s/AKfycbyJRiaMbBD8dbmDxfUOLVXYQi98Pa0cfcLXnX1D/exec";
    script.src = baseurl + "?callback=receiveJson&keyword=" + encodeURI(text);
    document.body.appendChild(script);
}

// WebAPIで取得した情報を受け取って処理し
function receiveJson(json) {
    var output = "";

    for (var i = 0; i < json.response.length; i++) {
        // 神ガチャはもう無いんだ…
        var name = json.response[i].name;
        var address = json.response[i].address;
        output += `<div class="card-panel pink lighten-2">
            <p class="white-text shopName">${name}
            </p><p class="white-text shopAdress">${address}
            </p></div>`;
    }

    if (output === "") {
        output = '<p>このあたりにプリチャンはないよー…</p>';
    }
    document.getElementById('search-result').innerHTML = output;
}