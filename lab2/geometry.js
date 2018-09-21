const _verifyWithNames = obj => {
    Object.keys(obj).forEach(x => {
        _checkValues(obj[x], x);
    });
}

const _checkValidPrismAttributes = (length, width, height) => {
    const obj = {
        'length': length,
        'width': width,
        'height': height
    }
    _verifyWithNames(obj);
}

const _checkValidRadius = radius => {
    const obj = {
        'radius': radius
    }
    _verifyWithNames(obj);
}

const _checkValues = (val, name) => {
    if(isNaN(val) || val === undefined) {
        throw `${name} value passed was not a number`
    }
    if(val < 0)
        throw `${name} value passed was negative`
}

const volumeOfRectangularPrism = (length, width, height) => {
    //make sure we can do what we need to do
    _checkValidPrismAttributes(length, width, height);
    return length * width * height;
}

const surfaceAreaOfRectangularPrism = (length, width, height) => {
    _checkValidPrismAttributes(length, width, height);
    return (2 * length * width) + (2 * width * height) + (2 * length * height);
}

const volumeOfSphere = radius => {
    _checkValidRadius(radius);
    return (4/3) * Math.PI * Math.pow(radius, 3);
}

const surfaceAreaOfSphere = radius => {
    _checkValidRadius(radius);
    return 4 * Math.PI * Math.pow(radius, 2);
}

module.exports = {
    volumeOfRectangularPrism: volumeOfRectangularPrism,
    surfaceAreaOfRectangularPrism: surfaceAreaOfRectangularPrism,
    volumeOfSphere: volumeOfSphere,
    surfaceAreaOfSphere: surfaceAreaOfSphere
}