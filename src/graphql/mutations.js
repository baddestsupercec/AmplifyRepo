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
