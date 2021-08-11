import md5 from 'md5';

const API_URL = "https://api.smitegame.com/smiteapi.svc";
const DEV_ID = "3979";
const AUTH_KEY = "REMOVED TO KEEP MY KEY PRIVATE";
const currentTime = new Date();
const CURRENT_TIME = currentTime.toISOString().replace(/[^0-9]/g, "").substring(0, 14);

export async function getSessionID() {
    const signature = md5(DEV_ID + "createsession" + AUTH_KEY + CURRENT_TIME);
    const sessionID = await fetch(`${API_URL}/createsessionJson/${DEV_ID}/${signature}/${CURRENT_TIME}`)
        .then(res => res.json())
        .then(data => data.session_id);
    return sessionID;
}

export async function getItems(SESSION) {
    const signature = md5(DEV_ID + "getitems" + AUTH_KEY + CURRENT_TIME);
    const items = await fetch(`${API_URL}/getitemsJson/${DEV_ID}/${signature}/${SESSION}/${CURRENT_TIME}/1`)
        .then(res => res.json())
        .then(data => data);
    return items;
}

export async function getMatchHistory(PLAYER_ID, SESSION) {
    const signature = md5(DEV_ID + "getmatchhistory" + AUTH_KEY + CURRENT_TIME);
    const matchHistory = await fetch(`${API_URL}/getmatchhistoryJson/${DEV_ID}/${signature}/${SESSION}/${CURRENT_TIME}/${PLAYER_ID}`)
        .then(res => res.json())
        .then(data => data);
    return matchHistory;
}

