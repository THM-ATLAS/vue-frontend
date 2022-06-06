const translationEn = {
    app: {
        name: 'ATLAS',
        title: 'ATLAS - Exercises and more',
        subtitle: 'Exercises and more',
        copyright: 'Copyright © 2021-2022',
        version: 'Version',
        skip_to_content: 'Skip to main content',
    },
    header: {
        modules: 'Modules',
        dropdown: {
            settings: 'Settings',
            help: 'Help',
            messages: 'Messages',
            profile: 'Profile',
            admin: 'Admin',
            login: 'Login',
            logout: 'Logout',
        }
    },
    footer: {
        home: 'Home',
        imprint: 'About us',
        help: 'Help',
        data_protection: 'Data protection',
        thm: 'THM',
        a_project_by_thm: 'a project by THM',
    },
    login_page: {
        login: 'Login',
        instructions: 'Use your THM user credentials.',
        user_id: 'Username',
        password: 'Password',
        username_required: 'Please enter your username.',
        password_required: 'Please enter your password.',
        invalid_credentials: 'Invalid credentials.',
        skip_login: 'Continue without login',
    },
    landing_page: {
        welcome: 'Welcome to',
        instructions: 'Start searching for modules or login!',
        search: 'e.g. Compilerbau'
    },
    main_page: {
        exercise: 'Exercise'
    },
    help_page: {
        title: 'Welcome to ATLAS!',
        subtitle: 'Information & Help',
        what_is_atlas: {
            title: 'What is ATLAS?',
            description: 'ATLAS is an online learning platform, where students can find and work on exercises related to their modules at THM. This platform offers automatic, as well as direct evaluation of the submitted solutions by lecturers.'
        },
        how_atlas_works: {
            title: 'How does ATLAS work?',
            description: {
                atlas_for_lecturers: {
                    title: 'ATLAS for lecturers',
                    description: 'Teachers must apply for a module entry to provide exercises on ATLAS. Once the entry is made, exercises can be created using the markdown-editor.',
                    help: 'If you require assistance with setting up a module or its exercises, the ATLAS-team will gladly assist you.'
                },
                atlas_for_students: {
                    title: 'ATLAS for students',
                    description: 'The online learning platform ATLAS, including its modules and exercises, is publicly available and does not require authentification via LDAP. However, login is required in order to be able to upload a solution.\n\n Depending on the type of exercise, the solutions uploaded will either be evaluated automatically or manually by a lecturer.'
                }
            }
        },
        contribute_to_atlas: {
            title: 'Contribute to ATLAS',
            description: 'ATLAS is an open source software developed by students. Visit us on '
        }
    },
    settings: {
        title: 'Settings',
        subtitle: 'Personalization & Settings',
        notifications: {
            title: 'Notifications',
            important_notifications: 'Important notifications',
            show_notifications: 'Receive notifications about new exercises',
            by_mail: 'Receive notifications by mail',
            by_browser_notification: 'Receive notifications by browser notification',
        },
        language: 'Language',
        system: 'System',
        theme: {
            title: 'Theme',
            dark: 'Dark',
            light: 'Light',
        },
        save_settings: 'Save settings',
        danger_zone: {
            title: 'Account deletion',
            delete_account: 'Delete account',
            delete_account_description: 'Irrevocably deletes your account. ' +
                'All data related to your account will be deleted and cannot be recovered. ' +
                'When using your LDAP account to sign into ATLAS, a new account will be created.',
        },
    },
    module_search: {
      items_per_page: 'Items per page'
    },
    titles: {
        home_view: 'ATLAS',
        login_view: 'Login',
        help_view: 'Help',
        settings_view: 'Settings',
        admin_view: 'Admin',
        exercisemanagement_view: 'Exercises',
        usermanagement_view: 'Users',
        modulemanagement_view: 'Modules',
        profile_view: 'Profile',
        modulesearch_view: 'Modules',
        pagenotfound_view: 'Error',
        exercise_view: 'Exercise',
        exerciseeditor_view: 'Edit',
        module_main_page: 'Module',
        modulemanager_view: "Module Manager",
    },
    buttons: {
        save: 'Save',
        cancel: 'Cancel',
        saved: 'Saved',
        reset: 'Reset',
        delete: 'Delete',
        yes: 'Yes',
        no: 'No',
        close: 'Close',
        add: 'Add',
        remove: 'Remove',
        edit: 'Edit',
        login: 'Login',
        login_with_ldap: 'Login with LDAP',
        logout: 'Logout',
        register: 'Register',
        new: 'New',
        stay: 'Stay',
    },
    languages: {
        en: 'English',
        de: 'German',
    },
    account: {
        title: 'Account',
        username: 'Username',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        password_confirm: 'Password (confirm)',
        saved: 'Saved',
    },
    admin: {
        choose_page: 'Choose a page by clicking on the left menu',
        users: {
            new: 'New user',
            edit: 'Edit user',
            delete: 'Delete user',
            delete_confirm: 'Delete user {0}?',
            name: 'Name',
            username: 'Username',
            email: 'Email',
            roles: 'Roles',
            created_at: 'Created at',
            actions: 'Actions',
            password: 'Password',
            change_password: 'Change password',
            errors: {
                required: 'This field is required.',
                username_taken: 'This username is already taken.',
                username_invalid: 'Username must be 3 to 32 characters long and may only consist of letters and numbers.',
                email_taken: 'This email address is already in use.',
                email_invalid: 'Please enter a valid email address.',
                password_invalid: 'Password must be 8 characters long, and contain an uppercase letter, lowercase letter and a symbol.',
            }
        },
        exercises: {
            new: 'New exercise',
            edit: 'Edit exercise',
            delete: 'Delete exercise',
            delete_confirm: 'Delete exercise {0}?',
            title: 'Title',
            module: 'Module',
            description: 'Description',
            no_description: 'No description provided',
            created_at: 'Created at',
            actions: 'Actions',
            errors: {
                required: 'This field is required.',
            }
        },
        modules: {
            title: 'Module',
            description: 'Description',
            no_description: 'No description provided',
            actions: 'Actions',
            new: 'New module',
            edit: 'Edit module',
            delete: 'Delete module',
            delete_confirm: 'Delete module "{0}"?',
        },
        navbar: {
            title: 'Admin Panel',
            manage_user: 'Manage users',
            manage_exercise: 'Manage exercises',
            manage_module: 'Manage modules',
            back: 'Back to homepage'
        }
    },
    exercise: {
        back: 'Back',
        edit: 'Edit',
        description: 'Description (optional)',
        title: 'Title',
        id: 'ID',
        confirm_leave: 'Do you really want to leave? Unsaved changes will be lost!',
        confirm_cancel: 'Do you really want to cancel? Unsaved changes will be lost!',
        confirm_delete: 'Do you really want to delete this exercise? This action can not be undone!'
    },
    error: {
        unauthorized: 'Unauthorized.',
        forbidden: 'Forbidden access.',
        not_found: 'Could not find the requested resource.',
        internal_server_error: 'Internal server error.',
        unknown: 'An unknown error occurred.',
    },
    module_page: {
        module: 'Module',
        exercises: 'Exercises',
        about: 'About',
        manage: 'Manage',
        teachers: 'Teachers',
        tutors: 'Tutors',
    },
    module_manager: {
        name: 'Name',
        roles: 'Roles',
        edit_tag: 'Edit tags',
        add_user: 'Add user',
        edit_privilege: 'Change role'
    },
    page_not_found: {
        error_title: "This page could not be found.",
        error_description: "If you think this is a mistake, please contact the lecturer of the module this link is from.",
        home_button: "Go to the landing page",
        back_button: "Go back",
    }
}

export default translationEn
