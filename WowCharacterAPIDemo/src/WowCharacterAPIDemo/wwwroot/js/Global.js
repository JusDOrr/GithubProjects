var APIType = Object.freeze({
    RealmStatus: "Realm Status",
    Mounts: "Mounts",
    Characters: "Characters"
});

// Remove on Checkin
var getAPIKey = function () { return "83pjrytmmwp4zv96jbe4ht8j6xtbdfw2"; };

var getAPIPath = function (apitype) {
    var apiPath = "";

    switch (apitype) {
        case APIType.RealmStatus:
            apiPath = "https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=";
            break;
        case APIType.Mounts:
            apiPath = "https://us.api.battle.net/wow/mount/?locale=en_US&apikey=";
            break;
        case APIType.Characters:
            apiPath = "https://us.api.battle.net/wow/character/medivh/Aevrius?fields=talents,stats&locale=en_US&apikey=";
            break;
    }

    if (apiPath.length > 0)
        apiPath += getAPIKey();

    return apiPath;
};

var getRaceInfo = function (race) {
    var info = {};

    switch (race) {
        case 1: info = { "faction": "Alliance", "race": "Human" }; break;
        case 2: info = { "faction": "Horde", "race": "Orc" }; break;
        case 3: info = { "faction": "Alliance", "race": "Dwarf" }; break;
        case 4: info = { "faction": "Alliance", "race": "Night Elf" }; break;
        case 5: info = { "faction": "Horde", "race": "Undead" }; break;
        case 6: info = { "faction": "Horde", "race": "Tauren" }; break;
        case 7: info = { "faction": "Alliance", "race": "Gnome" }; break;
        case 8: info = { "faction": "Horde", "race": "Troll" }; break;
        case 9: info = { "faction": "Horde", "race": "Goblin" }; break;
        case 10: info = { "faction": "Horde", "race": "Blood Elf" }; break;
        case 11: info = { "faction": "Alliance", "race": "Draenei" }; break;
        case 22: info = { "faction": "Alliance", "race": "Worgen" }; break;
        case 24: info = { "faction": "Neutral", "race": "Pandaren" }; break;
        case 25: info = { "faction": "Alliance", "race": "Pandaren" }; break;
        case 26: info = { "faction": "Horde", "race": "Pandaren" }; break;
    }

    return info;
};

var getClassInfo = function (value) {
    var info = "";

    switch (value) {
        case 1: info = { "name": "Warrior", "color": "#c69b6d" }; break;
        case 2: info = { "name": "Paladin", "color": "#f48cba" }; break;
        case 3: info = { "name": "Hunter", "color": "#aad372" }; break;
        case 4: info = { "name": "Rogue", "color": "#fff468" }; break;
        case 5: info = { "name": "Priest", "color": "#f0ebe0" }; break;
        case 6: info = { "name": "Death Knight", "color": "#c41e3b" }; break;
        case 7: info = { "name": "Shaman", "color": "#2359ff" }; break;
        case 8: info = { "name": "Mage", "color": "#68ccef" }; break;
        case 9: info = { "name": "Warlock", "color": "#9382c9" }; break;
        case 10: info = { "name": "Monk", "color": "#00ffba" }; break;
        case 11: info = { "name": "Druid", "color": "#ff7c0a" }; break;
        case 12: info = { "name": "Demon Hunter", "color": "#a330c9" }; break;
    }

    return info;
};
