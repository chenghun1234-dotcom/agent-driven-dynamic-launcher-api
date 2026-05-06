export const DEMO_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ADDL - Agent-Driven Dynamic Launcher</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
            position: relative;
        }
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
            pointer-events: none;
            z-index: 0;
        }
        .top-nav {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            padding: 18px 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            position: relative;
            z-index: 10;
        }
        .logo-section {
            display: flex;
            align-items: center;
            gap: 14px;
        }
        .logo-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }
        .logo-text {
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.3px;
        }
        .logo-sub {
            font-size: 12px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.5);
            margin-top: 2px;
        }
        .center-section {
            display: flex;
            align-items: center;
            gap: 16px;
            flex: 1;
            max-width: 700px;
            margin: 0 40px;
        }
        .intent-input-wrapper {
            flex: 1;
            position: relative;
        }
        .intent-input {
            width: 100%;
            padding: 14px 24px 14px 52px;
            border: 2px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            font-size: 15px;
            font-weight: 500;
            color: #ffffff;
            background: rgba(255, 255, 255, 0.03);
            outline: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: 'Inter', sans-serif;
        }
        .intent-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
            font-weight: 400;
        }
        .intent-input:focus {
            border-color: rgba(102, 126, 234, 0.6);
            background: rgba(255, 255, 255, 0.06);
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
        }
        .input-icon {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
            color: rgba(255, 255, 255, 0.5);
        }
        .generate-btn {
            padding: 14px 28px;
            border: none;
            border-radius: 14px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .generate-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
        }
        .generate-btn:active {
            transform: translateY(0);
        }
        .right-section {
            display: flex;
            align-items: center;
            gap: 24px;
        }
        .mode-toggle {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .toggle-label {
            font-size: 13px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.7);
        }
        .toggle-switch {
            position: relative;
            width: 52px;
            height: 28px;
        }
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 28px;
            transition: 0.3s;
            border: 2px solid rgba(255, 255, 255, 0.1);
        }
        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 3px;
            bottom: 2px;
            background: white;
            border-radius: 50%;
            transition: 0.3s;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        .toggle-switch input:checked + .toggle-slider {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: transparent;
        }
        .toggle-switch input:checked + .toggle-slider:before {
            transform: translateX(24px);
        }
        .desktop-area {
            flex: 1;
            padding: 40px;
            position: relative;
            z-index: 5;
        }
        .status-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
        }
        .expiry-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 14px 22px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .expiry-icon {
            font-size: 18px;
        }
        .expiry-text {
            font-size: 13px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.85);
        }
        .layout-badge {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
            border: 1px solid rgba(102, 126, 234, 0.3);
            border-radius: 10px;
            padding: 8px 16px;
            font-size: 12px;
            font-weight: 600;
            color: #a5b4fc;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        .clusters-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
        }
        .cluster-card {
            background: rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 28px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        .cluster-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.6), transparent);
        }
        .cluster-card:hover {
            transform: translateY(-4px);
            border-color: rgba(102, 126, 234, 0.3);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .cluster-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 24px;
        }
        .cluster-emoji {
            font-size: 24px;
        }
        .cluster-title {
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.3px;
        }
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
        }
        .icon-item {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 20px 12px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .icon-item:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-4px) scale(1.02);
            border-color: rgba(102, 126, 234, 0.4);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
        }
        .icon-item img {
            width: 48px;
            height: 48px;
            margin-bottom: 12px;
            filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
        }
        .icon-label {
            font-size: 13px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
            line-height: 1.3;
        }
        .icon-type {
            font-size: 11px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.45);
            margin-top: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .pinned-section {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 24px;
            padding: 32px;
        }
        .pinned-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
        }
        .pinned-title {
            font-size: 20px;
            font-weight: 700;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .add-pin-btn {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
            border: 1px solid rgba(102, 126, 234, 0.3);
            padding: 10px 20px;
            border-radius: 12px;
            color: #a5b4fc;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            font-family: 'Inter', sans-serif;
        }
        .add-pin-btn:hover {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
            transform: translateY(-2px);
        }
        .pinned-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
        }
        .pinned-item {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 18px;
            padding: 18px 14px;
            text-align: center;
            cursor: pointer;
            min-width: 110px;
            transition: all 0.3s;
            position: relative;
        }
        .pinned-item:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-3px);
            border-color: rgba(102, 126, 234, 0.3);
        }
        .pinned-item img {
            width: 40px;
            height: 40px;
            margin-bottom: 10px;
        }
        .pinned-label {
            font-size: 12px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.85);
            line-height: 1.3;
        }
        .delete-pin {
            position: absolute;
            top: 8px;
            right: 10px;
            background: rgba(239, 68, 68, 0.9);
            color: white;
            border: none;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            font-size: 13px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .pinned-item:hover .delete-pin {
            opacity: 1;
        }
        .empty-state {
            color: rgba(255, 255, 255, 0.45);
            font-size: 14px;
            font-weight: 500;
        }
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            padding: 24px;
        }
        .modal-overlay.show {
            display: flex;
        }
        .modal-container {
            background: rgba(20, 20, 35, 0.95);
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            width: 100%;
            max-width: 480px;
            padding: 40px;
            box-shadow: 0 32px 80px rgba(0, 0, 0, 0.5);
            animation: modalIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes modalIn {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        .modal-title {
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 28px;
            letter-spacing: -0.5px;
        }
        .modal-field {
            margin-bottom: 20px;
        }
        .modal-label {
            font-size: 13px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 10px;
            display: block;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .modal-input {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            font-size: 15px;
            font-weight: 500;
            color: #ffffff;
            background: rgba(255, 255, 255, 0.03);
            outline: none;
            transition: all 0.3s;
            font-family: 'Inter', sans-serif;
        }
        .modal-input::placeholder {
            color: rgba(255, 255, 255, 0.35);
            font-weight: 400;
        }
        .modal-input:focus {
            border-color: rgba(102, 126, 234, 0.6);
            background: rgba(255, 255, 255, 0.06);
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
        }
        .modal-actions {
            display: flex;
            gap: 12px;
            margin-top: 32px;
            justify-content: flex-end;
        }
        .modal-btn {
            padding: 14px 28px;
            border: none;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            font-family: 'Inter', sans-serif;
        }
        .modal-btn-cancel {
            background: rgba(255, 255, 255, 0.08);
            color: rgba(255, 255, 255, 0.8);
        }
        .modal-btn-cancel:hover {
            background: rgba(255, 255, 255, 0.12);
        }
        .modal-btn-save {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }
        .modal-btn-save:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
        }
    </style>
</head>
<body>
    <nav class="top-nav">
        <div class="logo-section">
            <div class="logo-icon">🚀</div>
            <div>
                <div class="logo-text">ADDL</div>
                <div class="logo-sub">Agent-Driven Launcher</div>
            </div>
        </div>
        <div class="center-section">
            <div class="intent-input-wrapper">
                <span class="input-icon">✨</span>
                <input type="text" id="intentInput" class="intent-input" placeholder="What can I help you with? (e.g., I need to go to Busan tomorrow)">
            </div>
            <button class="generate-btn" onclick="handleIntent()">
                <span>Generate</span>
                <span>→</span>
            </button>
        </div>
        <div class="right-section">
            <label class="mode-toggle">
                <span class="toggle-label">AI Agent Mode</span>
                <label class="toggle-switch">
                    <input type="checkbox" id="useAi">
                    <span class="toggle-slider"></span>
                </label>
            </label>
        </div>
    </nav>

    <main class="desktop-area">
        <div class="status-bar">
            <div id="expiryCard" class="expiry-card" style="display: none;">
                <span class="expiry-icon">⏰</span>
                <span id="expiryText" class="expiry-text"></span>
            </div>
            <div id="layoutBadge" class="layout-badge" style="display: none;"></div>
        </div>

        <div id="clustersGrid" class="clusters-grid"></div>

        <section class="pinned-section">
            <div class="pinned-header">
                <div class="pinned-title">
                    <span>📌</span>
                    <span>Pinned Items</span>
                </div>
                <button class="add-pin-btn" onclick="openPinModal()">+ Add Pin</button>
            </div>
            <div id="pinnedGrid" class="pinned-grid"></div>
        </section>
    </main>

    <div id="pinModal" class="modal-overlay">
        <div class="modal-container">
            <h2 class="modal-title">Add New Pin</h2>
            
            <div class="modal-field">
                <label class="modal-label">Label</label>
                <input type="text" id="pinLabel" class="modal-input" placeholder="e.g., Important Document">
            </div>
            
            <div class="modal-field">
                <label class="modal-label">Icon URL</label>
                <input type="text" id="pinIconUrl" class="modal-input" placeholder="https://...">
            </div>
            
            <div class="modal-field">
                <label class="modal-label">Action URL</label>
                <input type="text" id="pinAction" class="modal-input" placeholder="https://...">
            </div>

            <div class="modal-actions">
                <button class="modal-btn modal-btn-cancel" onclick="closePinModal()">Cancel</button>
                <button class="modal-btn modal-btn-save" onclick="savePin()">Save</button>
            </div>
        </div>
    </div>

    <script>
        const API_BASE = '';
        let currentIcons = [];
        let currentExpiry = null;

        async function handleIntent() {
            const intent = document.getElementById('intentInput').value;
            const useAi = document.getElementById('useAi').checked;
            if (!intent.trim()) return;

            try {
                const response = await fetch(\`\${API_BASE}/v1/launcher/compose\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_intent: intent, use_ai: useAi })
                });
                const data = await response.json();
                renderClusters(data);
            } catch (err) {
                alert('Error: ' + err);
            }
        }

        function renderClusters(data) {
            currentIcons = data.icons;
            currentExpiry = data.expiry;
            const container = document.getElementById('clustersGrid');
            const expiryCard = document.getElementById('expiryCard');
            const expiryText = document.getElementById('expiryText');
            const layoutBadge = document.getElementById('layoutBadge');

            if (data.expiry) {
                const expiryDate = new Date(data.expiry);
                expiryText.textContent = \`Expires: \${expiryDate.toLocaleString('en-US')}\`;
                expiryCard.style.display = 'flex';
            } else {
                expiryCard.style.display = 'none';
            }

            if (data.layout_id) {
                layoutBadge.textContent = data.layout_id;
                layoutBadge.style.display = 'block';
            } else {
                layoutBadge.style.display = 'none';
            }

            container.innerHTML = '';
            if (data.clusters && data.clusters.length > 0) {
                data.clusters.forEach(cluster => {
                    const clusterDiv = document.createElement('div');
                    clusterDiv.className = 'cluster-card';
                    
                    clusterDiv.innerHTML = \`
                        <div class="cluster-header">
                            <span class="cluster-emoji">📂</span>
                            <div class="cluster-title">\${cluster.label}</div>
                        </div>
                    \`;
                    
                    const iconsGrid = document.createElement('div');
                    iconsGrid.className = 'icons-grid';
                    
                    cluster.icon_ids.forEach(iconId => {
                        const icon = data.icons.find(i => i.id === iconId);
                        if (icon) {
                            iconsGrid.appendChild(createIconItem(icon));
                        }
                    });
                    clusterDiv.appendChild(iconsGrid);
                    container.appendChild(clusterDiv);
                });
            } else {
                const clusterDiv = document.createElement('div');
                clusterDiv.className = 'cluster-card';
                clusterDiv.innerHTML = \`
                    <div class="cluster-header">
                        <span class="cluster-emoji">📱</span>
                        <div class="cluster-title">Suggested Icons</div>
                    </div>
                \`;
                const iconsGrid = document.createElement('div');
                iconsGrid.className = 'icons-grid';
                
                data.icons.forEach(icon => {
                    iconsGrid.appendChild(createIconItem(icon));
                });
                clusterDiv.appendChild(iconsGrid);
                container.appendChild(clusterDiv);
            }
        }

        function createIconItem(icon) {
            const item = document.createElement('div');
            item.className = 'icon-item';
            item.innerHTML = \`
                <img src="\${icon.icon_url}" alt="\${icon.label}" onerror="this.src='https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/questionmark.svg'">
                <div class="icon-label">\${icon.label}</div>
                <div class="icon-type">\${icon.type}</div>
            \`;
            item.onclick = () => {
                if (icon.action) {
                    window.open(icon.action, '_blank');
                }
            };
            return item;
        }

        async function loadPins() {
            try {
                const response = await fetch(\`\${API_BASE}/v1/launcher/pins\`);
                const data = await response.json();
                renderPins(data.pins);
            } catch (err) {
                console.error('Failed to load pins:', err);
            }
        }

        function renderPins(pins) {
            const grid = document.getElementById('pinnedGrid');
            grid.innerHTML = '';
            if (!pins || pins.length === 0) {
                grid.innerHTML = '<div class="empty-state">No pinned items yet</div>';
                return;
            }
            pins.forEach(pin => {
                const item = document.createElement('div');
                item.className = 'pinned-item';
                item.innerHTML = \`
                    <button class="delete-pin" onclick="deletePin('\${pin.id}')">×</button>
                    <img src="\${pin.icon_url}" alt="\${pin.label}" onerror="this.src='https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/questionmark.svg'">
                    <div class="pinned-label">\${pin.label}</div>
                \`;
                item.onclick = (e) => {
                    if (!e.target.classList.contains('delete-pin')) {
                        window.open(pin.action, '_blank');
                    }
                };
                grid.appendChild(item);
            });
        }

        function openPinModal() {
            document.getElementById('pinModal').classList.add('show');
        }

        function closePinModal() {
            document.getElementById('pinModal').classList.remove('show');
            document.getElementById('pinLabel').value = '';
            document.getElementById('pinIconUrl').value = '';
            document.getElementById('pinAction').value = '';
        }

        async function savePin() {
            const label = document.getElementById('pinLabel').value;
            const icon_url = document.getElementById('pinIconUrl').value;
            const action = document.getElementById('pinAction').value;

            if (!label || !icon_url || !action) {
                alert('Please fill in all fields');
                return;
            }

            try {
                const response = await fetch(\`\${API_BASE}/v1/launcher/pin\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ label, icon_url, action })
                });
                await response.json();
                closePinModal();
                loadPins();
            } catch (err) {
                alert('Error saving pin: ' + err);
            }
        }

        async function deletePin(id) {
            try {
                await fetch(\`\${API_BASE}/v1/launcher/pin/\${id}\`, { method: 'DELETE' });
                loadPins();
            } catch (err) {
                alert('Error deleting pin: ' + err);
            }
        }

        document.getElementById('intentInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleIntent();
            }
        });

        loadPins();
    </script>
</body>
</html>`;
