import '@/css/style'
// import './css/index.css'
// import './css/index2.css'
class FacCache {
    constructor() {
        this.list = {};
    }
    set(key,value){
        this.list[key] = value;
    }
    get(key){
        return this.list[key]
    }
}

console.log(ENV,3);