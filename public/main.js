
let classes = {
    'App/Models/Worker': {
        properties: {
            'name': {
                name: 'name',
                scope: 'private',
                type: 'string',
            },
        },
        methods: {
            'getName': {
                scope: 'public',
                type: 'string',
            },
        },
        dependencies: [],
    },
    'App/Models/Project': {
        properties: {
            'name': {
                name: 'name',
                scope: 'private',
                type: 'string',
            },
            'manager': {
                name: 'manager',
                scope: 'private',
                type: 'App/Models/Worker',
            },
        },
        methods: {
            'getName': {
                scope: 'public',
                type: 'string',
            },
            'getManager': {
                scope: 'public',
                type: 'App/Models/Worker',
            },
        },
        dependencies: [
            {
                from: 'App/Models/Project',
                to: 'App/Models/Worker',
                type: 'aggregation',
            },
        ],
    },
}


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

class ClassStruct{
    fullname = '';
    data = {};

    constructor(fullname, objectData) {
        this.fullname = fullname;
        this.data = objectData;
    }

    getName(){
        return this.fullname.split('/').pop();
    }

    getProperties(){
        return this.data.properties;
    }

    getMethods(){
        return this.data.methods;
    }
}


function classesToHierarchy(classes) {
    let hierarchy = new Component();
    for (let classname in classes) {
        hierarchy.addClass(new ClassStruct(classname, classes[classname]));
    }
    return hierarchy;
}


let data = {
    globalComponent: classesToHierarchy(classes),
};


const umlComponent = {
    props: ['component'],
    template: `<div class="component">
        <div class="component-header"><div class="component-name">{{component.name}}</div></div>
        <div class="component-body">
            <uml-component
            v-for="(subComponent, index) in component.components"
            v-bind:component="subComponent"
            v-bind:key="index"></uml-component>
            <uml-class 
            v-for="(classStruct, index) in component.classes"
            v-bind:classStruct="classStruct"
            v-bind:key="index"></uml-class>
        </div>
    </div>`,
};

const umlClass = {
    props: ['classStruct'],
    template: `<div class="class">
        <div class="class-name">{{classStruct.getName()}}</div>
        <hr>
        <div class="class-property"
        v-for="(property, index) in classStruct.getProperties()"
        v-bind:key="index"
        >{{property.name}}: {{property.type}}</div>
    </div>`,
};

const app = Vue.createApp({
    data: ()=>data,
});

app.component('umlComponent', umlComponent);
app.component('umlClass', umlClass);

app.mount('#app');
