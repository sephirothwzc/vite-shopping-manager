import { defineStore } from 'pinia';

export type AppUserType = {
  jwt: string;
  username: string;
  phone: string;
  id: string;
};

export const useAppStore = defineStore('app', {
  state: (): { appUser: AppUserType | undefined } => ({ appUser: undefined }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment(appUser: any) {
      this.appUser = appUser;
    },
  },
});
