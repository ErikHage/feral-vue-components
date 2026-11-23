import { h, nextTick } from 'vue';
import { VBtn, VListItem, VRow } from 'vuetify/components';
import { FrTimeline } from '../../../src';
import { dayOf, daysApart } from '../../../src/components/FrTimeline/days';
import { mountWithVuetify } from '../helpers/mount';

interface Entry {
  id: number;
  date: string | number | Date;
  text: string;
}

// Newest days first: 05-10, 05-09 (two records), then a gap to 05-01
const records: Entry[] = [
  { id: 1, date: '2026-05-01', text: 'Sowed tomatoes' },
  { id: 2, date: '2026-05-09T08:00:00', text: 'Watered' },
  { id: 3, date: '2026-05-10', text: 'Planted out' },
  { id: 4, date: '2026-05-09T18:30:00', text: 'Weeded' },
];

// Acts as a parent's v-model would. FrTimeline tells v-model the shown day during setup, before
// mount returns, so that first update finds no wrapper yet; the timeline shows the day either way
function mountTimeline(
  props: Record<string, unknown> = {},
  slots: Record<string, unknown> = {},
  attrs: Record<string, unknown> = {},
) {
  let wrapper: ReturnType<typeof mountWithVuetify> | undefined = undefined;
  wrapper = mountWithVuetify(
    FrTimeline as never,
    {
      props: {
        records,
        dateOf: (entry: Entry) => entry.date,
        'onUpdate:modelValue': (day: string | null) =>
          wrapper?.setProps({ modelValue: day } as never),
        ...props,
      },
      slots,
      attrs,
    } as never,
  );
  return wrapper;
}

const dayList = (wrapper: ReturnType<typeof mountTimeline>) =>
  wrapper.findAll('.fr-timeline .v-list .v-list-item').map((item) => item.text());

const shown = (wrapper: ReturnType<typeof mountTimeline>) => wrapper.find('h2').text();

const button = (wrapper: ReturnType<typeof mountTimeline>, text: string) =>
  wrapper.findAllComponents(VBtn).find((btn) => btn.text() === text)!;

