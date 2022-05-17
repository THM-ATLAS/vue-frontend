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
            profile: 'Profil',
            admin: 'Admin',
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
                    description: 'Die Lernplattform ATLAS steht inklusive ihrer Kurse und Aufgaben auch ohne die Anmeldung über LDAP zur Verfügung, jedoch ist die Abgabe von Lösungen durch eine Anmeldung beschränkt.' +
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
        choose_page: 'Wähle eine Seite aus, indem du einen Link in der Adminleiste klickst.',
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
    },
    error: {
        unauthorized: 'Keine Berechtigung.',
        forbidden: 'Zugriff verweigert.',
        not_found: 'Element konnte nicht gefunden werden.',
        internal_server_error: 'Interner Serverfehler.',
        unknown: 'Unbekannter Fehler.',
    }
}

export default translationDe