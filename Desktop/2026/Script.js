// CONFIGURATION & STATE
let state = {
    balance: parseFloat(localStorage.getItem('balance')) || 1000.00,
    currentPrice: 68420.50,
    isInitialized: false,
    history: []
};

let chart;
const accessCode = "4451";

// 1. TERMINAL INITIALIZATION
function unlockTerminal() {
    const input = document.getElementById('access-code').value;
    if(input === accessCode) {
        document.getElementById('gate-screen').classList.remove('active');
        initTerminal();
    } else {
        document.getElementById('gate-error').style.display = 'block';
    }
}

function initTerminal() {
    if(state.isInitialized) return;
    
    // Setup Chart
    const options = {
        series: [{ data: generateInitialData() }],
        chart: { 
            type: 'candlestick', 
            height: '100%', 
            toolbar: { show: false },
            animations: { enabled: false },
            background: 'transparent'
        },
        theme: { mode: 'dark' },
        xaxis: { type: 'datetime', labels: { show: false }, axisBorder: { show: false } },
        yaxis: { opposite: true, tooltip: { enabled: true } },
        plotOptions: { candlestick: { colors: { upward: '#00E676', downward: '#FF3D00' } } },
        grid: { borderColor: '#1C2128' }
    };

    chart = new ApexCharts(document.querySelector("#live-chart"), options);
    chart.render();
    
    startPriceEngine();
    updateUI();
    state.isInitialized = true;
}

// 2. PRICE ENGINE (Simulates "Market" behavior)
function startPriceEngine() {
    setInterval(() => {
        let volatility = (Math.random() * 12) - 6;
        let oldPrice = state.currentPrice;
        state.currentPrice += volatility;

        // UI Updates
        const priceEl = document.getElementById('price-tick');
        priceEl.innerText = state.currentPrice.toFixed(2);
        priceEl.className = volatility >= 0 ? 'price-up' : 'price-down';

        // Chart Update
        let now = new Date().getTime();
        let newCandle = {
            x: now,
            y: [oldPrice, oldPrice + 3, oldPrice - 3, state.currentPrice]
        };
        
        let currentData = chart.w.config.series[0].data;
        currentData.push(newCandle);
        if(currentData.length > 30) currentData.shift();
        
        chart.updateSeries([{ data: currentData }]);
    }, 2000);
}

// 3. TRADE LOGIC
function placeTrade(direction) {
    const amount = parseFloat(document.getElementById('trade-amount').value);
    const duration = parseInt(document.getElementById('trade-duration').value);
    const entryPrice = state.currentPrice;

    if(amount > state.balance) return alert("Insufficient Capital for this position.");

    state.balance -= amount;
    updateUI();

    // Create Active Trade Item
    const tradeId = Math.random().toString(36).substr(2, 9);
    const logItem = document.createElement('div');
    logItem.className = 'active-trade-ui';
    logItem.innerHTML = `
        <div class="trade-info">
            <span class="${direction.toLowerCase()}">${direction}</span> 
            <span>$${amount}</span>
            <span id="timer-${tradeId}">${duration}s</span>
        </div>
    `;
    document.getElementById('active-log').prepend(logItem);

    // Countdown Logic
    let remaining = duration;
    let timer = setInterval(() => {
        remaining--;
        document.getElementById(`timer-${tradeId}`).innerText = remaining + "s";

        if(remaining <= 0) {
            clearInterval(timer);
            let exitPrice = state.currentPrice;
            let isWin = false;

            if(direction === 'UP' && exitPrice > entryPrice) isWin = true;
            if(direction === 'DOWN' && exitPrice < entryPrice) isWin = true;

            if(isWin) {
                let payout = amount * 1.90;
                state.balance += payout;
                alert(`POSITION CLOSED: PROFIT +$${(payout - amount).toFixed(2)}`);
            } else {
                alert(`POSITION CLOSED: LOSS -$${amount.toFixed(2)}`);
            }
            
            logItem.remove();
            updateUI();
            saveState();
        }
    }, 1000);
}

// 4. UTILITIES
function updateUI() {
    document.getElementById('main-balance').innerText = `$${state.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
}

function saveState() {
    localStorage.setItem('balance', state.balance);
}

function toggleModal(type) {
    const m = document.getElementById(`modal-${type}`);
    m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
}

function copyWallet() {
    navigator.clipboard.writeText("0x7592766391918c7d3E7F8Ae72D97e98979F25302");
    alert("Encrypted Address Copied.");
}

function confirmDeposit() {
    alert("Transaction Hash Submitted. Verification in progress (Estimated 10m).");
    toggleModal('deposit');
}

function generateInitialData() {
    let data = [];
    let base = 68400;
    let now = new Date().getTime();
    for(let i=0; i<20; i++) {
        data.push({ x: now - (i * 2000), y: [base, base+5, base-5, base+2]});
    }
    return data;
}