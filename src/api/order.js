import {fetchOptionsPending, fetchOptionsSuccess} from "../store/order/actions";

export function fetchOrderOptions() {
    return dispatch => {
        dispatch(fetchOptionsPending());
        setTimeout(function () {
            let result = getOptions();
            dispatch(fetchOptionsSuccess(result));
            return result;
        }, 500);
    }
}

function getOptions() {
    let counter = 0;
    return [
        // Источник лендинга
        {
            id: ++counter,
            keyword: "from_url",
            active: true,
            name: "Скопировать лендинг по URL",
            description: "",
            priceMin: 300,
            priceMax: 300,
            group: "source"
        },
        {
            id: ++counter,
            keyword: "from_shop",
            active: true,
            name: "Лендинг из магазина лендингов",
            description: "",
            priceMin: 100,
            priceMax: 100,
            group: "source"
        },
        {
            id: ++counter,
            keyword: "from_archive",
            active: true,
            name: "Доработка присланного лендинга",
            description: "",
            priceMin: 50,
            priceMax: 50,
            group: "source"
        },
        // Опции, связанные с обработкой лендинга
        {
            id: ++counter,
            keyword: "edit_contacts",
            active: true,
            name: "Изменение контактов на свои",
            description: "",
            priceMin: 0,
            priceMax: 0,
            group: "edit"
        },
        {
            id: ++counter,
            keyword: "remove_malware",
            active: true,
            name: "Удаление счётчиков, кодов отслеживания и перехвата лидов, вредоносных скриптов",
            description: "",
            priceMin: 0,
            priceMax: 0,
            group: "edit"
        },
        {
            id: ++counter,
            keyword: "add_client_counters",
            active: true,
            name: "Добавление собственных счётчиков отслеживания (Я.Метрика, Google Analytics, и д.р.)",
            description: "Позволяет собирать детальную статистику вашего трафика на лендинг",
            priceMin: 0,
            priceMax: 0,
            group: "edit"
        },
        {
            id: ++counter,
            keyword: "optimize_scripts_and_styles",
            active: true,
            name: "Оптимизация скриптов и стилей",
            description: "Уменьшает время загрузки лендинга, что увеличивает конверсию лендинга",
            priceMin: 50,
            priceMax: 50,
            group: "edit"
        },
        {
            id: ++counter,
            keyword: "optimize_images",
            name: "Оптимизация изображений",
            description: "Уменьшает время загрузки лендинга, что увеличивает конверсию лендинга",
            priceMin: 0,
            priceMax: 0,
            group: "edit"
        },
        {
            id: ++counter,
            keyword: "make_adaptive",
            active: true,
            name: "Сделать лендинг адаптивным",
            description: "Лендинг будет хорошо выглядеть на планшетах и мобильных устройствах",
            priceMin: 0,
            priceMax: 1000,
            group: "edit"
        },
        {
            id: ++counter,
            keyword: "client_changes",
            active: true,
            name: "Правки лендинга по вашим требованиям",
            description:
                "Подробно опишите какие изменения в лендинге вы хотите.",
            priceMin: 0,
            priceMax: 1000,
            group: "edit"
        },
        // Опции, связанные с интеграциями
        {
            id: ++counter,
            keyword: "collect_leads",
            active: true,
            name: "Сбор заявок (лидов) с лендинга",
            description:
                "Собранные заявки будут видны вам на странице настроек лендинга." +
                " Также можно выбрать куда отправлять уведомления с информацией по заявке.",
            priceMin: 100,
            priceMax: 100,
            group: "integrations"
        },
        {
            id: ++counter,
            keyword: "send_leads_to_pp",
            active: true,
            name: "Автоматическая отправка собранных заявок в партнёрские программы",
            description:
                "Интегрируйтесь с популярными ПП: m1-shop, Monsterleads, Ad1 и другими.",
            priceMin: 100,
            priceMax: 100,
            group: "integrations"
        },
        // Опции, связанные с размещением лендинга
        {
            id: ++counter,
            keyword: "download_landing",
            active: true,
            name: "Скачать архив с лендингом",
            description: "",
            priceMin: 0,
            priceMax: 0,
            group: "placement"
        },
        {
            id: ++counter,
            keyword: "deploy_to_client_server",
            active: true,
            name: "Загрузить на ваш сервер",
            description: "Необходимо указать FTP-доступ к вашему хостингу",
            priceMin: 50,
            priceMax: 50,
            group: "placement"
        },
        {
            id: ++counter,
            keyword: "deploy_to_our_server",
            active: false,
            name: "Разместить у нас",
            description: "",
            priceMin: 100,
            priceMax: 100,
            group: "placement"
        },
    ];
}
