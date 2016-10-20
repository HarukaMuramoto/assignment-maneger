# OnsenUI (angular)サンプルファイル

## 必要なモノ
1. nodejs
2. Cordova
3. gulp
4. [cordova-media-generator](https://github.com/rknell/cordova-media-generator)をインストール

## コマンド
|コマンド|内容|
|----|----|
|gulp|開発|
|gulp build|テーマ作成。```www/lib/onsenui/stylus/{{original}}-theme.styl```の様に新規で作成して、内容を調整したのちにコマンドを打つと、```www/lib/onsenui/css/onsen-css-components-{{original}}-theme.css```が出来上がるのでそれを参照する|
|mediagen|アプリアイコン生成|
|cordova platform add ios|ios環境作成|
|cordova build ios|iosビルド|
|cordova emulate ios|iosエミュレート|
