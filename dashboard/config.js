// MissionDeck Configuration
// This file is loaded by the dashboard to determine server URL

const MISSION_CONTROL_CONFIG = {
    // Production server URL (via Cloudflare Tunnel)
    serverUrl: 'https://audio-architecture-park-keywords.trycloudflare.com',
    
    // WebSocket URL (use wss:// for secure connection)
    wsUrl: 'wss://audio-architecture-park-keywords.trycloudflare.com/ws',
    
    // Fallback to localhost if unavailable
    fallbackToLocalhost: true,
    
    // Reconnect settings
    wsReconnectAttempts: 5,
    wsReconnectDelay: 3000
};
