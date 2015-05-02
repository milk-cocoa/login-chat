# login-chat
chat app with signup

## 使い方

* /index.html

ログインしてチャットを行う画面。ログイン後は閲覧のみが出来る。


デモ：http://milk-cocoa.github.io/login-chat/


* /manage.html

チャットの投稿が出来るユーザを追加できる。

デモ：http://milk-cocoa.github.io/login-chat/manage.html

デモでは、誰でも管理画面がいじれるようになっています。


## 動かし方

auth0の設定はこちら。 https://mlkcca.com/document/start-js-auth.html

security.ruleはmilkcocoaの管理画面で貼付ける。

security.rule内の、allowsにて管理ユーザのIDを指定しておく。そのユーザだけmanage.htmlでユーザの追加ができるようになる。


```
allows {
    permit : all;
    rule : account.sub == "auth0|55450586ff858d44336428aa"; <- 管理ユーザのID
}
```

