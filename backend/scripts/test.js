import fetch from 'node-fetch'

const myXpub = "xpub6BgPzx2VWnTQMKcRTJhfZsaYWRRNSjSJ1M3G3GcRk244aBY6CRuKGeBqiJmuGa4mBAWaSVk2bWbHJouAVGqXkuZksMTxxE8FkyDZ968o4dk"

const websocket = new WebSocket('wss://ws.blockchain.info/inv')

console.log(websocket)

// setInterval(() => {
//     fetch(`https://blockchain.info/balance?active=${myXpub}`)
//         .then(response => response.json())
//         .then(data => console.log(data))

// }, 1000)