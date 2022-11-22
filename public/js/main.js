

class Component{
    name = '';
    components = {};
    classes = {};

    constructor(name) {
        this.name = name;
    }

    addClass(classStruct, path=null){
        if(path === null) {
            path = classStruct.fullname.split('/');
        }
        if (path.length === 1) {
            this.classes[path[0]] = classStruct;
            return;
        }
        let forComponent = path.shift();
        if (!this.components[forComponent]) {
            this.components[forComponent] = new Component(forComponent);
        }
        this.components[forComponent].addClass(classStruct, path);
    }
}



function classesToHierarchy(classes) {
    let hierarchy = new Component();
    for (let classname in classes) {
        hierarchy.addClass(new ClassStruct(classname, classes[classname]));
    }
    return hierarchy;
}

let dependencies = [];
for (let classname in classes) {
    dependencies.concat(classes[classname].dependencies);
}

let data = {
    globalComponent: classesToHierarchy(classes),
    dependencies: dependencies,
};



const app = Vue.createApp({
    data: ()=>data,
    computed: {
        dependencies() {
            let dependencies = [];
            for (let classname in classes) {
                dependencies.concat(classes[classname].dependencies);
            }
            return dependencies;
        }
    }
});

app.component('umlComponent', umlComponent);
app.component('umlClass', umlClass);

app.mount('#app');
