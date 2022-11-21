
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
            'subProject': {
                name: 'subProject',
                scope: 'private',
                type: 'App/Models/Project',
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
            'getManagerName': {
                scope: 'public',
                type: 'App/Models/Worker',
            },
        },
        dependencies: [
            {
                fromClass: 'App/Models/Project',
                fromProperty: 'manager',
                toClass: 'App/Models/Worker',
                type: 'aggregation',
            },
            {
                fromClass: 'App/Models/Project',
                formMethod: 'getManager',
                toClass: 'App/Models/Worker',
                type: 'association',
            },
            {
                fromClass: 'App/Models/Project',
                formMethod: 'getManagerName',
                toClass: 'App/Models/Worker',
                toMethod: 'getName',
                type: 'association',
            },
            {
                fromClass: 'App/Models/Project',
                fromProperty: 'subProject',
                toClass: 'App/Models/Project',
                type: 'association',
            },
        ],
    },
    'TicTack/Class0': {
        properties: {},
        methods: {},
        dependencies: [],
    },
    'TicTack/ComponentA/Class1': {
        properties: {},
        methods: {},
        dependencies: [
            {
                fromClass: 'TicTack/ComponentA/Class1',
                toClass: 'TicTack/Class0',
                type: 'inheritance',
            },
        ],
    },
    'TicTack/ComponentB/Class2': {
        properties: {},
        methods: {},
        dependencies: [
            {
                fromClass: 'TicTack/ComponentB/Class2',
                toClass: 'TicTack/ComponentA/Class1',
                type: 'inheritance',
            },
        ],
    },
    'TicTack/ComponentA/Class3': {
        properties: {},
        methods: {},
        dependencies: [
            {
                fromClass: 'TicTack/ComponentA/Class3',
                toClass: 'TicTack/ComponentB/Class2',
                type: 'inheritance',
            },
        ],
    },
    'TicTack/ComponentB/Class4': {
        properties: {},
        methods: {},
        dependencies: [
            {
                fromClass: 'TicTack/ComponentB/Class4',
                toClass: 'TicTack/ComponentA/Class3',
                type: 'inheritance',
            },
        ],
    },
    'TicTack/ComponentA/Class5': {
        properties: {},
        methods: {},
        dependencies: [
            {
                fromClass: 'TicTack/ComponentA/Class5',
                toClass: 'TicTack/ComponentB/Class4',
                type: 'inheritance',
            },
        ],
    },
    'TicTack/Class6': {
        properties: {},
        methods: {},
        dependencies: [
            {
                fromClass: 'TicTack/Class6',
                toClass: 'TicTack/ComponentA/Class5',
                type: 'inheritance',
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
        <div class="component-header"><div v-if="component.name" class="component-name">{{component.name}}</div></div>
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
    computed: {
        // style: ()=>{return {
        //     gridRow: 3,
        //     gridColumn: 1,
        // }},
    },
    template: `<div class="class" :style="style">
        <div class="class-name">{{classStruct.getName()}}</div>
        <hr>
        <div class="class-property"
        v-for="(property, index) in classStruct.getProperties()"
        v-bind:key="index"
        >{{property.name}}: {{property.type}}</div>
        <hr>
        <div class="class-method"
        v-for="(method, index) in classStruct.getMethods()"
        v-bind:key="index"
        >{{method.name}}(): {{method.type}}</div>
    </div>`,
};

const app = Vue.createApp({
    data: ()=>data,
});

app.component('umlComponent', umlComponent);
app.component('umlClass', umlClass);

app.mount('#app');
