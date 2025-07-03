import { defineStore, acceptHMRUpdate } from "pinia";
import { v4 as uuidV4 } from "uuid";

function removeEmpty(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null && v !== '' && (!Array.isArray(v) || v.length > 0))
      .map(([k, v]) => [k, (v === Object(v) && !Array.isArray(v)) ? removeEmpty(v) : v])
  );
}

export const useCredentialStore = defineStore('credential', {
    state: () => ({
        id: '',
        name: '',
        achievementType: '',
        image: {},
        description: '',
        criteria: {},
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
        creator: {
            image: {
                id: '',
                type: 'Image',
                caption: '',
            },
            address: {
                geo: {},
            },
        },
    }),
    getters: {
        hasRequired(state) {
            if (!state.name) {
                return false;
            }
            if (!state.achievementType) {
                return false;
            }
            if (!state.description) {
                return false;
            }
            if (!state.criteria.narrative && !state.criteria.url) {
                return false;
            }

            return true;
        },
        credential(state) {
            const result = {
                "@context": [
                    "https://www.w3.org/ns/credentials/v2",
                    "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
                ],
                type: ["Achievement"],
                name: state.name,
                achievementType: state.achievementType,
                description: state.description,
                criteria: {},
            };

            if (state.image.id) {
                result.image = {
                    id: state.image.id,
                    type: 'Image',
                };

                if (state.image.caption) {
                    result.image.caption = state.image.caption;
                }
            }

            if (state.id.trim()) {
                result.id = state.id.trim();
            }

            if (state.criteria.narrative.trim()) {
                result.criteria.narrative = state.criteria.narrative.trim();
            }
            if (state.criteria.url.trim()) {
                result.criteria.id = state.criteria.url.trim();
            }

            if (state.humanCode.trim()) {
                result.humanCode = state.humanCode.trim();
            }

            if (state.inLanguage.trim()) {
                result.inLanguage = state.inLanguage.trim();
            }

            if (state.version.trim()) {
                result.version = state.version.trim();
            }

            if (state.creditsAvailable) {
                result.creditsAvailable = state.creditsAvailable;
            }

            if (state.fieldOfStudy.trim()) {
                result.fieldOfStudy = state.fieldOfStudy.trim();
            }

            if (state.specialization.trim()) {
                result.specialization = state.specialization.trim();
            }

            if (state.alignment.length > 0) {
                result.alignment = [];
                state.alignment.forEach((alignment) => {
                    alignment = removeEmpty(alignment);
                    if (Object.keys(alignment).length > 0) {
                        //console.log(Object.keys(alignment).length, alignment);
                        result.alignment.push(alignment);
                    }
                })

                if (result.alignment.length === 0) {
                    delete result.alignment;
                }
            }

            if (state.resultDescription.length > 0) {
                result.resultDescription = [];
                state.resultDescription.forEach((resultDescription) => {
                    resultDescription = removeEmpty(resultDescription);
                    if (Object.keys(resultDescription).length > 0) {
                        //console.log(Object.keys(result).length, result);
                        result.resultDescription.push(resultDescription);
                    }
                })

                if (result.resultDescription.length === 0) {
                    delete result.resultDescription;
                }
            }

            if (state.tag.length > 0) {
                result.tag = state.tag;
            }

            if (state.related.length > 0) {
                result.related = [];
                state.related.forEach((related) => {
                    related = removeEmpty(related);
                    if (Object.keys(related).length > 0) {
                        //console.log(Object.keys(result).length, result);
                        result.related.push(related);
                    }
                })

                if (result.related.length === 0) {
                    delete result.related;
                }
            }

            if (state.otherIdentifier.length > 0) {
                result.otherIdentifier = [];
                state.otherIdentifier.forEach((otherIdentifier) => {
                    otherIdentifier = removeEmpty(otherIdentifier);
                    if (Object.keys(otherIdentifier).length > 0) {
                        //console.log(Object.keys(result).length, result);
                        result.otherIdentifier.push(otherIdentifier);
                    }
                })

                if (result.otherIdentifier.length === 0) {
                    delete result.otherIdentifier;
                }
            }

            if (state.creator.id) {
                result.creator = {
                    id: state.creator.id,
                    type: ["Profile"],
                };
                if (state.creator.name) {
                    result.creator.name = state.creator.name;
                }
                if (state.creator.url) {
                    result.creator.url = state.creator.url;
                }
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
