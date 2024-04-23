/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getHealthParameters } from "../graphql/queries";
import { updateHealthParameters } from "../graphql/mutations";
const client = generateClient();
export default function HealthParametersUpdateForm(props) {
  const {
    id: idProp,
    healthParameters: healthParametersModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    username: "",
    pHlow: "",
    pHhigh: "",
    temperatureLow: "",
    temperatureHigh: "",
    humidityLow: "",
    humidityHigh: "",
    smellLow: "",
    smellHigh: "",
    moistureLow: "",
    moistureHigh: "",
    lightLow: "",
    lightHigh: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [username, setUsername] = React.useState(initialValues.username);
  const [pHlow, setPHlow] = React.useState(initialValues.pHlow);
  const [pHhigh, setPHhigh] = React.useState(initialValues.pHhigh);
  const [temperatureLow, setTemperatureLow] = React.useState(
    initialValues.temperatureLow
  );
  const [temperatureHigh, setTemperatureHigh] = React.useState(
    initialValues.temperatureHigh
  );
  const [humidityLow, setHumidityLow] = React.useState(
    initialValues.humidityLow
  );
  const [humidityHigh, setHumidityHigh] = React.useState(
    initialValues.humidityHigh
  );
  const [smellLow, setSmellLow] = React.useState(initialValues.smellLow);
  const [smellHigh, setSmellHigh] = React.useState(initialValues.smellHigh);
  const [moistureLow, setMoistureLow] = React.useState(
    initialValues.moistureLow
  );
  const [moistureHigh, setMoistureHigh] = React.useState(
    initialValues.moistureHigh
  );
  const [lightLow, setLightLow] = React.useState(initialValues.lightLow);
  const [lightHigh, setLightHigh] = React.useState(initialValues.lightHigh);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = healthParametersRecord
      ? { ...initialValues, ...healthParametersRecord }
      : initialValues;
    setName(cleanValues.name);
    setUsername(cleanValues.username);
    setPHlow(cleanValues.pHlow);
    setPHhigh(cleanValues.pHhigh);
    setTemperatureLow(cleanValues.temperatureLow);
    setTemperatureHigh(cleanValues.temperatureHigh);
    setHumidityLow(cleanValues.humidityLow);
    setHumidityHigh(cleanValues.humidityHigh);
    setSmellLow(cleanValues.smellLow);
    setSmellHigh(cleanValues.smellHigh);
    setMoistureLow(cleanValues.moistureLow);
    setMoistureHigh(cleanValues.moistureHigh);
    setLightLow(cleanValues.lightLow);
    setLightHigh(cleanValues.lightHigh);
    setErrors({});
  };
  const [healthParametersRecord, setHealthParametersRecord] = React.useState(
    healthParametersModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getHealthParameters.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getHealthParameters
        : healthParametersModelProp;
      setHealthParametersRecord(record);
    };
    queryData();
  }, [idProp, healthParametersModelProp]);
  React.useEffect(resetStateValues, [healthParametersRecord]);
  const validations = {
    name: [{ type: "Required" }],
    username: [],
    pHlow: [],
    pHhigh: [],
    temperatureLow: [],
    temperatureHigh: [],
    humidityLow: [],
    humidityHigh: [],
    smellLow: [],
    smellHigh: [],
    moistureLow: [],
    moistureHigh: [],
    lightLow: [],
    lightHigh: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          username: username ?? null,
          pHlow: pHlow ?? null,
          pHhigh: pHhigh ?? null,
          temperatureLow: temperatureLow ?? null,
          temperatureHigh: temperatureHigh ?? null,
          humidityLow: humidityLow ?? null,
          humidityHigh: humidityHigh ?? null,
          smellLow: smellLow ?? null,
          smellHigh: smellHigh ?? null,
          moistureLow: moistureLow ?? null,
          moistureHigh: moistureHigh ?? null,
          lightLow: lightLow ?? null,
          lightHigh: lightHigh ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateHealthParameters.replaceAll("__typename", ""),
            variables: {
              input: {
                id: healthParametersRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "HealthParametersUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              username,
              pHlow,
              pHhigh,
              temperatureLow,
              temperatureHigh,
              humidityLow,
              humidityHigh,
              smellLow,
              smellHigh,
              moistureLow,
              moistureHigh,
              lightLow,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Username"
        isRequired={false}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              username: value,
              pHlow,
              pHhigh,
              temperatureLow,
              temperatureHigh,
              humidityLow,
              humidityHigh,
              smellLow,
              smellHigh,
              moistureLow,
              moistureHigh,
              lightLow,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.username ?? value;
          }
          if (errors.username?.hasError) {
            runValidationTasks("username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("username", username)}
        errorMessage={errors.username?.errorMessage}
        hasError={errors.username?.hasError}
        {...getOverrideProps(overrides, "username")}
      ></TextField>
      <TextField
        label="P hlow"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={pHlow}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              username,
              pHlow: value,
              pHhigh,
              temperatureLow,
              temperatureHigh,
              humidityLow,
              humidityHigh,
              smellLow,
              smellHigh,
              moistureLow,
              moistureHigh,
              lightLow,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.pHlow ?? value;
          }
          if (errors.pHlow?.hasError) {
            runValidationTasks("pHlow", value);
          }
          setPHlow(value);
        }}
        onBlur={() => runValidationTasks("pHlow", pHlow)}
        errorMessage={errors.pHlow?.errorMessage}
        hasError={errors.pHlow?.hasError}
        {...getOverrideProps(overrides, "pHlow")}
      ></TextField>
      <TextField
        label="P hhigh"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={pHhigh}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              username,
              pHlow,
              pHhigh: value,
              temperatureLow,
              temperatureHigh,
              humidityLow,
              humidityHigh,
              smellLow,
              smellHigh,
              moistureLow,
              moistureHigh,
              lightLow,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.pHhigh ?? value;
          }
          if (errors.pHhigh?.hasError) {
            runValidationTasks("pHhigh", value);
          }
          setPHhigh(value);
        }}
        onBlur={() => runValidationTasks("pHhigh", pHhigh)}
        errorMessage={errors.pHhigh?.errorMessage}
        hasError={errors.pHhigh?.hasError}
        {...getOverrideProps(overrides, "pHhigh")}
      ></TextField>
      <TextField
        label="Temperature low"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={temperatureLow}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              username,
              pHlow,
              pHhigh,
              temperatureLow: value,
              temperatureHigh,
              humidityLow,
              humidityHigh,
              smellLow,
              smellHigh,
              moistureLow,
              moistureHigh,
              lightLow,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.temperatureLow ?? value;
          }
          if (errors.temperatureLow?.hasError) {
            runValidationTasks("temperatureLow", value);
          }
          setTemperatureLow(value);
        }}
        onBlur={() => runValidationTasks("temperatureLow", temperatureLow)}
        errorMessage={errors.temperatureLow?.errorMessage}
        hasError={errors.temperatureLow?.hasError}
        {...getOverrideProps(overrides, "temperatureLow")}
      ></TextField>
      <TextField
        label="Temperature high"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={temperatureHigh}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              username,
              pHlow,
              pHhigh,
              temperatureLow,
              temperatureHigh: value,
              humidityLow,
              humidityHigh,
              smellLow,
              smellHigh,
              moistureLow,
              moistureHigh,
              lightLow,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.temperatureHigh ?? value;
          }
          if (errors.temperatureHigh?.hasError) {
            runValidationTasks("temperatureHigh", value);
          }
          setTemperatureHigh(value);
        }}
        onBlur={() => runValidationTasks("temperatureHigh", temperatureHigh)}
        errorMessage={errors.temperatureHigh?.errorMessage}
        hasError={errors.temperatureHigh?.hasError}
        {...getOverrideProps(overrides, "temperatureHigh")}
      ></TextField>
      <TextField
        label="Humidity low"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={humidityLow}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              username,
              pHlow,
              pHhigh,
              temperatureLow,
              temperatureHigh,
              humidityLow: value,
              humidityHigh,
              smellLow,
              smellHigh,
              moistureLow,
              moistureHigh,
              lightLow,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.humidityLow ?? value;
          }
          if (errors.humidityLow?.hasError) {
            runValidationTasks("humidityLow", value);
          }
          setHumidityLow(value);
        }}
        onBlur={() => runValidationTasks("humidityLow", humidityLow)}
        errorMessage={errors.humidityLow?.errorMessage}
        hasError={errors.humidityLow?.hasError}
        {...getOverrideProps(overrides, "humidityLow")}
      ></TextField>
      <TextField
        label="Humidity high"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={humidityHigh}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              username,
              pHlow,
              pHhigh,
              temperatureLow,
              temperatureHigh,
              humidityLow,
              humidityHigh: value,
              smellLow,
              smellHigh,
              moistureLow,
              moistureHigh,
              lightLow,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.humidityHigh ?? value;
          }
          if (errors.humidityHigh?.hasError) {
            runValidationTasks("humidityHigh", value);
          }
          setHumidityHigh(value);
        }}
        onBlur={() => runValidationTasks("humidityHigh", humidityHigh)}
        errorMessage={errors.humidityHigh?.errorMessage}
        hasError={errors.humidityHigh?.hasError}
        {...getOverrideProps(overrides, "humidityHigh")}
      ></TextField>
      <TextField
        label="Smell low"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={smellLow}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              username,
              pHlow,
              pHhigh,
              temperatureLow,
              temperatureHigh,
              humidityLow,
              humidityHigh,
              smellLow: value,
              smellHigh,
              moistureLow,
              moistureHigh,
              lightLow,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.smellLow ?? value;
          }
          if (errors.smellLow?.hasError) {
            runValidationTasks("smellLow", value);
          }
          setSmellLow(value);
        }}
        onBlur={() => runValidationTasks("smellLow", smellLow)}
        errorMessage={errors.smellLow?.errorMessage}
        hasError={errors.smellLow?.hasError}
        {...getOverrideProps(overrides, "smellLow")}
      ></TextField>
      <TextField
        label="Smell high"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={smellHigh}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              username,
              pHlow,
              pHhigh,
              temperatureLow,
              temperatureHigh,
              humidityLow,
              humidityHigh,
              smellLow,
              smellHigh: value,
              moistureLow,
              moistureHigh,
              lightLow,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.smellHigh ?? value;
          }
          if (errors.smellHigh?.hasError) {
            runValidationTasks("smellHigh", value);
          }
          setSmellHigh(value);
        }}
        onBlur={() => runValidationTasks("smellHigh", smellHigh)}
        errorMessage={errors.smellHigh?.errorMessage}
        hasError={errors.smellHigh?.hasError}
        {...getOverrideProps(overrides, "smellHigh")}
      ></TextField>
      <TextField
        label="Moisture low"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={moistureLow}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              username,
              pHlow,
              pHhigh,
              temperatureLow,
              temperatureHigh,
              humidityLow,
              humidityHigh,
              smellLow,
              smellHigh,
              moistureLow: value,
              moistureHigh,
              lightLow,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.moistureLow ?? value;
          }
          if (errors.moistureLow?.hasError) {
            runValidationTasks("moistureLow", value);
          }
          setMoistureLow(value);
        }}
        onBlur={() => runValidationTasks("moistureLow", moistureLow)}
        errorMessage={errors.moistureLow?.errorMessage}
        hasError={errors.moistureLow?.hasError}
        {...getOverrideProps(overrides, "moistureLow")}
      ></TextField>
      <TextField
        label="Moisture high"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={moistureHigh}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              username,
              pHlow,
              pHhigh,
              temperatureLow,
              temperatureHigh,
              humidityLow,
              humidityHigh,
              smellLow,
              smellHigh,
              moistureLow,
              moistureHigh: value,
              lightLow,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.moistureHigh ?? value;
          }
          if (errors.moistureHigh?.hasError) {
            runValidationTasks("moistureHigh", value);
          }
          setMoistureHigh(value);
        }}
        onBlur={() => runValidationTasks("moistureHigh", moistureHigh)}
        errorMessage={errors.moistureHigh?.errorMessage}
        hasError={errors.moistureHigh?.hasError}
        {...getOverrideProps(overrides, "moistureHigh")}
      ></TextField>
      <TextField
        label="Light low"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={lightLow}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              username,
              pHlow,
              pHhigh,
              temperatureLow,
              temperatureHigh,
              humidityLow,
              humidityHigh,
              smellLow,
              smellHigh,
              moistureLow,
              moistureHigh,
              lightLow: value,
              lightHigh,
            };
            const result = onChange(modelFields);
            value = result?.lightLow ?? value;
          }
          if (errors.lightLow?.hasError) {
            runValidationTasks("lightLow", value);
          }
          setLightLow(value);
        }}
        onBlur={() => runValidationTasks("lightLow", lightLow)}
        errorMessage={errors.lightLow?.errorMessage}
        hasError={errors.lightLow?.hasError}
        {...getOverrideProps(overrides, "lightLow")}
      ></TextField>
      <TextField
        label="Light high"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={lightHigh}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              username,
              pHlow,
              pHhigh,
              temperatureLow,
              temperatureHigh,
              humidityLow,
              humidityHigh,
              smellLow,
              smellHigh,
              moistureLow,
              moistureHigh,
              lightLow,
              lightHigh: value,
            };
            const result = onChange(modelFields);
            value = result?.lightHigh ?? value;
          }
          if (errors.lightHigh?.hasError) {
            runValidationTasks("lightHigh", value);
          }
          setLightHigh(value);
        }}
        onBlur={() => runValidationTasks("lightHigh", lightHigh)}
        errorMessage={errors.lightHigh?.errorMessage}
        hasError={errors.lightHigh?.hasError}
        {...getOverrideProps(overrides, "lightHigh")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || healthParametersModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || healthParametersModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
