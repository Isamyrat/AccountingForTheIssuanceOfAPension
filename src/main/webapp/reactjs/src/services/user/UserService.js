import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8081/rest/user";


class UserService{
    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId)
    }
    updateUser(user){
        return axios.put(USER_API_BASE_URL, user);
    }
}

export default new UserService()