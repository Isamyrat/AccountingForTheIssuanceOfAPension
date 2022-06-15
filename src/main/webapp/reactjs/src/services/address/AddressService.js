import axios from "axios";

const ADDRESS_API_BASE_URL = "http://localhost:8081/rest/address";

class AddressService{
    createAddress(userId,address){
        return axios.post(ADDRESS_API_BASE_URL + '/' + userId, address);
    }
    getAddressUserId(userId){
        return axios.get(ADDRESS_API_BASE_URL + '/' + userId)
    }
    getById(id){
        return axios.get(ADDRESS_API_BASE_URL + '/findById/' + id)
    }
    updateAddress(address){
        return axios.put(ADDRESS_API_BASE_URL, address);
    }
}

export default new AddressService()