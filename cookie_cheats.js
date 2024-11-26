// Made by: @pomcodes Youtube Channel | @r3dc0dez Github
const CookieCheat = {
    autoBuyInterval: null,
    buildingsEnabled: {},

    addCookies: function(amount) {
        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount < 0) {
            console.log('Please enter a valid positive number');
            return;
        }
        Game.cookies = Game.cookies + numAmount;
        Game.cookiesEarned = Game.cookiesEarned + numAmount;
        console.log(`Added exactly ${numAmount} cookies!`);
    },

    multiplyCookies: function(multiplier) {
        const numMultiplier = Number(multiplier);
        if (isNaN(numMultiplier) || numMultiplier <= 0) {
            console.log('Please enter a valid multiplier greater than 0');
            return;
        }
        const currentCookies = Game.cookies;
        const addition = currentCookies * (numMultiplier - 1);
        Game.cookies = Game.cookies + addition;
        Game.cookiesEarned = Game.cookiesEarned + addition;
        console.log(`Multiplied cookies by ${numMultiplier}!`);
    },

    getAllAchievements: function() {
        for (let i in Game.Achievements) {
            Game.Win(Game.Achievements[i].name);
        }
        console.log("Unlocked all achievements!");
    },

    getAllUpgrades: function() {
        for (let i in Game.Upgrades) {
            Game.Upgrades[i].earn();
        }
        console.log("Got all upgrades!");
    },

    setCookiesPerSecond: function(amount) {
        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount < 0) {
            console.log('Please enter a valid positive number');
            return;
        }
        const originalCps = Game.cookiesPs;
        const originalMultiplier = Game.globalCpsMult;
        
        Game.cookiesPs = numAmount;
        Game.globalCpsMult = 1;
        Game.recalculateGains = 0; 
        
        console.log(`Set cookies per second to ${numAmount}!`);
    },

    startAutoClick: function(clicksPerSecond = 100) {
        const numClicks = Number(clicksPerSecond);
        if (isNaN(numClicks) || numClicks <= 0) {
            console.log('Please enter a valid number of clicks greater than 0');
            return;
        }
        if (this.autoClickerInterval) {
            clearInterval(this.autoClickerInterval);
        }
        this.autoClickerInterval = setInterval(() => {
            Game.ClickCookie();
        }, 1000 / numClicks);
        console.log(`Started auto-clicking ${numClicks} times per second!`);
    },

    stopAutoClick: function() {
        if (this.autoClickerInterval) {
            clearInterval(this.autoClickerInterval);
            this.autoClickerInterval = null;
            console.log("Stopped auto-clicking!");
        }
    },

    startAutoBuy: function() {
        if (this.autoBuyInterval) {
            clearInterval(this.autoBuyInterval);
        }
        
        this.autoBuyInterval = setInterval(() => {
            for (let i in Game.Objects) {
                if (this.buildingsEnabled[i]) {
                    const building = Game.Objects[i];
                    if (Game.cookies >= building.getPrice()) {
                        building.buy(1); 
                    }
                }
            }
        }, 1000); 
        console.log("Started auto-buying buildings!");
    },

    stopAutoBuy: function() {
        if (this.autoBuyInterval) {
            clearInterval(this.autoBuyInterval);
            this.autoBuyInterval = null;
            console.log("Stopped auto-buying buildings!");
        }
    },

    toggleBuilding: function(buildingId) {
        this.buildingsEnabled[buildingId] = !this.buildingsEnabled[buildingId];
        const checkbox = document.getElementById(`building-${buildingId}`);
        if (checkbox) {
            checkbox.checked = this.buildingsEnabled[buildingId];
        }
        console.log(`${buildingId} auto-buy ${this.buildingsEnabled[buildingId] ? 'enabled' : 'disabled'}`);
    },

    copyScript: function() {
        const scriptContent = document.querySelector('script[data-cheat="cookie-clicker"]')?.textContent || 
                        document.currentScript?.textContent;
        if (scriptContent) {
            navigator.clipboard.writeText(scriptContent).then(() => {
                const notification = document.getElementById('copy-notification');
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy script:', err);
            });
        }
    }
};

