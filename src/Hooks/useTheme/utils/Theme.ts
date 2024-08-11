
export const themeDefault = (): string=>{
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
