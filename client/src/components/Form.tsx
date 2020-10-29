import React from 'react';
import TextField from '@material-ui/core/TextField';
import { FieldProps, ErrorMessage } from 'formik';

interface TextProps extends FieldProps {
    label: string;
    placeholder: string;
}

export const TextFormField: React.FC<TextProps> = ({ field, label, placeholder }: TextProps): JSX.Element => {
    return (
        <TextField>
            <TextField { ...field } variant="outlined" placeholder={ placeholder }/>
            <div style={ { color: 'red' } }>
                <ErrorMessage name={ field.name }/>
            </div>
        </TextField>
    );
};

export const PasswordFormField: React.FC<TextProps> = ({ field, label, placeholder }: TextProps): JSX.Element => {
    return (
        <TextField>
            <TextField { ...field } type='password' placeholder={ placeholder }/>
            <div style={ { color: 'red' } }>
                <ErrorMessage name={ field.name }/>
            </div>
        </TextField>
    );
};