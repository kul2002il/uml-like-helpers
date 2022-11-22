
const UmlClassDiagram = {
    props: ['classDiagramData'],
    methods: {
        getSvgElem() {
            if (!this.$refs.mainComponent) {
                this.$forceUpdate();
                return {
                    clientWidth:1,
                    clientHeight:1,
                }
            }
            return this.$refs.mainComponent
        },
        width() {
            return this.getSvgElem().clientWidth;
        },
        height() {
            return this.getSvgElem().clientHeight;
        },
        svgViewport() {
            return '0 0 ' + this.width() + ' ' + this.height();
        },
    },
    template: `<div class="main-component">
        <div class="component-body" ref="mainComponent">
            <uml-class
            v-for="(classStruct, name, index) in classDiagramData.classes"
            v-bind:classStruct="classStruct"
            v-bind:key="name"></uml-class>
        </div>
        <svg :viewBox="svgViewport()" :width="width()" :height="height()">
            <circle cx="50" cy="50" r="40" />
        </svg>
    </div>`,
};
