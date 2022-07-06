import fetch from 'node-fetch'

const xpub = 'ypub6X3EopVMvcdZ2L995TQHwkjrCgfndCBknohYv9wrzWL6bwrm8vwMqEswiYkM3Dd26oentWmCSPuAwkHJmFwfxj5eJfx2THqL9N11APCdmBk'


setInterval(() => {
    fetch(`https://btc1.trezor.io/api/v2/xpub/${xpub}`)
        .then(response => response.json())
        .then(data => console.log(data))
}, 1000)


