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
            messages: 'Notifications',
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
        instructions: 'Use your THM or guest credentials to login.',
        user_id: 'Username',
        password: 'Password',
        username_required: 'Please enter your username.',
        password_required: 'Please enter your password.',
        invalid_credentials: 'Invalid credentials.',
        skip_login: 'Continue without login',
        register_success: 'Registration successful! You can now login.',
    },
    register_page: {
        register: 'Register',
        instructions: 'Create a guest account for use with ATLAS. Note that inactive accounts will be deleted after 30 days. If you have THM credentials, you can login with them.',
        name: 'Full name',
        username: 'Username',
        email: 'Email',
        password: 'Password',
        password_confirm: 'Confirm password',
        errors: {
            required: 'This field is required.',
            email_invalid: 'Please enter a valid email address.',
            password_equal: 'The passwords do not match.',
            password_invalid: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and a symbol.',
            username_invalid: 'Username must be 3 to 32 characters long and may only consist of letters and numbers.',
            username_ldap_invalid: 'Username is reserved for LDAP-accounts.',
            username_taken: 'Username is already taken.',
        }
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
    notifications_page: {
        notifications: 'Notifications',
        news: 'News',
        description: 'You can view your messages, reviews for submissions and site news here.',
        unread: 'Unread',
        read: 'Read',
        mark_all: 'Mark all',
        mark_as_read: 'Mark as read',
        mark_as_unread: 'Mark as unread',
        delete: 'Delete',
        title: 'Subject',
        content: 'Content'
    },
    titles: {
        home_view: 'ATLAS',
        login_view: 'Login',
        help_view: 'Help',
        settings_view: 'Settings',
        admin_view: 'Admin',
        exercisemanagement_view: 'Exercises',
        exercisecreator_view: 'New Exercise',
        usermanagement_view: 'Users',
        submission_view: 'Submission',
        evaluationlist_view: 'Submissions',
        editsubmission_view: 'Edit',
        modulemanagement_view: 'Modules',
        tagmanagement_view: 'Tags',
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
        to_profile: 'Go to profile',
        read_feedback: 'Read feedback',
        to_submission: 'Go to submission',
        read_message: 'Read',
        edit_exercise: 'Edit exercise',
        to_help_page: 'Go to help page',
        submit: 'Submit Solution',
        view_submissions: 'View submissions',
        evaluate: 'Save Evaluation',
        back: 'Back',
        visit: 'Visit',
        view: 'View',
        visit_profile: 'Visit profile',
        visibility_public: 'Visibility: public',
        visibility_private: 'Visibility: only for enrolled users',
        upload_file: 'Upload file',
        to_module: 'Visit the module',
        to_exercise: 'View the exercise'
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
            search_user: 'Search user',
            users_per_page: 'Users per page',
            errors: {
                required: 'This field is required.',
                username_taken: 'This username is already taken.',
                username_invalid: 'Username must be 3 to 32 characters long and may only consist of letters and numbers.',
                username_ldap_invalid: 'Username is reserved for LDAP-accounts.',
                email_taken: 'This email address is already in use.',
                email_invalid: 'Please enter a valid email address.',
                password_invalid: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and a symbol.',
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
            search_exercise: 'Search exercise',
            exercises_per_page: 'Exercises per page',
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
            search_module: 'Search module',
            items_per_page: 'Items per page',
            module_per_page: 'Modules per page',
            search: 'Search modules',
            icon: 'Icon',
        },
        tags: {
            title: 'Tags',
            actions: 'Actions',
            edit_tag: 'Edit tag',
            create_tag: 'Create tag',
            search_tag: 'Search tag',
            delete_tag: 'Delete tag',
            delete_confirm: 'Delete tag {0}?',
            tags_per_page: 'Tags per page',
        },
        navbar: {
            title: 'Admin Panel',
            manage_user: 'Manage users',
            manage_exercise: 'Manage exercises',
            manage_module: 'Manage modules',
            manage_tag: 'Manage tags',
            back: 'Back to homepage'
        }
    },
    exercise: {
        add_tag: 'Add tags',
        tag_add_desc: 'Add tag from list',
        tag: 'Tag',
        submit: {
            button: 'My solution',
            tooltip: 'Login to submit a solution!'
        },
        description: 'Description (optional)',
        title: 'Title',
        id: 'ID',
        edit: 'Edit',
        exercise_type: 'Exercise type',
        multiple_choice: {
            question: 'Question',
            answers: 'Answers'
        },
        confirm_leave: 'Do you really want to leave? Unsaved changes will be lost!',
        confirm_cancel: 'Do you really want to cancel? Unsaved changes will be lost!',
        confirm_delete: 'Do you really want to delete this exercise? This action can not be undone!',
        tag_search_or_create: 'Search or create tag',
        add_exercise: 'Add new exercise'
    },
    roles: {
        admin: 'admin',
        teacher: 'teacher',
        student: 'student',
        tutor: 'tutor',
        guest: 'guest'
    },
    submission: {
        title: 'Exercise',
        'submitted-solutions': {
            title: 'Your submission',
            'no-solutions': 'You have not submitted a solution to this exercise yet.',
            'table-header': {
                'submission-id' : 'ID',
                type: 'Submission Type',
                grade: 'Evaluation',
                date: 'Date',
                'evaluated-by': 'Evaluated by',
                comment: 'Comment',
                'view-submission':'View submission'
            },
            'submission-types': {
                'file-upload': 'File Upload',
                'text-field': 'Text Field',
                'multiple-choice': 'Multiple Choice'
            }
        },
        'submit-a-solution': {
            title: 'Submit a solution',
            'form-placeholder': 'Enter your solution...'
        },
        'specific-submission': {
            title: 'Your solution for '
        },
        edit_submission: 'Edit submission'
    },
    submission_list: {
        title: 'Submissions of all Users for Exercise',
        no_solutions: 'No solutions have been submitted to this exercise yet.',
        table: {
            user_id: 'User ID',
            status: {
                title: 'Status',
                evaluated: 'evaluated',
                pending: 'pending'
            },
            evaluate: 'View Evaluation'
        }
    },
    evaluation: {
        title: 'Evaluation of Submission',
        comment: 'Your evaluation',
        comment_form: 'Add a comment to the submission...',
        grade_form: 'Grade between 0-100 in %',
        solution: 'The User\'s solution'
    },
    error: {
        unauthorized: 'Unauthorized.',
        forbidden: 'Forbidden access.',
        not_found: 'Could not find the requested resource.',
        internal_server_error: 'Internal server error.',
        unknown: 'An unknown error occurred.',
    },
    module_search: {
        search: 'Search modules',
        items_per_page: 'Items per page',
        no_results: 'Your search returned no results.',
    },
    module_page: {
        module: 'Module',
        exercises: 'Exercises',
        about: 'About',
        manage: 'Manage',
        attend: 'Attend module',
        leave: 'Leave module',
        teachers: 'Teachers',
        tutors: 'Tutors',
        materials: 'Learning material',
        enrollment: 'Self enrollment in this module.',
        disenroll: 'Disenroll from this module.',
        search_exercise: 'Search exercise',
    },
    module_manager: {
        name: 'Name',
        roles: 'Roles',
        edit_tag_button: 'Edit tags',
        edit_tag: 'Change or delete tags',
        tag: 'Tag',
        add_user: 'Enroll user',
        edit_privilege: 'Change role',
        student: 'Student',
        tutor: 'Tutor',
        teacher: 'Teacher',
        search_user: 'Search user',
        add_link: 'Add link',
        new_link: 'New link',
        select_file: 'Select file...',
        public_upload: 'Public upload',
        publicStatus: 'Public file'
    },
    page_not_found: {
        error_title: "This page could not be found.",
        error_description: "If you think this is a mistake, please contact the lecturer of the module this link is from.",
        home_button: "Go to the landing page",
        back_button: "Go back",
    },
    icon_picker: {
        title: "Pick an icon",
        preview: "Preview", 
        search: "Search icon"
    }

}

export default translationEn