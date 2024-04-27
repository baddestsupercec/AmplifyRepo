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
export declare type UserDataUpdateFormInputValues = {
    userID?: string;
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
};
export declare type UserDataUpdateFormValidationValues = {
    userID?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    username?: ValidationFunction<string>;
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserDataUpdateFormOverridesProps = {
    UserDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserDataUpdateFormOverridesProps | undefined | null;
} & {
    userID?: string;
    userData?: any;
    onSubmit?: (fields: UserDataUpdateFormInputValues) => UserDataUpdateFormInputValues;
    onSuccess?: (fields: UserDataUpdateFormInputValues) => void;
    onError?: (fields: UserDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserDataUpdateFormInputValues) => UserDataUpdateFormInputValues;
    onValidate?: UserDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserDataUpdateForm(props: UserDataUpdateFormProps): React.ReactElement;
