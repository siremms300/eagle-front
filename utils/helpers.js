

export const CurrencyFormatter = (data)=> {

    return (data.amount * 100 / 100).toLocaleString(data.currency, {

        style: 'currency', 
        currency: data.currency
    })
}


export const StripeCurrencyFormatter = (data)=> {

    return (data.amount / 100).toLocaleString(data.currency, {

        style: 'currency', 
        currency: data.currency
    })
}