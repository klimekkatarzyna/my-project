import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import * as apiUrl from './services';
import CHF from './assets/szwajcaria.jpg';
import USD from './assets/usa.jpg';
import GBP from './assets/wielka-brytania.jpg';

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


const request = (url : string) => fetch(url).then(response => response.json());

interface AppState {
    selectedItem: number;
    currencyValues: {
        [key: string]: {
            baseValue: number;
            nextValue: number;
        };
    }
    currencies: {
        imgUrl: string
        baseCurrency: string;
        nextCurrency: string;
    }[]
}

export class App extends Component<{}, AppState> {
    state: AppState = {
        selectedItem: 0,
        currencyValues: {},
        currencies: [{
            imgUrl: GBP,
            baseCurrency: 'GBP',
            nextCurrency: 'EUR'
        }, {
            imgUrl: CHF,
            baseCurrency: 'CHF',
            nextCurrency: 'USD'
        }, {
            imgUrl: USD,
            baseCurrency: 'USD',
            nextCurrency: 'GBP'
        }]
    }

    componentDidMount() {
        const initialCurrency = this.state.currencies[0];
        request(apiUrl.getCurrency(initialCurrency.baseCurrency)).then(response => {
            this.setState(currentState => ({
                currencyValues: {
                    ...currentState.currencyValues,
                    [initialCurrency.baseCurrency]: {
                        baseValue: response && response.rates[initialCurrency.baseCurrency],
                        nextValue: response && response.rates[initialCurrency.nextCurrency]
                    }
                }
            }));
        })
    }
    
    onChange = (index: number, item: React.ReactNode) => {
        const currency = this.state.currencies[index];

        request(apiUrl.getCurrency(currency.baseCurrency)).then(response => {
            this.setState(currentState => ({
                selectedItem: index,
                currencyValues: {
                    ...currentState.currencyValues,
                    [currency.baseCurrency]: {
                        baseValue: response && response.rates[currency.baseCurrency],
                        nextValue: response && response.rates[currency.nextCurrency]
                    }
                }
            }));
        });
    }

    render() {
        const { currencyValues, currencies, selectedItem } = this.state;

        return (
            <>
                <GlobalStyle />
                <Wrapp>
                    <Carousel infiniteLoop={true} showArrows={true} showThumbs={false} onChange={this.onChange} selectedItem={selectedItem}>
                        {currencies.map((item) => (
                            <div key={item.baseCurrency}>
                                <img src={item.imgUrl} alt={item.baseCurrency} />
                                <p className="legend">
                                    {currencyValues[item.baseCurrency] && (
                                        <>
                                            {currencyValues[item.baseCurrency].baseValue} {item.baseCurrency}
                                            {' / '}
                                            {currencyValues[item.baseCurrency].nextValue} {item.nextCurrency}
                                        </>
                                    )}
                                </p>
                            </div>
                        ))}
                    </Carousel>
                </Wrapp>
            </>
        );
    }
}
