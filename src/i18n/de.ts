const translationDe = {
    app: {
        name: 'ATLAS',
        title: 'ATLAS - Die interdisziplinäre Lernplattform',
        subtitle: 'Die interdisziplinäre Lernplattform',
        copyright: 'Copyright © 2021-2022',
        version: 'Version',
        skip_to_content: 'Zum Inhalt springen',
    },
    header: {
        modules: 'Zu den Modulen',
        dropdown: {
            settings: 'Einstellungen',
            help: 'Hilfe',
            messages: 'Benachrichtigungen',
            profile: 'Profil',
            admin: 'Admin',
            login: 'Anmelden',
            logout: 'Abmelden',
        }
    },
    footer: {
        home: 'Startseite',
        imprint: 'Impressum',
        help: 'Hilfe',
        data_protection: 'Datenschutzerklärung',
        thm: 'THM',
        a_project_by_thm: 'ein Projekt der THM',
    },
    login_page: {
        login: 'Anmelden',
        instructions: 'Verwende deine THM-Kennung oder Gastzugangsdaten.',
        user_id: 'Kennung',
        password: 'Passwort',
        username_required: 'Bitte gib deine Kennung ein.',
        password_required: 'Bitte gib dein Passwort ein.',
        invalid_credentials: 'Ungültige Logindaten.',
        skip_login: 'Weiter ohne Anmeldung',
        register_success: 'Dein Account wurde erfolgreich erstellt. Du kannst dich nun anmelden.',
    },
    register_page: {
        register: 'Registrieren',
        instructions: 'Erstellt einen ATLAS-Gastaccount. Inaktive Accounts werden nach 30 Tagen Nichtbenutzen gelöscht. Solltest du THM-Zugangsdaten besitzen, kannst du dich stattdessen mit diesen anmelden.',
        name: 'Vollständiger Name',
        username: 'Kennung',
        email: 'E-Mail',
        password: 'Passwort',
        password_confirm: 'Passwort bestätigen',
        errors: {
            required: 'Dieses Feld ist erforderlich.',
            email_invalid: 'Bitte gib eine gültige E-Mail-Adresse ein.',
            password_equal: 'Die Passwörter stimmen nicht überein.',
            password_invalid: 'Passwort muss mindestens 8 Buchstaben lang sein, und einen Großbuchstaben, Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.',
            username_invalid: 'Benutzername muss zwischen 3 und 32 Zeichen lang sein und darf nur aus Buchstaben und Zahlen bestehen.',
            username_ldap_invalid: 'Benutzername ist für LDAP-Accounts reserviert.',
            username_taken: 'Benutzername ist bereits vergeben.',
        }
    },
    landing_page: {
        welcome: 'Willkommen zu',
        instructions: 'Starte mit der Suche nach Modulen oder logge dich oben rechts ein!',
        search: 'z.B. Compilerbau'
    },
    main_page: {
        exercise: 'Aufgabe'
    },
    help_page: {
        title: 'Willkommen zu ATLAS!',
        subtitle: 'Informationen & Hilfe',
        what_is_atlas: {
            title: 'Was ist ATLAS?',
            description: 'ATLAS ist eine Lernplattform, auf welcher Studierende zu Modulen begleitende Aufgaben finden und bearbeiten können.\n\n Dabei soll die Plattform eine einfache und schnelle Lösung für die Aufgabenstellungen der THM ermöglichen. So können Studierende Lösungen zu Aufgaben je nach Aufgabenart entweder direkt und automatisiert überprüfen lassen, oder durch eine Abgabe von einer/einem Dozent:in Rückmeldung erhalten.'
        },
        how_atlas_works: {
            title: 'Wie funktioniert ATLAS?',
            description: {
                atlas_for_lecturers: {
                    title: 'ATLAS für Lehrende',
                    description: 'Um Aufgaben auf ATLAS bereitzustellen, müssen Lehrende einen Moduleintrag beantragen. Nach dessen Einrichtung können Aufgaben mithilfe des Markdown-Editor erstellt werden.',
                    help: 'Falls Sie bei der Einrichtung eines Moduls oder dessen Aufgaben Hilfe benötigen, steht Ihnen das ATLAS-Team gerne zur Verfügung.'
                },
                atlas_for_students: {
                    title: 'ATLAS für Studierende',
                    description: 'Die Lernplattform ATLAS steht inklusive ihrer Module und Aufgaben auch ohne die Anmeldung über LDAP zur Verfügung, jedoch ist die Abgabe von Lösungen durch eine Anmeldung beschränkt.' +
                        '\n\n' +
                        'Je nach Aufgabentyp werden die Lösungen bearbeiteter Aufgaben direkt nach dem Upload automatisch ausgewertet. Für alle anderen Aufgaben erhalten Studierende Rückmeldung von einem/einer Dozent:in.'
                }
            }
        },
        contribute_to_atlas: {
            title: 'Bei ATLAS mitwirken',
            description: 'ATLAS ist Open Source und wird von Studierenden entwickelt. Besuchen Sie uns doch auf '
        }
    },
    settings: {
        title: 'Einstellungen',
        subtitle: 'Personalisierung & Einstellungen',
        notifications: {
            title: 'Benachrichtigungen',
            important_notifications: 'Wichtige Benachrichtigungen',
            show_notifications: 'Benachrichtigungen zu neuen Aufgaben',
            by_mail: 'Per E-Mail benachrichtigen',
            by_browser_notification: 'Per Browser-Benachrichtigung benachrichtigen',
        },
        language: 'Sprache',
        system: 'System',
        theme: {
            title: 'Design',
            dark: 'Dunkel',
            light: 'Hell',
        },
        save_settings: 'Einstellungen speichern',
        danger_zone: {
            title: 'Kontolöschung',
            delete_account: 'Konto löschen',
            delete_account_description: 'Das Konto wird unwiderruflich gelöscht. ' +
                'Alle Daten werden gelöscht und können nicht wiederhergestellt werden. ' +
                'Bei der nächsten Anmeldung via LDAP wird ein neues Konto angelegt.',
        },
    },
    notifications_page: {
        notifications: 'Benachrichtigungen',
        news: 'Neuigkeiten',
        description: 'Hier können Rückmeldungen, Feedback und unbewertete Abgaben eingesehen werden.',
        unread: 'Ungelesen',
        read: 'Gelesen',
        mark_all: 'Alle auswählen',
        mark_as_read: 'Als gelesen markieren',
        mark_as_unread: 'Als ungelesen markieren',
        delete: 'Löschen',
        title: 'Betreff',
        content: 'Nachricht'
    },
    buttons: {
        save: 'Speichern',
        cancel: 'Abbrechen',
        saved: 'Gespeichert',
        reset: 'Zurücksetzen',
        delete: 'Löschen',
        yes: 'Ja',
        no: 'Nein',
        close: 'Schließen',
        add: 'Hinzufügen',
        remove: 'Entfernen',
        edit: 'Bearbeiten',
        login: 'Anmelden',
        login_with_ldap: 'Login mit LDAP',
        logout: 'Abmelden',
        register: 'Registrieren',
        new: 'Neu',
        stay: 'Bleiben',
        view_submissions: 'Abgaben einsehen',
        back: 'Zurück',
        visit: 'Besuchen',
        view: 'Ansehen',
        visit_profile: 'Profil besuchen',
        visibility_public: 'Sichtbarkeit: öffentlich',
        visibility_private: 'Sichtbarkeit: nur für Eingeschriebene',
        to_profile: 'Zum Profil',
        read_feedback: 'Feedback lesen',
        to_submission: 'Zur Abgabe',
        read_message: 'Lesen',
        edit_exercise: 'Aufgabe bearbeiten',
        to_help_page: 'Zur Hilfeseite',
        to_module: 'Zum Modul',
        to_exercise: 'Zur Aufgabe'
    },
    titles: {
        home_view: 'ATLAS',
        login_view: 'Login',
        help_view: 'Hilfe',
        settings_view: 'Einstellungen',
        admin_view: 'Admin',
        submission_view: 'Abgabe',
        evaluationlist_view: 'Abgaben',
        editsubmission_view: 'Bearbeiten',
        exercisemanagement_view: 'Aufgaben',
        exercisecreator_view: 'Neue Aufgabe',
        usermanagement_view: 'Benutzer:innen',
        modulemanagement_view: 'Module',
        tagmanagement_view: 'Tags',
        profile_view: 'Profil',
        modulesearch_view: 'Module',
        pagenotfound_view: 'Fehler',
        exercise_view: 'Aufgabe',
        exerciseeditor_view: 'Bearbeiten',
        module_main_page: 'Modul',
        modulemanager_view: "Modul Manager",
    },
    languages: {
        en: 'Englisch',
        de: 'Deutsch',
    },
    roles: {
      admin: 'Admin',
      teacher: 'Lehrende:r',
      student: 'Student:in',
      tutor: 'Tutor:in',
      guest: 'Gast'
    },
    account: {
        title: 'Account',
        username: 'Benutzername',
        name: 'Name',
        email: 'E-mail',
        password: 'Passwort',
        password_confirm: 'Passwort (bestätigen)',
        saved: 'Gespeichert',
    },
    admin: {
        choose_page: 'Wähle eine Seite aus, indem du einen Link in der Adminleiste klickst.',
        users: {
            new: 'Neue:r Benutzer:in',
            edit: 'Benutzer:in bearbeiten',
            delete: 'Benutzer:in löschen',
            delete_confirm: 'Benutzer:in {0} wirklich löschen?',
            name: 'Name',
            username: 'Benutzername',
            email: 'E-mail',
            roles: 'Rollen',
            created_at: 'Erstellt am',
            actions: 'Aktionen',
            password: 'Passwort',
            change_password: 'Passwort ändern',
            search_user: 'Benutzer:in suchen',
            users_per_page: 'Benutzer:innen pro Seite',
            errors: {
                required: 'Dieses Feld ist erforderlich.',
                username_taken: 'Benutzername bereits vergeben.',
                username_invalid: 'Benutzername muss zwischen 3 und 32 Zeichen lang sein und darf nur aus Buchstaben und Zahlen bestehen.',
                username_ldap_invalid: 'Benutzername ist für LDAP-Accounts reserviert.',
                email_taken: 'E-Mail wird bereits verwendet.',
                email_invalid: 'Diese E-Mail-Adresse ist ungültig.',
                password_invalid: 'Passwort muss mindestens 8 Buchstaben lang sein, und einen Großbuchstaben, Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.',
            }
        },
        exercises: {
            new: 'Neue Aufgabe',
            edit: 'Aufgabe bearbeiten',
            delete: 'Aufgabe löschen',
            delete_confirm: 'Aufgabe "{0}" wirklich löschen?',
            title: 'Titel',
            module: 'Modul',
            description: 'Beschreibung',
            no_description: 'Keine Beschreibung',
            created_at: 'Erstellt am',
            actions: 'Aktionen',
            search_exercise: 'Aufgabe suchen',
            exercises_per_page: 'Aufgaben pro Seite',
            errors: {
                required: 'Dieses Feld ist erforderlich.',
            }
        },
        modules: {
            title: 'Modul',
            description: 'Beschreibung',
            no_description: 'Keine Beschreibung',
            actions: 'Aktionen',
            new: 'Modul erstellen',
            edit: 'Modul bearbeiten',
            delete: 'Modul löschen',
            delete_confirm: 'Modul "{0}" wirklich löschen?',
            search_module: 'Modul suchen',
            items_per_page: 'Einträge pro Seite',
            module_per_page: 'Module pro Seite',
            search: 'Suche nach Modulen',
            icon: 'Icon',
        },
        tags: {
            title: 'Tags',
            actions: 'Aktionen',
            edit_tag: 'Tag bearbeiten',
            create_tag: 'Tag erstellen',
            search_tag: 'Tag suchen',
            delete_tag: 'Tag löschen',
            delete_confirm: 'Tag "{0}" wirklich löschen?',
            tags_per_page: 'Tags pro Seite',
        },
        navbar: {
            title: 'Administration',
            manage_user: 'Benutzer:innen verwalten',
            manage_exercise: 'Aufgaben verwalten',
            manage_module: 'Module verwalten',
            manage_tag: 'Tags verwalten',
            back: 'Zurück zur Homepage'
        }
    },
    exercise: {
        add_tag: 'Tags hinzufügen',
        tag_add_desc: 'Tag aus der Liste hinzufügen',
        tag: 'Tag',
        submit: {
            button: 'Meine Abgabe',
            tooltip: 'Melde dich an, um eine Lösung hochzuladen!'
        },
        description: 'Beschreibung (optional)',
        title: 'Titel',
        id: 'ID',
        edit: 'Bearbeiten',
        confirm_leave: 'Willst du diese Seite wirklich verlassen? Ungespeicherte Änderungen gehen verloren!',
        confirm_cancel: 'Willst du die Bearbeitung wirklich abbrechen? Ungespeicherte Änderungen gehen verloren!',
        confirm_delete: 'Willst du diese Aufgabe wirklich unwiderruflich löschen?',
        tag_search_or_create: 'Tag suchen oder erstellen',
        add_exercise: 'Neue Aufgabe hinzufügen'
    },
    submission: {
        title: 'Aufgabe',
        'submitted-solutions': {
            title: 'Deine Abgabe',
            'no-solutions': 'Du hast bisher noch keine Lösung für diese Aufgabe hochgeladen.',
            'table-header': {
                'submission-id' : 'ID',
                type: 'Abgabetyp',
                grade: 'Bewertung',
                date: 'Datum',
                'evaluated-by': 'Bewertet von',
                comment: 'Kommentar',
                'view-submission':'Abgabe ansehen'
            },
            'submission-types': {
                'file-upload': 'Datei-Upload',
                'text-field': 'Freitextfeld',
                'multiple-choice': 'Multiple Choice'
            }
        },
        'submit-a-solution': {
            title: 'Lösung hochladen',
            'form-placeholder': 'Schreibe hier deine Lösung hinein...'
        },
        'specific-submission': {
            title: 'Deine Lösung zu '
        },
        edit_submission: 'Abgabe bearbeiten'
    },
    submission_list: {
        title: 'Abgaben aller Benutzer:innen für Aufgabe',
        no_solutions: 'Für diese Aufgabe wurden noch keine Lösungen abgegeben.',
        table: {
            user_id: 'Benutzer-ID',
            status: {
                title: 'Status',
                evaluated: 'bewertet',
                pending: 'ausstehend'
            },
            evaluate: 'Zur Bewertung'
        }
    },
    evaluation: {
        title: 'Bewertung der Abgabe',
        comment: 'Ihre Bewertung',
        comment_form: 'Schreiben Sie hier einen Kommentar zur Abgabe hinein...',
        grade_form: 'Bewertung von 0-100 in %',
        solution: 'Lösung des/der Nutzers/Nutzerin'
    },
    error: {
        unauthorized: 'Keine Berechtigung.',
        forbidden: 'Zugriff verweigert.',
        not_found: 'Element konnte nicht gefunden werden.',
        internal_server_error: 'Interner Serverfehler.',
        unknown: 'Unbekannter Fehler.',
    },
    module_search: {
        search: 'Suche nach Modulen',
        items_per_page: 'Einträge pro Seite',
        no_results: 'Deine Suche lieferte keine Ergebnisse.',
    },
    module_page: {
        module: 'Modul',
        exercises: 'Aufgaben',
        about: 'Über',
        manage: 'Verwalten',
        attend: 'Kurs belegen',
        leave: 'Kurs verlassen',
        teachers: 'Lehrende',
        tutors: 'Tutor:innen',
        materials: 'Lernmaterial',
        enrollment: 'Selbsteinschreibung in das Modul.',
        disenroll: 'Von diesem Modul abmelden.',
        search_exercise: 'Aufgabe suchen',
    },
    module_manager: {
        name: 'Name',
        roles: 'Rollen',
        edit_tag_button: 'Tags bearbeiten',
        edit_tag: 'Tags bearbeiten oder löschen',
        tag: 'Tag',
        add_user: 'Nutzer:in einschreiben',
        edit_privilege: 'Rolle ändern',
        student: 'Student:in',
        tutor: 'Tutor:in',
        teacher: 'Lehrer:in',
        search_user: 'Nutzer:in suchen',
    },
    page_not_found: {
        error_title: "Diese Seite konnte nicht gefunden werden.",
        error_description: "Falls du denkst, dass dies ein Fehler ist, kontaktiere bitte die Lehrbeauftragten des Moduls, in dem du den Link gefunden hast.",
        home_button: "Startseite",
        back_button: "Zurück",
    }
}

export default translationDe
