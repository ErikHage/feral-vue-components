import type { FrAccordion } from './components/FrAccordion';
import type { FrAccordionPanel } from './components/FrAccordionPanel';
import type { FrAlert } from './components/FrAlert';
import type { FrAutocomplete } from './components/FrAutocomplete';
import type { FrAvatar } from './components/FrAvatar';
import type { FrBadge } from './components/FrBadge';
import type { FrBreadcrumbs } from './components/FrBreadcrumbs';
import type { FrBtn } from './components/FrBtn';
import type { FrCard } from './components/FrCard';
import type { FrCheckbox } from './components/FrCheckbox';
import type { FrChip } from './components/FrChip';
import type { FrChipGroup } from './components/FrChipGroup';
import type { FrCodeBlock } from './components/FrCodeBlock';
import type { FrCol } from './components/FrCol';
import type { FrContainer } from './components/FrContainer';
import type { FrDataTable } from './components/FrDataTable';
import type { FrDialog } from './components/FrDialog';
import type { FrDivider } from './components/FrDivider';
import type { FrFadeIn } from './components/FrFadeIn';
import type { FrFileField } from './components/FrFileField';
import type { FrForm } from './components/FrForm';
import type { FrIcon } from './components/FrIcon';
import type { FrImage } from './components/FrImage';
import type { FrList } from './components/FrList';
import type { FrListHeader } from './components/FrListHeader';
import type { FrListItem } from './components/FrListItem';
import type { FrMenu } from './components/FrMenu';
import type { FrProgressBar } from './components/FrProgressBar';
import type { FrRow } from './components/FrRow';
import type { FrSelect } from './components/FrSelect';
import type { FrSkeleton } from './components/FrSkeleton';
import type { FrSlider } from './components/FrSlider';
import type { FrSpacer } from './components/FrSpacer';
import type { FrSpinner } from './components/FrSpinner';
import type { FrSheet } from './components/FrSheet';
import type { FrTable } from './components/FrTable';
import type { FrTabs } from './components/FrTabs';

export { FrAccordion, frAccordionDefaults } from './components/FrAccordion';
export {
  FrAccordionPanel,
  type FrAccordionPanelSlots,
  type FrAccordionPanelTitleScope,
} from './components/FrAccordionPanel';
export { FrAlert, frAlertDefaults, type FrAlertSlots } from './components/FrAlert';
export {
  FrAutocomplete,
  frAutocompleteDefaults,
  type FrAutocompleteSlots,
} from './components/FrAutocomplete';
export { FrAvatar, type FrAvatarSlots } from './components/FrAvatar';
export { FrBadge, type FrBadgeSlots } from './components/FrBadge';
export { FrBreadcrumbs, type FrBreadcrumbsSlots } from './components/FrBreadcrumbs';
export { FrBtn, frBtnDefaults, type FrBtnSlots } from './components/FrBtn';
export { FrCard, frCardDefaults, type FrCardSlots } from './components/FrCard';
export { FrCheckbox, frCheckboxDefaults, type FrCheckboxSlots } from './components/FrCheckbox';
export { FrChip, type FrChipScope, type FrChipSlots } from './components/FrChip';
export { FrChipGroup } from './components/FrChipGroup';
export { FrCodeBlock } from './components/FrCodeBlock';
export { FrCol } from './components/FrCol';
export { FrContainer } from './components/FrContainer';
export {
  FrDataTable,
  frDataTableDefaults,
  type FrDataTableCellScope,
  type FrDataTableHeaderScope,
  type FrDataTableSlots,
} from './components/FrDataTable';
export { FrDialog, frDialogWidths, type FrDialogSize } from './components/FrDialog';
export { FrDivider } from './components/FrDivider';
export { FrFadeIn } from './components/FrFadeIn';
export {
  FrFileField,
  frFileFieldDefaults,
  type FrFileFieldSelectionScope,
  type FrFileFieldSlots,
} from './components/FrFileField';
export { FrForm, type FrFormSlotScope, type FrFormValidationResult } from './components/FrForm';
export { FrIcon } from './components/FrIcon';
export { FrImage } from './components/FrImage';
export {
  FrList,
  frListDefaults,
  type FrListPartScope,
  type FrListRowScope,
  type FrListSlots,
} from './components/FrList';
export { FrListHeader } from './components/FrListHeader';
export { FrListItem } from './components/FrListItem';
export { FrMenu } from './components/FrMenu';
export { FrProgressBar } from './components/FrProgressBar';
export { FrRow, type FrRowSpacing } from './components/FrRow';
export { FrSelect, frSelectDefaults, type FrSelectSlots } from './components/FrSelect';
export { FrSkeleton } from './components/FrSkeleton';
export { FrSlider, frSliderDefaults, type FrSliderSlots } from './components/FrSlider';
export { FrSpacer } from './components/FrSpacer';
export { FrSpinner } from './components/FrSpinner';
export { FrSheet, frSheetDefaults, type FrSheetPadding } from './components/FrSheet';
export { FrTable, frTableDefaults, type FrTableSlots } from './components/FrTable';
export {
  FrTabs,
  frTabsDefaults,
  type FrTabsOption,
  type FrTabsSlotScope,
  type FrTabsValue,
} from './components/FrTabs';
export { FeralComponents } from './plugin';
export { createFeralVuetifyOptions, feralDark, feralLight } from './theme';

// Types for the components FeralComponents registers, so `<fr-card>` type-checks in templates
declare module 'vue' {
  interface GlobalComponents {
    FrAccordion: typeof FrAccordion;
    FrAccordionPanel: typeof FrAccordionPanel;
    FrAlert: typeof FrAlert;
    FrAutocomplete: typeof FrAutocomplete;
    FrAvatar: typeof FrAvatar;
    FrBadge: typeof FrBadge;
    FrBreadcrumbs: typeof FrBreadcrumbs;
    FrBtn: typeof FrBtn;
    FrCard: typeof FrCard;
    FrCheckbox: typeof FrCheckbox;
    FrChip: typeof FrChip;
    FrChipGroup: typeof FrChipGroup;
    FrCodeBlock: typeof FrCodeBlock;
    FrCol: typeof FrCol;
    FrContainer: typeof FrContainer;
    FrDataTable: typeof FrDataTable;
    FrDialog: typeof FrDialog;
    FrDivider: typeof FrDivider;
    FrFadeIn: typeof FrFadeIn;
    FrFileField: typeof FrFileField;
    FrForm: typeof FrForm;
    FrIcon: typeof FrIcon;
    FrImage: typeof FrImage;
    FrList: typeof FrList;
    FrListHeader: typeof FrListHeader;
    FrListItem: typeof FrListItem;
    FrMenu: typeof FrMenu;
    FrProgressBar: typeof FrProgressBar;
    FrRow: typeof FrRow;
    FrSelect: typeof FrSelect;
    FrSkeleton: typeof FrSkeleton;
    FrSlider: typeof FrSlider;
    FrSpacer: typeof FrSpacer;
    FrSpinner: typeof FrSpinner;
    FrSheet: typeof FrSheet;
    FrTable: typeof FrTable;
    FrTabs: typeof FrTabs;
  }
}
