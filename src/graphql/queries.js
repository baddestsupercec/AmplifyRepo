/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      username
      pH
      temperature
      humidity
      smell
      moisture
      light
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        username
        pH
        temperature
        humidity
        smell
        moisture
        light
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getHealthParameters = /* GraphQL */ `
  query GetHealthParameters($id: ID!) {
    getHealthParameters(id: $id) {
      id
      name
      username
      pHlow
      pHhigh
      temperatureLow
      temperatureHigh
      humidityLow
      humidityHigh
      smellLow
      smellHigh
      moistureLow
      moistureHigh
      lightLow
      lightHigh
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listHealthParameters = /* GraphQL */ `
  query ListHealthParameters(
    $filter: ModelHealthParametersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHealthParameters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        username
        pHlow
        pHhigh
        temperatureLow
        temperatureHigh
        humidityLow
        humidityHigh
        smellLow
        smellHigh
        moistureLow
        moistureHigh
        lightLow
        lightHigh
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
