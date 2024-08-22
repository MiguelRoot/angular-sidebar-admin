export interface IMenuHeader {
  header: string;
  menu: IMenuItem[];
}

export interface IMenuItem {
  title: string;
  isExpanded: boolean;
  icon?: string;
  routerLink?: string;
  children?: IMenuItem[];
}

export enum ISidebarState {
  Hidden,
  Compact,
  Expanded,
}
