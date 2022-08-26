import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const module_a = {
  namespaced: true,
  state: function() {
    return {
      count: 100,
    }
  },
  getters: {
    get_count(state, getters, rootState, rootGetters) {
      console.log(rootState);
      return state.count * rootState.count;
    }
  },
  mutations: {
    add_count(state, payload) {
      state.count += payload
    }
  }
}

export default new Vuex.Store({
	state: {
		count: 10,
		msg: "state中的msg",
		list: [1, 3, 5, 7, 9],
    token: ""
	},
	// 与计算属性有一样功能
	getters: {
		get_list(state, getters) {
			console.log(state, getters);
			return state.list.filter((item) => item > 5);
		},
	},
	mutations: {
		// 被actions调用，或者在组件中调用
		add_count(state, payload, a) {
			console.log(payload, a);
			state.count += payload;
		},
		sub_count(state, payload) {
			console.log(payload);
			state.count -= payload.val;
		},
    set_token(state, payload){
      state.token = payload
    }
	},
	actions: {
		//可以调用mutations中的方法
		login(context, payload) {
			fetch("http://localhost:3000/login.do", {
				method: "post",
				body: JSON.stringify(payload),
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((resp) => resp.json())
				.then((json) => {
          console.log(json);
          context.commit("set_token", json.token_header + json.token); //推荐
          // context.state.token = json.token_header + json.token; //不推荐，state只是用来获取数值的
        });
		},
	},
	modules: {
    module_a: module_a
  },
});
