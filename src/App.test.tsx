import React from 'react';
import App from "./App";
import {setup} from "./utils/test-utils";
import {screen, waitFor} from "@testing-library/react";

describe('App', () => {
    it('renders without crashing', async () => {

        setup(<App/>)

        expect(await screen.findByText('NETWORK')).toBeInTheDocument()
    });
})


