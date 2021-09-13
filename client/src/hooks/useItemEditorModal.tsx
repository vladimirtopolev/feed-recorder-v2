import {Dispatch, ReactElement, SetStateAction, useState} from 'react';
import {ModalComponent} from '../components/Modal/Modal';
import {Button, DialogActions, DialogContent} from '@material-ui/core';

export type EditFormProps<T> = {
    item: T,
    changeField: (field: string, value: any) => void
}

type ItemEditorModalProps<T> = {
    item: T;
    isLoading: boolean;
    onEventAfterItemUpdated?: (item: T) => void;
    open: boolean;
    onClose: () => void;
    setItem: Dispatch<SetStateAction<T>>;
    editItem: (item: T) => Promise<void>;
    EditForm: (props: EditFormProps<T>) => ReactElement;
}

const ItemEditorModal = function <T>(
    {open, onClose, EditForm, setItem, item, editItem, onEventAfterItemUpdated, isLoading}: ItemEditorModalProps<T>): ReactElement {
    const changeField = (field: string, value: any) => {
        setItem((prev) => ({...prev, [field]: value}));
    };

    const onCreateItem = (): void => {
        editItem(item)
            .then(() => {
                onEventAfterItemUpdated && onEventAfterItemUpdated(item);
                onClose();
            });
    };

    return (
        <ModalComponent
            isLoading={isLoading}
            open={open}
            onClose={onClose}
            title={'Create item'}
        >
            <DialogContent dividers>
                <EditForm item={item} changeField={changeField}/>
            </DialogContent>

            <DialogActions disableSpacing>
                <Button autoFocus onClick={onClose}>
                    {'Close'}
                </Button>
                <Button variant="contained" color="primary" onClick={onCreateItem}>
                    {'Create'}
                </Button>
            </DialogActions>
        </ModalComponent>
    );
};

type UseItemEditorModalProps<T> = {
    initialItem: T;
    isLoading?: boolean;
    onEventAfterItemUpdated?: (item: T) => void;
    editItem: (item: T) => Promise<any>;
    EditForm: (props: EditFormProps<T>) => ReactElement;
}

type  UseItemEditorModalResponse<T> = {
    openItemEditorModal: () => void;
    itemEditorModalProps: ItemEditorModalProps<T>;
    ItemEditorModal: (props: ItemEditorModalProps<T>) => ReactElement;
}


export const useItemEditorModal =
    function <T>({
                     initialItem, onEventAfterItemUpdated, editItem, EditForm, isLoading = false
                 }: UseItemEditorModalProps<T>): UseItemEditorModalResponse<T> {
        const [open, setModalState] = useState(false);
        const [item, setItem] = useState<T>({} as T);

        const openItemEditorModal = (item?: T) => {
            setModalState(() => true);
            setItem(() => ({...(item || initialItem)}));
        };

        const onClose = () => {
            setModalState(() => false);
        };

        const itemEditorModalProps: ItemEditorModalProps<T> = {
            item,
            onEventAfterItemUpdated,
            open,
            onClose,
            setItem,
            editItem,
            EditForm,
            isLoading
        };

        return {
            openItemEditorModal,
            itemEditorModalProps,
            ItemEditorModal
        };
    };
