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
        courses: 'Zu den Kursen',
        dropdown: {
            settings: 'Einstellungen',
            help: 'Hilfe',
            messages: 'Nachrichten',
            profile: 'Profil'
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
        instructions: 'Verwende die Nutzerdaten, die du auch für andere Online-Dienste der THM verwendest.',
        user_id: 'Nutzerkennung',
        password: 'Passwort'
    },
    landing_page: {
        welcome: 'Willkommen zu',
        instructions: 'Starte mit der Suche nach Kursen oder logge dich oben rechts ein!',
        search: 'z.B. Compilerbau'
    },
    main_page: {
        exercise: 'Aufgabe'
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
    },
    languages: {
        en: 'Englisch',
        de: 'Deutsch',
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
        users: {
            new: 'Neuer Benutzer',
            edit: 'Benutzer bearbeiten',
            delete: 'Benutzer löschen',
            delete_confirm: 'Benutzer {0} wirklich löschen?',
            name: 'Name',
            username: 'Benutzername',
            email: 'E-mail',
            roles: 'Rollen',
            created_at: 'Erstellt am',
            actions: 'Aktionen',
            password: 'Passwort',
            change_password: 'Passwort ändern',
            errors: {
                required: 'Dieses Feld ist erforderlich.',
                username_taken: 'Benutzername bereits vergeben.',
                username_invalid: 'Benutzername muss zwischen 3 und 32 Zeichen lang sein und darf nur aus Buchstaben und Zahlen bestehen.',
                email_taken: 'E-Mail wird bereits verwendet.',
                email_invalid: 'Diese E-Mail-Adresse ist ungültig.',
                password_invalid: 'Passwort muss mindestens 8 Buchstaben lang sein, und einen Großbuchstaben, Kleinbuchstaben, und Sonderzeichen enthalten.',
            }
        },
        tasks: {
            new: 'Neue Aufgabe',
            edit: 'Aufgabe bearbeiten',
            delete: 'Aufgabe löschen',
            delete_confirm: 'Aufgabe "{0}" wirklich löschen?',
            title: 'Titel',
            course: 'Kurs',
            description: 'Beschreibung',
            no_description: 'Keine Beschreibung',
            created_at: 'Erstellt am',
            actions: 'Aktionen',
            errors: {
                required: 'Dieses Feld ist erforderlich.',
            }
        },
        navbar: {
            title: 'Administration',
            manage_user: 'Benutzer verwalten',
            manage_task: 'Aufgaben verwalten',
            manage_course: 'Kurse verwalten',
            back: 'Zurück zur Homepage'
        }
    },
    exercise: {
        back: 'Zurück',
        edit: 'Bearbeiten',
        description: 'Beschreibung (optional)',
        title: 'Titel',
        id: 'ID',
    }
}

export default translationDe