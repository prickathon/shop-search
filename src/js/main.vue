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
        <form @submit.prevent="getShops">
            <div class="input-field col s12 m12">
                <input type="text" v-model="search_word" id="search-query" class="validate">
                <label class="active" for="search-query">キーワードをいれてね！(例:「秋葉原」)</label>
            </div>
            <div class="col s12 m12">
                <label>
                    <button type="submit" :class="'waves-effect waves-light btn '+ panel_color" id="search-button">
                        <span class="white-text">さがす</span>
                    </button>
                </label>
            </div>
        </form>
    </div>

    <div class="row">
        <div class="col s12">
            <span id='search-result'>
                <div v-for="shop in shops" :key="shop.shop.value" :class="'card-panel ' + panel_color">
                    <p class="white-text shopName">{{shop.name.value}}</p>
                    <p class="white-text shopAdress">{{shop.address.value}}</p>
                    <a :href="`http://maps.google.com/maps?q=${shop.name.value}`" target="_blank" rel="noopener noreferrer" class="btn">GoogleMap で開く</a>
                </div>
                <span v-if="shops.length==0 && pushed"><font :color="title_color">このあたりにプリチャンはないよー…</font></span>
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
        theme:0,
        pushed: false
    }),
    methods:{
        async getShops(){
            this.pushed = true
            const query = `
            PREFIX prism: <https://prismdb.takanakahiko.me/prism-schema.ttl#>
            SELECT ?shop ?name ?address
            WHERE {
                ?shop a prism:Shop;
                    prism:name ?name;
                    prism:address ?address.
                filter (contains(?address,"${this.search_word}") || contains(?name,"${this.search_word}") )
            }`
            try {
                const response = await axios.get('https://prismdb.takanakahiko.me/sparql', {
                    params: { query, format: 'application/sparql-results+json' },
                    headers: { 'Content-Type': 'application/sparql-query+json' }
                })
                this.shops = response.data.results.bindings
            } catch (e) {
                console.log(e)
            }
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
    created:function(){
        var color_param = this.getParameterByName('color_set');
        if (color_param) {
            this.$data.theme = Math.abs(color_param) % 5;
        } else {
            this.$data.theme = Math.floor(Math.random() * Object.keys(CharaData).length);
        }
    }
}
</script>
