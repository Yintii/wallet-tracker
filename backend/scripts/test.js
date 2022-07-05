import fetch from 'node-fetch'

const myXpub = "ypub6WWfJchQfTztCcoYHfVHmxg3gPZpPMRnvTZUpfWK82RwdHMKT64sthqyjWjVGUigaodPByLb4AwqC6WjCyFYZ9FMjhAPY8wk2hHCXeGqBvV"

await fetch(`https://btc1.trezor.io/api/v2/xpub/${myXpub}`)
    .then(response => response.json())
    .then(data => console.log(data))