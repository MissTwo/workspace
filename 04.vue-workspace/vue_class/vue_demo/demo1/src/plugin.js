export default {
    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    gender: '男',
                };
            },
        });
    },
};