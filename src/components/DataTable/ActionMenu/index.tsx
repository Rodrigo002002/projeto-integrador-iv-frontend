import React, { useState } from 'react';
import { Group, Menu, UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';
import { disableStatus, enableStatus } from '@/components/SweetAlert';
import { deleteData, disableData, enableData } from '@/services/GenericService';
import DeleteModal from '@/components/Modals/Delete';
import { ActionMenuProps } from './interfaces';
import { DynamicIcons } from '@/components/DynamicIcons/DynamicIcons';

const ActionMenu: React.FC<ActionMenuProps> = ({
                                                   item,
                                                   apiRoute,
                                                   customButtons,
                                                   hideEdit = false,
                                                   hideDelete = false,
                                                   hideDisable = false,
                                                   hideEnable = false,
                                                   deleteDirectBtn = false,
                                                   onRefresh,
                                                   pageRoute,
                                                   updateRoute = 'editar',
                                                   activeColumnName = 'active'
                                               }) => {

    const [isDeleteMessageModal, setIsDeleteMessageModal] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<any>(null);

    const onActionDisable = (item: any) => {
        disableStatus(async () => {
            await disableData(apiRoute, item.id);

            if (onRefresh) {
                onRefresh();
            }
        });
    };

    const onActionEnable = (item: any) => {
        enableStatus(async () => {
            await enableData(apiRoute, item.id);

            if (onRefresh) {
                onRefresh();
            }
        });
    };

    const onActionDelete = (item: any) => {
        setCurrentItem(item);
        setIsDeleteMessageModal(true);
    };

    const deleteEvent = async () => {
        await deleteData(apiRoute, currentItem.id);
        if (onRefresh) {
            onRefresh();
        }

        setIsDeleteMessageModal(false);
        setCurrentItem(null);
    };

    return (
        <>
            <Menu shadow="sm" position="left-start" withArrow>
                <Menu.Target>
                    <UnstyledButton>
                        <Group>
                            <DynamicIcons name={'SlOptions'} className="w-3 h-3 opacity-70" />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    {customButtons ? customButtons(item) : ''}

                    {!hideEdit && (
                        <Menu.Item
                            leftSection={<DynamicIcons name={'LuPencilLine'} />}
                            component={Link}
                            to={`/${pageRoute ? pageRoute : apiRoute}/${updateRoute}/${item.id}`}
                            style={{
                                padding: '4px 8px',
                                fontSize: '14px'
                            }}
                        >
                            Editar
                        </Menu.Item>
                    )}

                    {!hideDisable && item[activeColumnName] && onActionDisable && (
                        <Menu.Item
                            leftSection={<DynamicIcons name={'BsToggleOff'} />}
                            onClick={() => onActionDisable(item)}
                            style={{
                                padding: '4px 8px',
                                fontSize: '14px'
                            }}
                        >
                            Desabilitar
                        </Menu.Item>
                    )}

                    {!hideEnable && !item[activeColumnName] && onActionEnable && (
                        <Menu.Item
                            leftSection={<DynamicIcons name={'IoToggleOutline'} />}
                            onClick={() => onActionEnable(item)}
                            style={{
                                padding: '4px 8px',
                                fontSize: '14px'
                            }}
                        >
                            Habilitar
                        </Menu.Item>
                    )}

                    {!hideDelete && onActionDelete && (!item[activeColumnName] || deleteDirectBtn) && (
                        <Menu.Item
                            leftSection={<DynamicIcons name={'FaRegTrashAlt'} />}
                            color="red"
                            onClick={() => onActionDelete(item)}
                            style={{
                                padding: '4px 8px',
                                fontSize: '14px'
                            }}
                        >
                            Deletar
                        </Menu.Item>
                    )}
                </Menu.Dropdown>
            </Menu>

            <DeleteModal
                isDeleteMessageModal={isDeleteMessageModal}
                setIsDeleteMessageModal={setIsDeleteMessageModal}
                deleteEvent={deleteEvent}
            />
        </>
    );
};

export default ActionMenu;
