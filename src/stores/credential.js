import { defineStore, acceptHMRUpdate } from "pinia";
import { v4 as uuidV4 } from "uuid";

function removeEmpty(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null && v !== '')
      .map(([k, v]) => [k, (v === Object(v) && !Array.isArray(v)) ? removeEmpty(v) : v])
  );
}

export const useCredentialStore = defineStore('credential', {
    state: () => ({
        name: '',
        type: '',
        typeExt: '',
        image: '',
        description: '',
        criteria: '',
        criteriaUrl: '',
        humanCode: '',
        inLanguage: '',
        version: '',
        creditsAvailable: '',
        specialization: '',
        fieldOfStudy: '',
        alignment: [],
        related: [],
        resultDescription: [],
        tag: [],
        otherIdentifier: [],
        creator: {},
        id: '',
    }),
    getters: {
        hasRequired(state) {
            if (!state.name) {
                return false;
            }
            if (!state.type || (state.type === 'other' && !state.typeExt)) {
                return false;
            }
            if (!state.description) {
                return false;
            }
            if (!state.criteria && !state.criteriaUrl) {
                return false;
            }

            return true;
        },
        credential(state) {
            const result = {
                "@context": [
                    "https://www.w3.org/2018/credentials/v2",
                    "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
                ],
                "type": "Achievement",
                "name": state.name,
                "achievementType": (state.type === 'other') ? 'ext:'+state.typeExt : state.type,
                "description": state.description,
                "criteria": {},
                "image": state.image ? state.image.substring(0, 25) : null,
            };

            if (state.criteria) {
                result.criteria.narrative = state.criteria;
            }
            if (state.criteriaUrl) {
                result.criteria.id = state.criteriaUrl;
            }

            if (state.humanCode) {
                result.humanCode = state.humanCode;
            }

            if (state.inLanguage) {
                result.inLanguage = state.inLanguage;
            }

            if (state.version) {
                result.version = state.version;
            }

            if (state.creditsAvailable) {
                result.creditsAvailable = state.creditsAvailable;
            }

            if (state.fieldOfStudy) {
                result.fieldOfStudy = state.fieldOfStudy;
            }

            if (state.specialization) {
                result.specialization = state.specialization;
            }

            return JSON.stringify(result);

            /*
            {
                "humanCode": "",
                "inLanguage": "",
                "version": "",
                "creditsAvailable": "",
                "fieldOfStudy": "",
                "specialization": "",
                "tag": [],
                "otherIdentifier": [],
                "related": [{
                    "id": "",
                    "type": ["Related"],
                    "inLanguage": "",
                    "version": "",
                }],
                "resultDescription": [{
                    "id": "",
                    "type": ["ResultDescription"],
                    "name": "",
                    "resultType": "",
                        - GradePointAverage
                        - LetterGrade
                        - Percent
                        - PerformanceLevel
                        - PredictedScore
                        - RawScore
                        - Result
                        - RubricCriterion
                        - RubricCriterionLevel
                        - RubricScore
                        - ScaledScore
                        - Status
                        - ext:[a-zA-Z0-9\\.\\-_]+
                    "valueMax": "",
                    "valueMin": "",
                    "rubricCriterionLevel": [{
                      "id": "", // required
                      "type": ["RubricCriterionLevel"], // required
                      "name": "", // required
                      "level": "",
                      "description": "",
                      "alignment": [],
                      "points": ""
                    }],
                    "requiredLevel": "",
                    "allowedValue": [],
                    "alignment": [],
                    "requiredValue": "",
                }],
                "alignment": [{
                    "type": ["Alignment"],
                    "targetName": "",
                    "targetUrl": "",
                    "targetFramework": "",
                    "targetDescription": "",
                    "targetCode": "",
                    "targetType": "",
                }],
                "creator": {
                    "id": "",
                    "type": ["Profile"],
                    "address": {
                    },
                    "givenName": "",
                    "description": "",
                    "official": "",
                    "honorificPrefix": "",
                    "dateOfBirth": "",
                    "url": "",
                    "honorificSuffix": "",
                    "phone": "",
                    "familyName": "",
                    "familyNamePrefix": "",
                    "name": "",
                    "patronymicName": "",
                    "otherIdentifier": [],
                    "additionalName": "",
                    "email": "",
                    "parentOrg": "",
                },
            }
            */
        },
        uuid: state => {
            return uuidV4();
        }
    },
    actions: {

    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCredentialStore, import.meta.hot));
}
