
class ClassStruct{
    fullname = '';
    data = {};
    position = {x: 0, y: 0};

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

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    getPositionX() {
        return this.position.x;
    }

    getPositionY() {
        return this.position.y;
    }
}
