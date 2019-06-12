import {
    fetchIntegrationPartnersPending,
    fetchIntegrationPartnersSuccess,
    fetchLandingPending,
    fetchLandingSuccess,
    fetchNotificationChannelsPending,
    fetchNotificationChannelsSuccess
} from "../store/order/actions";
import faker from "faker";
import {fetchLandingsPending, fetchLandingsSuccess} from "../store/shop/actions";
import {callIfRandom, repeatExactTimes, repeatRandomTimes} from "../util/callable";
import {randomInt} from "../util/number";
import cloneDeep from "lodash/cloneDeep";

export function fetchLanding(id) {
    return dispatch => {
        dispatch(fetchLandingPending(id));
        setTimeout(function () {
            let result = getLanding(id);
            dispatch(fetchLandingSuccess(result));
            return result;
        }, 500);
    }
}

function getLanding(id) {
    return {
        id: id,
        name: faker.lorem.sentence()
    };
}

export function fetchLandings() {
    // See example at: https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao
    return dispatch => {
        dispatch(fetchLandingsPending());
        setTimeout(function () {
            let result = getLandings();
            dispatch(fetchLandingsSuccess(result));
            return result;
        }, 500);
    }
}

function getLandings() {
    let screenshotsCount = 2;
    let badges = [
        {
            name: "Адаптив",
            description: "Сайт хорошо выглядит и на мобильных устройствах",
            style: "success"
        },
        {
            name: "Оптимизирован",
            description: "Сжаты изображения, скрипты и стили",
            style: "info"
        },
        {
            name: "Хит продаж",
            description: "Топ продаж",
            style: "danger"
        },
    ];
    let landingTemplate = {
        id: 1,
        name: "",
        previewUrl: "",
        screenshotUrl: "",
        badges: []
    };
    let result = [];
    repeatExactTimes(40, function (i) {
        let screenshotNumber = randomInt(1, screenshotsCount);
        let landing = cloneDeep(landingTemplate);
        landing.id = i + 1;
        landing.name = faker.lorem.sentence();
        landing.previewUrl = "/test/screenshot-" + screenshotNumber + "-preview.png";
        landing.screenshotUrl = "/test/screenshot-" + screenshotNumber + ".png";
        callIfRandom(80, function () {
            repeatRandomTimes(1, badges.length, function (j) {
                landing.badges.push(cloneDeep(badges[j]));
            });
        });
        result.push(landing);
        faker.seed();
    });
    return result;
}

export function fetchLandingNotificationChannels() {
    return dispatch => {
        dispatch(fetchNotificationChannelsPending());
        setTimeout(function () {
            let result = getNotificationChannels();
            dispatch(fetchNotificationChannelsSuccess(result));
            return result;
        }, 500);
    }
}

function getNotificationChannels() {
    let counter = 0;
    return [
        {
            id: ++counter,
            keyword: "email",
            name: "Email",
        },
        {
            id: ++counter,
            keyword: "bot_vk",
            name: "Vk Бот",
        },
        {
            id: ++counter,
            keyword: "bot_telegram",
            name: "Telegram Бот",
        },
    ];
}

export function fetchLandingIntegrationPartners() {
    return dispatch => {
        dispatch(fetchIntegrationPartnersPending());
        setTimeout(function () {
            let result = getIntegrationPartners();
            dispatch(fetchIntegrationPartnersSuccess(result));
            return result;
        }, 500);
    }
}

function getIntegrationPartners() {
    let counter = 0;
    return [
        {
            id: ++counter,
            keyword: "m1_shop",
            name: "M1 Shop",
        },
        {
            id: ++counter,
            keyword: "ad1",
            name: "Ad1",
        },
        {
            id: ++counter,
            keyword: "monsterleads",
            name: "Monsterleads",
        },
        {
            id: ++counter,
            keyword: "cpagetti",
            name: "Cpagetti",
        },
    ];
}
