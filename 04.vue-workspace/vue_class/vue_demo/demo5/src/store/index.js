import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedstate from 'vuex-persistedstate';

Vue.use(Vuex);

export const names = {
    state_count: "count",
};
export default new Vuex.Store({
    plugins: [createPersistedstate({
        storage: window.sessionStorage,
        reducer:(state)=>{
            return{
                count:state.count
            }
        }
    })],
    state: {
        count: 5,
    },
    getters: {},
    mutations: {
        increment(state) {
            state.count++;
        },
    },
    actions: {},
    modules: {},
});