const style = document.createElement('style');
style.textContent = `
    #cheat-menu {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95);
        background: linear-gradient(145deg, rgba(32, 32, 32, 0.95), rgba(16, 16, 16, 0.95));
        padding: 25px;
        border-radius: 15px;
        z-index: 10000;
        display: none;
        color: #fff;
        font-family: 'Segoe UI', Arial, sans-serif;
        min-width: 350px;
        max-height: 85vh;
        overflow-y: auto;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5),
                    0 0 40px rgba(76, 175, 80, 0.2);
        border: 1px solid rgba(76, 175, 80, 0.3);
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    #cheat-menu.visible {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    #cheat-menu.hiding {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.95);
    }
    .cheat-section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transition-delay: calc(var(--index) * 0.1s);
    }
    #cheat-menu.visible .cheat-section {
        opacity: 1;
        transform: translateY(0);
    }
    #cheat-menu::-webkit-scrollbar {
        width: 8px;
    }
    #cheat-menu::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }
    #cheat-menu::-webkit-scrollbar-thumb {
        background: #4CAF50;
        border-radius: 4px;
    }
    #cheat-menu h2 {
        color: #4CAF50;
        margin: 0 0 20px 0;
        text-align: center;
        font-size: 24px;
        text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
        letter-spacing: 1px;
    }
    #cheat-menu h3 {
        color: #4CAF50;
        margin: 20px 0 15px 0;
        font-size: 18px;
        text-shadow: 0 0 8px rgba(76, 175, 80, 0.4);
    }
    .cheat-input {
        margin: 8px 0;
        padding: 10px;
        width: 100%;
        background: rgba(40, 40, 40, 0.9);
        border: 1px solid #4CAF50;
        color: #fff;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.3s ease;
    }
    .cheat-input:focus {
        outline: none;
        border-color: #45a049;
        box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
    }
    .cheat-button {
        background: linear-gradient(145deg, #4CAF50, #45a049);
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        margin: 5px;
        width: calc(100% - 10px);
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    .cheat-button:hover {
        background: linear-gradient(145deg, #45a049, #3d8b40);
        transform: translateY(-1px);
        box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
    }
    .cheat-button:active {
        transform: translateY(1px);
    }
    .building-list {
        margin: 10px 0;
        padding: 15px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        border: 1px solid rgba(76, 175, 80, 0.2);
    }
    .building-item {
        display: flex;
        align-items: center;
        margin: 8px 0;
        padding: 8px;
        background: rgba(40, 40, 40, 0.6);
        border-radius: 6px;
        transition: all 0.2s ease;
    }
    .building-item:hover {
        background: rgba(50, 50, 50, 0.8);
    }
    .building-item input[type="checkbox"] {
        margin-right: 12px;
        width: 18px;
        height: 18px;
        accent-color: #4CAF50;
    }
    .building-item label {
        font-size: 14px;
        cursor: pointer;
    }
    .credits {
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
    }
    .credits a {
        color: #4CAF50;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    .credits a:hover {
        color: #45a049;
        text-decoration: underline;
    }
    .copy-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(76, 175, 80, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        display: none;
        animation: fadeInOut 2s ease;
    }
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-20px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

let buildingsHTML = '';
for (let i in Game.Objects) {
    buildingsHTML += `
        <div class="building-item">
            <input type="checkbox" id="building-${i}" onchange="CookieCheat.toggleBuilding('${i}')">
            <label for="building-${i}">${Game.Objects[i].name}</label>
        </div>
    `;
}

const menuHTML = `
    <div id="cheat-menu">
        <h2>🍪 Cookie Clicker Cheats</h2>
        <div class="cheat-section">
            <button onclick="CookieCheat.copyScript()" class="cheat-button">📋 Copy Script</button>
        </div>
        <div class="cheat-section">
            <input type="number" id="cookie-amount" class="cheat-input" placeholder="✨ Number of cookies">
            <button onclick="CookieCheat.addCookies(document.getElementById('cookie-amount').value)" class="cheat-button">🔥 Add Cookies</button>
        </div>
        <div class="cheat-section">
            <input type="number" id="multiplier" class="cheat-input" placeholder="✨ Multiplier (e.g., 2 for double)">
            <button onclick="CookieCheat.multiplyCookies(document.getElementById('multiplier').value)" class="cheat-button">🚀 Multiply Cookies</button>
        </div>
        <div class="cheat-section">
            <input type="number" id="cps-amount" class="cheat-input" placeholder="✨ Cookies per second">
            <button onclick="CookieCheat.setCookiesPerSecond(document.getElementById('cps-amount').value)" class="cheat-button">⚡ Set Cookies/Second</button>
        </div>
        <div class="cheat-section">
            <input type="number" id="clicks-per-second" class="cheat-input" placeholder="✨ Clicks per second (default: 100)">
            <button onclick="CookieCheat.startAutoClick(document.getElementById('clicks-per-second').value)" class="cheat-button">▶️ Start Auto-Click</button>
            <button onclick="CookieCheat.stopAutoClick()" class="cheat-button">⏹️ Stop Auto-Click</button>
        </div>
        <div class="cheat-section">
            <button onclick="CookieCheat.getAllAchievements()" class="cheat-button">🏆 Get All Achievements</button>
            <button onclick="CookieCheat.getAllUpgrades()" class="cheat-button">⭐ Get All Upgrades</button>
        </div>
        <div class="cheat-section">
            <h3>🏭 Auto-Buy Buildings</h3>
            <div class="building-list">
                ${buildingsHTML}
            </div>
            <button onclick="CookieCheat.startAutoBuy()" class="cheat-button">▶️ Start Auto-Buy</button>
            <button onclick="CookieCheat.stopAutoBuy()" class="cheat-button">⏹️ Stop Auto-Buy</button>
        </div>
        <div class="credits">
            Created by <a href="https://www.youtube.com/@pomcode" target="_blank">@pomcode</a> | 
            <a href="https://github.com/r3dc0dez" target="_blank">@r3dc0dez</a>
        </div>
    </div>
    <div id="copy-notification" class="copy-notification">
        Script copied to clipboard! ✨
    </div>
`;
document.body.insertAdjacentHTML('beforeend', menuHTML);

document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === 'p') {
        const menu = document.getElementById('cheat-menu');
        if (menu.style.display === 'none') {
            menu.style.display = 'block';
            const sections = menu.getElementsByClassName('cheat-section');
            Array.from(sections).forEach((section, index) => {
                section.style.setProperty('--index', index);
            });
            requestAnimationFrame(() => {
                menu.classList.add('visible');
            });
        } else {
            menu.classList.remove('visible');
            menu.classList.add('hiding');
            setTimeout(() => {
                menu.style.display = 'none';
                menu.classList.remove('hiding');
            }, 300);
        }
    }
});

console.log(`
Cookie Clicker Cheats Loaded!
Created by @pomcode | @r3dc0dez

Press 'P' to open/close the cheat menu.
`);
