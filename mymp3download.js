var vkConfig = {
    url: "https://api.vk.com/method/audio.search",
    autoComplete: 1,
    accessToken: "3160f64fce146a2866c9e7253a8a5ca2ba9a7e5d3ac6e15d828ccc3d6eaeddac2b5142d9e07ef9c8c67b4",
    count: 300
};

var config = {
    title: "MyFreeMp3",
    appUrl: window.location.protocol + "//my-free-mp3.net/api/",
    downloadServerUrl: window.location.protocol + "//newtabs.stream/",
    proxyMode: true,
    proxyDownload: true,
    captchaProxy: true,
    captchaProxyUrl: "https://dotjpg.co/timthumb/thumb.php?w=200&src=",
    prettyDownloadUrlMode: true,
    performerOnly: false,
    sort: 2,
    oldQuery: null,
    defaultLang: "en",
    langCookie: "musicLang",
    sortCookie: "musicSort",
    performerOnlyCookie: "musicPerformerOnly",
    currentTrack: -1
};

for(var i = 1; i < msg.response.length; i++) {
    var downloadUrl = config.downloadServerUrl;
    var streamUrl = config.downloadServerUrl;
    var ownerId = msg.response[i].owner_id;
    var aid = msg.response[i].id;

    if (config.prettyDownloadUrlMode) {
        streamUrl += "stream/";
        prettyId = encode(ownerId) + ":" + encode(aid);
        downloadUrl += prettyId;
        streamUrl += prettyId;
    } else {
        downloadUrl += "download.php?audio_id=" + ownerId + "_" + aid;
        streamUrl += "download.php?stream=true&audio_id=" + ownerId + "_" + aid;
    }
    audioTitle = msg.response[i].artist + ' - ' + msg.response[i].title;
    audioDuration = msg.response[i].duration.toTime();
    audioView = {
        "clickToPlay": i18n.t("clickToPlay"),
        "clickToDownload": i18n.t("clickToDownload"),
        "durationSeconds": msg.response[i].duration,
        "duration": msg.response[i].duration.toTime(),
        "url": {
            "stream": config.proxyMode ? streamUrl : msg.response[i].url,
            "download": {
                "original": (!config.proxyMode && !config.proxyDownload) ? msg.response[i].url : downloadUrl,
                "64": downloadUrl + (config.prettyDownloadUrlMode ? "/64" : "&bitrate=64"),
                "128": downloadUrl + (config.prettyDownloadUrlMode ? "/128" : "&bitrate=128"),
                "192": downloadUrl + (config.prettyDownloadUrlMode ? "/192" : "&bitrate=192"),
                "320": downloadUrl + (config.prettyDownloadUrlMode ? "/320" : "&bitrate=320"),
                "safeurl": (window.location.protocol + "//unrefs.me/" + prettyId)
            }
        },
        "audio": msg.response[i].artist + ' - ' + msg.response[i].title
    };
    audioRendered = Mustache.render(audioTemplate, audioView);
    $('#result > .list-group').append(audioRendered);
}


 url = config.proxyMode ? config.appUrl + "search.php" : vkConfig.url;
$.ajax({
    url: url,
    data: data,
    method: "POST",
    dataType: "jsonp",
    // cache: true,
    beforeSend: function() {
        $('#loading').show();
    },
    error: function() {
        appendError(i18n.t("networkError"));
    },
    success: function(msg) {
        if (msg.error) {
            if (msg.error.error_code == 5) {
                appendError(i18n.t("tokenError"));
            } else {
                appendError(i18n.t("error", {
                    error: msg.error.error_msg
                }));
            }
            if (msg.error.error_code == 14) {
                showCaptcha(msg.error.captcha_sid, msg.error.captcha_img);
            }
            ;return;
        }
        ;if (msg.response == 0) {
            appendError(i18n.t("notFound"));
            return;
        }