$(function() {
	var lock = new Auth0Lock(
		'y5iusMn9QtDgZepip8DkyIu4pPbS2Dyd',
		'milkcocoa.auth0.com'
		);
	var milkcocoa = new MilkCocoa("maxi977zd7k.mlkcca.com");
	var userDataStore = new UserDataStore(milkcocoa);
	milkcocoa.user(function(err, user) {
		if(user) {
			userDataStore.get(user.sub, function(err, userinfo) {
				if(err) {
					alert(err);
					return;
				}
				render(milkcocoa, userinfo);
			});
		} else {
			lock.show(function(err, profile, token) {
				if (err) {
					console.error(err);
					return;
				}
				milkcocoa.authWithToken(token, function(err, user) {
					if(err) {
						console.error(err);
						return;
					}
					userDataStore.save(profile);
					location.reload();
				});
			});
		}
	});


	function render(milkcocoa, userinfo) {
		console.log(userinfo);
		$("#user_id").html( userinfo.id );
		//2."message"データストアを作成
		window.ds = milkcocoa.dataStore("chat");

		//3."message"データストアからメッセージを取ってくる
		var stream = ds.stream().sort("desc").size(10);
		stream.next(function(e, d) {
			console.log(d);
			d.forEach(function(m) {
				renderMessage(m.value);
			});
		});

		//4."message"データストアのプッシュイベントを監視
		ds.on("push", function(e) {
			console.log(e);
			renderMessage(e.value);
		});

		var last_message = "dummy";

		function renderMessage(message) {
			var message_html = '<p class="post-text">' + escapeHTML(message.content) + '</p>';
			var date_html = '';
			if(message.date) {
				date_html = '<p class="post-date">'+escapeHTML( message.nickname + "," + new Date(message.date).toLocaleString())+'</p>';
			}
			$("#"+last_message).before('<div id="'+message.id+'" class="post">'+message_html + date_html +'</div>');
			last_message = message.id;
		}

		function post() {
			//5."message"データストアにメッセージをプッシュする
			var content = escapeHTML($("#content").val());
			if (content && content !== "") {
				ds.push({
					content: content,
					date: new Date().getTime(),
					nickname : userinfo.value.username
				});
			}
			$("#content").val("");
		}

		$('#post').click(function () {
			post();
		})
		$('#content').keydown(function (e) {
			if (e.which == 13){
				post();
				return false;
			}
		});

	}
	//インジェクション対策
	function escapeHTML(val) {
		return $('<div>').text(val).html();
	};
});
