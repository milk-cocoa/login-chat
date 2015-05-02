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
		//"allows"データストアを作成
		var ds = milkcocoa.dataStore("allows");

		//"allows"データストアからユーザIDを取ってくる
		var stream = ds.stream().sort("desc").size(10);
		stream.next(function(e, d) {
			d.forEach(function(m) {
				renderMessage(m);
			});
		});

		userDataStore.list(function(err, list) {
			list.forEach(function(user) {
				$("#content").html("<option>"+user.id+"</option>");
			});
		});

		//4."message"データストアのプッシュイベントを監視
		ds.on("set", function(e) {
			renderMessage(e);
		});

		var last_message = "dummy";

		function renderMessage(allowed) {
			var elem_id = allowed.id.replace("|", "-");
			var message_html = '<p class="post-text">' + escapeHTML(allowed.id) + '</p>';
			$("#"+last_message).before('<div id="'+elem_id+'" class="post">'+message_html +'</div>');
			last_message = elem_id;
		}

		function post() {
			//5."message"データストアにメッセージをプッシュする
			var user_id = escapeHTML($("#content").val());
			if (user_id && user_id !== "") {
				ds.set(user_id, {});
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

	function escapeHTML(val) {
		return $('<div>').text(val).html();
	};
});
