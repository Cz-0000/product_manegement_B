const roleToRoute = {
  coustomer: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    }, {
      name: 'ProductEdit',
    },
  ],
  admin: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'Category',
    },
    {
      name: 'ProductEdit',
    },
  ],
}

// 权限管理
export default function getMenuRoute (role, routes) {
  const allowRoutesName = roleToRoute[role].map(i => i.name);
  const resultRoutes = routes.filter(r => {
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter(c => allowRoutesName.indexOf(c.name) !== -1)
      return true;
    }
    return false;
  })
  return resultRoutes;
}