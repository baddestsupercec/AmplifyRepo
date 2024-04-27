/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HealthParametersCreateFormInputValues = {
    name?: string;
    username?: string;
    pHlow?: number;
    pHhigh?: number;
    temperatureLow?: number;
    temperatureHigh?: number;
    humidityLow?: number;
    humidityHigh?: number;
    smellLow?: number;
    smellHigh?: number;
    moistureLow?: number;
    moistureHigh?: number;
    lightLow?: number;
    lightHigh?: number;
};
export declare type HealthParametersCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    username?: ValidationFunction<string>;
    pHlow?: ValidationFunction<number>;
    pHhigh?: ValidationFunction<number>;
    temperatureLow?: ValidationFunction<number>;
    temperatureHigh?: ValidationFunction<number>;
    humidityLow?: ValidationFunction<number>;
    humidityHigh?: ValidationFunction<number>;
    smellLow?: ValidationFunction<number>;
    smellHigh?: ValidationFunction<number>;
    moistureLow?: ValidationFunction<number>;
    moistureHigh?: ValidationFunction<number>;
    lightLow?: ValidationFunction<number>;
    lightHigh?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HealthParametersCreateFormOverridesProps = {
    HealthParametersCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    pHlow?: PrimitiveOverrideProps<TextFieldProps>;
    pHhigh?: PrimitiveOverrideProps<TextFieldProps>;
    temperatureLow?: PrimitiveOverrideProps<TextFieldProps>;
    temperatureHigh?: PrimitiveOverrideProps<TextFieldProps>;
    humidityLow?: PrimitiveOverrideProps<TextFieldProps>;
    humidityHigh?: PrimitiveOverrideProps<TextFieldProps>;
    smellLow?: PrimitiveOverrideProps<TextFieldProps>;
    smellHigh?: PrimitiveOverrideProps<TextFieldProps>;
    moistureLow?: PrimitiveOverrideProps<TextFieldProps>;
    moistureHigh?: PrimitiveOverrideProps<TextFieldProps>;
    lightLow?: PrimitiveOverrideProps<TextFieldProps>;
    lightHigh?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HealthParametersCreateFormProps = React.PropsWithChildren<{
    overrides?: HealthParametersCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HealthParametersCreateFormInputValues) => HealthParametersCreateFormInputValues;
    onSuccess?: (fields: HealthParametersCreateFormInputValues) => void;
    onError?: (fields: HealthParametersCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HealthParametersCreateFormInputValues) => HealthParametersCreateFormInputValues;
    onValidate?: HealthParametersCreateFormValidationValues;
} & React.CSSProperties>;
export default function HealthParametersCreateForm(props: HealthParametersCreateFormProps): React.ReactElement;
