interface SysMenu {
  id: number;
  parentId: number;
  menuName: string;
  urlTo: string;
  isRoot?: number;
  seq?: number;
  icon: string;
  isDeleted: string;
  createdBy: string;
  createdDate: string;
}

interface SysMenuId {
  id: number;
}
