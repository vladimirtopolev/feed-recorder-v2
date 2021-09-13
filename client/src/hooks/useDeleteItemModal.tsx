import {Dispatch, ReactElement, SetStateAction, useState} from 'react';
import {ModalComponent} from '../components/Modal/Modal';
import {Button, DialogActions, DialogContent} from '@material-ui/core';

export type DeleteMessageProps<T> = {
    item: T
}

type DeleteItemModalProps<T> = {
    item: T;
    isLoading: boolean;
    onEventAfterItemUpdated?: (item: T) => void;
    open: boolean;
    onClose: () => void;
    setItem: Dispatch<SetStateAction<T>>;
    deleteItem: (item: T) => Promise<void>;
    DeleteMessage: (props: DeleteMessageProps<T>) => ReactElement;
}

const DeleteItemModal = function <T>(
    {open, onClose, DeleteMessage, isLoading, item, deleteItem, onEventAfterItemUpdated}: DeleteItemModalProps<T>): ReactElement {

    const onDeleteItem = (): void => {
        deleteItem(item)
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
            title={'Delete item'}
        >
            <DialogContent dividers>
                <DeleteMessage item={item}/>
            </DialogContent>

            <DialogActions disableSpacing>
                <Button autoFocus onClick={onClose}>
                    {'Close'}
                </Button>
                <Button variant="contained" color="primary" onClick={onDeleteItem}>
                    {'Delete'}
                </Button>
            </DialogActions>
        </ModalComponent>
    );
};

type UseDeleteItemModalProps<T> = {
    isLoading?: boolean;
    onEventAfterItemUpdated?: (item: T) => void;
    deleteItem: (item: T) => Promise<any>;
    DeleteMessage: (props: DeleteMessageProps<T>) => ReactElement;
}

type  UseItemEditorModalResponse<T> = {
    openDeleteItemModal: (item: T) => void;
    deleteItemModalProps: DeleteItemModalProps<T>;
    DeleteItemModal: (props: DeleteItemModalProps<T>) => ReactElement;
}


export const useDeleteItemModal =
    function <T>({
                     onEventAfterItemUpdated, deleteItem, DeleteMessage, isLoading = false
                 }: UseDeleteItemModalProps<T>): UseItemEditorModalResponse<T> {
        const [open, setModalState] = useState(false);
        const [item, setItem] = useState<T>({} as T);

        const openDeleteItemModal = (item: T) => {
            setModalState(() => true);
            setItem(() => ({...item}));
        };

        const onClose = () => {
            setModalState(() => false);
        };

        const deleteItemModalProps: DeleteItemModalProps<T> = {
            item,
            onEventAfterItemUpdated,
            isLoading,
            open,
            onClose,
            setItem,
            deleteItem,
            DeleteMessage
        };

        return {
            openDeleteItemModal,
            deleteItemModalProps,
            DeleteItemModal
        };
    };
