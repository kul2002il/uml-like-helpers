
const UmlClassDiagram = {
    props: ['classDiagramData'],
    template: `<div class="component main-component">
        <div class="component-body">
            <uml-class
            v-for="(classStruct, name, index) in classDiagramData.classes"
            v-bind:classStruct="classStruct"
            v-bind:key="name"></uml-class>
        </div>
    </div>`,
};
