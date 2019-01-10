import axios from 'axios'

const api = axios.create(
    {baseURl: 'http://localhost:3000'}
)

export default api