(function(global){
	function UserDataStore(milkcocoa) {
		var ds = milkcocoa.dataStore("users");
		return {
			save : function(profile) {
				ds.set(profile.user_id, {
					username : profile.nickname
				});
			},
			get : function(user_id, cb) {
				ds.get(user_id, cb);
			},
			list : function(cb) {
				ds.stream().size(100).next(cb);
			}
		}

	}
	global.UserDataStore = UserDataStore;
}(window))
