
const umlClass = {
    props: ['classStruct'],
    computed: {
        styleGridArea() {
            return {
                gridRow: this.classStruct.getPositionY(),
                gridColumn: this.classStruct.getPositionX(),
            };
        },
    },
    template: `<div :style="styleGridArea">
        <div class="class">
            <div class="class-name" :title="classStruct.fullname">{{classStruct.getName()}}</div>
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
        </div>
    </div>`,
};
