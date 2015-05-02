# login-chat
chat app with signup


* /index.html

ログインしてチャットを行う画面。ログイン後は閲覧のみが出来る。



* /manage.html

チャットの投稿が出来るユーザを追加できる。



auth0の設定はこちら。 https://mlkcca.com/document/start-js-auth.html

security.ruleはmilkcocoaの管理画面で貼付ける。

security.rule内の、allowsにて管理ユーザのIDを指定しておく。そのユーザだけmanage.htmlでユーザの追加ができるようになる。


```
allows {
    permit : all;
    rule : account.sub == "auth0|55450586ff858d44336428aa"; <- 管理ユーザのID
}
```