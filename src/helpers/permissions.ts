import {User} from "@/helpers/types";

enum Roles {
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

    const userRoles: Array<number> = user.roles.map(role => role.role_id);
    if (userRoles.includes(action + 1))
        return true;
    else if (Math.min(...userRoles) <= action + 1)
        return true;
    else return false;
}