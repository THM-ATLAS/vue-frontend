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
        courses: 'Courses',
        dropdown: {
            settings: 'Settings',
            help: 'Help',
            messages: 'Messages',
            profile: 'Profile',
            admin: 'Admin',
        }
    },
    footer: {
        home: 'Home',
        imprint: 'Imprint',
        help: 'Help',
        data_protection: 'Data protection',
        thm: 'THM',
        a_project_by_thm: 'a project by THM',
    },
    login_page: {
        login: 'Login',
        instructions: 'Use your THM user credentials.',
        user_id: 'username',
        password: 'password'
    },
    landing_page: {
        welcome: 'Welcome to',
        instructions: 'Start to search for courses or login!',
        search: 'e.g. Compilerbau'
    },
    main_page: {
        exercise: 'Exercise'
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
        tasks: {
            new: 'New task',
            edit: 'Edit task',
            delete: 'Delete task',
            delete_confirm: 'Delete task {0}?',
            title: 'Title',
            course: 'Course',
            description: 'Description',
            no_description: 'No description provided',
            created_at: 'Created at',
            actions: 'Actions',
            errors: {
                required: 'This field is required.',
            }
        },
        navbar: {
            title: 'Admin Panel',
            manage_user: 'Manage users',
            manage_task: 'Manage tasks',
            manage_course: 'Manage courses',
            back: 'Back to homepage'
        }
    },
    exercise: {
        back: 'Back',
        edit: 'Edit',
        description: 'Description (optional)',
        title: 'Title',
        id: 'ID',
    }
}

export default translationEn
