"use client";

import { User, Role } from './types';
import { MOCK_USERS } from './mock-data';

// Simple session store simulation
class AuthStore {
  private static instance: AuthStore;
  private currentUser: User | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('codehub_user');
      if (saved) this.currentUser = JSON.parse(saved);
    }
  }

  public static getInstance(): AuthStore {
    if (!AuthStore.instance) {
      AuthStore.instance = new AuthStore();
    }
    return AuthStore.instance;
  }

  public login(email: string, role: Role): User | null {
    const user = MOCK_USERS.find(u => u.email === email && u.role === role);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('codehub_user', JSON.stringify(user));
      return user;
    }
    return null;
  }

  public logout() {
    this.currentUser = null;
    localStorage.removeItem('codehub_user');
  }

  public getUser(): User | null {
    return this.currentUser;
  }
}

export const authStore = AuthStore.getInstance();