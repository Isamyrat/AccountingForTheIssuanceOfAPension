import axios from "axios";

const WORK_API_BASE_URL = "http://localhost:8081/rest/work";

class WorkService{
    createWork(userId,work){
        return axios.post(WORK_API_BASE_URL + '/' + userId, work);
    }
    getById(id){
        return axios.get(WORK_API_BASE_URL + '/findById/' + id)
    }
    updateWork(work){
        return axios.put(WORK_API_BASE_URL, work);
    }
    deleteWork(id){
        return axios.delete(WORK_API_BASE_URL + '/' + id);
    }
}

export default new WorkService()