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
#### git pushする際の注意
* git pushする前に必ずnpm run esdocを叩いて、ドキュメントを最新化しましょう
* 可能であればドキュメントカバレッジ100%であることが望ましいです

### 単体テスト(mocha)
```bash
$ npm test
# 単体テストの結果が表示される
```
### 単体テスト(karma)
```bash
$ npm run karma
# karmaが起動する
# http://localhost:9876/にアクセスするとブラウザとkermaがconnectする
```



## 参加メンバー
* 大甲 隼土,岡村 誠,座間 哲也,武田 大輔,西山 顯,樫本 菜摘,小林 世弥,齋藤 一樹,遠畑 真理奈,山崎 正継,石割 次郎,須田 菜月,福田 直美,佐藤 友希乃,羽根田 奨,本間 稔,松尾 秀城
