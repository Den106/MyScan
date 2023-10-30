import axios from "axios";

const BASE_URL = "https://gateway.scan-interfax.ru/";
const LOGIN_URL = BASE_URL + "api/v1/account/login";
const LOGIN_INFO_URL =  BASE_URL + "api/v1/account/info";
const HISTOGRAMS = BASE_URL + "api/v1/objectsearch/histograms";
const OBJECTSEARCH = BASE_URL + "api/v1/objectsearch";
const DOCUMENTS = BASE_URL + "api/v1/documents";

async function logIn(userName, password) {
    return await axios({
        url: LOGIN_URL,
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            login: userName,
            password: password,
        },
    })
        .then((res) => {
            console.log("Logged in successfully");
            localStorage.setItem("TOKEN", res.data.accessToken);
            localStorage.setItem("EXPIRE", res.data.expire);
            return res.data.accessToken;
        })
        .catch((e) => {
            console.log("Authorization issues...", e);
        });
}

async function accountInfo(token) {
    if (token) {
        return await axios({
            url: LOGIN_INFO_URL,
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log("Account info is received successfully");
                return res.data.eventFiltersInfo;
            })
            .catch((e) => console.log("Failed receiving data..."));
    } else {
        console.log("You are not authorized");
    }
}

export { logIn, accountInfo };

async function Histograms(searchParametrs) {
    return await axios({
        url: HISTOGRAMS,
        method: "post",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        },
        data: {
            "issueDateInterval": {
                "startDate": `${searchParametrs.startDate}`,
                "endDate": `${searchParametrs.endDate}`
            },
            "searchContext": {
                "targetSearchEntitiesContext": {
                    "targetSearchEntities": [
                        {
                            "type": "company",
                            "sparkId": null,
                            "entityId": null,
                            "inn": `${searchParametrs.inn}`,
                            "maxFullness": true,
                            "inBusinessNews": null
                        }
                    ],
                    "onlyMainRole": `${searchParametrs.mainRole}`,
                    "tonality": `${searchParametrs.tonality}`,
                    "onlyWithRiskFactors": `${searchParametrs.riskFactors}`,
                    "riskFactors": {
                        "and": [],
                        "or": [],
                        "not": []
                    },
                    "themes": {
                        "and": [],
                        "or": [],
                        "not": []
                    }
                },
                "themesFilter": {
                    "and": [],
                    "or": [],
                    "not": []
                }
            },
            "searchArea": {
                "includedSources": [],
                "excludedSources": [],
                "includedSourceGroups": [],
                "excludedSourceGroups": []
            },
            "attributeFilters": {
                "excludeTechNews": `${searchParametrs.technicalNews}`,
                "excludeAnnouncements": `${searchParametrs.announcements}`,
                "excludeDigests": `${searchParametrs.newsDigests}`
            },
            "similarMode": "duplicates",
            "limit": `${searchParametrs.documentCount}`,
            "sortType": "sourceInfluence",
            "sortDirectionType": "desc",
            "intervalType": "month",
            "histogramTypes": [
                "totalDocuments",
                "riskFactors"
            ]
        },
    }).then((res) => {
        return res
    });
}

async function Objectsearch(searchParametrs) {
    return await axios({
        url: OBJECTSEARCH,
        method: "post",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        },
        data: {
            "issueDateInterval": {
                "startDate": `${searchParametrs.startDate}`,
                "endDate": `${searchParametrs.endDate}`
            },
            "searchContext": {
                "targetSearchEntitiesContext": {
                    "targetSearchEntities": [
                        {
                            "type": "company",
                            "sparkId": null,
                            "entityId": null,
                            "inn": `${searchParametrs.inn}`,
                            "maxFullness": true,
                            "inBusinessNews": null
                        }
                    ],
                    "onlyMainRole": `${searchParametrs.mainRole}`,
                    "tonality": `${searchParametrs.tonality}`,
                    "onlyWithRiskFactors": `${searchParametrs.riskFactors}`,
                    "riskFactors": {
                        "and": [],
                        "or": [],
                        "not": []
                    },
                    "themes": {
                        "and": [],
                        "or": [],
                        "not": []
                    }
                },
                "themesFilter": {
                    "and": [],
                    "or": [],
                    "not": []
                }
            },
            "searchArea": {
                "includedSources": [],
                "excludedSources": [],
                "includedSourceGroups": [],
                "excludedSourceGroups": []
            },
            "attributeFilters": {
                "excludeTechNews": `${searchParametrs.technicalNews}`,
                "excludeAnnouncements": `${searchParametrs.announcements}`,
                "excludeDigests": `${searchParametrs.newsDigests}`
            },
            "similarMode": "duplicates",
            "limit": `${searchParametrs.documentCount}`,
            "sortType": "sourceInfluence",
            "sortDirectionType": "desc",
            "intervalType": "month",
            "histogramTypes": [
                "totalDocuments",
                "riskFactors"
            ]
        },
    }).then((res) => {
        return res;
    });
}

async function Documents(arrForRequest) {
    return await axios({
        url: DOCUMENTS,
        method: "post",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        },
        data: {
            "ids": arrForRequest
        },
    }).then((res) => {
        return res
    });
}

export { Histograms, Objectsearch, Documents }
