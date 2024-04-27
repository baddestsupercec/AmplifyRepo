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
export declare type HealthParametersUpdateFormInputValues = {
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
export declare type HealthParametersUpdateFormValidationValues = {
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
export declare type HealthParametersUpdateFormOverridesProps = {
    HealthParametersUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type HealthParametersUpdateFormProps = React.PropsWithChildren<{
    overrides?: HealthParametersUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    healthParameters?: any;
    onSubmit?: (fields: HealthParametersUpdateFormInputValues) => HealthParametersUpdateFormInputValues;
    onSuccess?: (fields: HealthParametersUpdateFormInputValues) => void;
    onError?: (fields: HealthParametersUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HealthParametersUpdateFormInputValues) => HealthParametersUpdateFormInputValues;
    onValidate?: HealthParametersUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HealthParametersUpdateForm(props: HealthParametersUpdateFormProps): React.ReactElement;
