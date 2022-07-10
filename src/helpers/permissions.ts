import {ModuleUser, User} from "@/helpers/types";

const enum Roles {
    ADMIN,
    TEACHER,
    TUTOR,
    STUDENT,
    GUEST,
}

export const enum Action {
    ADMIN_AREA = Roles.ADMIN,
    MODULE_MANAGER = Roles.TUTOR,
    MODULE_ATTEND = Roles.STUDENT,
    EXERCISE_EDIT = Roles.TUTOR,
    EXERCISE_SUBMIT = Roles.STUDENT,
    EXERCISE_REVIEW = Roles.TUTOR,
}

export default function hasPermission(action: Action, user: User | undefined): boolean {
    if (!user) return false;

    return Math.min(...user.roles.map(role => role.role_id)) <= action + 1;
}

export function hasPermissionModule(action: Action, user: User | undefined, moduleUser: ModuleUser | undefined): boolean {
    if (isAdmin(user)) return true;

    if (!user || !moduleUser) return false;

    return moduleUser.module_role.role_id <= action + 1;
}

function isAdmin(user: User | undefined) {
    return hasPermission(Action.ADMIN_AREA, user);
}