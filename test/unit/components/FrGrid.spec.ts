import { h, nextTick } from 'vue';
import { FrGrid } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const cells = () => [h('div', { class: 'cell' }, 'A'), h('div', { class: 'cell' }, 'B')];

/** A stand-in ResizeObserver, since jsdom has none: resize() reports a width as the browser would */
class FakeResizeObserver {
  static last: FakeResizeObserver | undefined;
  observed: Element[] = [];
  disconnected = false;

  constructor(private callback: ResizeObserverCallback) {
    FakeResizeObserver.last = this;
  }

  observe(element: Element) {
    this.observed.push(element);
  }

  disconnect() {
    this.disconnected = true;
  }

  resize(width: number) {
    this.callback(
      [{ contentRect: { width } } as ResizeObserverEntry],
      this as unknown as ResizeObserver,
    );
  }
}

// What the grid's style binding resolves to, read off the rendered vnode: jsdom's CSS parser
// drops values it doesn't know, such as max() and repeat()
function gridStyle(wrapper: ReturnType<typeof mountWithVuetify>) {
  return wrapper.findComponent(FrGrid).vm.$.subTree.props!.style as Record<string, unknown>;
}

describe('FrGrid', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    vi.unstubAllGlobals();
    FakeResizeObserver.last = undefined;
  });

  it('is a div marked fr-grid, holding its cells', () => {
    const wrapper = mountWithVuetify(FrGrid, { slots: { default: cells } });

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.classes()).toContain('fr-grid');
    expect(wrapper.findAll('.fr-grid > .cell').map((cell) => cell.text())).toEqual(['A', 'B']);
  });

  it('fits as many 240px columns as it can, stretching them to fill the row', () => {
    const wrapper = mountWithVuetify(FrGrid);

    expect(gridStyle(wrapper)).toEqual({
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gridAutoRows: undefined,
    });
  });

  it('takes its narrowest column from min-item-width', () => {
    const wrapper = mountWithVuetify(FrGrid, { props: { minItemWidth: 180 } });

    expect(gridStyle(wrapper).gridTemplateColumns).toBe('repeat(auto-fit, minmax(180px, 1fr))');
  });

  it('leaves empty columns at the end, not stretching, with stretch false', () => {
    const wrapper = mountWithVuetify(FrGrid, { props: { stretch: false } });

    expect(gridStyle(wrapper).gridTemplateColumns).toBe('repeat(auto-fill, minmax(240px, 1fr))');
  });

  it('caps the columns at max-columns, allowing for the gaps between them', () => {
    const standard = mountWithVuetify(FrGrid, { props: { maxColumns: 3 } });
    const small = mountWithVuetify(FrGrid, { props: { maxColumns: 3, gap: 'small' } });

    expect(gridStyle(standard).gridTemplateColumns).toBe(
      'repeat(auto-fit, minmax(max(240px, calc((100% - 24px) / 3)), 1fr))',
    );
    expect(gridStyle(small).gridTemplateColumns).toBe(
      'repeat(auto-fit, minmax(max(240px, calc((100% - 8px) / 3)), 1fr))',
    );
  });

  it('spaces its cells 12px apart by default, 4px with gap small', () => {
    const standard = mountWithVuetify(FrGrid);
    const small = mountWithVuetify(FrGrid, { props: { gap: 'small' } });

    expect(standard.classes()).toContain('ga-3');
    expect(small.classes()).toContain('ga-1');
    expect(small.classes()).not.toContain('ga-3');
  });

  it.each([
    [{ minRowHeight: 80 }, 'minmax(80px, auto)'],
    [{ uniformRows: true }, '1fr'],
    [{ minRowHeight: 80, uniformRows: true }, 'minmax(80px, 1fr)'],
  ])('sizes its rows from %j as %s', (props, rows) => {
    const plain = mountWithVuetify(FrGrid, { props });
    const weighted = mountWithVuetify(FrGrid, { props: { ...props, weights: [1, 1] } });

    expect(gridStyle(plain).gridAutoRows).toBe(rows);
    expect(gridStyle(weighted).gridAutoRows).toBe(rows);
  });

  it('aligns its cells with align, and adds no align class without it', () => {
    const plain = mountWithVuetify(FrGrid);
    const centred = mountWithVuetify(FrGrid, { props: { align: 'center' } });

    expect(plain.classes().filter((name) => name.startsWith('align-'))).toEqual([]);
    expect(centred.classes()).toContain('align-center');
  });

  it('lays weighted columns out in proportion before it knows its width', () => {
    const wrapper = mountWithVuetify(FrGrid, { props: { weights: [2, 1] } });

    expect(gridStyle(wrapper)).toEqual({
      gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
      gridAutoRows: undefined,
    });
  });

  it('keeps weighted columns while the narrowest fits min-item-width, and stacks once it would not', async () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    const wrapper = mountWithVuetify(FrGrid, { props: { weights: [2, 1] } });
    const observer = FakeResizeObserver.last!;

    expect(observer.observed).toEqual([wrapper.element]);

    // (732 - 12) / 3 = 240: just wide enough
    observer.resize(732);
    await nextTick();
    expect(gridStyle(wrapper).gridTemplateColumns).toBe('minmax(0, 2fr) minmax(0, 1fr)');

    observer.resize(731);
    await nextTick();
    expect(gridStyle(wrapper).gridTemplateColumns).toBe('minmax(0, 1fr)');
  });

  it('counts the small gap when deciding whether weighted columns fit', async () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    const wrapper = mountWithVuetify(FrGrid, { props: { weights: [1, 1], gap: 'small' } });

    // (484 - 4) / 2 = 240
    FakeResizeObserver.last!.resize(484);
    await nextTick();
    expect(gridStyle(wrapper).gridTemplateColumns).toBe('minmax(0, 1fr) minmax(0, 1fr)');
  });

  it('watches its width only for weights, and stops when unmounted', () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    mountWithVuetify(FrGrid);
    expect(FakeResizeObserver.last).toBeUndefined();

    const weighted = mountWithVuetify(FrGrid, { props: { weights: [1, 1] } });
    const observer = FakeResizeObserver.last!;
    weighted.unmount();

    expect(observer.disconnected).toBe(true);
  });

  it("passes through attributes, merging its classes and style with the caller's", () => {
    const wrapper = mountWithVuetify(FrGrid, {
      attrs: { class: 'mb-4', style: 'padding: 8px', 'data-test': 'plots' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['fr-grid', 'ga-3', 'mb-4']));
    expect(wrapper.attributes('style')).toContain('padding: 8px');
    expect(wrapper.attributes('data-test')).toBe('plots');
  });
});
