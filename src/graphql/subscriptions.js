/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
