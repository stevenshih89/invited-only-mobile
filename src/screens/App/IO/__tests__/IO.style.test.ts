import {tabNavigatorStyle} from '../IO.style';

describe('IO styles', () => {
  it('tabNavigatorStyle has correct styles', () => {
    expect(tabNavigatorStyle).toEqual({
      width: '100%',
      marginHorizontal: 50,
    });
  });
});
