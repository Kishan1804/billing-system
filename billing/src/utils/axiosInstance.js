import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3000"
})

instance.interceptors.request.use((config) => {
    const storedUser = localStorage.getItem('user')

    if(storedUser) {
        const user = JSON.parse(storedUser)
        if(user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`
        }
    }

    return config
})


export default instance