import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {},
    }
  },
  actions: {
    setUserInfo(val: any) {
      this.userInfo = val
    },
  },
})

export default useUserStore
