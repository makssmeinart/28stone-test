import { createGlobalStyle } from "styled-components"

// You can call color-variables better names that first/second but since I know that I'm the only one working on this project and its small its fine.
export const GlobalStyles = createGlobalStyle`
:root {
    --first-color: #233142;
    --second-color: #455d7a;
    --accent-color: #f95959;
    --fourth-color: #e3e3e3;
}

*,*::before,*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    height: 100vh;
    box-sizing: inherit;
    font-size: 16px;
    background-color: var(--first-color);
    color: var(--second-color);
    font-family: 'Roboto', sans-serif;
}

li {
    list-style: none;
}

ul {
    padding-left: 0;
}

`