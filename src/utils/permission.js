/**
 * 角色路由，
 */

const roleRouter = {
  customer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'ProductEdit',
  }, {
    name: 'Category',
  }],
};
/**
 * @param{role} 对应的角色；
 * @param{mapRouter} 路由地图；
 *
 * * */
export default function getRouters(role, mapRouter) {
  const rusltmap = roleRouter[role].map((item) => item.name);
  const rusltRouter = mapRouter.filter((item) => {
    const obj = item;// eslint 中不允许使用item;
    if (rusltmap.indexOf(item.name !== -1)) {
      const childrenRouter = obj.children;
      obj.children = childrenRouter.filter((r) => rusltmap.indexOf(r.name) !== -1);
      return true;
    }
    return false;
  });
  return rusltRouter;
}
