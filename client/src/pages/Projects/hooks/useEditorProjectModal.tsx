import {EditFormProps, useItemEditorModal} from '../../../hooks/useItemEditorModal';
import {CreateProject, Project} from '../../../api/projectApi';
import {useCreateProject, useDeleteProject, useEditProject} from '../../../hooks/reactQuery';
import {ReactElement} from 'react';
import {FormInput} from '../../../components/FormFactory/FormInput';
import {GlobalMessageType, useGlobalMessage} from '../../../context/GlobalMessageContext';
import {DeleteMessageProps, useDeleteItemModal} from '../../../hooks/useDeleteItemModal';
import {Box} from '@material-ui/core';

const INIT_PROJECT: CreateProject = {
    name: '',
    description: ''
};

const EditForm = ({item, changeField}: EditFormProps<CreateProject>): ReactElement => {
    return (
        <Box>
            <FormInput
                label="Project Name" value={item.name}
                onChange={(e) => changeField('name', e.target.value)}
            />
            <FormInput
                label="Description" value={item.description}
                onChange={(e) => changeField('description', e.target.value)}
            />
        </Box>
    );
};

export const useEditorProjectModal = () => {
    const mutation = useCreateProject();
    const {pushMessage} = useGlobalMessage();
    const {openItemEditorModal, ItemEditorModal, itemEditorModalProps} = useItemEditorModal<CreateProject>({
        initialItem: INIT_PROJECT,
        editItem: mutation.mutateAsync,
        EditForm,
        isLoading: mutation.isLoading,
        onEventAfterItemUpdated: () => {
            pushMessage({type: GlobalMessageType.SUCCESS, title: 'Project has been created successfully'});
        }
    });
    return {
        openCreateProjectModal: openItemEditorModal,
        CreateProjectModal: ItemEditorModal,
        createProjectModalProps: itemEditorModalProps,
    };
};

export const useEditProjectModal = () => {
    const mutation = useEditProject();
    const {pushMessage} = useGlobalMessage();
    const {openItemEditorModal, ItemEditorModal, itemEditorModalProps} = useItemEditorModal<Project>({
        initialItem: INIT_PROJECT as Project,
        editItem: mutation.mutateAsync,
        EditForm,
        isLoading: mutation.isLoading,
        onEventAfterItemUpdated: () => {
            pushMessage({type: GlobalMessageType.SUCCESS, title: 'Project has been updated successfully'});
        }
    });
    return {
        openEditProjectModal: openItemEditorModal,
        EditProjectModal: ItemEditorModal,
        editProjectModalProps: itemEditorModalProps
    };
};


const DeleteMessage = ({item}: DeleteMessageProps<Project>): ReactElement => {
    return (
        <Box>
            Are you sure that you would like to delete Project {item.name}
        </Box>
    );
}

export const useDeleteProjectModal = () => {
    const mutation = useDeleteProject();
    const {pushMessage} = useGlobalMessage();

    const {openDeleteItemModal, deleteItemModalProps, DeleteItemModal} = useDeleteItemModal({
        deleteItem: mutation.mutateAsync,
        DeleteMessage,
        isLoading: mutation.isLoading,
        onEventAfterItemUpdated: () => {
            pushMessage({type: GlobalMessageType.SUCCESS, title: 'Project has been deleted successfully'});
        }
    });

    return {
        openDeleteProjectModal: openDeleteItemModal,
        DeleteProjectModal: DeleteItemModal,
        deleteProjectModalProps: deleteItemModalProps
    }

}