import {FC} from 'react';
import {Controller} from "react-hook-form";
import {FormInput as FormInputRaw} from '../FormInput';

type FormInputProps = {
    label?: string,
    name: string
}

export const FormInput: FC<FormInputProps> = ({label, name}) => {
    return (
        <Controller
            name={name}
            render={({field: {value, onChange}}) => <FormInputRaw value={value} onChange={onChange} label={label}/>}
        />
    );
};