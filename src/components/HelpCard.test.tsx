import React from 'react';
import {render} from '@testing-library/react'
import { HelpCard } from "./HelpCard";


describe("HelpCard", () => {

    test("contains help information for keyboard users", () => {
        render(<HelpCard />);
        const items = document.querySelectorAll("li");

        expect(items.length).toEqual(4);
        expect(items[1].textContent).toEqual("Arrow KeysMove the Snake");
        expect(items[2].textContent).toEqual("NNew Game");
        expect(items[3].textContent).toEqual("PPause / Resume Game");
    })
})

export {}