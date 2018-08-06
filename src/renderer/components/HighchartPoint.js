class HighchartPoint {
    constructor () {
        this._point = Math.random() * 300;
        console.log(this._point);
    }

    get point() {
        return this._point;
    }
}

export default HighchartPoint;