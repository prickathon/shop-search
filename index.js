// forked from dairoza's "2018-02-11 1st" http://jsdo.it/dairoza/SrI8
//ボタンが押されたら呼ばれる処理
function hoge(){
    document.getElementById('helloWorld').innerHTML ="システム接続中でーす!";
    var text = document.getElementById('textinput').value;
    var gachaFilter = document.getElementById('gachaFilter').checked;
    request(text,gachaFilter);
}

//WebAPIにアクセス
function request(text,gachaFilter){
    var script = document.createElement('script');
    var baseurl = "https://script.google.com/macros/s/AKfycbwoTfLoZJEktYH_RQq0BNStXFHCKhRi9rC1Sb16xsc2LGbepTU/exec";
    script.src = baseurl + "?callback=receiveJson&keyword=" + encodeURI(text) + "&gachaFilter=" + encodeURI(gachaFilter);
    document.body.appendChild(script);
}

//WebAPIで取得した情報を受け取って処理す
function receiveJson(json){

    var output = "";
    
    for( var i = 0; i < json.response.length; i++ ){
        
        gachatext　= "";
        
        if(json.response[i].hasGacha){
            gachatext = "ガチャがおいてあるよ！"
        }
        
        var html = '<div style="border: dashed 2px grey;margin:10px">';
        html += '<p class="shopName">' + json.response[i].name +'</p>';
        html += '<p class="shopAdress">' + json.response[i].address +'</p>';
        html += '<p class="hasGacha">' + gachatext +'</p>';
        html += '</div>';
        output += html;
    }    
    
    document.getElementById('helloWorld').innerHTML = output;
    
}