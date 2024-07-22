import {
    createPermission,
} from '@backstage/plugin-permission-common';

export const toolsLinkReadPermission = createPermission({
    name: 'tools.link.read',
    attributes: {
        action: 'read',
    },
});

export const toolsLinkCreatePermission = createPermission({
    name: 'tools.link.create',
    attributes: {
        action: 'create',
    },
});

export const toolsLinkDeletePermission = createPermission({
    name: 'tools.link.delete',
    attributes: {
        action: 'delete',
    },
});

/**
 * List of all tools link permissions.
 * @alpha
 */
export const toolsLinkPermissions = [
    toolsLinkDeletePermission,
    toolsLinkCreatePermission,
    toolsLinkReadPermission,
];