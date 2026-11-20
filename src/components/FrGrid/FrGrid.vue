<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, type PropType, ref, type VNode } from 'vue';
import type { FrGridAlign, FrGridGap } from './types';

defineOptions({ name: 'FrGrid' });

/** The gap in pixels, matching the ga-1 and ga-3 classes the template puts on */
const GAPS = { standard: 12, small: 4 };

const props = defineProps({
  /** The narrowest a cell may be, in px, before the grid drops a column */
  minItemWidth: { type: Number, default: 240 },
  /** The most columns there may be, however wide the grid */
  maxColumns: { type: Number, default: undefined },
  /** The shortest a row may be, in px */
  minRowHeight: { type: Number, default: undefined },
  /** Every row as tall as the tallest */
  uniformRows: { type: Boolean, default: false },
  /** 'small' for a 4px gap; unset, the standard 12px */
  gap: {
    type: String as PropType<FrGridGap>,
    default: undefined,
    validator: (value: string) => ['small'].includes(value),
  },
  /**
   * Columns in these proportions ([2, 1]: two thirds and a third), stacking into one column
   * once the narrowest would be under min-item-width
   */
  weights: { type: Array as PropType<number[]>, default: undefined },
  /** Stretch the cells to fill the row when there are fewer than fit (auto-fit, not auto-fill) */
  stretch: { type: Boolean, default: true },
  /** How cells sit in their row, vertically */
  align: {
    type: String as PropType<FrGridAlign>,
    default: undefined,
    validator: (value: string) => ['start', 'center', 'end', 'baseline', 'stretch'].includes(value),
  },
});

defineSlots<{
  /** The cells: each child is one */
  default?: () => VNode[];
}>();

const gapPixels = computed(() => GAPS[props.gap ?? 'standard']);
const root = ref<HTMLElement | null>(null);
const width = ref<number | null>(null);
let observer: ResizeObserver | undefined;

// Weighted columns need the grid's width to know when to stack; the plain layout doesn't
onMounted(() => {
  if (props.weights && typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(([entry]) => (width.value = entry!.contentRect.width));
    observer.observe(root.value!);
  }
});
onBeforeUnmount(() => observer?.disconnect());

const weightedColumns = computed(() => {
  const weights = props.weights!;
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  const narrowest =
    width.value === null
      ? Infinity
      : ((width.value - (weights.length - 1) * gapPixels.value) * Math.min(...weights)) / total;
  return narrowest >= props.minItemWidth
    ? weights.map((weight) => `minmax(0, ${weight}fr)`).join(' ')
    : 'minmax(0, 1fr)';
});

const style = computed(() => {
  const tallest = props.uniformRows ? '1fr' : 'auto';
  const autoRows = props.minRowHeight
    ? `minmax(${props.minRowHeight}px, ${tallest})`
    : props.uniformRows
      ? '1fr'
      : undefined;
  if (props.weights) {
    return { gridTemplateColumns: weightedColumns.value, gridAutoRows: autoRows };
  }
  const capped = props.maxColumns
    ? `max(${props.minItemWidth}px, calc((100% - ${(props.maxColumns - 1) * gapPixels.value}px) / ${props.maxColumns}))`
    : `${props.minItemWidth}px`;
  return {
    gridTemplateColumns: `repeat(${props.stretch ? 'auto-fit' : 'auto-fill'}, minmax(${capped}, 1fr))`,
    gridAutoRows: autoRows,
  };
});
</script>

<!--
  A CSS grid of the default slot's children, each a cell: as many columns of at least
  min-item-width as fit (capped by max-columns), or columns in the proportions of weights. The
  caller's attributes fall through onto the root div; its classes merge with these
-->
<template>
  <div
    ref="root"
    class="fr-grid"
    :class="[gap === 'small' ? 'ga-1' : 'ga-3', align && `align-${align}`]"
    :style="style"
  >
    <slot />
  </div>
</template>

<!--
  Not scoped: the cells are the caller's elements, which scoped styles would not reach. min-width:
  0 lets a cell shrink below its content's width, so a long word or a wide field can't push the
  grid wider than its columns
-->
<style>
.fr-grid {
  display: grid;
}

.fr-grid > * {
  min-width: 0;
}
</style>
