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
}

export default function hasPermission(action: Action, user: User | undefined): boolean {
    if (!user) return false;

    const userRoles: Array<string> = user.roles.map(role => role.name);
    if (userRoles.includes(action.toString()))
        return true;

    const highestRole = userRoles
        .map((role: string) => Object.keys(Roles).indexOf(role))
        .reduce((acc, curr) => acc > curr ? acc : curr);

    return highestRole >= Object.keys(Roles).indexOf(action.toString());
}