import reducer, { BreadcrumbState, setBreadcrumb } from './breadcrumbSlice';

describe('ErrorMessage reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      items: []
    });
  });

  it('should set breadcrumb items', () => {
    const initialState: BreadcrumbState = {
      items: [{
        text: 'text_1',
        link: '/'
      }]
    }

    const newBreadcrumb = [
      {
        text: 'text_1',
        link: '/'
      },
      {
        text: 'text_2',
        link: '/about'
      },
      {
        text: 'text_3',
        link: '/about/me'
      },
    ];

    const expected: BreadcrumbState = {
      items: newBreadcrumb
    }

    const actual = reducer(initialState, setBreadcrumb(newBreadcrumb));

    expect(actual).toEqual(expected);
  });
});
