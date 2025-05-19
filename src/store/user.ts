import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | Record<string, any>,
    accessToken: localStorage.getItem('access_token'),
    refreshToken: localStorage.getItem('refresh_token'),
  }),

  actions: {
    async fetchUser() {
      if (!this.accessToken) return

      try {
        const response = await api.get('/auth/me/')
        this.user = response.data
      } catch (error: any) {
        console.error('Ошибка при получении пользователя', error)
      }
    },

    setTokens(access: string, refresh: string) {
        this.accessToken = access
        this.refreshToken = refresh
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
    },

    logout() {
        api.post('/api/v1/auth/logout/', {}, {
            headers: {
            Authorization: `jwt ${this.accessToken}`,
            },
        }).catch((err) => {
            console.error('Ошибка при выходе:', err)
        })

        this.accessToken = null
        this.refreshToken = null
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }
  }
})
