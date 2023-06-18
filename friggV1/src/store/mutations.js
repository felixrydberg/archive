import router from "@/main";

export default {
    setHeader: (state, payload) => {
        state.user.dummy = false;
        if(payload.login) {
          state.user.name = payload.login.name;
          state.user.url = `${location.origin}/profile?profileId=${payload.login.id}`;
        } else {
          state.user.name = undefined;
        }
    },
    handleMessage: (state, payload) => {
        const {action, target, status, message} = payload.data;
        if(action && target){
            switch(action) {
            case 'redirect':
                router.push(target);
            break; 
            }
        }
        state.message.status = 'show';
        state.message.type = status;
        state.message.message = message;
        if(state.message.type === 'success') {
            setTimeout(() => {
            if(state.message.type !== 'error') state.message.status = 'hidden';
            }, 1000);
        }
    },
}