describe('FrTimeline', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders one row marked fr-timeline, listing the days with records newest first', () => {
    const wrapper = mountTimeline();

    expect(wrapper.findAllComponents(VRow)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-row', 'fr-timeline']));
    expect(dayList(wrapper)).toEqual(['2026-05-10', '2026-05-09', '...', '2026-05-01']);
  });

  it('marks a gap only between days more than one apart, and the gap does nothing', () => {
    const wrapper = mountTimeline();
    const gap = wrapper.findAllComponents(VListItem)[2]!;

    expect(gap.text()).toBe('...');
    expect(gap.props('disabled')).toBe(true);
  });

  it('shows the newest day when v-model is empty, and tells v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountTimeline({ 'onUpdate:modelValue': onUpdate });
    await nextTick();

    expect(shown(wrapper)).toBe('2026-05-10');
    expect(onUpdate).toHaveBeenCalledWith('2026-05-10');
  });

  it("shows v-model's day when it has records, telling v-model nothing", async () => {
    const onUpdate = vi.fn();
    const wrapper = mountTimeline({ modelValue: '2026-05-09', 'onUpdate:modelValue': onUpdate });
    await nextTick();

    expect(shown(wrapper)).toBe('2026-05-09');
    expect(onUpdate).not.toHaveBeenCalled();
    const active = wrapper.findAllComponents(VListItem).filter((item) => item.props('active'));
    expect(active.map((item) => item.text())).toEqual(['2026-05-09']);
  });

  it('shows the newest day when v-model names a day without records, and tells v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountTimeline({ modelValue: '2026-04-01', 'onUpdate:modelValue': onUpdate });
    await nextTick();

    expect(shown(wrapper)).toBe('2026-05-10');
    expect(onUpdate).toHaveBeenCalledWith('2026-05-10');
  });

  it('shows a day when it is clicked in the list', async () => {
    const wrapper = mountTimeline();

    await wrapper.findAllComponents(VListItem)[3]!.trigger('click');

    expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual(['2026-05-01']);
    expect(shown(wrapper)).toBe('2026-05-01');
  });

  it('keeps Older and Newer neutral, not the primary of other buttons', () => {
    const wrapper = mountTimeline();

    for (const text of ['Older', 'Newer']) {
      expect(button(wrapper, text).classes()).not.toContain('text-primary');
    }
  });

  it("heads the shown day in a card title's type", () => {
    expect(mountTimeline().find('h2').classes()).toContain('text-title-large');
  });

  it('steps between days with Older and Newer, each disabled at its end', async () => {
    const wrapper = mountTimeline();
    await nextTick();

    expect(button(wrapper, 'Newer').props('disabled')).toBe(true);
    expect(button(wrapper, 'Older').props('disabled')).toBe(false);

    await button(wrapper, 'Older').trigger('click');
    expect(shown(wrapper)).toBe('2026-05-09');

    await button(wrapper, 'Older').trigger('click');
    expect(shown(wrapper)).toBe('2026-05-01');
    expect(button(wrapper, 'Older').props('disabled')).toBe(true);

    await button(wrapper, 'Newer').trigger('click');
    expect(shown(wrapper)).toBe('2026-05-09');
    expect(button(wrapper, 'Newer').props('disabled')).toBe(false);
  });

  it('gives the day and actions slots the shown day and its records, in the order given', () => {
    const day = vi.fn(({ records: shownRecords }: { records: Entry[] }) =>
      shownRecords.map((record) => h('p', { class: 'record' }, record.text)),
    );
    const actions = vi.fn(({ day: shownDay }: { day: string; records: Entry[] }) =>
      h('button', { class: 'edit' }, `Edit ${shownDay}`),
    );
    const wrapper = mountTimeline({ modelValue: '2026-05-09' }, { day, actions });

    expect(wrapper.findAll('.record').map((p) => p.text())).toEqual(['Watered', 'Weeded']);
    expect(wrapper.find('h2 + .edit').text()).toBe('Edit 2026-05-09');
    expect(day).toHaveBeenLastCalledWith({ day: '2026-05-09', records: [records[1], records[3]] });
    expect(actions.mock.lastCall![0].records).toEqual([records[1], records[3]]);
  });

  it('shows the empty slot, and no day, without records', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountTimeline(
      { records: [], modelValue: '2026-05-09', 'onUpdate:modelValue': onUpdate },
      { empty: () => h('p', { class: 'none' }, 'Nothing logged') },
    );
    await nextTick();

    expect(wrapper.find('.none').text()).toBe('Nothing logged');
    expect(wrapper.find('h2').exists()).toBe(false);
    expect(dayList(wrapper)).toEqual([]);
    expect(onUpdate).toHaveBeenCalledWith(null);
  });

  it('reads Dates, timestamps and local date-times as the local day they fall on', () => {
    const late = new Date(2026, 4, 3, 23, 30);
    const wrapper = mountTimeline({
      records: [
        { id: 1, date: late, text: 'Date' },
        { id: 2, date: new Date(2026, 4, 4, 0, 15).getTime(), text: 'Timestamp' },
        { id: 3, date: '2026-05-04T23:59:00', text: 'Local date-time' },
      ],
    });

    expect(dayList(wrapper)).toEqual(['2026-05-04', '2026-05-03']);
  });

  it('leaves out records whose date cannot be read', () => {
    const wrapper = mountTimeline({
      records: [...records, { id: 5, date: 'not a date', text: 'Lost' }],
    });

    expect(dayList(wrapper)).toEqual(['2026-05-10', '2026-05-09', '...', '2026-05-01']);
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountTimeline({}, {}, { class: 'mt-4', 'data-test': 'journal' });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['fr-timeline', 'mt-4']));
    expect(wrapper.attributes('data-test')).toBe('journal');
  });
});

describe('FrTimeline days', () => {
  // vitest.config.ts runs the specs in Los Angeles time, where new Date('2026-05-01') falls on
  // 30 April locally
  it('keeps a date-only string as the day it names, even west of Greenwich', () => {
    expect(new Date('2026-05-01').getDate()).toBe(30);
    expect(dayOf('2026-05-01')).toBe('2026-05-01');
  });

  it("reads anything else in local time, and gives undefined for what it can't read", () => {
    expect(dayOf(new Date(2026, 0, 2, 0, 0))).toBe('2026-01-02');
    expect(dayOf('2026-01-02T23:00:00')).toBe('2026-01-02');
    expect(dayOf(Number.NaN)).toBeUndefined();
  });

  it('counts whole days between two days, across a change to summer time', () => {
    expect(daysApart('2026-03-28', '2026-03-29')).toBe(1);
    expect(daysApart('2026-03-28', '2026-03-30')).toBe(2);
    expect(daysApart('2025-12-31', '2026-01-01')).toBe(1);
  });
});
