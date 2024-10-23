export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
  hakAkses: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    heading: "Dashboards",
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        hakAkses: 'admin',
        url: "/dashboard2",
      },
      {
        name: "Team",
        hakAkses: 'participant',
        icon: "solar:users-group-rounded-bold-duotone",
        url: "/dashboard2/team"
      }
    ],
  }
];

export default SidebarContent;
