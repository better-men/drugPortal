import Login from './login/LoginPage'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import ProductList from './views/product/ProductList.vue'
import ProductEdit from './views/product/ProductEdit.vue'
import ProductInsert from './views/product/ProductInsert.vue'
import ProductCategoryList from './views/product-category/ProductCategoryList.vue'
import ProductCategoryInsert from './views/product-category/ProductCategoryInsert.vue'
import PurchasePlan from './views/purchase-plan/purchase-plan'
import PurchasePlanInsert from './views/purchase-plan/purchase-plan-insert'
import PurchaseOrderInsert from './views/purchase-order/purchase-order-insert'
import PurchaseOrder from './views/purchase-order/purchase-order'
import User from './views/user/UserList.vue'
import Authority from './views/authority/authority.vue'
import AuthorityEdit from './views/authority/authorityEdit.vue'
import Dic from './views/dic/dic.vue'
import UserEdit from './views/user/UserEdit'
import UserInsert from './views/user/UserInsert'
import InBound from './views/in-bound/in-bound'
import InBoundInsert from './views/in-bound/in-bound-insert'
import OutBound from './views/out-bound/out-bound'
import OutBoundInsert from './views/out-bound/out-bound-insert'
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '库存管理',
        iconCls: 'el-icon-house',
        leaf: false, //只有一个节点
        children: [{
                path: '/productCategoryList',
                component: ProductCategoryList,
                name: '库存分类'
            }, {
                path: '/productCategoryInsert',
                component: ProductCategoryInsert,
                hidden: true,
                name: '新增分类'
            }, {
                path: '/productList',
                component: ProductList,
                name: '库存列表'
            },{
                path: '/productInsert',
                component: ProductInsert,
                name: '新增库存',
                hidden: true
            },
            {
                path: '/inBound',
                component: InBound,
                name: '入库管理'
            },
            {
                path: '/inBoundInsert',
                component: InBoundInsert,
                hidden: true,
                name: '入库'
            },
            {
                path: '/outBound',
                component: OutBound,
                name: '出库管理'
            },
            {
                path: '/outBoundInsert',
                component: OutBoundInsert,
                hidden: true,
                name: '出库'
            }
        ]
    },

    {
        path: '/',
        component: Home,
        name: '采购管理',
        leaf: false, //只有一个节点
        iconCls: 'el-icon-shopping-cart-1', //图标样式class
        children: [{
            path: '/purchasePlan',
            component: PurchasePlan,
            name: '采购计划'

        }, {
            path: '/purchasePlanInsert',
            component: PurchasePlanInsert,
            hidden: true,
            name: '编辑采购计划'
        },{
            path: '/purchaseOrder',
            component: PurchaseOrder,
            name: '采购订单'
        }, {
            path: '/purchaseOrderInsert',
            component: PurchaseOrderInsert,
            hidden: true,
            name: '编辑采购订单'
        }]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '产品分类编辑',
    //     leaf: true, //只有一个节点
    //     hidden: true,
    //     iconCls: 'el-icon-message', //图标样式class
    //     children: [{
    //         path: '/productTypeEdit',
    //         component: ProductTypeEdit,
    //         name: '产品分类编辑'
    //     }]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '新增产品分类',
    //     leaf: true, //只有一个节点
    //     hidden: true,
    //     iconCls: 'el-icon-message', //图标样式class
    //     children: [{
    //         path: '/productTypeInsert',
    //         component: ProductTypeInsert,
    //         name: '新增产品分类'
    //     }]
    // },
    {
        path: '/',
        component: Home,
        name: '基础管理',
        iconCls: 'el-icon-user',
        leaf: false, //只有一个节点
        children: [{
                path: '/user',
                component: User,
                name: '用户管理'
            },
            {
                path: '/authority',
                component: Authority,
                name: '权限管理'
            },
            // {
            //     path: '/dic',
            //     component: Dic,
            //     name: '数据字典'
            // }
        ]
    },

    {
        path: '/',
        component: Home,
        name: '新增用户',
        iconCls: 'iconfont el-icon-erp-ditu_dingwei_o',
        leaf: true, //只有一个节点
        hidden: true,
        children: [{
            path: '/userInsert',
            component: UserInsert,
            name: '用户管理'
        }]
    },

    {
        path: '/',
        component: Home,
        name: '编辑用户',
        iconCls: 'iconfont el-icon-erp-ditu_dingwei_o',
        leaf: true, //只有一个节点
        hidden: true,
        children: [{
            path: '/userEdit',
            component: UserEdit,
            name: '用户管理'
        }]
    },

    {
        path: '/',
        component: Home,
        name: '编辑权限',
        iconCls: 'iconfont el-icon-erp-ditu_dingwei_o',
        leaf: true, //只有一个节点
        hidden: true,
        children: [{
            path: '/authorityEdit',
            component: AuthorityEdit,
            name: '权限管理'
        }]
    },

    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export default routes;
