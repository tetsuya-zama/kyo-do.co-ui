# 行き先掲示板サービス　"キョウ-ドコ？"のUIです。
## 環境構築
### 初期セットアップ
```bash
$ git clone https://github.com/tetsuya-zama/kyo-do.co-ui.git
$ cd kyo-do.co-ui
$ npm install
```
### ビルド
```bash
$ webpack
```
### 開発サーバの起動
```bash
$ npm start
# http://localhost:8080でデバッグできる
# ソースを修正すると再ビルドして即反映してくれる
# 止めるときはctrl+c 
```
### ドキュメント生成(esdoc)
```bash
$ npm run esdoc
# ./docsにドキュメントが生成される
```
#### 公式ページ
@see https://esdoc.org/
#### 生成されたドキュメントの公開先
@see https://tetsuya-zama.github.io/kyo-do.co-ui/


