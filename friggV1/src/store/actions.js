import axios from "axios";
import router from "@/main";

export default {
    async registerUser(state, payload) {
        axios.post(`${process.env.VUE_APP_DB_HOST_URL}/api/authenticate/register`, {
            name: payload.name,
            mail: payload.mail,
            pwd: payload.pwd,
            pwdRepeat: payload.pwdRepeat,
        }, { withCredentials: true}).then((res) => {
            if(res.data.status === 'success') {
                router.push('/login');
                this.commit('handleMessage', {
                data: res.data
                })
            }
            else this.commit('handleMessage', {
                data: res.data
            })
        });
    },
    async loginUser(state, payload) {
        axios.post(`${process.env.VUE_APP_DB_HOST_URL}/api/authenticate/login`, {
            name: payload.name,
            pwd: payload.pwd,
        }, {withCredentials: true}).then((res) => {
            if(res.data.data && res.data.data.name) {
            this.commit('setHeader', {
                login: {
                    name: res.data.data.name,
                    id: res.data.data.id,
                }
            });
            router.push('/')
            } else this.commit('handleMessage', {
            data: res.data
            })
        })
    },
    async logoutUser() {
        axios.post(`${process.env.VUE_APP_DB_HOST_URL}/api/authenticate/logout`, {},{ withCredentials: true }).then(() => {
        this.commit('setHeader', {})
    })
  },
};
