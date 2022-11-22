
const umlComponent = {
    props: ['component'],
    methods: {
        stylePosition: (index)=>{return {
            gridRow: index,
            gridColumn: index,
        }},
    },
    template: `<div class="component">{{ (()=>{elementNumber = 1})() }}
        <div class="component-header"><div v-if="component.name" class="component-name">{{component.name}}</div></div>
        <div class="component-body">
            <uml-component
            v-for="(subComponent, name, index) in component.components"
            v-bind:component="subComponent"
            v-bind:key="name"
            v-bind:style="stylePosition(elementNumber++)"></uml-component>
            <uml-class 
            v-for="(classStruct, name, index) in component.classes"
            v-bind:classStruct="classStruct"
            v-bind:key="name"
            v-bind:style="stylePosition(elementNumber++)"></uml-class>
        </div>
    </div>`,
};
