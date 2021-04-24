import Api from './Api';


export default {
    addimage(formimg) {
        return Api.post("/upload ", formimg);
    },



}