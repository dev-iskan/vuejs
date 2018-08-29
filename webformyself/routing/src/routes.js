import VueRouter from 'vue-router'
import Home from  './pages/Home.vue'
// import Cars from  './pages/Cars.vue'
import Car from './pages/Car.vue'
import CarFull from './pages/CarFull.vue'
import ErrorCmp from './pages/Error.vue'

const Cars = resolve=>{
    require.ensure(['./pages/Cars.vue'], ()=>{
        resolve(
            require('./pages/Cars.vue')
        )
    })
};

export default new VueRouter ({
    routes: [
        {
            path: '', //localhost:8080
            component: Home
        },
        {
            path: '/cars',
            component: Cars,
            name: 'Cars'
        },
        {
            path: '/car/:id', // id можем называть как угодно
            component: Car,
            children: [
                {
                    path: 'full', //localhost:8080/car/10/full
                    component: CarFull,
                    name:'CarFull',
                    /*beforeEnter(to, from, next){
                        /!*console.log('beforeEnter');
                        if(false){
                            next(true);
                        }
                        else{
                            next(false);
                        }*!/
                        next();
                    }*/
                }
            ]
        },
        {
            path: '/none',
            redirect: {
                name: 'Cars'
            }
        },
        {
            path: '*',
            component: ErrorCmp
        }

    ],
    mode: 'history',
    scrollBehavior (to, from, savedPosition){
        if(savedPosition){
            return savedPosition;
        }
        if(to.hash){
            return {selector: to.hash};
        }
        return {
            x:0,
            y:0
        };
    }
});