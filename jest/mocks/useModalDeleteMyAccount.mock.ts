jest.mock('hooks/useModalDeleteMyAccount', () => ({
    useModalDeleteMyAccount: jest.fn(() => ({
      ref: { current: null },
      code: '',
      props: {},
      setCode: jest.fn(),
      CELL_COUNT: 6,
      getCellOnLayoutHandler: jest.fn(),
      handleConfirm: jest.fn()
    })),
}));