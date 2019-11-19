export const fr = {

    header: {

        // Invoices
        invoices: "Factures",
        addInvoice: "Ajouter une facture",
        editInvoice: "Modifier la facture",

        // Estimates
        estimates: "Estimations",
        addEstimate: "Ajouter une estimation",
        editEstimate: "Modifier l'estimation",

        // Templates
        template: "Sélectionnez un modèle",

        // Customers
        customers: "Les clients",
        addCustomer: "Ajouter un client",
        editCustomer: "Modifier le client",

        selectCurrency: "Sélectionnez la devise",
        billingAddress: "Adresse de facturation",
        shippingAddress: "Adresse de livraison",

        country: "Choisissez le pays",
        state: "Sélectionnez l'état",
        city: "Sélectionnez une ville",

        // Payments
        payments: "Paiements",
        addPayment: "Ajouter un paiement",
        editPayment: "Modifier le paiement",


        // Expenses
        expenses: "les frais",
        addExpense: "Ajouter une dépense",
        editExpense: "Modifier les dépenses",

        // More
        more: "Plus",
        expenseCategory: "Catégories de dépenses",
        addCategory: "ajouter une catégorie",
        editCategory: "Modifier la catégorie",

        // Setting
        settings: "Paramètres",
        notifications: "Notification",
        setting: {
            company: "compagnie",
            account: "réglage du compte",
            preferences: "Préférences",
            LanguageAndCurrency: "Langue et devise",
            endpoint: "Point de terminaison de l'API"
        },

        // Taxes
        taxes: "Types de taxe",
        addTaxes: "Ajouter une taxe",
        editTaxes: "Modifier la taxe",

        // Item
        addItem: "Ajouter un item",
        editItem: "Modifier l'article",
        items: "Articles",

        // Report
        reports: "Rapports",
        salesReport: "Rapport des ventes",
        profitAndLossReport: "Compte de résultat",
        expensesReport: "Rapport de dépenses",
        taxesReport: "Rapport de taxes",

        // Filter
        filter: "Les filtres",

        back: "Retour",
    },

    tabNavigation: {
        invoices: "Factures",
        customers: "Les clients",
        payments: "Paiements",
        expenses: "les frais",
        more: "Plus",
    },

    invoices: {

        title: 'Sélectionnez facture',

        tabs: {
            DUE: "Dû",
            DRAFT: "Brouillon",
            ALL: "Toute"
        },

        invoiceDate: 'Date',
        dueDate: "Date d'échéance",
        discount: 'REMISE',
        invoiceNumber: "Numéro de facture",
        referenceNumber: "Numéro de réference",
        template: "Modèle",
        templatePlaceholder: "Sélectionner ou ajouter un nouveau modèle",
        customer: "Client",
        customerPlaceholder: "Sélectionner un client",
        items: "Des articles",
        unit: "Unité",
        addItem: "Ajouter un item",
        notes: "Remarques",
        notePlaceholder: "Notes supplémentaires visibles sur la facture",
        taxPlaceholder: "+ Ajouter une taxe",
        subtotal: "TOTAL",
        totalAmount: "MONTANT TOTAL",
        status: "Statut",
        statusPlaceholder: "Sélectionnez un statut",
        paidStatus: "Statut payé",
        paidStatusPlaceholder: "Sélectionnez le statut payé",
        fromDate: "Partir de la date",
        toDate: "À ce jour",

        alert: {
            removeDescription: "Vous ne pourrez pas récupérer cette facture",
            paymentAttachedTitle: "Action: échoué",
            paymentAttachedDescription: "Impossible de supprimer une facture avec un paiement existant.",
            draftTitle: "Sauvegarder les modifications?",
        },

        empty: {
            due: {
                title: "Vous n'avez aucune facture due",
                description: "Cette section contient la liste des factures dues.",
            },
            draft: {
                title: "Vous n'avez pas de facture préliminaire",
                description: "Cette section contiendra la liste des projets de factures.",
            },
            all: {
                title: "Vous n'avez créé aucune facture",
            },

            title: "Aucune facture pour le moment!",
            description: "Cette section contiendra la liste des factures.",
            buttonTitle: "Ajouter une nouvelle facture"
        },

        actions: {
            downloadPdf: 'Télécharger le PDF',
            sendInvoice: 'Envoyer une facture',
            editInvoice: 'Modifier la facture',
            delete: 'Effacer',
            recordPayment: "Record de paiement",
            markAsSent: 'Marquer comme envoyé',
        }
    },

    customers: {
        displayName: "Afficher un nom",
        contactName: "Nom du contact principal",
        email: "Email",
        name: "Nom",
        phone: "Téléphone",
        website: "Site Internet",
        currency: "Devise",
        billingAddress: "Adresse de facturation",
        shippingAddress: "Adresse de livraison",
        enablePortal: "Activer le portail",
        password: "Mot de passe",

        filterDisplayName: "Afficher un nom",
        filterContactName: "Nom du contact",

        alertEmailAlreadyInUse: "Email déjà utilisé",
        alertDescription: "Vous ne pourrez pas récupérer ce client",

        address: {
            name: "Nom",
            country: "Pays",
            state: "Etat",
            city: "Ville",
            address: "Adresse",
            street1: "Rue 1",
            street2: "Rue 2",
            phone: "Téléphone",
            zipcode: "Code postal",
            sameAs: "Copier de la facturation"
        },

        removeCustomer: "Effacer",

        empty: {
            title: "Pas encore de clients!",
            description: "Cette section contiendra la liste des clients.",
            buttonTitle: "Ajouter un nouveau client",

            country: { title: "Pas de pays disponible" },
            state: { title: "Aucun état disponible" },
            city: { title: "Aucune ville disponible" }
        },

        title: 'Sélectionnez un client',
        placeholder: 'Sélectionner un client',
    },

    payments: {

        date: "Date",
        number: "No de paiement",
        customer: "Cliente",
        customerPlaceholder: "Sélectionner un client",
        mode: "Mode de paiement",
        modePlaceholder: "Sélectionnez le mode",
        amount: "Montant",
        notes: "Remarques",
        notesPlaceholder: "Notes complémentaires",
        invoice: "Facture d'achat",
        invoicePlaceholder: "Sélectionnez facture",

        alertAmount: "Le paiement entré est supérieur au montant total dû pour cette facture.",
        alertDescription: "Vous ne pourrez pas récupérer ce paiement",

        removePayment: "Effacer",

        empty: {
            title: "Aucun paiement pour le moment!",
            description: 'Cette section contiendra la liste des paiements.',
            buttonTitle: 'Ajouter un nouveau paiement',
        },
    },

    expenses: {
        receipt: "Le reçu",
        date: "Date de dépense",
        fromDate: "Partir de la date",
        toDate: "À ce jour",
        amount: "Montant",
        category: "Catégorie",
        categoryPlaceholder: "Choisir une catégorie",
        notes: "Remarques",
        notesPlaceholder: "Notes complémentaires",
        viewReceipt: "Voir le reçu",

        alertDescription: "Vous ne pourrez pas récupérer cette dépense",
        removeExpense: "Effacer",

        noCategories: "Aucune catégorie pour le moment!",

        empty: {
            title: "Pas de dépenses pour le moment!",
            description: 'Cette section contiendra la liste des dépenses.',
            buttonTitle: 'Ajouter une nouvelle dépense',
        },
    },

    items: {

        title: 'Sélectionner un article',

        name: "Nom de l'article",
        description: "description (facultatif)",
        quantity: "Quantité",
        price: "Prix",
        subTotal: "TOTAL",
        discountType: "Type de remise",
        discount: "Remise",
        finalDiscount: "REMISE",
        finalAmount: "MONTANT",
        taxes: "Les taxes",
        selectTax: "Sélectionnez les taxes",
        unit: "Unité",
        unitPlaceholder: "Sélectionnez l'unité",

        alertDescription: "Vous ne pourrez pas récupérer cet article",
        lessAmount: "Le montant total ne devrait pas être inférieur à 0",

        alreadyAttachTitle: "Action: échoué",
        alreadyAttachDescription: "Impossible de supprimer un élément déjà utilisé",

        empty: {
            title: "Aucun article pour le moment!",
            description: 'Cette section contiendra la liste des éléments.',
            buttonTitle: 'Ajouter de nouveaux articles',
        },
    },

    more: {
        estimate: "Estimations",
        items: "Articles",
        reports: "Rapports",
        settings: "Paramètres",
        logout: "Se déconnecter",
    },

    categories: {

        title: "Nom de catégorie",
        description: "La description",

        alertDescription: "Vous ne pourrez pas récupérer cette catégorie",
        alreadyUsed: "Catégorie déjà utilisée",

        empty: {
            title: "Aucune catégorie pour le moment!",
            description: "Cette section contiendra la liste des catégories.",
            buttonTitle: "Ajouter une nouvelle catégorie"
        }
    },

    settings: {
        accountSettings: "réglage du compte",
        companyInformation: "Compagnie",
        preference: "Préférences",
        LanguageAndCurrency: "Langue et devise",
        notification: "Les notifications",
        taxes: "Types de taxe",
        expenseCategory: "Catégories de dépenses",

        endpoint: "point final api",

        company: {
            name: "Nom de la compagnie",
            email: "Email",
            phone: "Téléphone",
            address: "Adresse",
            street1: "Rue 1",
            street2: "Rue # 2",
            zipcode: "Code postal",
            website: "Site Internet",
            logo: "Logo d'entreprise"
        },

        account: {
            name: "Nom",
            email: "Email",
            password: "Mot de passe",
            confirmPassword: "Confirmez le mot de passe"
        },

        notifications: {
            send: "Envoyer des notifications à",
            invoiceViewed: "Facture consultée",
            invoiceViewedUpdated: "Paramètre de notification mis à jour avec succès",
            invoiceViewedDescription: "Lorsque votre client visualise le lien de facturation envoyé par courrier électronique.",

            estimateViewed: "Estimation vue",
            estimateViewedDescription: "Lorsque votre client visualise le lien de devis envoyé par courrier électronique.",
            estimateViewedUpdated: "Paramètre de notification mis à jour avec succès",
        },

        preferences: {
            currency: "Devise",
            currencyPlaceholder: "Sélectionnez la devise",
            language: "La langue",
            languagePlaceholder: "Choisir la langue",
            timeZone: "Fuseau horaire",
            timeZonePlaceholder: "Sélectionner le fuseau horaire",
            dateFormat: "Format de date",
            dateFormatPlaceholder: "Sélectionnez le format de date",
            fiscalYear: "Année financière",
            fiscalYearPlaceholder: "Sélectionnez l'exercice financier",
            discountSetting: "Réglage de remise",
            discountPerItem: "Remise par article",
            discountPerItemPlaceholder: "Activez cette option si vous souhaitez ajouter une remise à des postes de facture individuels. Par défaut, les remises sont ajoutées directement à la facture.",
            taxPerItem: "Taxe par article",
            taxPerItemPlaceholder: "Activez cette option si vous souhaitez ajouter une taxe à des postes de facture individuels. Par défaut, les taxes sont ajoutées directement à la facture.",

            settingUpdate: "Réglage mis à jour avec succès"
        }
    },

    login: {
        email: "Entrer votre Email",
        password: "Tapez votre mot de passe",
        invalid: "Les informations d'identification invalides"
    },
    logout: {
        confirmation: "Êtes-vous sûr de vouloir vous déconnecter?",
        title: "Se déconnecter"
    },
    forgot: {
        emailLabel: "Entrez votre email et nous vous enverrons le lien de réinitialisation du mot de passe",
        emailPlaceholder: "Entrer votre Email",
        emailSendTitle: "Vérifiez votre email",
        emailSendDescription: "Un lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail. Veuillez suivre les instructions sur l'e-mail pour créer un nouveau mot de passe.",
        emailSendError: "Le courrier électronique n'a pas pu être envoyé à cette adresse électronique.",
    },

    lostInternet: {
        title: "Connexion perdue",
        description: "Veuillez vérifier vos paramètres de téléphonie mobile ou Wifi pour vérifier votre connectivité Internet, puis réessayez."
    },

    updateApp: {
        title: "La version de l'application a expiré!",
        description: "Cette version de l'application est obsolète. Veuillez installer la dernière mise à jour pour continuer à utiliser Crater."
    },

    endpoint: {
        endpointURL: 'URL du noeud final',
        endpointDesc: "L'URL ci-dessus sera utilisé pour vous connecter à votre installation auto-hébergée de crater.",
        urlPlaceHolder: 'p ex: https://craterapp.com',
        alertInvalidUrl: "URL invalide",
    },

    estimates: {

        tabs: {
            SENT: "Envoyé",
            DRAFT: "Brouillon",
            ALL: "Tout"
        },

        estimateDate: "Date",
        expiryDate: "Date d'expiration",
        discount: 'REMISE',
        estimateNumber: "Numéro d'estimation",
        template: "Modèle",
        templatePlaceholder: "Sélectionner ou ajouter un nouveau modèle",
        customer: "Client",
        customerPlaceholder: "Sélectionner un client",
        items: "Articles",
        unit: "Unité",
        taxPlaceholder: "+ Ajouter une taxe",
        addItem: "Ajouter un item",
        notes: "Remarques",
        notePlaceholder: "Notes supplémentaires visibles sur devis",

        fromDate: "Partir de la date",
        toDate: "À ce jour",
        status: "Statut",
        statusPlaceholder: "Sélectionnez un statut",

        subtotal: "TOTAL",
        tax: "IMPÔT",
        totalAmount: "MONTANT TOTAL",

        alert: {
            convertToInvoiceDescription: "Êtes-vous sûr de vouloir convertir cette estimation en facture?",
            removeDescription: "Vous ne pourrez pas récupérer cette estimation",
            lessAmount: "Le montant total ne devrait pas être inférieur à 0",
            draftTitle: "Sauvegarder les modifications?",
        },

        empty: {
            sent: {
                title: "Vous n'avez pas envoyé d'estimations",
                description: "Cette section contiendra la liste des estimations envoyées.",
            },
            draft: {
                title: "Vous n'avez pas d'estimation provisoire",
                description: "Cette section contiendra la liste des projets d’estimations.",
            },
            all: {
                title: "Vous n'avez créé aucune estimation",
                description: "Cette section contiendra la liste des estimations.",
            },

            buttonTitle: "Ajouter une nouvelle estimation"
        },

        actions: {
            downloadPdf: 'Télécharger le PDF',
            sendEstimate: 'Envoyer une estimation',
            editEstimate: "Modifier l'estimation",
            delete: 'Effacer',
            convertToInvoice: 'Convertir en facture',
            markAsSent: 'Marquer comme envoyé',
            markAsAccepted: 'Marquer comme accepté',
            markAsRejected: 'Marquer comme rejeté',
        }
    },

    currencies: {
        title: 'Sélectionnez la devise',
        empty: {
            title: "Aucune devise pour le moment!",
        }
    },

    languages: {
        title: 'Choisir la langue',
        empty: {
            title: "Pas encore de langues!",
            description: "Cette section contiendra la liste des langues.",
        }
    },

    timeZones: {
        title: 'Sélectionnez le fuseau horaire',
        empty: {
            title: "Pas encore de TimeZones!",
            description: "Cette section contiendra la liste des fuseaux horaires.",
        }
    },

    dateFormats: {
        title: 'Sélectionnez le format de date',
        empty: {
            title: "Aucun format de date pour le moment!",
            description: "Cette section contiendra la liste des formats de date.",
        }
    },

    fiscalYears: {
        title: "Sélectionnez l'exercice",
        empty: {
            title: "Aucun exercice financier encore!",
            description: "Cette section contient la liste des exercices financiers",
        }
    },

    reports: {
        sales: 'Ventes',
        profitAndLoss: 'Perte de profit',
        expenses: 'Les dépenses',
        taxes: 'Les taxes',
        dateRange: 'Sélectionner une plage de dates',
        fromDate: 'Partir de la date',
        toDate: 'À ce jour',
        reportType: 'Type de rapport',

        byCustomer: 'Par le client',
        byItem: 'Par article',

        today: "Today",
        thisWeek: 'Cette semaine',
        thisMonth: 'Ce mois-ci',
        thisQuarter: 'Ce trimestre',
        thisYear: 'Cette année',
        currentFiscalQuarter: 'Trimestre financier en cours',
        currentFiscalYear: 'Année fiscale en cours',
        previousWeek: 'Semaine précédente',
        previousMonth: 'Le mois précédent',
        previousQuarter: 'Trimestre précédent',
        previousYear: 'Année précédente',
        previousFiscalQuarter: 'Trimestre précédent',
        previousFiscalYear: 'Année fiscale précédente',
        custom: 'Douane',

    },

    taxes: {

        title: 'Les taxes',

        type: "Nom de la taxe",
        description: "La description",
        percentage: "Pourcentage d'impôt",
        compoundTax: "Taxe composée",

        alertDescription: "Vous ne pourrez pas récupérer cette taxe",
        alreadyUsed: "Taxe déjà utilisée",

        empty: {
            title: "Aucun type de taxe pour le moment!",
            description: 'Cette section contiendra la liste des types de taxe.',
            buttonTitle: 'Ajouter un type de taxe',
        },
    },


    filePicker: {
        file: "Cliquez ici pour choisir un fichier",
        permission: "Désolé, nous avons besoin d'autorisations de rouleau de caméra pour que cela fonctionne!"
    },

    alert: {
        title: "Êtes-vous sûr?",
        action: {
            discard: "Jeter",
            saveAsDraft: "Enregistrer comme brouillon"
        }
    },

    button: {

        remove: "Retirer",
        save: "sauver",
        edit: "Modifier",
        retry: "Recommencez",
        done: "Terminé",
        skip: "Sauter",
        clear: "Clair",

        // Invoices
        viewPdf: "Voir PDF",

        // Auth
        singIn: "se connecter",
        singInGoogle: "Connectez-vous avec google",
        forget: "Mot de passe oublié?",

        update: "Mise à jour",
        updateCapital: "MISE À JOUR",
        chooseTemplate: "Choisir le modèle",

        // Reports
        generateReport: "Générer un rapport",

        recoveryEmail: "Envoyer le lien de réinitialisation",
        recoveryEmailAgain: "Envoyer à nouveau",
    },

    filter: {
        empty: {
            filterTitle: "Aucun résultat trouvé"
        }
    },

    search: {
        title: "Chercher",
        noResult: 'Aucun résultat pour "{{search}}"',
        noSearchResult: 'Aucun résultat pour',
    },

    validation: {
        Customer: "Client",
        Invoice: "Facture d'achat",
        required: "Le champ requis est vide",
        field: "{{hint}} Champ requis",
        choose: "Choisissez au moins un article",
        email: "S'il vous plaît, mettez une adresse email valide",
        passwordCompare: "Les mots de passe ne correspondent pas",
        minimumNumber: "doit être supérieur à 0",
        maximumNumber: "doit être inférieur à {{maxNumber}}",
        numeric: "doit être numérique",
        moreThanDue: "{{hint}} Ne devrait pas être plus que le montant dû.",
        url: "URL invalide (p ex: https://craterapp.com)"
    },

};