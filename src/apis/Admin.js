import Api from './Api';
import VueRouter from 'vue-router'
export default {

    getRooms() {
        return Api.get('/rooms');
    },
    async adduser(form) {
        Api.post("/pages", form);
        // router.push('/Showuser');
    },
    getuser() {

        // return Api.get('/pages');

    },
    deleteuser(id, users) {
        let i = users.map((data) => data.id).indexOf(id);
        users.splice(i, 1);
        // users.slice(id, 1);
        return Api.delete(`/pages/${id}`);
    },
    async edituser(id, user) {


        Api.post(`/pages/${id}`, user);
        // router.push('/Showuser');

        // api / pages / { page }


    }
}