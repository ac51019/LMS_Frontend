import { createSlice } from '@reduxjs/toolkit';

const getInitialThemeStatus = () => {
    try {
        const storedTheme = window.localStorage.getItem("theme");
        if (storedTheme) {
            return storedTheme === "dark";
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (error) {
        return false;
    }
};

const initialState = {
    isDarkMode: getInitialThemeStatus(),
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            try {
                const root = window.document.documentElement;
                if (state.isDarkMode) {
                    root.classList.add("dark");
                    window.localStorage.setItem("theme", "dark");
                } else {
                    root.classList.remove("dark");
                    window.localStorage.setItem("theme", "light");
                }
            } catch (error) {
                console.error(error);
            }
        },
        initTheme: (state) => {
            try {
                const root = window.document.documentElement;
                if (state.isDarkMode) {
                    root.classList.add("dark");
                } else {
                    root.classList.remove("dark");
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
});

export const { toggleTheme, initTheme } = themeSlice.actions;

export default themeSlice.reducer;
