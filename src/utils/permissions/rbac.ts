type Role = "superAdmin" | "moderator" | "admin" | "user"
type User = { blockedBy: string[]; roles: Role[]; id: string }

type Permissions = {
  product: {
    dataType: "",
    action: "view" | "create" | "update"
  },
  eventAnalyzer: {
    dataType: '',
    action: "view" | "create" | "update"
  }
}

type PermissionCheck<Key extends keyof Permissions> = 
  | boolean 
  | ((user: User, data: Permissions[Key]["dataType"]) => boolean)

type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>
    }>
  }>
}

const ROLES = {
  admin: {
    product: {
      view: true, create: true, update: true, delete: true 
    },
    eventAnalyzer: {
      view: true, create: true, update: true, delete: true 
    }
  },
  user: {
    product: {
      view: true, create: false, update: false, delete: false
    },
    eventAnalyzer: {
      view: true, create: false, update: false, delete: false
    }
  },
  superAdmin: {},
  moderator: {}
}

/**
 * returns boolean value if the user has permission for the given module/resource for the given action
 * 
 * @param user user object with roles and an array blockedBy
 * @param resource modules/resource name
 * @param action type of action
 * @param data don't really know why this param exists, (copied code 😁)
 * @returns boolean value
 */
export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
) {
  return user.roles.some(role => {
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action]
    if(permission == null) return false

    if(typeof permission === "boolean") return permission
    return data != null && permission(user, data)
  })
}