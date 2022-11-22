
class ArrangeCascade
{
    /**
     * @param classes ClassStruct[]
     * @returns ClassStruct[]
     */
    arrange(classes) {
        let index = 1;
        for (let name in classes) {
            classes[name].setPosition(index, index);
            index++;
        }
        return classes;
    }
}
