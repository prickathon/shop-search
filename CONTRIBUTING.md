# shop-search開発の心得

## 開発の準備

そのPCで作業を開始するための準備です．

この作業は最初だけで大丈夫です．

### Gitをインストールする

ここが参考になると思います．
http://proengineer.internous.co.jp/content/columnfeature/6893

### フォルダを用意する

リポジトリ(開発用にソースコードを置いておく場所)を設置するフォルダを作り，コマンドプロンプトで作ったフォルダに移動します．

例:マイドキュメント内にGitHubフォルダを作成し，コマンドプロンプトで`cd C:\Users\ユーザ名\Documents\GitHub`とコマンド入力(ユーザ名は置き換えてください)

### `git clone`をする

そのあと，`git clone`というコマンドを実行して，自分のPCへソースコードをダウンロードします．完了したら，フォルダ内に「shop-search」というフォルダがあると思います．

例:`git clone https://github.com/prickathon/shop-search.git`とコマンド入力

## 開発を行う

開発を行う際の手順です．

### リポジトリへ移動する

コマンドプロンプトでリポジトリのあるフォルダに移動します．

例：`cd C:\Users\ユーザ名\Documents\GitHub\shop-search`とコマンド入力(ユーザ名は置き換えてください)

### `git pull`をする

`git pull`というコマンドで最新のソースコードをダウンロードします．

例:`git pull`というコマンドを実行

### 作業を行う

ソースコードを編集してください．
`index.html`をブラウザで開いて結果を見ながら開発するとやりやすいです．

### `git add`を行う

編集したファイルをGitのシステムに登録します．

例:`git add index.html`というコマンドを実行(index.htmlを編集した場合です)

### `git commit`を行う

編集した内容にコメントを付けます．

例:`git commit -m "フォントを変更"`というコマンドを実行("フォントを変更"といった部分は自由にわかりやすいように変更してください)

### `git push`を行う

変更内容をGtiHubに送信します

例:`git push`