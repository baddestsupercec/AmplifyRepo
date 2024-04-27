/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onSensorByPlantId = /* GraphQL */ `
  subscription OnSensorByPlantId($plantDataSensorDatasId: ID!) {
    onSensorByPlantId(plantDataSensorDatasId: $plantDataSensorDatasId) {
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
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
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
export const onCreateHealthParameters = /* GraphQL */ `
  subscription OnCreateHealthParameters(
    $filter: ModelSubscriptionHealthParametersFilterInput
  ) {
    onCreateHealthParameters(filter: $filter) {
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
export const onUpdateHealthParameters = /* GraphQL */ `
  subscription OnUpdateHealthParameters(
    $filter: ModelSubscriptionHealthParametersFilterInput
  ) {
    onUpdateHealthParameters(filter: $filter) {
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
export const onDeleteHealthParameters = /* GraphQL */ `
  subscription OnDeleteHealthParameters(
    $filter: ModelSubscriptionHealthParametersFilterInput
  ) {
    onDeleteHealthParameters(filter: $filter) {
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
export const onCreateUserData = /* GraphQL */ `
  subscription OnCreateUserData($filter: ModelSubscriptionUserDataFilterInput) {
    onCreateUserData(filter: $filter) {
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
export const onUpdateUserData = /* GraphQL */ `
  subscription OnUpdateUserData($filter: ModelSubscriptionUserDataFilterInput) {
    onUpdateUserData(filter: $filter) {
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
export const onDeleteUserData = /* GraphQL */ `
  subscription OnDeleteUserData($filter: ModelSubscriptionUserDataFilterInput) {
    onDeleteUserData(filter: $filter) {
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
export const onCreatePlantData = /* GraphQL */ `
  subscription OnCreatePlantData(
    $filter: ModelSubscriptionPlantDataFilterInput
  ) {
    onCreatePlantData(filter: $filter) {
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
export const onUpdatePlantData = /* GraphQL */ `
  subscription OnUpdatePlantData(
    $filter: ModelSubscriptionPlantDataFilterInput
  ) {
    onUpdatePlantData(filter: $filter) {
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
export const onDeletePlantData = /* GraphQL */ `
  subscription OnDeletePlantData(
    $filter: ModelSubscriptionPlantDataFilterInput
  ) {
    onDeletePlantData(filter: $filter) {
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
export const onCreateSensorData = /* GraphQL */ `
  subscription OnCreateSensorData(
    $filter: ModelSubscriptionSensorDataFilterInput
  ) {
    onCreateSensorData(filter: $filter) {
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
export const onUpdateSensorData = /* GraphQL */ `
  subscription OnUpdateSensorData(
    $filter: ModelSubscriptionSensorDataFilterInput
  ) {
    onUpdateSensorData(filter: $filter) {
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
export const onDeleteSensorData = /* GraphQL */ `
  subscription OnDeleteSensorData(
    $filter: ModelSubscriptionSensorDataFilterInput
  ) {
    onDeleteSensorData(filter: $filter) {
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
