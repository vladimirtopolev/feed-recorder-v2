import {FormControl, Input, InputLabel} from '@material-ui/core';
import {FC, ChangeEventHandler} from 'react';
import * as React from 'react';

type FormInputProps = {
    label?: string;
    value: unknown;
    onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;

}
export const FormInput: FC<FormInputProps> = ({label, value, onChange}) => {
    return (
        <FormControl>
            {label && <InputLabel>{label}</InputLabel>}
            <Input value={value} onChange={onChange}/>
        </FormControl>
    );
};