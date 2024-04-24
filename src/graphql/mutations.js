/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
export const createHealthParameters = /* GraphQL */ `
  mutation CreateHealthParameters(
    $input: CreateHealthParametersInput!
    $condition: ModelHealthParametersConditionInput
  ) {
    createHealthParameters(input: $input, condition: $condition) {
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
export const updateHealthParameters = /* GraphQL */ `
  mutation UpdateHealthParameters(
    $input: UpdateHealthParametersInput!
    $condition: ModelHealthParametersConditionInput
  ) {
    updateHealthParameters(input: $input, condition: $condition) {
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
export const deleteHealthParameters = /* GraphQL */ `
  mutation DeleteHealthParameters(
    $input: DeleteHealthParametersInput!
    $condition: ModelHealthParametersConditionInput
  ) {
    deleteHealthParameters(input: $input, condition: $condition) {
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
export const createUserData = /* GraphQL */ `
  mutation CreateUserData(
    $input: CreateUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    createUserData(input: $input, condition: $condition) {
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
export const updateUserData = /* GraphQL */ `
  mutation UpdateUserData(
    $input: UpdateUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    updateUserData(input: $input, condition: $condition) {
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
export const deleteUserData = /* GraphQL */ `
  mutation DeleteUserData(
    $input: DeleteUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    deleteUserData(input: $input, condition: $condition) {
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
export const createPlantData = /* GraphQL */ `
  mutation CreatePlantData(
    $input: CreatePlantDataInput!
    $condition: ModelPlantDataConditionInput
  ) {
    createPlantData(input: $input, condition: $condition) {
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
export const updatePlantData = /* GraphQL */ `
  mutation UpdatePlantData(
    $input: UpdatePlantDataInput!
    $condition: ModelPlantDataConditionInput
  ) {
    updatePlantData(input: $input, condition: $condition) {
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
export const deletePlantData = /* GraphQL */ `
  mutation DeletePlantData(
    $input: DeletePlantDataInput!
    $condition: ModelPlantDataConditionInput
  ) {
    deletePlantData(input: $input, condition: $condition) {
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
export const createSensorData = /* GraphQL */ `
  mutation CreateSensorData(
    $input: CreateSensorDataInput!
    $condition: ModelSensorDataConditionInput
  ) {
    createSensorData(input: $input, condition: $condition) {
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
export const updateSensorData = /* GraphQL */ `
  mutation UpdateSensorData(
    $input: UpdateSensorDataInput!
    $condition: ModelSensorDataConditionInput
  ) {
    updateSensorData(input: $input, condition: $condition) {
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
export const deleteSensorData = /* GraphQL */ `
  mutation DeleteSensorData(
    $input: DeleteSensorDataInput!
    $condition: ModelSensorDataConditionInput
  ) {
    deleteSensorData(input: $input, condition: $condition) {
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
