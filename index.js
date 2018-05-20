// forked from dairoza's "2018-02-11 1st" http://jsdo.it/dairoza/SrI8
//ボタンが押されたら呼ばれる処理
function hoge(){
    document.getElementById('helloWorld').innerHTML ="システム接続中でーす!";
    var text = document.getElementById('textinput').value;
    request(text);
}

//WebAPIにアクセス
function request(text){
    var script = document.createElement('script');
    var baseurl = "https://script.google.com/macros/s/AKfycbyJRiaMbBD8dbmDxfUOLVXYQi98Pa0cfcLXnX1D/exec";
    script.src = baseurl + "?callback=receiveJson&keyword=" + encodeURI(text);
    document.body.appendChild(script);
}

// WebAPIで取得した情報を受け取って処理し
// FIXME:なんかもうちょっと上手く表示したいぷりね…
function receiveJson(json){

    var output = "";
    
    for( var i = 0; i < json.response.length; i++ ){
        
        gachatext　= "";
        
        if(json.response[i].hasGacha){
            gachatext = "ガチャがおいてあるよ！"
        }
        
        var html = '<div class="card-panel pink lighten-2">';
        html += '<p class="white-text shopName">' + json.response[i].name +'</p>';
        html += '<p class="white-text shopAdress">' + json.response[i].address +'</p>';
        html += '<p class="white-text hasGacha">' + gachatext +'</p>';
        html += '</div>';

        output += html;
    }    
    
    document.getElementById('helloWorld').innerHTML = output;
    
}