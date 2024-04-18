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
import { createNote } from "../graphql/mutations";
const client = generateClient();
export default function NoteCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    description: "",
    image: "",
    username: "",
    pH: "",
    temperature: "",
    humidity: "",
    smell: "",
    moisture: "",
    light: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [username, setUsername] = React.useState(initialValues.username);
  const [pH, setPH] = React.useState(initialValues.pH);
  const [temperature, setTemperature] = React.useState(
    initialValues.temperature
  );
  const [humidity, setHumidity] = React.useState(initialValues.humidity);
  const [smell, setSmell] = React.useState(initialValues.smell);
  const [moisture, setMoisture] = React.useState(initialValues.moisture);
  const [light, setLight] = React.useState(initialValues.light);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setDescription(initialValues.description);
    setImage(initialValues.image);
    setUsername(initialValues.username);
    setPH(initialValues.pH);
    setTemperature(initialValues.temperature);
    setHumidity(initialValues.humidity);
    setSmell(initialValues.smell);
    setMoisture(initialValues.moisture);
    setLight(initialValues.light);
    setErrors({});
  };
  const validations = {
    name: [{ type: "Required" }],
    description: [],
    image: [],
    username: [],
    pH: [],
    temperature: [],
    humidity: [],
    smell: [],
    moisture: [],
    light: [],
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
          description,
          image,
          username,
          pH,
          temperature,
          humidity,
          smell,
          moisture,
          light,
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
            query: createNote.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "NoteCreateForm")}
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
              description,
              image,
              username,
              pH,
              temperature,
              humidity,
              smell,
              moisture,
              light,
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
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description: value,
              image,
              username,
              pH,
              temperature,
              humidity,
              smell,
              moisture,
              light,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              image: value,
              username,
              pH,
              temperature,
              humidity,
              smell,
              moisture,
              light,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
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
              description,
              image,
              username: value,
              pH,
              temperature,
              humidity,
              smell,
              moisture,
              light,
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
        label="P h"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={pH}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              image,
              username,
              pH: value,
              temperature,
              humidity,
              smell,
              moisture,
              light,
            };
            const result = onChange(modelFields);
            value = result?.pH ?? value;
          }
          if (errors.pH?.hasError) {
            runValidationTasks("pH", value);
          }
          setPH(value);
        }}
        onBlur={() => runValidationTasks("pH", pH)}
        errorMessage={errors.pH?.errorMessage}
        hasError={errors.pH?.hasError}
        {...getOverrideProps(overrides, "pH")}
      ></TextField>
      <TextField
        label="Temperature"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={temperature}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              image,
              username,
              pH,
              temperature: value,
              humidity,
              smell,
              moisture,
              light,
            };
            const result = onChange(modelFields);
            value = result?.temperature ?? value;
          }
          if (errors.temperature?.hasError) {
            runValidationTasks("temperature", value);
          }
          setTemperature(value);
        }}
        onBlur={() => runValidationTasks("temperature", temperature)}
        errorMessage={errors.temperature?.errorMessage}
        hasError={errors.temperature?.hasError}
        {...getOverrideProps(overrides, "temperature")}
      ></TextField>
      <TextField
        label="Humidity"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={humidity}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              image,
              username,
              pH,
              temperature,
              humidity: value,
              smell,
              moisture,
              light,
            };
            const result = onChange(modelFields);
            value = result?.humidity ?? value;
          }
          if (errors.humidity?.hasError) {
            runValidationTasks("humidity", value);
          }
          setHumidity(value);
        }}
        onBlur={() => runValidationTasks("humidity", humidity)}
        errorMessage={errors.humidity?.errorMessage}
        hasError={errors.humidity?.hasError}
        {...getOverrideProps(overrides, "humidity")}
      ></TextField>
      <TextField
        label="Smell"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={smell}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              image,
              username,
              pH,
              temperature,
              humidity,
              smell: value,
              moisture,
              light,
            };
            const result = onChange(modelFields);
            value = result?.smell ?? value;
          }
          if (errors.smell?.hasError) {
            runValidationTasks("smell", value);
          }
          setSmell(value);
        }}
        onBlur={() => runValidationTasks("smell", smell)}
        errorMessage={errors.smell?.errorMessage}
        hasError={errors.smell?.hasError}
        {...getOverrideProps(overrides, "smell")}
      ></TextField>
      <TextField
        label="Moisture"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={moisture}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              image,
              username,
              pH,
              temperature,
              humidity,
              smell,
              moisture: value,
              light,
            };
            const result = onChange(modelFields);
            value = result?.moisture ?? value;
          }
          if (errors.moisture?.hasError) {
            runValidationTasks("moisture", value);
          }
          setMoisture(value);
        }}
        onBlur={() => runValidationTasks("moisture", moisture)}
        errorMessage={errors.moisture?.errorMessage}
        hasError={errors.moisture?.hasError}
        {...getOverrideProps(overrides, "moisture")}
      ></TextField>
      <TextField
        label="Light"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={light}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              image,
              username,
              pH,
              temperature,
              humidity,
              smell,
              moisture,
              light: value,
            };
            const result = onChange(modelFields);
            value = result?.light ?? value;
          }
          if (errors.light?.hasError) {
            runValidationTasks("light", value);
          }
          setLight(value);
        }}
        onBlur={() => runValidationTasks("light", light)}
        errorMessage={errors.light?.errorMessage}
        hasError={errors.light?.hasError}
        {...getOverrideProps(overrides, "light")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
