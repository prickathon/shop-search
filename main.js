// forked from dairoza's "2018-02-11 1st" http://jsdo.it/dairoza/SrI8


const CharaData = {
    0: {
        'chara_name': 'みらい',
        'title_color': 'HotPink',
        'panel_color': 'pink darken-1',
    },
    1: {
        'chara_name': 'えも',
        'title_color': 'DeepSkyBlue',
        'panel_color': 'yellow darken-1',
    },
    2: {
        'chara_name': 'りんか',
        'title_color': 'MediumPurple',
        'panel_color': 'indigo darken-3',
    },
    3: {
        'chara_name': 'あんな',
        'title_color': 'Tomato',
        'panel_color': 'red darken-1',
    },
    4: {
        'chara_name': 'さら',
        'title_color': 'Crimson',
        'panel_color': 'teal darken-3',
    },
    /*
    number: {
        'chara_name': 'charaname',
        'title_color': font_color,
        'panel_color': materialize_panel_color,
    },
    */
}
var current_color = -1;

window.onload = () => {
    current_color = Math.floor(Math.random() * Object.keys(CharaData).length);
    var chara_name = CharaData[current_color]['chara_name'];
    document.getElementById('title-color').innerHTML = `${chara_name}ちゃんにあえる場所`;
    document.getElementById('title-color').style.color = CharaData[current_color]['title_color'];
}

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

    current_panel_color = CharaData[current_color]['panel_color']
    for (var i = 0; i < json.response.length; i++) {
        // 神ガチャはもう無いんだ…
        var name = json.response[i].name;
        var address = json.response[i].address;
        output += `<div class="card-panel ${current_panel_color}">
            <p class="white-text shopName">${name}
            </p><p class="white-text shopAdress">${address}
            </p></div>`;
    }

    if (output === "") {
        output = '<p>このあたりにプリチャンはないよー…</p>';
    }
    document.getElementById('search-result').innerHTML = output;
}