<template>
<div>
    <div class="row">
        <div class="col s12 m12">
            <span class="flow-text">
                <!-- らぁらちゃんはもういないんだ・・・ -->
                <h4>
                    <font id="title-color" :color="title_color">{{chara_name}}ちゃんにあえる場所</font>
                </h4>
            </span>
        </div>
    </div>

    <div class="row">
        <div class="input-field col s12 m12">
            <input type="text" v-model="search_word" id="search-query" class="validate">
            <label class="active">あなたのじゅうしょをいれてね！</label>
        </div>
    </div>

    <!--神ガチャはもういないんだ・・・ -->
    <div class="row">
        <div class="col s12 m12">
            <label>
                <button :class="'waves-effect waves-light btn '+ panel_color" id="search-button" v-on:click="getShops()">
                    <span class="white-text">さがす</span>
                </button>
            </label>
        </div>
    </div>

    <form action="cgi-bin/abc.cgi" method="post" />
    <div class="row">
        <div class="col s12">
            <span id='search-result'>
                <div v-for="shop in shops" :key="shop['.key']" :class="'card-panel ' + panel_color">
                    <p class="white-text shopName">{{shop.name}}</p>
                    <p class="white-text shopAdress">{{shop.address}}</p>
                </div>
                <span v-if="shops.length==0 && search_word"><font :color="title_color">このあたりにプリチャンはないよー…</font></span>
            </span>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

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

export default {
    data:()=>({
        shops:[],
        search_word:"", 
        theme:0
    }),
    methods:{
        getShops(){
            const baseurl = "https://script.google.com/macros/s/AKfycbyJRiaMbBD8dbmDxfUOLVXYQi98Pa0cfcLXnX1D/exec";
            axios.get(baseurl + "?keyword=" + encodeURI(this.search_word)).then(resp=>{this.shops=resp.data.response});
        },
        // https://gist.github.com/naheedakhtar/3259979
        getParameterByName(name) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        }
    },
    computed:{
        panel_color(){
            return CharaData[this.theme]['panel_color']
        },
        title_color(){
            return CharaData[this.theme]['title_color']
        },
        chara_name(){
            return CharaData[this.theme]['chara_name']
        }
    },
    onCreated(){
        var color_param = getParameterByName('color_set');
        if (color_param) {
            this.theme = Math.abs(color_param) % 5;
        } else {
            this.theme = Math.floor(Math.random() * Object.keys(CharaData).length);
        }
    }
}
</script>
