export default {
  translation: {
    hello: 'Hallo,',
    search: {
      placeholder: 'Suchen Sie nach einer Notiz'
    },
    filters: {
      all: 'Alle Notizen',
      important: 'Wichtig',
      favourite: 'Favoriten',
      categories: 'Ordner',
    },
    buttons: {
      create: 'Erstellen',
      save: 'Speichern'
    },
    createNote: {
      placeholders: {
        title: 'Titel',
        text: 'Hinweis'
      },
      actions: {
        save: 'Speichern notizen',
        delete: 'Löschen notizen',
        moveTo: 'Ziehen um'
      }
    },
    categories: {
      add: 'Neue Kategorie',
      label: 'Kategoriename',
      title: 'Kategorien',
      selected: '{{count}} Kategorien ausgewählt',
      selected_one: '{{count}} Kategorie ausgewählt',
      confirm: {
        message: 'Möchten Sie diese Kategorie wirklich löschen?',
        subMessage : 'Diese Aktion ist nicht rückgängig zu machen.'
      }
    },
    options: {
      style: {
        label: 'Stil',
        layout: 'Layout',
        sort: 'Sortieren nach',
        theme: 'Thema',
      },
      dataManagement: {
        clearAllNotes: 'Alle Notizen löschen',
        clearAllCategories: 'Alle Kategorien löschen',
        clearData: 'Daten löschen',
        export: 'Daten exportieren',
        import: 'Daten importieren',
        label: 'Daten',
        clearAllNotesMessage: 'Möchten Sie wirklich alle Notizen löschen?',
        clearAllCategoriesMessage: 'Möchten Sie wirklich alle Kategorien löschen?',
        clearAllDataMessage: 'Möchten Sie wirklich alle Daten löschen?',
        warningNotice: 'Diese Aktion ist nicht rückgängig zu machen.',
      },
      userInfos: {
        label: 'Informationen',
        placeholder: 'Name'
      },
      languages: {
        label: 'Sprachen'
      }
    }
  }
}