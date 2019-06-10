import {fetchLandingPending, fetchLandingSuccess} from "../store/order/actions";
import faker from "faker";
import {fetchLandingsPending, fetchLandingsSuccess} from "../store/shop/actions";
import {callIfRandom, repeatExactTimes, repeatRandomTimes} from "../util/callable";
import {randomIntInterval} from "../util/number";
import cloneDeep from "lodash/cloneDeep";

export function fetchLanding(id) {
    console.log('FETCH ' + id);
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
        let screenshotNumber = randomIntInterval(1, screenshotsCount);
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
