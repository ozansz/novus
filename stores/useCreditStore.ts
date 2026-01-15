import { create } from 'zustand';

export type UserStatus = 'ROOKIE' | 'PRIME';

interface CreditState {
    credits: number;
    status: UserStatus;
    addCredits: (amount: number) => void;
    deductCredits: (amount: number) => void;
    setStatus: (status: UserStatus) => void;
}

export const useCreditStore = create<CreditState>((set) => ({
    credits: 50,
    status: 'ROOKIE',
    addCredits: (amount) =>
        set((state) => ({ credits: state.credits + amount })),
    deductCredits: (amount) =>
        set((state) => ({ credits: Math.max(0, state.credits - amount) })),
    setStatus: (status) => set({ status }),
}));
