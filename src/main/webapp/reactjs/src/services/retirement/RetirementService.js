import axios from "axios";

const RETIREMENT_API_BASE_URL = "http://localhost:8081/rest/user/retirement";

class RetirementService{
    createRetirement(userId,retirement){
        return axios.post(RETIREMENT_API_BASE_URL + '/' + userId, retirement);
    }
    getRetirementByUserId(userId){
        return axios.get(RETIREMENT_API_BASE_URL + '/' + userId)
    }
    getRetirementByRetirementId(id){
        return axios.get(RETIREMENT_API_BASE_URL + '/findRetirement/' + id)
    }
    updateRetirement(retirement){
        return axios.put(RETIREMENT_API_BASE_URL, retirement);
    }
}

export default new RetirementService()