
const umlClass = {
    props: ['classStruct'],
    computed: {
        // style: ()=>{return {
        //     gridRow: 3,
        //     gridColumn: 1,
        // }},
    },
    template: `<div><div class="class">
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
    </div></div>`,
};
