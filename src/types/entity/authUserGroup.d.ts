interface AuthUserGroup{
    id:number,
    groupName:string,
    isDeleted:number,
    memo:string,
    createdBy:string,
    createdDate:string,
    updatedBy:string,
    updatedDate:string,
    sysMenus:SysMenu[],
    users:UserInfo[];
}