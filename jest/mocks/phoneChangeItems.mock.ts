jest.mock('src/mocks/itemsPhoneChange', () => ({
    items: [
      { label: '+380', value: 'ua'},
      { label: '+972', value: 'ae'},
      { label: '+300', value: 'fr'},
    ],
}))