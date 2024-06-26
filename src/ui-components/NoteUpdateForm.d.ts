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
export declare type NoteUpdateFormInputValues = {
    name?: string;
    description?: string;
    image?: string;
    username?: string;
    pH?: number;
    temperature?: number;
    humidity?: number;
    smell?: number;
    moisture?: number;
    light?: number;
};
export declare type NoteUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    username?: ValidationFunction<string>;
    pH?: ValidationFunction<number>;
    temperature?: ValidationFunction<number>;
    humidity?: ValidationFunction<number>;
    smell?: ValidationFunction<number>;
    moisture?: ValidationFunction<number>;
    light?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NoteUpdateFormOverridesProps = {
    NoteUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    pH?: PrimitiveOverrideProps<TextFieldProps>;
    temperature?: PrimitiveOverrideProps<TextFieldProps>;
    humidity?: PrimitiveOverrideProps<TextFieldProps>;
    smell?: PrimitiveOverrideProps<TextFieldProps>;
    moisture?: PrimitiveOverrideProps<TextFieldProps>;
    light?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NoteUpdateFormProps = React.PropsWithChildren<{
    overrides?: NoteUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    note?: any;
    onSubmit?: (fields: NoteUpdateFormInputValues) => NoteUpdateFormInputValues;
    onSuccess?: (fields: NoteUpdateFormInputValues) => void;
    onError?: (fields: NoteUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NoteUpdateFormInputValues) => NoteUpdateFormInputValues;
    onValidate?: NoteUpdateFormValidationValues;
} & React.CSSProperties>;
export default function NoteUpdateForm(props: NoteUpdateFormProps): React.ReactElement;
