"use client";
import { createContext, Dispatch } from "react";


export enum SupportedLanguages {
    English = 'en',
    Spanish = 'es',
    French = 'fr',
    German = 'de',
    Chinese = 'zh',
    Japanese = 'ja',
    Hindi = 'hi',
    Arabic = 'ar',
}

type LanguageStateType = {
    lang: string;
}

const initialLanguage: LanguageStateType = {
    lang: SupportedLanguages.Arabic,
};


export const LanguageContext = createContext<{
    state: LanguageStateType;
    setLanguage: Dispatch<LanguageStateType>;
}>({
    state: initialLanguage,
    setLanguage: () => { },
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <LanguageContext.Provider value={{
            state: initialLanguage,
            setLanguage: () => { },
        }}>
            {children}
        </LanguageContext.Provider>
    );
};