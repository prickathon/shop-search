// forked from dairoza's "2018-02-11 1st" http://jsdo.it/dairoza/SrI8

// https://gist.github.com/naheedakhtar/3259979
var getParameterByName = function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

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
var current_color = 0;

window.onload = () => {
    // color指定あれば使うし、そうでなければランダム
    var color_param = getParameterByName('color_set');
    if (color_param) {
        // 雑な不整値対策
        current_color = Math.abs(color_param) % 5;
    } else {
        current_color = Math.floor(Math.random() * Object.keys(CharaData).length);
    }

    // キャラごとに色を変える
    // FIXME: 追加ロジックがイケてない
    var chara_name = CharaData[current_color]['chara_name'];
    document.getElementById('title-color').innerHTML = `${chara_name}ちゃんにあえる場所`;
    document.getElementById('title-color').style.color = CharaData[current_color]['title_color'];
    for(var elem of CharaData[current_color]['panel_color'].split(' ')) {
        document.getElementById('search-button').classList.add(elem);
    }
}

function get_color_inner_text(text) {
    var c = CharaData[current_color]['title_color'];
    return `<font color=${c}>${text}</font>`;
}

//ボタンが押されたら呼ばれる処理
function search_shop() {
    document.getElementById('search-result').innerHTML = get_color_inner_text("システム接続中でーす!");
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

    // キャラごとに色を変える
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
        var text = get_color_inner_text('このあたりにプリチャンはないよー…');
        output = `<p>${text}</p>`;
    }
    document.getElementById('search-result').innerHTML = output;
}