
let data = {
    classDiagramData: {
        classes: {},
        dependencies: [],
    }
};

umlclasses = data.classDiagramData;
for (let classname in exampleData) {
    umlclasses.classes[classname] = new ClassStruct(classname, exampleData[classname]);
    umlclasses.dependencies.concat(exampleData[classname].dependencies);
}

let arranging = new ArrangeCascade();
arranging.arrange(umlclasses.classes);

const app = Vue.createApp({
    data: ()=>data,
});

app.component('umlComponent', umlComponent);
app.component('umlClass', umlClass);
app.component('UmlClassDiagram', UmlClassDiagram);

app.mount('#app');
