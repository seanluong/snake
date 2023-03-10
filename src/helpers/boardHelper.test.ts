import { Coordinate } from "../types"
import { sameCoordinate } from "./boardHelper"


describe('board helper function', () => {

    describe('sameCoordinate', () => {
        test('returns true for 2 identical coordinates', () => {
            const lhs: Coordinate = {
                rowIndex: 0, columnIndex: 0
            }
            const rhs: Coordinate = {
                rowIndex: 0, columnIndex: 0
            }
            expect(sameCoordinate(lhs, rhs)).toBe(true);
        })

        test('returns false for 2 different coordinates', () => {
            const lhs: Coordinate = {
                rowIndex: 0, columnIndex: 0
            }
            const rhs: Coordinate = {
                rowIndex: 0, columnIndex: 3
            }
            expect(sameCoordinate(lhs, rhs)).toBe(false);
        })
    })
})

export {}