/*
handleSelectConnection() {
    if (this.state.isMousedown()) {
        const coord = this.state.cur.mouse.coord;

        this.connections.forEach((key) => {
            const [box1, box2] = this.getBoxes(key);
            const begin = getMidpoint(box1.rect);
            const end = getMidpoint(box2.rect);

            let first = null;
            let second = null;

            if (begin.x < end.x) {
                first = begin;
                second = end;
            } else {
                first = end;
                second = begin;
            }

            const run = (second.x) - (first.x);
            const rise = second.y - first.y;
            const m = rise / run;

            const getY = (x) => {
                return (m * (x - first.x)) + first.y;
            };

            const getX = (y) => {
                return (y - first.y + (m * first.x)) / m;
            };

            const computedY = getY(coord.x);
            const computedX = getX(coord.y);

            // const computedCoord = { x: coord.x, y: getY(coord.x) };
            // const tolerance = 5;

            // console.log(coord)
            // console.log(computedCoord)
            // console.log(distanceBetweenCoords(coord, computedCoord))

            // if (distanceBetweenCoords(coord, computedCoord) < tolerance) {
            //     console.log('select');
            // }

            // console.log(computedY);
            // console.log(coord.y)
            // console.log('--------------------------')

            // if (
            //     coord.y < computedY + tolerance
            //     && coord.y > computedY - tolerance
            // ) {
            //     console.log('select');
            // }
        });
    }
}
*/
