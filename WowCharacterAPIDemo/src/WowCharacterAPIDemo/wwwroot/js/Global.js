var APIType = Object.freeze({
    RealmStatus: "Realm Status",
    Mounts: "Mounts",
    Characters: "Characters"
});

var ArmoryNavType = Object.freeze({
   Character: 1,
   Achievements: 2,
   Collections: 3,
   RaidProgress: 4,
   PVP: 5,
   Reputation: 6
});

var FactionType = Object.freeze({
   Neutral: 1,
   Alliance: 2,
   Horde: 3
});

var GetArmoryNavType = function (val) {
   switch (val) {
      case 1: return ArmoryNavType.Character;
      case 2: return ArmoryNavType.Achievements;
      case 3: return ArmoryNavType.Collections;
      case 4: return ArmoryNavType.RaidProgress;
      case 5: return ArmoryNavType.PVP;
      case 6: return ArmoryNavType.CharacterReputation;

      default: return ArmoryNavType.Character;
   }
};

var addAPIKeyField = function () { return ""; };

var GET = function (apiPath, loadCallBack, errorCallBack) {
    if (apiPath !== "") {
        var xhr = new XMLHttpRequest();

        xhr.open('get', apiPath, true);

        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            loadCallBack(data);
        }.bind(this);

        xhr.onerror = function (e) {
            errorCallBack(e);
        }.bind(this);

        xhr.send();
    }
};

var getAPIPath = function (apitype, realm, character) {
    var apiPath = "";
    var locale = "en_US";

    switch (apitype) {
       case APIType.RealmStatus:
          apiPath = "https://us.api.battle.net/wow/realm/status?locale=" + locale + addAPIKeyField();
          break;
       case APIType.Mounts:
          apiPath = "https://us.api.battle.net/wow/mount/?locale=" + locale + addAPIKeyField();
          break;
       case APIType.Characters:
          if(realm && character)
             apiPath = "https://us.api.battle.net/wow/character/" + realm + "/" + character + "?fields=talents,stats,items,guild,titles,progression&locale=" + locale + addAPIKeyField();
          break;
    }

    return apiPath;
};

var getLogo = function (faction) {
   var logo = "";

   if (!faction)
      return logo;

   if (faction === "Alliance")
      logo = "https://worldofwarcraft.akamaized.net/static/components/Logo/Logo-alliance.png";
   else
      logo = "https://worldofwarcraft.akamaized.net/static/components/Logo/Logo-horde.png";

   return logo;
};

var getAvatar = function (race, gender, thumbnail) {
   if (race === undefined || gender === undefined || thumbnail === undefined)
      return "";

   // avatar - character icon / profilemain - character render
   var _fallback = "?alt=/wow/static/images/2d/profilemain/race/" + race + "-" + gender + ".jpg";
   var _thumbnail = (thumbnail + "").replace("avatar.jpg", "profilemain.jpg");

   return "http://render-api-us.worldofwarcraft.com/static-render/us/" + _thumbnail + _fallback;
};

var getIcon = function (icon) {
   if (!icon)
      return "";

   return "https://render-us.worldofwarcraft.com/icons/56/" + icon + ".jpg";
   //return "http://media.blizzard.com/wow/icons/36/" + icon + ".jpg";
};

// Downloaded for easier use... This is no longer used...
var getEmptyGearSlots = function () {
   return "https://worldofwarcraft.akamaized.net/static/components/GameIcon/GameIcon-slots.png";
};

var getRaidImage = function (raidName) {
   var prepared = raidName.replace(',','').replace(/ /g,"-").toLowerCase();
   var img = "https://render-us.worldofwarcraft.com/zones/" + prepared + "-small.jpg";

   return img;
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

var getClassStats = function (classId, stats) {
   var classStats = "";

   // TODO: update this work for all classes. just return warrior stats for now
   switch (classId) {
      case 1: classStats = _.pick(stats, ["health", "powerType", "power", "str", "sta", "crit", "critRating", "haste", "hasteRating", "mastery", "masteryRating", "versatility", "versatilityDamageDoneBonus"]);
         break;
      default: classStats = stats;
         break;
   }

   return classStats;
};

var getQualityColor = function (quality) {
   var element = "#9d9d9d";

   if (quality === 1)
      element = "#fff";
   else if (quality === 2)
      element = "#1eff00";
   else if (quality === 3)
      element = "#0081ff";
   else if (quality === 4)
      element = "#c600ff";
   else if (quality === 5)
      element = "#ff8000";
   else if (quality === 6)
      element = "#e5cc80";
   else if (quality === 7)
      element = "#0cf";

   return element;
};

var getFactionColor = function (faction) {
   var element = "darkgrey";

   if (faction === "Alliance")
      element = "#000050";
   else if (faction === "Horde")
      element = "#500000";

   return element;
};

// STATS
//HEALTH{color:#27cc4e}
//STAMINA{color:#ff8b2d}
//ENERGY{color:#cb9501}
//FOCUS{color:#d45719}
//FURY{color:#8400ff}
//INSANITY{color:#60f}
//MAELSTROM{color:#008fff}
//MANA{color:#1c8aff}
//PAIN{color:#d45719}
//RAGE{color:#ab0000}
//RUNICPOWER{color:#00bcde}
//AGILITY{color:#ffd955}
//INTELLECT{color:#d26cd1}
//STRENGTH{color:#f33232}
//CRITICALSTRIKE{color:#e01c1c}
//HASTE{color:#0ed59b}
//MASTERY{color:#9256ff}
//VERSATILITY{color:#bfbfbf}

// PROGRESS
//progressLevel=low]{background:#99755c
//progressLevel=medium]{background:#c76700
//progressLevel=high]{background:#1b9601
