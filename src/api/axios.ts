import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Добавляем access_token в каждый запрос
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `jwt ${token}`
  }
  return config
})

// Обновляем access_token, если истёк (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh_token')
    ) {
      originalRequest._retry = true

      try {
        const refresh = localStorage.getItem('refresh_token')
        const res = await axios.post('http://localhost:8000/api/v1/auth/refresh/', {
          refresh: refresh,
        })

        const newAccess = res.data.access
        localStorage.setItem('access_token', newAccess)

        originalRequest.headers.Authorization = `jwt ${newAccess}`
        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.reload()
      }
    }

    return Promise.reject(error)
  }
)

export default api
