function localstorageclass(key) {
    
    this._key = key;
}
localstorageclass.prototype.getValue = function () {

    let array;
    if (localStorage.getItem(this._key) === null) {
        array = [];
    } else {
        array = JSON.parse(localStorage.getItem(this._key));
    }
    return array;
}
localstorageclass.prototype.updateValue = function (value) {

    const array = this.getValue();
    array.push(value);
    localStorage.setItem(this._key, JSON.stringify(array));
}
localstorageclass.prototype.searchValue = function (value) {

    const array = this.getValue();
    return array.indexOf(value);
}
localstorageclass.prototype.deleteValue = function (value) {

    const array = this.getValue();
    const index = array.indexOf(value);
    if (index != -1) {
        array.splice(index, 1);
        localStorage.setItem(this._key, JSON.stringify(array));
        return true;
    }
    return false;
}