import React, { FunctionComponent } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
    }

    html {
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
    }

    * {
        box-sizing: border-box;
    }
`;

const Wrapp = styled.div`
    font-size: 1.5rem;
    display: flex;
`;

export const App: FunctionComponent = () => {
    return (
        <>
            <GlobalStyle />
            <Wrapp>
                Hello world!
            </Wrapp>
        </>
    );
}
