import { create } from 'zustand';

export type BuildArchetype = 'Ectomorph' | 'Mesomorph' | 'Endomorph' | 'Frame_XL' | null;

export interface Biometrics {
    height: number; // cm
    weight: number; // kg
    buildArchetype: BuildArchetype;
    faceData: string | null; // URI
    styleVector: Record<string, number>;
}

interface NovusState {
    biometrics: Biometrics;
    setHeight: (height: number) => void;
    setWeight: (weight: number) => void;
    setArchetype: (archetype: BuildArchetype) => void;
    setFaceData: (uri: string | null) => void;
    setStyleVector: (vector: Record<string, number>) => void;
}

export const useNovusStore = create<NovusState>((set) => ({
    biometrics: {
        height: 180, // Default start
        weight: 75,
        buildArchetype: null,
        faceData: null,
        styleVector: {},
    },
    setHeight: (height) =>
        set((state) => ({ biometrics: { ...state.biometrics, height } })),
    setWeight: (weight) =>
        set((state) => ({ biometrics: { ...state.biometrics, weight } })),
    setArchetype: (buildArchetype) =>
        set((state) => ({ biometrics: { ...state.biometrics, buildArchetype } })),
    setFaceData: (faceData) =>
        set((state) => ({ biometrics: { ...state.biometrics, faceData } })),
    setStyleVector: (styleVector) =>
        set((state) => ({ biometrics: { ...state.biometrics, styleVector } })),
}));
