var FactionType = Object.freeze({
   Neutral: 1,
   Alliance: 2,
   Horde: 3
});

var ArmoryNavType = Object.freeze({
   Character: 1,
   Achievements: 2,
   Collections: 3,
   RaidProgress: 4,
   PVP: 5,
   Reputation: 6
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

// API CALLS
// \/

var addAPIKeyField = function () { return ""; };
var addLocaleField = function () { return "en_US"; };

var GET = function (apiPath, loadCallBack, errorCallBack) {
   if (apiPath === "")
      return;

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
};

var GetRealmStatus = function (loadCallBack, errorCallBack) {
   var APIPath = "https://us.api.battle.net/wow/realm/status?locale=" + addLocaleField() + addAPIKeyField();
   GET(APIPath, loadCallBack, errorCallBack);
};

var GetMounts = function (loadCallBack, errorCallBack) {
   var APIPath = "https://us.api.battle.net/wow/mount/?locale=" + addLocaleField() + addAPIKeyField();
   GET(APIPath, loadCallBack, errorCallBack);
};

var GetCharacter = function (loadCallBack, errorCallBack, realm, character) {
   var APIPath = "https://us.api.battle.net/wow/character/" + realm + "/" + character + "?fields=talents,stats,items,guild,titles,progression&locale=" + addLocaleField() + addAPIKeyField();
   GET(APIPath, loadCallBack, errorCallBack);
};

var GetItem = function (loadCallBack, errorCallBack, itemId, context, bonusList) {
   var ctxt = context ? "\/" + context : "";
   var bl = bonusList ? "bl=" + bonusList.toString() + "&" : "";

   var APIPath = "https://us.api.battle.net/wow/item/" + itemId + ctxt + "?" + bl + "locale=" + addLocaleField() + addAPIKeyField();
   GET(APIPath, loadCallBack, errorCallBack);
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
   if ( race === undefined || gender === undefined || thumbnail === undefined )
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

// /\
// END API CALLS

// DATA GETTERS 
// \/

var getFactionColor = function (faction) {
   var element = "darkgrey";

   if (faction === "Alliance")
      element = "#000050";
   else if (faction === "Horde")
      element = "#500000";

   return element;
};

var getRaceInfo = function (value) {
   var charFact = FactionInfo.find(x => x.id === value);

   if (!charFact)
      return value;

   return charFact.info;
};

var getClassInfo = function (value) {
   var charClass = ClassInfo.find(x => x.id === value);

   if (!charClass)
      return value;

   return charClass.info;
};

var getStatDesc = function (value) {
   var desc = BonusStats.find(x => x.id === value);

   if (!desc)
      return value;

   return desc.name;
};

var getQualityColor = function (value) {
   var quality = QualityColor.find(x => x.id === value);

   if (!quality)
      return "#9d9d9d";

   return quality.color;
};

var getInventoryType = function (value) {
   var invType = InventoryType.find(x => x.id === value);

   if (!invType)
      return "unknown";

   return invType.name;
};

var getInventoryClass = function (mainclass, subclass) {
   var subclasses = InventoryClass.find(x => x.id === mainclass);
   var invClass = subclasses.subclasses.find(x => x.subclass === subclass);

   if (!invClass)
      return "Miscellaneous";

   return invClass.name;
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

// /\
// END DATA GETTERS 


// PROGRESS
// progressLevel = low    - background: #99755c
// progressLevel = medium - background: #c76700
// progressLevel = high   - background: #1b9601
