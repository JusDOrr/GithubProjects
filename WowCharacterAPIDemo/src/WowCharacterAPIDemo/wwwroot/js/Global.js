var APIType = Object.freeze({
    RealmStatus: "Realm Status",
    Mounts: "Mounts"
});

var getAPIKey = function () { return ""; };

var getAPIPath = function (apitype) {
    var apiPath = "";

    switch (apitype) {
        case APIType.RealmStatus:
            apiPath = "https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=";
            break;
        case APIType.Mounts:
            apiPath = "https://us.api.battle.net/wow/mount/?locale=en_US&apikey=";
            break;
    }

    if (apiPath.length > 0)
        apiPath += getAPIKey();

    return apiPath;
};