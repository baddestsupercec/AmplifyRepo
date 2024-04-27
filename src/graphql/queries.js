/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchSensorData = /* GraphQL */ `
  query SearchSensorData(
    $filter: SearchableSensorDataFilterInput
    $sort: [SearchableSensorDataSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableSensorDataAggregationInput]
  ) {
    searchSensorData(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        sensorID
        dateTime
        plantid
        data
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
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
export const getUserData = /* GraphQL */ `
  query GetUserData($userID: ID!) {
    getUserData(userID: $userID) {
      userID
      email
      username
      firstName
      lastName
      plant {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserData = /* GraphQL */ `
  query ListUserData(
    $userID: ID
    $filter: ModelUserDataFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserData(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userID
        email
        username
        firstName
        lastName
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPlantData = /* GraphQL */ `
  query GetPlantData($plantID: ID!) {
    getPlantData(plantID: $plantID) {
      plantID
      info
      healthparamatersid
      healthparameters {
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
      userid
      sensor {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPlantData = /* GraphQL */ `
  query ListPlantData(
    $plantID: ID
    $filter: ModelPlantDataFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPlantData(
      plantID: $plantID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        plantID
        info
        healthparamatersid
        userid
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSensorData = /* GraphQL */ `
  query GetSensorData($sensorID: ID!, $dateTime: String!) {
    getSensorData(sensorID: $sensorID, dateTime: $dateTime) {
      sensorID
      dateTime
      plantid
      data
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSensorData = /* GraphQL */ `
  query ListSensorData(
    $sensorID: ID
    $dateTime: ModelStringKeyConditionInput
    $filter: ModelSensorDataFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSensorData(
      sensorID: $sensorID
      dateTime: $dateTime
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        sensorID
        dateTime
        plantid
        data
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const plantDataByUserid = /* GraphQL */ `
  query PlantDataByUserid(
    $userid: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPlantDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    plantDataByUserid(
      userid: $userid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        plantID
        info
        healthparamatersid
        userid
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const sensorDataByPlantid = /* GraphQL */ `
  query SensorDataByPlantid(
    $plantid: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSensorDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sensorDataByPlantid(
      plantid: $plantid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        sensorID
        dateTime
        plantid
        data
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
